import { Component } from 'react'
import cookies from "next-cookies";
import * as langEnglish from '@utils/languages/english.json';
import * as langSpanish from '@utils/languages/spanish.json';
import Head from 'next/head';
import { setCookie } from '@root/utils/CookieHandler';

export default class CustomBasicPage extends Component<any, any>{

    static async getInitialProps(ctx: any): Promise<any> {
        return {
            pathname: ctx.pathname,
            initialLanguageSelected: cookies(ctx).languageSelected || 'english',
            username: cookies(ctx).username,
            admin: cookies(ctx).admin,
            email: cookies(ctx).email,
            coins: cookies(ctx).coins,
            avatar: cookies(ctx).avatar,
        }
    }
    translations: { english: any; spanish: any; }; // NOSONAR
    constructor(props: any) {
        super(props);

        this.state = {
            languageSelected: props.initialLanguageSelected || "english",
            componentName: "TI-Shop",
            requestErrors: new Map<string, string>(),
            requestOK: new Map<string, string>()
        }

        this.translations = // NOSONAR
        { "english": langEnglish
        , "spanish": langSpanish
        }

        this.setLanguageSelected = this.setLanguageSelected.bind(this)
    }

    setLanguageSelected(languageSelected: string) {
        this.setState({ languageSelected: languageSelected })
        setCookie('languageSelected', languageSelected);
    }

    render(){

        return (
            <div>
                <Head>
                    <title>{this.state.componentName}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
            </div>
        )
    }
}