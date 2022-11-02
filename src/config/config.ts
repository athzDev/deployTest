const YCB = require('ycb');

const { ANALYZE, simple, NODE_ENV, ENV_STAGE, SERVICE_NAME = '', SKIP_PAGE } = process.env;
const serviceName = ENV_STAGE && SERVICE_NAME.toLowerCase().replace('-web', '');

let STATIC_HOST = ENV_STAGE === 'prod'
	? `https://${serviceName}-static.bbb.games`
	: ENV_STAGE === 'advprod' ? `https://${serviceName}-static.adv.bbb.games` : (ENV_STAGE && `http://${serviceName}-static.${ENV_STAGE}.snklab.com`) || '';

let publicRuntimeConfig: any = {
	ENV_STAGE: ENV_STAGE === 'preprod' ? 'pre' : ENV_STAGE === 'advprod' ? 'adv' : ENV_STAGE,
	STATIC_HOST: ENV_STAGE === 'preprod' ? '' : STATIC_HOST,
	SERVICE_NAME,
	APOLLO_CONFIG: { BRAND_DOMAIN: [], BET_DELAY_SEC: 1 },
};

const getParam = (name: string): string => publicRuntimeConfig[name] || process.env[name] || '';

const environmentParam = {
	appName: 'snk',
	serviceName: 'platform-web',
	env: 'dev',
	locate: window.document ? 'client' : 'server',
}


const baseDomain = window.document
	? window.location.host
		.split('.')
		.slice(-2)
		.join('.')
	: '';

// stagin Setup 	

const baseUrl = 'http://fiimsapitest.tracoms.net/api'

//Adding one base url for Rest API call
const affiliateApiUrl ='http://fiimsapitest.tracoms.net/api';
const restApiSignup = 'https://affiliate1.bbb365.link/user/';
const paymentApiHost = 'https://payment1.bbb365.link';


// Production Setup
// const baseUrl = 'https://gql.raksahb.com'
// const baseAgentUrl = 'https://agent.bbb365.link'
// const baseClientUrl = 'http://client.bbb365.link'
// const baseClientPubSubUrl = 'wss://pubsub.raksahb.com/subscriptions';

// const affiliateApiUrl ='https://preprod-affgbsjncef.raksahb.com'; 
// const restApiSignup = 'https://preprod-affgbsjncef.raksahb.com/user/';
// const paymentApiHost = 'https://preprod-pgwbdjnysf.raksahb.com';


const masterConfig = {
	settings: ['master'],
	gqlHost: baseUrl,
	gqlWebSocketHost: `ws://gql.bbb365.link/subscriptions`,
	casinoStatementHost: 'https://trans.titan88.net/frontend',
	cricketScoreHost: 'https://dastardlydevs.co/live-score-detailed?match_id=',
	langHostInternal: `https://file.bbb.games/{brandId}/lang`,
	langHost: `https://file.${baseDomain}/{brandId}/lang`,
	imgHost: `https://file.${baseDomain}/image`,
	// imageS3Host: `https://files.raksahb.com`,
	imageS3Host: `https://v2-files.raksahb.com`,
	imageV3Host:'https://v3-files.raksahb.com',
	// imageS3Host: `http://websitesnk-static-files.s3-website-eu-west-1.amazonaws.com`,
	// http://websitesnk-static-files.s3-website-eu-west-1.amazonaws.com/static/snk/image/1.jpg
	isAuthCheck: true,
	apiLocalHost: 'http://localhost:3000/api/log',
	affiliateApiUrl,
	restApiSignup:restApiSignup,
	paymentApiHost,
	ifscApi:'https://ifsc.razorpay.com',
	apiTimeout: 60 * 1000,
	isUseMockData: false,
	isStartRecordMockData: false,
	cdnHost: getParam('STATIC_HOST') || '',
	webType: 'platform',
	isIframe: false,
	pageRedirect: {
		agentPage: '/agent/agent',
		// agentContentPage: '/agent-content/dashboard',
		euPage: '/',
		// euContentPage: '/eu-content/in-play',
		// adminPage: '/sso',
		withoutPermissionPage: '/',
	},
	secretKey: 'aNdRfUjXn2r5u8x/A?D(G+KbPeShVkYp',
	isEnableMemcached: true,
	env: getParam('ENV_STAGE'),
	reCaptchaIDV2: '6Le8xTcbAAAAAJxn4XUd6b-TzjLommH2uHxG0bHN',
	reCaptchaIDV3: '6Lfr7jcbAAAAANQZTABeWtG0EG7vdm-OY0N6O0JG',
	betradarClientId: 'd1cb26b628c3350c7c71e5646ce2b7a6',
	pubsubDelaySec: 100,
	apolloConfigHost: {
		host: `http://apollo-config.prod.${environmentParam.appName}.internal`,
		appId: environmentParam.appName,
		serviceName: environmentParam.serviceName,
		cluster: (process.env.ENV_STAGE || 'prod').toLowerCase(),
	},
	noPermissionWords: ['boyu.', 'wag.', 'm7.'],
	apolloConfig: getParam('APOLLO_CONFIG'),
	brandId: 31
};

