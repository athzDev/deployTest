
import React from 'react';
import { withAppContext } from '../../store/initAppContext';

export interface IGlobal {
    document: Document;
    window: Window;
}

type TI18n = (key: string) => string;

interface IState {
    isShowKey: boolean;
}

interface ISimple {
    langKey: string;
    app: {
        i18n: TI18n;
        showkey: string;
    };
    children?: (text: string) => React.ReactNode;
}
interface II18n {
    app: {
        i18n: TI18n;
        showkey: string;
    };
    children: (i18n: TI18n) => React.ReactNode;
}

class Intl extends React.PureComponent<ISimple, IState> {
    constructor(props: any) {
        super(props);
        this.state = { isShowKey: false };
    }

    showkeyTimer: any;
    handleHover = (isHoverIn: boolean): any => (): void => {
        if (this.showkeyTimer) {
            clearTimeout(this.showkeyTimer);
        }
        if (isHoverIn) {
            this.setState({ isShowKey: true });
        } else {
            this.showkeyTimer = setTimeout(() => {
                this.setState({ isShowKey: false });
            }, 2000);
        }
    };
    handleClick = (): void => {
        let keyElement: any = document.getElementById('showKey');
        if (!keyElement) {
            const div: any = document.createElement('div');
            div.id = 'showKey';
            document.body.appendChild(div);
            keyElement = document.getElementById('showKey');
            keyElement.style.cssText = `position: fixed; border: 2px solid pink; left: 0px; top: 0px; z-index:9999; height: 60px;
            background: darkblue; color: white; padding: 5px; border-radius: 10px;`;
        }
        keyElement.innerHTML = `<div>selected lang key: </div><div>${this.props.langKey}</div>`;
    };

    render(): React.ReactNode {
        const { langKey, children, app } = this.props;
        let { i18n, showkey } = app;
        const { isShowKey } = this.state;
        //TODO: MS - have to remove
        if(typeof i18n !='function'){
            i18n = (prop) => String(prop)
        }


        if (children) {
            return combineMessageWithChildren(getMessage(showkey, langKey, i18n), children);
        } else {
            // langKey is string
            let content;
            switch (showkey) {
                case '1':
                    content = `<${langKey}>${i18n(langKey)}`;
                    break;
                case '2':
                    content = (
                        <span
                            onMouseEnter={this.handleHover(true)}
                            onMouseLeave={this.handleHover(false)}
                            onClick={this.handleClick}
                            style={{ cursor: 'pointer' }}
                        >
                            {isShowKey ? langKey : i18n(langKey)}
                        </span>
                    );
                    break;
                default:
                    content = i18n(langKey);
                    if (!content) {
                        console.warn(`[Intl]: cannot find message from key ${langKey}!`);
                        content = `${langKey}`;
                    }
                    break;
            }
            return content;
        }
    }
}
const I18n = withAppContext((props: II18n) => {
    const newi18n = (key: string) => {
        return getMessage(props.app.showkey, key, props.app.i18n);
    };
    return props.children(newi18n);
});

const combineMessageWithChildren = (message: string | string[] | TI18n, children: any) =>
    children instanceof Function ? children(message) : [message, children];

const getMessage = (showKey: string, langKey: string, i18n: TI18n) => {
    return showKey ? `<${langKey}>${i18n(langKey)}` : i18n(langKey);
};

const IntlComponent = withAppContext(Intl);
IntlComponent.i18n = I18n;
export default IntlComponent;
