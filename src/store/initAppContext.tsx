import React, { useState, useEffect } from 'react';
import cookieUtil from 'src/util/cookieUtil';
import { ECookieName } from '../util/utilModel';
import ThemeProvider from '../store/EnhancedThemeProvider';
import util from '../util/util';
export interface IAppContextStore {
	i18n: any;
	query: any;
	isStartFromServer: boolean;
	pageConfig: any;
	view: string;
	pathname: string;
	isMobileWidth: boolean;

	// from withUserInfo
	username: string;
	memberId: number;
	type: string; // account type
	lang: string;
	exchangeRate: number;
	isSubAccount: string;
	persona: IAssociations;
	personaString: string;
	bfInfo: IbfInfo[];

	// from withSystem
	showkey: string;
	ip: string;
	betBufferSec: number;
	token: string;
	brandId: number;
	showLiveTv: boolean;
	liveTvUrl: any;
	theme: any;
	isDarkTheme: boolean;
	
	// UI Auth
	handleLogin: boolean;
	handleSignup: boolean;
	userInfo: any;
	showTimer: boolean;
	showResend: boolean;
	setPage: number;
}

export interface IbfInfo {
	categoryId: number;
	bfPt: number;
}

export interface IAssociations {
	username: string;
	type: string;
	currencyId: number;
	exchangeRate: number;
	memberId: number;
}

const brandDomains = [
	{
		domain: 'iexch.com',
		id: 52,
		type: 'CLIENT',
		dev: 'PROD'
	},
	{
		domain: ' preprod.iexch.com',
		id: 52,
		type: 'CLIENT',
		dev: 'PRE-PROD'
	},
	{
		domain: 'test.iexch.com',
		id: 52,
		type: 'CLIENT',
		dev: 'STAGING'
	},
	{
		domain: 'super7s.com',
		id: 51,
		type: 'CLIENT',
		dev: 'PROD'
	},
	{
		domain: 'preprod.super7s.com',
		id: 51,
		type: 'CLIENT',
		dev: 'PRE-PROD'
	},
	{
		domain: 'test1.super7s.com',
		id: 51,
		type: 'CLIENT',
		dev: 'STAGING'
	},
	{
		domain: 'strikers.bbb365.link',
		id: 53,
		type: 'CLIENT',
		dev: 'STAGING'
	},
	{
		domain: 'preprod.strikers365.net',
		id: 53,
		type: 'CLIENT',
		dev: 'PRE-PROD'
	},
	{
		domain: 'strikers365.net',
		id: 53,
		type: 'CLIENT',
		dev: 'PROD'
	},
	{
		domain: 'cashsite.bbb365.link',
		id: 31,
		type: 'CLIENT/AGENT',
		dev: 'DEV'
	},
	{
		domain: 'preprod.yolo247.com',
		id: 31,
		type: 'CLIENT',
		dev: 'PRE-PROD'
	},
	{
		domain: 'yolo247.com',
		id: 31,
		type: 'CLIENT',
		dev: 'PROD'
	},
	{
		domain: 'localhost:3000',
		id: 31,
		type: 'CLIENT/AGENT',
		dev: 'DEV'
	}
]


const getBrandId = (brandDomains: any[], host: string = '') => {
	try {
		const refer = util.isClient ? (global as any).location.host : host;
		let brandId = brandDomains.find(bd => refer.includes(bd.domain))?.id||1;
		// brandDomains.forEach((bd: any) => {
		// 	if (refer.includes(bd.domain)) {
		// 		brandId = bd.id;
		// 	}

		// });
		//console.log('printt ', brandId)
		return brandId || 1;
	} catch (e) {
		console.error('Get brand id failed.', e);
		return 1;
	}
};

const initStore: IAppContextStore = {
	i18n: {},
	query: {},
	lang: cookieUtil.get(ECookieName.COOKIE_LANG) || 'manoj',
	isStartFromServer: true,
	pageConfig: {},
	username: '',
	view: '',
	exchangeRate: 1,
	showkey: '',
	type: '',
	pathname: '',
	memberId: 0,
	persona: {
		username: '',
		type: '',
		currencyId: 0,
		exchangeRate: 0,
		memberId: 0,
	},
	isMobileWidth: false,
	isSubAccount: '',
	bfInfo: [] as IbfInfo[],
	personaString: '',
	ip: '',
	betBufferSec: 1,
	token: '',
	brandId: getBrandId(brandDomains),
	showLiveTv: false,
	liveTvUrl: '',
	theme: cookieUtil.get(ECookieName.COOKIE_THEME) || 'Light',
	isDarkTheme: false,
	handleLogin: false,
	handleSignup: false,
	userInfo: {},
	showTimer: false,
	showResend: false,
	setPage: 0,

};

export const AppContext = React.createContext({});

export const AppContextProvider = (props) => {
	
	const { initData, children } = props;
	const [store, setStore] = useState(initStore);

	const setState = (data) => {
		setStore(prevState => {
			let newData = {
				...prevState,
				...data
			}
			return newData;
		})
	}
	useEffect(() => {
		setStore(prevState => {
			let newData = {
				...prevState,
				...initData,
			}
			return newData;
		})
	}, [initData]);

	return (
		<AppContext.Provider value={{ ...store, setState }}>
			<ThemeProvider view={'snk'} memberType={'CLIENT'} brandId={store.brandId}>
			{children}
			</ThemeProvider>
		</AppContext.Provider>
	)
}


export const withAppContext = (Child: any): any => {
	return class App extends React.Component<any, any> {
		//it's for next so we can rmove it later
		static async getInitialProps(ctx: any = {}): Promise<any> {
			if (Child.hasOwnProperty('getInitialProps')) {
				const context: any = (Object as any).assign(ctx, {});
				const childProps: any = (await Child.getInitialProps(context)) || {};
				return (Object as any).assign(childProps, {});
			} else {
				return {};
			}
		}
		render(): JSX.Element {
			return <AppContext.Consumer>{
				(app) => <Child {...this.props} app={app} />
			}
			</AppContext.Consumer>;
		}
	};
};