import config from '../config/config';
import fetchUtil from './fetchUtil';
const Memcached = require('memcached');
const memcached = config.isEnableMemcached
	? new Memcached('127.0.0.1:11211', {
			retries: 10,
			retry: 10000,
			remove: true,
	  })
	: undefined;

interface IMemcachedKey {
	key: string;
	time: number;
	lang: string;
	cb: any;
}
const memcachedCBCount: any = {};
/**
 * memcached拿取與儲存的工具
 *
 * @export
 * @class memcachedUtil
 */
export default class memcachedUtil {
	public static getStats(command: string) {
		return new Promise(res => {
			memcached.stats((err: any, data: any) => {
				res(data);
			});
		});
	}
	/**
	 * memcached 將對應的key與data存入服務器
	 *
	 * @static
	 * @param {string} key 欲儲存資料的key
	 * @param {*} data 欲儲存資料
	 * @param {number} [lifeTimeBySecond=600] 過期時間，以秒為單位
	 * @param {string} lang 語系參數
	 * @returns {void}
	 */
	public static set(key: string, data: any, lifeTimeBySecond: number = 60, lang: string): void {
		if ((global as any).document) {
			return console.log(`key "${key}", memcache cant set in client`);
		} else if (!lang) {
			console.log(`key "${key}" please remind to give a lang parameter or it will use default lang en-us.`);
		}
		if (!memcached) {
			return;
		}
		const memcachedKey = `${key}_${lang}`;
		try {
			data &&
				memcached.set(
					memcachedKey,
					data,
					lifeTimeBySecond,
					(error: any): any => {
						error && console.log(`${Date.now()} memcached set error with key ${memcachedKey}`, error);
					},
				);
		} catch (ex) {
			console.log('memcached set failed, please check memcached on working or not.');
		}
	}

	/**
	 * memcached 根據key值取得資料
	 *
	 * @static
	 * @param {string} key 欲取得資料的key
	 * @param {string} lang 語系參數
	 * @returns {*}
	 */
	public static get(key: string | string[], lang: string): Promise<any> {
		if ((global as any).document) {
			console.log(`key "${key}", memcache cant get in client`);
			return new Promise(
				(resolve: any, reject: any): void => {
					resolve();
				},
			);
		} else if (!lang) {
			console.log(`key "${key}" please remind to gve a lang parameter or it will use default lang en-us.`);
		}
		const result: any = new Promise(
			(res: any, rej: any): any => {
				if (!memcached) {
					return res(null);
				}
				const memcachedKey = key instanceof Array ? key.map(k => `${k}_${lang}`) : `${key}_${lang}`;
				memcachedKey instanceof Array
					? memcached.getMulti(
							memcachedKey,
							(err: any, data: any): any => {
								return res(memcachedKey.map(a => data[a]));
							},
					  )
					: memcached.get(
							memcachedKey,
							(err: any, data: any): any => {
								return res(data);
							},
					  );
			},
		);
		return result;
	}

	/**
	 * memcached 根據key值取得資料
	 *
	 * @static
	 * @param {string} key 欲儲存資料的key
	 * @param {number} [time=600] 過期時間，以秒為單位
	 * @param {string} lang 語系參數
	 * @param {*} cb 非同步請求
	 * @returns {*}
	 */
	public static getAndSet({ key, time = 60, lang = 'en-us', cb }: IMemcachedKey): Promise<any> {
		if (!(global as any).document && memcached) {
			const foreverKey = `forever_${key}`;
			const foreverTime: number = 60 * 60 * 24 * 30;
			const cbFunction: any = (): any => {
				return fetchUtil.promiseTimeout(cb(), 120000).then((data: any) => {
					memcachedCBCount && (memcachedCBCount[key] = 0);
					data && memcachedUtil.set(key, data, time, lang);
					data && memcachedUtil.set(foreverKey, data, foreverTime, lang);
					return data;
				});
			};

			return memcachedUtil.get([foreverKey, key], lang).then(data => {
				const [payload, currentPayload]: any = data || [];
				if (!payload) {
					return cbFunction();
				} else {
					// 如果有值，代表api目前正常，清空count
					// 如果沒值代表上次api異常，異常則根據下面來處理
					currentPayload && (memcachedCBCount[key] = 0);

					// 設定globl變數作為是否停止呼叫cb的依據
					!memcachedCBCount[key] && (memcachedCBCount[key] = 0);
					memcachedCBCount[key] += 1;
					memcachedCBCount[key] > 100 && (memcachedCBCount[key] = 1);

					// 過期時，更新資料
					if (!currentPayload && memcachedCBCount[key] <= 2) {
						cbFunction();
					}
				}
			});
		} else {
			return cb();
		}
	}
}
