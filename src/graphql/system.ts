import gql from 'graphql-tag';

export const SYSTEM_INFO = gql`
	query systemInfo($input: SystemInfoInput!) {
		system {
			info(input: $input) {
				langVersion
			}
		}
	}
`;

export const CONFIG = gql`
	query systemConfig($input: SystemConfigInput!) {
		system {
			config(input: $input) {
				value
			}
		} 
	}
`;

export const PLATFORM_LIST = gql`
	query getPlatform($input: PlatformGetInput!) {
		thirdParty {
			platform(input: $input) {
			id
			code
			name
			productTypeId
			referMemberId
			exchangeRate
			enableFloat
			}
		}
	}
`

export const  ONE_CLICK_RECYCLE = gql `
	mutation oneClickRecyle {
		game {
			recycleTransfer {
			success
			code
			message
			}
		}
	}
`
export const GET_GAME = gql`
query getGame($input: GameGetInput!) {
	thirdParty {
		game(input: $input) {
			id
			code
			name
			providerName
			platformCode
			platformName
			channelId
			channelName
			categoryId
			categoryName
			imageUrl
			sortPriority
			weight
		}
	}
}
`;