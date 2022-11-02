import { darken, getLuminance, lighten } from 'polished';
import React from 'react';
import { ThemeProvider } from 'styled-components';


// Utils
import appConfig from '../config/config';
import { diffColor } from '../util/colorUtil';

interface IProps {
	view: string;
	memberType: string;
	brandId: number;
	children: any;
}

const EnhancedThemeProvider: React.FC<IProps> = props => {
	const { view, memberType, children, brandId } = props;
	const theme = createTheme(view, memberType, brandId);
	//console.log('them', theme)
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default EnhancedThemeProvider;

// Helpers

const createTheme = (view: string, memberType: string, brandId: number) => {
	const isClientType = memberType === 'CLIENT' || appConfig.webType === 'eu';
	//console.log('isClientType', isClientType, view, brandId);
	let palette: any;
	let font: any;
	let config: any;
	let image: any;
	switch (view) {
		case 'snk':
			if (isClientType) {
				palette = require('../theme/palette.json');
				font = require('../theme/font.json');
				config = require('../theme/config.json');
				image = require('../theme/image.json');
			}
			// if (memberType === 'COMPANY_ADMIN') {
			// 	palette = palette[0];
			// 	font = font[0];
			// 	config = config[0];
			// 	image = image[0];
			// } else {
			// 	palette = palette[brandId];
			// 	font = font[brandId];
			// 	config = config[brandId];
			// 	image = image[brandId];
			// }

				palette = palette[brandId];
				font = font[brandId];
				config = config[brandId];
				image = image[brandId];

			break;
		default:
			palette = require('../theme/palette.json');
			font = require('../theme/font.json');
			config = require('../theme/config.json');
			break;
	}

	const _palette = {
		...palette,
		// Generated colors
		'primary-background-dark': darken(0.125, palette['primary-background']),
		'primary-background-light': lighten(0.125, palette['primary-background']),
		'primary-foreground': palette[getTextColorOnBackground(palette['primary-background'])],
		'primary-gradient': `linear-gradient(to right, ${palette['primary-background']} 40% , ${palette['primary-background-shift']})`,
		'primary-gradient-reversed': `linear-gradient(to left, ${palette['primary-background']} , ${palette['primary-background-shift']})`,
		'primary-header-gradient': `linear-gradient(to right, ${palette['primary-header-background']} , ${palette['primary-header-background-shift']},${palette['primary-header-background']})`,
		// 'primary-sidebar-gradient': `linear-gradient(to bottom, ${palette['sidebar-category-background']}, ${palette['sidebar-category-background-shift']})`,
		'panel-foreground': palette[getTextColorOnBackground(palette['panel-background'])],
		'sidebar-foreground': palette[getTextColorOnBackground(palette['sidebar-background'])],
		'agent-table-foreground': palette[getTextColorOnBackground(palette['agent-table-body'] || '#ffffff')],
		'agent-section-foreground': palette[getTextColorOnBackground(palette['agent-section-color'] || '#ffffff')],
		'body-foreground': palette[getTextColorOnBackground(palette['body-background'])],
		'member-sidebar-foreground': palette[getTextColorOnBackground(palette['member-sidebar-background'])],
		'header-foreground': palette[getTextColorOnBackground(palette['header-background'])],
		'table-head-foreground': palette[getTextColorOnBackground(palette['table-head-background'])],
		'table-subhead-background': diffColor(0.15, palette['table-head-background']),
		'table-subhead-foreground':
			palette[getTextColorOnBackground(diffColor(0.15, palette['table-head-background']))],
		'back-text-light': diffColor(0.25, palette['back']),
		'back-text-light-more': diffColor(0.25, palette['back']),
		'back-text-dark': diffColor(0.5, palette['back']),
		'lay-text-light': diffColor(0.25, palette['lay']),
		'lay-text-light-more': diffColor(0.2, palette['lay']),
		'lay-text-dark': diffColor(0.5, palette['lay']),
		'title-text': palette['text-dark'],
		'body-text': lighten(0.1, palette['text-dark']),
		
	};

	return {
		font,
		palette: _palette,
		config,
		view,
		memberType,
		image,
	};
};

const isLight = (color: string) => {
	return getLuminance(color) > 0.5;
};

const getTextColorOnBackground = (backgroundColor: string) => {
	if (isLight(backgroundColor)) {
		return 'text-dark';
	} else {
		return 'text-light';
	}
};