const configArray = [
	{
		dimensions: [
			{
				environment: {
					prod: null,
					adv: null,
					pre: null,
					qa: null,
					alpha: null,
					dev: null,
				},
			},
			{
				locate: {
					server: null,
					client: null,
				},
			},
			{
				serviceName: {
					'agent-web': null,
					'platform-web': null,
					'eu-web': null,
				},
			},
		],
	},
	masterConfig,
	{
		settings: ['locate:server'],
		apiTimeout: 2000,
	},
	{
		settings: ['serviceName:agent-web'],
		webType: 'agent',
		isIframe: true,
		pageRedirect: {
			withoutPermissionPage: '/',
		},
	},
	{
		settings: ['serviceName:eu-web'],
		webType: 'eu',
		isIframe: true,
		pageRedirect: {
			withoutPermissionPage: '/eu-content/invalid',
		},
	},
	{
		settings: ['environment:alpha,qa'],
		agentContentHost: `http://au.${getParam('ENV_STAGE')}.${baseDomain}/agent-content`,
		euContentHost: `http://eu.${getParam('ENV_STAGE')}.${baseDomain}/eu-content`,
	},
	{
		settings: ['environment:adv'],
		agentContentHost: `https://au.${getParam('ENV_STAGE')}.${baseDomain}/agent-content`,
		euContentHost: `https://eu.${getParam('ENV_STAGE')}.${baseDomain}/eu-content`,
		langHostInternal: `https://file.bbb.games/{brandId}/lang`,
		langHost: `https://file.bbb.games/{brandId}/lang`,
		imgHost: `https://file.bbb.games/image`,
		gqlHost: `https://gql.adv.bbb.games`,
		gqlWebSocketHost: `wss://pubsub.adv.bbb.games/subscriptions`,
	},
	{
		settings: ['environment:pre'],
		agentContentHost: `https://au.${getParam('ENV_STAGE')}.${baseDomain}/agent-content`,
		euContentHost: `https://eu.${getParam('ENV_STAGE')}.${baseDomain}/eu-content`,
		langHostInternal: `https://file.bbb.games/{brandId}/lang`,
		langHost: `https://file.bbb.games/{brandId}/lang`,
		imgHost: `https://file.bbb.games/image`,
		gqlHost: `https://gql.pre.snklab.com`,
		gqlWebSocketHost: `wss://pubsub.pre.snklab.com/subscriptions`,
	},
	{
		settings: ['environment:alpha,qa'],
		langHostInternal: `http://file.alpha.snklab.com/{brandId}/lang`,
		langHost: `http://file.alpha.${baseDomain}/{brandId}/lang`,
		imgHost: `http://file.alpha.${baseDomain}/image`,
		gqlHost: `http://gql.${getParam('ENV_STAGE')}.${baseDomain}`,
		gqlWebSocketHost: `ws://pubsub.${getParam('ENV_STAGE')}.${baseDomain}/subscriptions`,
	},
	{
		settings: ['environment:alpha,qa,pre,adv,prod', 'locate:server'],
		gqlHost: baseUrl,
	},
	{
		settings: ['environment:alpha,qa'],
		casinoStatementHost: 'http://54.199.236.203:168/frontend',
		pubsubDelaySec: 300,
		apolloConfigHost: {
			host: `http://apollo-config.alpha.${environmentParam.appName}.internal`,
		},
	},
	{
		settings: ['environment:dev'],
		// gqlWebSocketHost: 'ws://pubsub.alpha.snklab.com/subscriptions',
		gqlHost: `${baseUrl}`,
		agentContentHost: `${'http://localhost:3000'}/agent-content`,
		casinoStatementHost: 'http://localhost:3001.com/frontend',
		langHostInternal: 'http://file.alpha.snklab.com/{brandId}/lang',
		langHost: 'http://file.alpha.snklab.com/{brandId}/lang',
		imgHost: `http://file.alpha.snklab.com/image`,
		isUseMockData: false,
		isStartRecordMockData: false,
		isAuthCheck: true,
		isEnableMemcached: false,
		env: 'dev',
		pubsubDelaySec: 100,
		apolloConfigHost: {
			host: 'https://gql.bbb365.link',
			cluster: 'default',
		},
	},
	{
		settings: ['environment:dev', 'locate:server'],
		apiTimeout: 12000,
	},
];

const ycbObj = new YCB.Ycb(configArray);
const config: typeof masterConfig = ycbObj.read({
	environment: environmentParam.env,
	locate: environmentParam.locate,
	serviceName: environmentParam.serviceName,
});

environmentParam.locate === 'server' && (config.apolloConfig = publicRuntimeConfig['APOLLO_CONFIG']);
export default config;
