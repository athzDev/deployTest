import { AES, enc } from 'crypto-js';
import jscookie from 'js-cookie';
//import { serialize } from 'cookie';
import util from './util';
import { ECookieName } from './utilModel';

const secretKey = 'S44kjd8dFDAy923r424kjj3j1sj23o4ssj3';

// Cookie key to be encrypted
const encryptKeys = [
	ECookieName.COOKIE_MEMBERID,
	ECookieName.COOKIE_USERNAME,
	ECookieName.COOKIE_EXCHANGE_RATE,
	ECookieName.COOKIE_BFPT_INFO,
	ECookieName.COOKIE_ACCOUNT_TYPE,
	ECookieName.COOKIE_IS_SUBACCOUNT,
	ECookieName.COOKIE_LOGGEDIN_USERNAME
];
/**
 * cookie-only
 *
 * @export
 * @class cookieUtil
 */
export default class cookieUtil {
	/**
	 * encryption
	 *
	 * @static
	 * @param {string} key key
	 * @param {string} value value
	 */
	public static encryptKey(key: ECookieName, value: string = '') {
		return encryptKeys.indexOf(key) > -1 ? AES.encrypt(value.toString(), secretKey) : value;
	}

	/**
	 * Decrypt
	 *
	 * @static
	 * @param {string} key key
	 * @param {string} value value
	 */
	public static decryptKey(key: ECookieName, value: string = '') {
		return encryptKeys.indexOf(key) > -1 ? AES.decrypt(value.toString(), secretKey).toString(enc.Utf8) : value;
	}
	/**
	 * Setting cookie
	 * 
	 * @static
	 * @param {string} key key
	 * @param {string} value value
	 * @param {number} [expireDay=30] Expiration date (equal to 0 means session cookie, disappear when the browser is closed)
	 * @param {string} [domain=''] domain name
	 */
	public static set(key: ECookieName, value: string, expireDay: number = 30, serverContext?: any): void {
		const newValue = this.encryptKey(key, value);
		if (util.isClient) {
			const cookieOption: any = {};
			expireDay !== 0 && (cookieOption.expires = expireDay);
			jscookie.set(key, newValue, cookieOption);
		} else if (serverContext) {
			serverContext.res.cookie.set(key, newValue, {
				maxAge: 60 * 60 * 24 * 1000 * expireDay,
				encode: String,
				httpOnly: true,
				overwrite: true,
			});
			// jscookie.set(key, newValue, {
			// 	maxAge: 60 * 60 * 24 * 1000 * expireDay,
			// 	encode: String, 
			// 	httpOnly: true,
			// 	overwrite: true,
			// }); 
			// serverContext.res.setHeader('cookie', serialize(key, newValue,  {
			// 	maxAge: 60 * 60 * 24 * 1000 * expireDay,
			// 	encode: String,
			// 	httpOnly: true,
			// 	overwrite: true,
			// }));

		}
	}

	/**
	 * Get cookie
	 *
	 * @static
	 * @param {string} key key
	 * @param {*} serverContext SSR must be brought in
	 * @returns {string}
	 */
	public static get(key: ECookieName, serverContext?: any): string {
		let value = '';

		if (util.isClient) {
			value = jscookie.get(key);
		} else if (serverContext) {
			value = serverContext.res.cookie.get(key);
		}
		return this.decryptKey(key, value);
	}

	/**
	 * Delete cookie
	 *
	 * @static
	 * @param {string} key key
	 * @param {*} serverContext SSR must be brought in
	 * @returns {string}
	 */
	public static remove(key: string, serverContext?: any, options?: any): void {
		if (util.isClient) {
			jscookie.remove(key, options);
		} else if (serverContext) {
			serverContext.res.cookie.set(key, null);
		}
	}
}
