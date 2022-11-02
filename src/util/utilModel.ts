export enum EQuickAccessType {
	favorite = 'favorite',
	inPlay = 'inPlay',
}

export enum EEventTypeGroup {
	eventTable = 'EventTable',
	matchTable = 'MatchTable',
}

export enum EEventTypeKey {
	football = 'football',
	tennis = 'tennis',
	cricket = 'cricket',
	horseRacing = 'horseracing',
	greyhoundRacing = 'greyhoundracing',
	termsPolicy = 'termsPolicy',
}


export enum EEventTypeId {
	all = 0,
	football = 1,
	tennis = 2,
	cricket = 4,
	horseracing = 8,
	greyhoundracing = 26,
	election = 100,
	fancybet = 100,
	SPECIAL_FANCY = 100,
	bookmaker = 101,
	politics = 27,
	// TERMS_POLICY = 22,
}

export enum EFancyEventId {
	kplevents = '513125806',
	delhi = '',
	Jharkhand = '',
	// TERMS_POLICY = '',

}

export enum EGameTypeKey {
	PlayTech = 'PlayTech',
	WeAreCasino = 'WeAreCasino',
	BTiSports = 'BTISPORTS',
	VIRTUALSPORTS = 'VIRTUALSPORTS',
	AgTeenpatti = 'AgTeenpatti',
	Jackpot = 'SLottery',
	SUPERNOWA = 'SUPERNOWA',
}

export enum EGameTypeId {
	all = 'All',
	PlayTech = 'PlayTech',
	WeAreCasino = 'WACS',
	BTiSports = 'BTISPORTS',
	VIRTUALSPORTS = 'VIRTUALSPORTS',
	AgTeenpatti = 'AgTeenpatti',
	SUPERNOWA = 'SUPERNOWA',
	// Jackpot = 'SLottery'
}

export enum EEventMode {
	winLose = 'winLose',
	drawGame = 'drawGame',
	racing = 'racing',
}


export enum ECookieName {
  COOKIE_SELECTED_ONCLICKBET = 'socb',
  COOKIE_IS_ACCEPT_ALL = 'isaa',
  COOKIE_IS_ONE_CLICK_ACTIVE = 'isca',
  COOKIE_USERINFO = 'yeus2',
  COOKIE_USERNAME = 'aacou2',
  COOKIE_LOGGEDIN_USERNAME ="gh23gh",
  COOKIE_MEMBERID = 'mmbeid',
  COOKIE_ORIGINAL_MEMBERID = 'ormbid',
  COOKIE_LANG = 'lljd12ix',
  COOKIE_ONECLICKBET_STAKE = 'oclstk',
  COOKIE_DEFAULT_STAKE = 'oclstk',
  COOKIE_STAKE_CHOOSE = 'stkced',
  COOKIE_ORDER_LIMIT = 'order_limit',
  COOKIE_EXCHANGE_RATE = 'excrte',
  COOKIE_XRAY_HEADER = 'xrhthd',
  COOKIE_TIME_ZONE = 'timezone',
  COOKIE_AGENT_TOKEN = 'ckadtk',
  COOKIE_TOKEN = 'ckiftkix',
  COOKIE_ACCOUNT_TYPE = 'acntty',
  COOKIE_ACCOCIATIONS = 'acaccs',
  COOKIE_IS_SUBACCOUNT = 'issbac',
  COOKIE_RECAPTCHA_TOKEN = 'q5r2rfix',
  COOKIE_BFPT_INFO = 'bfpinf',
  COOKIE_IS_DEFAULT_PASSWORD = 'isdfpwix',
  COOKIE_IS_HAD_AUTH = 'bobo34ix',
  COOKIE_CUSTOM_POLLING_SEC = 'cuplscix',
  COOKIE_PRICE_MARGIN = 'prcmgn',
  COOKIE_CREDIT = 'buycxnix',
  COOKIE_THEME = 'asdfg',
  COOKIE_BRAND_ID = "COOKIE_BRAND_ID"
} 

export enum ETimeZone {
	SYSTEM = (new Date().getTimezoneOffset() * -1) / 60,
	// Check https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
	INDIA = 5.5,
}

export enum ETransferType {
	deposit = 'Deposit',
	withdraw = 'Withdraw',
}

