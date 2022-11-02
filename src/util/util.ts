import { AES, enc, pad, mode } from 'crypto-js';
import { addMilliseconds } from 'date-fns';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import config from '../config/config';
const parser: any = require('ua-parser-js');


export default class util {
    public static isClient: boolean = (global as any).document;
    public static targetStrings: any = {};

    public static getValue(obj: any, array: string[] | string, defaultValue?: any): any {
        return !isNil(get(obj, array)) ? get(obj, array) : defaultValue;
    }

    public static getMulValue(obj: any, ...args: any) {
        return args.map((key: string) => {
            return util.getValue(obj, key);
        });
    }

    public static getParentDomainName(): string {
        const parentDomain: string = (global as any).document.referrer;
        if (!!parentDomain && parentDomain !== '') {
            return parentDomain.split('/')[2];
        } else {
            return (global as any).document.URL.split('/')[2];
        }
    }

    public static numAdd(num1: number | string = 0, num2: number | string = 0): number {
        let numNum1 = Number(num1);
        let numNum2 = Number(num2);
        let baseNum: number;
        let baseNum1: number;
        let baseNum2: number;

        if (isNaN(numNum1)) {
            console.warn(`[util.numAdd]: num1 must be a number or a number string, but the value of num1 is`, num1);
            numNum1 = 0;
        }

        if (isNaN(numNum2)) {
            console.warn(`[util.numAdd]: num2 must be a number or a number string, but the value of num2 is`, num2);
            numNum2 = 0;
        }

        try {
            baseNum1 = num1.toString().split('.')[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split('.')[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return Math.round((numNum1 + numNum2) * baseNum) / baseNum;
    }

    public static numMultiply(num1: number, num2: number): number {
        let baseNum: number;
        let baseNum1: number;
        let baseNum2: number;
        try {
            baseNum1 = num1.toString().split('.')[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split('.')[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        const newNum1 = Math.round(num1 * baseNum);
        const newNum2 = Math.round(num2 * baseNum);
        return (newNum1 * newNum2) / baseNum / baseNum;
    }

    public static numRound(
        num: number,
        {
            fractionDigits = 2,
            roundMethod = 'round',
        }: { fractionDigits: number; roundMethod: 'ceil' | 'floor' | 'round' } = {} as any,
    ) {
        const roundFn = Math[roundMethod] || Math.round;
        if (typeof roundFn !== 'function') {
            console.warn('[util.numRound]: roundMethod is invalid!');
            return num;
        }
        const result = roundFn(num * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits);

        return result === 0 ? result : Number(result.toFixed(fractionDigits));
    }

    public static getStaticUrl(src: string): string {
        return `/static/${src}`;
    }

    public static createIncludeScript(src: string): void {
        const script: any = (global as any).document.createElement('script');
        script.async = true;
        script.src = `${src}?v=`;
        (global as any).document.body.appendChild(script);
    }

    public static setIframeParentUrl(url: string): void {
        const parentDomain: string = (global as any).document.referrer;
        (global as any).window.top.location.href = `${parentDomain
            .split('/')
            .slice(0, 3)
            .join('/')}${url}`;
    }

    public static getTimeDiff(date: Date): { days: number; hours: number; minutes: number; seconds: number } {
        const dateFrom = new Date(date);
        const dateNow = new Date();
        const dateDiff = dateFrom.getTime() - dateNow.getTime();
        const days = Math.floor(dateDiff / (24 * 3600 * 1000));
        const leave1 = dateDiff % (24 * 3600 * 1000);
        const hours = Math.floor(leave1 / (3600 * 1000));
        const leave2 = leave1 % (3600 * 1000);
        const minutes = Math.floor(leave2 / (60 * 1000));
        const leave3 = leave2 % (60 * 1000);
        const seconds = Math.round(leave3 / 1000);
        return { days, hours, minutes, seconds };
    }

    public static adjustTimeString(time: number): string {
        return `0${time}`.substr(-2);
    }

    public static curry(f: any) {
        const g = (...args1: any[]) => {
            if (args1.length >= f.length) {
                return f(...args1);
            } else {
                return (...args2: any[]) => g(...args1, ...args2);
            }
        };
        return g;
    }

    public static compose(...fns: any[]) {
        return fns.reverse().reduce(function reducer(fn1, fn2) {
            return function composed(...args: any[]) {
                return fn2(fn1(...args));
            };
        });
    }

    public static formatDate(date: Date) {
        const formatDate = new Date(date);
        const day = formatDate.getDate();
        const month = formatDate.getMonth() + 1;
        const year = formatDate.getFullYear();
        return `${day}/${month}/${year}`;
    }

    public static formatTime(date: Date) {
        const formatDate = new Date(date);
        const hour = formatDate.getHours();
        const min = formatDate.getMinutes();
        const sec = formatDate.getSeconds();
        return `${hour}:${min}:${sec}`;
    }

    public static clearSelection() {
        // source:
        // https://gist.github.com/RavenZZ/f0ce802249056fb55d9effeb8cf0b6c5
        if (window && window.getSelection) {
            const selection = window.getSelection();
            if (!selection) {
                return;
            }
            if (selection.empty) {
                // Chrome
                selection.empty();
            } else if (selection.removeAllRanges) {
                // Firefox
                selection.removeAllRanges();
            }
        } else if ((document as any).selection) {
            // IE?
            (document as any).selection.empty();
        }
    }

    public static throttle(fn: any, threshold = 1000 / 60 /* 60FPS */) {
        let last: number;
        let timerId: any;

        return (...args: any[]) => {
            const now = Date.now();
            if (last && now < last + threshold) {
                clearTimeout(timerId);
                timerId = setTimeout(() => {
                    last = now;
                    fn(...args);
                }, threshold);
            } else {
                last = now;
                fn(...args);
            }
        };
    }

    public static runSerial(tasks: any[]) {
        let result = Promise.resolve();
        tasks.forEach((task, i) => {
            result = result.then(() => task());
        });
        return result;
    }

    public static isMobile(useragent?: string): boolean {
        const mobileArr: string[] = ['Android', 'iOS', 'BlackBerry', 'Windows Phone'];
        const ua = useragent ? new parser(useragent) : new parser();

        const deviceInfo: { model: string; type: string; vendor: string } = ua.getDevice();
        const deviceType = deviceInfo.type;
        const osInfo: { name: string; version: string } = ua.getOS();
        const osName = osInfo.name;
        const isMobile: boolean = !!deviceType || mobileArr.indexOf(osName) > -1;
        return isMobile;
    }

    public static encryptJSON = (obj: any) => {
        try {
            let jsonString = JSON.stringify(obj)
            const encryptedTarget = enc.Utf8.parse(jsonString)
            const encryptSecretKey = enc.Utf8.parse(config.secretKey)
            const authInfo = !obj ? '' : AES.encrypt(encryptedTarget, encryptSecretKey, {
                iv: enc.Utf8.parse(''),
                padding: pad.Pkcs7,
                mode: mode.CBC,
            }).ciphertext.toString();
            return authInfo
            // return !obj ? '' : AES.encrypt(JSON.stringify(obj), config.secretKey).toString();
        } catch (e) {
            console.log('encryptJSON failed.', e);
            return '';
        }
    };

    public static decryptJSON = (q: string) => {
        try {
            const encryptedHexTarget = enc.Hex.parse(q);
            const encryptSecretKey = enc.Utf8.parse(config.secretKey);
            const decryptJSON = JSON.parse(AES.decrypt(enc.Base64.stringify(encryptedHexTarget), encryptSecretKey, {
                iv: enc.Utf8.parse(''),
                padding: pad.Pkcs7,
                mode: mode.CBC,
            }).toString(enc.Utf8));
            return decryptJSON
        } catch (e) {
            console.log('decryptJSON failed.', e);
            return '';
        }
    };

    public static fixedFrom = (from: any, offset: number = 0) => {
        const offsetFrom = addMilliseconds(from, offset);
        const offsetLimitFrom = new Date(offsetFrom.setHours(0, 0, 0, 0));
        const limitFrom = addMilliseconds(offsetLimitFrom, -offset);
        return limitFrom;
    };

    public static fixedTo = (to: any, offset: number = 0) => {
        const offsetTo = addMilliseconds(to, offset);
        const offsetLimitTo = new Date(offsetTo.setHours(23, 59, 59, 999));
        const limitTo = addMilliseconds(offsetLimitTo, -offset);
        return limitTo;
    };

    public static getTargetString = (member: {
        memberId?: number;
        type?: string;
        username?: string;
        currencyId?: number;
    }) => {
        if (!member) {
            return '';
        }
        const key = `${member.memberId}_${member.type}_${member.username}`;

        if (!util.targetStrings[key]) {
            util.targetStrings[key] = util.encryptJSON(member);
        }
        return util.targetStrings[key];
    };

    public static liveStreamEncodeURl = () => {
        const url = document.location.origin;
        const Base64 = {
            _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            encode(e: any) {
                let t = '';
                // tslint:disable-next-line: one-variable-per-declaration
                let n, r, i, s, o, u, a;
                let f = 0;
                e = Base64._utf8_encode(e);
                while (f < e.length) {
                    n = e.charCodeAt(f++);
                    r = e.charCodeAt(f++);
                    i = e.charCodeAt(f++);
                    // tslint:disable-next-line: no-bitwise
                    s = n >> 2;
                    // tslint:disable-next-line: no-bitwise
                    o = ((n & 3) << 4) | (r >> 4);
                    // tslint:disable-next-line: no-bitwise
                    u = ((r & 15) << 2) | (i >> 6);
                    // tslint:disable-next-line: no-bitwise
                    a = i & 63;
                    if (isNaN(r)) {
                        u = a = 64;
                    } else if (isNaN(i)) {
                        a = 64;
                    }
                    t =
                        t +
                        this._keyStr.charAt(s) +
                        this._keyStr.charAt(o) +
                        this._keyStr.charAt(u) +
                        this._keyStr.charAt(a);
                }
                return t;
            },
            decode(e: any) {
                let t = '';
                // tslint:disable-next-line: one-variable-per-declaration
                let n, r, i;
                // tslint:disable-next-line: one-variable-per-declaration
                let s, o, u, a;
                let f = 0;
                e = e.replace(/[^A-Za-z0-9\+\/\=]/g, '');
                while (f < e.length) {
                    s = this._keyStr.indexOf(e.charAt(f++));
                    o = this._keyStr.indexOf(e.charAt(f++));
                    u = this._keyStr.indexOf(e.charAt(f++));
                    a = this._keyStr.indexOf(e.charAt(f++));
                    // tslint:disable-next-line: no-bitwise
                    n = (s << 2) | (o >> 4);
                    // tslint:disable-next-line: no-bitwise
                    r = ((o & 15) << 4) | (u >> 2);
                    // tslint:disable-next-line: no-bitwise
                    i = ((u & 3) << 6) | a;
                    t = t + String.fromCharCode(n);
                    // tslint:disable-next-line: triple-equals
                    if (u != 64) {
                        t = t + String.fromCharCode(r);
                    }
                    // tslint:disable-next-line: triple-equals
                    if (a != 64) {
                        t = t + String.fromCharCode(i);
                    }
                }
                t = Base64._utf8_decode(t);
                return t;
            },
            _utf8_encode(e: any) {
                e = e.replace(/\r\n/g, '\n');
                let t = '';
                for (let n = 0; n < e.length; n++) {
                    const r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r);
                    } else if (r > 127 && r < 2048) {
                        // tslint:disable-next-line: no-bitwise
                        t += String.fromCharCode((r >> 6) | 192);
                        // tslint:disable-next-line: no-bitwise
                        t += String.fromCharCode((r & 63) | 128);
                    } else {
                        // tslint:disable-next-line: no-bitwise
                        t += String.fromCharCode((r >> 12) | 224);
                        // tslint:disable-next-line: no-bitwise
                        t += String.fromCharCode(((r >> 6) & 63) | 128);
                        // tslint:disable-next-line: no-bitwise
                        t += String.fromCharCode((r & 63) | 128);
                    }
                }
                return t;
            },
            _utf8_decode(e: any) {
                let t = '';
                let n = 0;
                while (n < e.length) {
                    const r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r);
                        n++;
                    } else if (r > 191 && r < 224) {
                        const c2 = e.charCodeAt(n + 1);
                        // tslint:disable-next-line: no-bitwise
                        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
                        n += 2;
                    } else {
                        const c2 = e.charCodeAt(n + 1);
                        const c3 = e.charCodeAt(n + 2);
                        // tslint:disable-next-line: no-bitwise
                        t += String.fromCharCode(((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        n += 3;
                    }
                }
                return t;
            },
        };
        return Base64.encode(url);
    };

    public static convertToUnit = (credit: number, fractionDigits = 2) => {
        let convertCredit = credit;
        if (Math.abs(credit) > 1000000) {
            convertCredit = credit / 1000000;
            return `${convertCredit.toFixed(fractionDigits)}M`;
        } else if (Math.abs(credit) > 1000) {
            convertCredit = credit / 1000;
            return `${convertCredit.toFixed(fractionDigits)}K`;
        }
        return credit.toFixed(fractionDigits);
    };

    public static isBookmaker = () => {
        return util.isClient ? (global as any).location.pathname.includes('bookmaker') : false;
    };
}
