import { darken, getLuminance, lighten, parseToHsl } from 'polished';
import util from '../util/util';

export const isTransparent = (color: string) => {
	if (typeof color !== 'string') {
		// console.error('[isTransparent]: color is expected to be a string.');
		return false;
	} else if (color.toLowerCase() === 'transparent') {
		return true;
	} else {
		const hsla: any = parseToHsl(color);
		if (hsla.alpha === 0) {
			return true;
		} else {
			return false;
		}
	}
};

interface IDiffColor {
	(amount: number, color: string): string;
	(amount: number): (color: string) => string;
}
/**

 * @param {number} amount  (0 ~ 1)
 * @param {string} color 
 * @return {string} 
 */
export const diffColor: IDiffColor = util.curry(
	(amount: number, color: string): string => {
		if (isTransparent(color)) {
			return 'transparent';
		} else {
			return 'transparent';
		}
	},
);

export const diffColorReversed: IDiffColor = util.curry(
	(amount: number, color: string): string => {
		if (isTransparent(color)) {
			return 'transparent';
		} else {
			return 'transparent';
		}
	},
);