export enum EEventEmit {
	EVENT_ORDER = 'EVENT_ORDER',
	EVENT_GRAPHQL_QUERY = 'EVENT_GRAPHQL_QUERY',
	EVENT_DEACTIVE_SIDEBAR = 'EVENT_DEACTIVE_SIDEBAR',
	EVENT_PUSH_ERROR = 'EVENT_PUSH_ERROR',
	EVENT_ROUTER_PUSH = 'EVENT_ROUTER_PUSH',
	EVENT_TOGGLE_SIDEBAR = 'EVENT_TOGGLE_SIDEBAR',
	EVENT_ACTIVATE_SIDEBAR = 'EVENT_ACTIVATE_SIDEBAR',
	EVENT_DEACTIVATE_SIDEBAR = 'EVENT_DEACTIVATE_SIDEBAR',
	EVENT_TOGGLE_BETTING = 'EVENT_TOGGLE_BETTING',
	EVENT_ACTIVATE_BETTING = 'EVENT_ACTIVATE_BETTING',
	EVENT_DEACTIVATE_BETTING = 'EVENT_DEACTIVATE_BETTING',
}

export enum EMarketType {
	MAIN = 1,
	FANCY = 2,
	'Completed' = 3,
	'Tied' = 4,
	'Over_Under_All'= -2,
	'Over_Under_0.5' = 5,
	'Over_Under_1.5' = 6,
	'Over_Under_2.5' = 7,
	'Over_Under_3.5' = 8,
	'Over_Under_4.5' = 9,
	'Over_Under_5.5' = 10,
	'Over_Under_6.5' = 11,
	'Over_Under_7.5' = 12,
	'Over_Under_8.5' = 13,
	'To_Qualify' = 14,
	'Innings_Runs' = 15,
	'Super_Over' = 16,
	'Multi_Selection_Fancy' = 17,
	'Correct_Score'= 21,
	'Non_Sport'= 25,
	'BETFAIR'= 'BETFAIR',
	'BOOKMAKER'= 'BOOKMAKER',
	'wicket'= 'WICKET',
	'PARKER'= 'PARKER',
	'NON_SPORT' = 200
}

export enum EMarketSource {
	SNK = 'SNK',
	BETFAIR = 'BETFAIR',
}

export enum ETransactionType {
	OS = "OS",
	TI = "TI",
	TO = "TO",
	CI = "CI",
	CA = "CA",
	WS = "WS",
	CS = "CS",
	NS = "NS",
	IS = "IS",
	AS = "AS",
	RS = "RS",
	AA = "AA",
	RT = "RT",
	CT = "CT",
	TE = "TE",
	TM = "TM",
	TT = "TT",
	WT = "WT",
	IT = "IT"
}

export enum EMemberType {
	'COMPANY_ADMIN' = 0,
	'SUPER_ADMIN' = 1,
	'ADMIN' = 2,
	'SUPER' = 3,
	'MASTER' = 4,
	'CLIENT' = 5,
}

export enum ETransactionTypeId {
	OrderSport = 1,
	// Deposit
	TransferIn = 2,
	// Withdraw
	TransferOut = 3,
	// Credit Init
	CreditInit = 4,
	// Credit Adjust
	CreditAdjust = 5,
	// Betting P&L
	CheckoutSport = 6,
	// Betting Commission
	CommissionSport = 7,
	CancelOrderSpor = 8,
	InvalidOrderSport = 9,
	AutoCloseOrder = 10,
	RefundOrderSport  = 11,
	AdminCreditAdjust = 12,
	ReverseTransaction = 13,
	CommissionThirdParty = 14,
	TransferExchange = 15,
	TransferMember = 16,
	TransferThirdParty = 17,
	WinLossThirdParty = 18,
	IT = 19
}

export const adminPollingTimer = [
	{ text: '3', value: 3000 },
	{ text: '2', value: 2000 },
	{ text: '1', value: 1000 },
];

export enum EFancyMarketResource {
	TOMMY = 'TOMMY',
	WICKET = 'WICKET',
}

export enum EFancyMarketStatus {
	OPENED = 'OPENED',
	INACTIVE = 'INACTIVE',
	SUSPENDED = 'SUSPENDED',
	CLOSED = 'CLOSED',
}

export enum EFancyTypeKey {
	election = 'IPL',
	bookmaker = 'BOOKMAKER',
	
	
}

export enum ESide {
	BACK = 'BACK',
	LAY = 'LAY',
}
