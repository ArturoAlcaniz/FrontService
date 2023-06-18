import { Component, createRef, RefObject } from "react";
import logo from "@assets/Logo-TISHOP.png"
import dynamic from 'next/dynamic'
import * as langEnglish from '@utils/languages/english.json';
import * as langSpanish from '@utils/languages/spanish.json';
import Image from 'next/image'
import Router from 'next/router';
import axios from "axios";
import NotificationsView from "./NotificationsView";
import ProfileNavbarView from "@components/Commons/ProfileNavbarView";
import ShoppingCartView from "./ShoppingCartView";
import LanguageSelect from "./LanguageSelect";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";

export default class HeaderLogged extends Component<any,any> {
    translations: { english: any; spanish: any; };
    notificationViewRef: RefObject<HTMLDivElement>;
    profileNavbarViewRef: RefObject<HTMLDivElement>;
    shoppingCartViewRef: RefObject<HTMLDivElement>;
    domain: string = process.env.DOMAIN;
    constructor(props: any) {
        super(props);

        this.state = {
            pathname: props.pathname,
            username: props.username || "",
            admin: props.admin || false,
            email: props.email || "",
            coins: props.coins || "",
            avatar: props.avatar || "",
            notifications: [],
            productsToBuy: props.productsToBuy || [],
            languageSelected: props.initialLanguageSelected || "english",
            styleNavbarBurger: "navbar-burger",
            styleNavbarMenu: "navbar-menu",
            showNotifications: false,
            showProfileNavbar: false,
            showLanguageOptions: false,
            showShoppingCart: false,
            redeemCodeActive: props.redeemCodeActive || false,
        }

        this.notificationViewRef = createRef();
        this.profileNavbarViewRef = createRef();

        this.translations =
        { "english": langEnglish
        , "spanish": langSpanish
        }
    }

    handleNavbarBurger() {
        if(this.state.styleNavbarBurger == "navbar-burger") {
            this.setState({ styleNavbarBurger: "navbar-burger is-active", styleNavbarMenu: "navbar-menu is-active" })
        }else{
            this.setState({ styleNavbarBurger: "navbar-burger", styleNavbarMenu: "navbar-menu" })
        }
    }

    checkIfIsActive(navName: string): boolean{
        return this.state.pathname === navName
    }

    changeCoins(coins) {
        this.setState({coins: coins})
        this.forceUpdate()
    }

    handleOpenRedeemCode() {
        this.setState({redeemCodeActive: true})
        this.props.setRedeemCodeActive();
        this.forceUpdate()
    }

    handleLogout(){
        const auth = getAuth()
        signOut(auth).then(() => {
            axios({
                method: 'get',
                url: '/api/users/logout',
                data: {},
            }).then((response) => {
                if(response.status == 200){
                    localStorage.clear()
                    document.cookie = `username="";`;
                    document.cookie = `email="";`;
                    document.cookie = `productsToBuy=${[]};`;
                    Router.push(this.obtainFullUrl(''))
                }
            }, () => {
                alert("Unexpected error")
            });
        })
    }

    handleAccountConfig(){
        Router.push(this.obtainFullUrl('profile'))
    }

    handleGoBuyCoins(){
        Router.push(this.obtainFullUrl('payments'))
    }

    obtainUserAvatar(): string{
        return this.state.avatar
    }

    obtainUserInfo(): string{
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return obtainTextTranslated["explanations"]["hello"] + ", " + this.state.username
    }

    obtainUserCoins(): string{
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return this.state.coins + " " + obtainTextTranslated["explanations"]["coins"]
    }

    showNotificationView() {
        this.setState({ showNotifications: !this.state.showNotifications })
    }

    showShoppingCartView() {
        this.setState({ showShoppingCart: !this.state.showShoppingCart })
    }

    showProfileNavbarView() {
        this.setState({ showProfileNavbar: !this.state.showProfileNavbar })
    }

    blurNotificationView(event) {
        if (!event?.relatedTarget || !this.notificationViewRef.current?.contains(event?.relatedTarget)) {
            this.setState({ showNotifications: false })
        }else{
            event?.currentTarget.focus()
        }
    }

    blurShoppingCartView(event) {
        if (!event?.relatedTarget || !this.shoppingCartViewRef.current?.contains(event?.relatedTarget)) {
            this.setState({ showShoppingCart: false })
        }else{
            event?.currentTarget.focus()
        }
    }

    blurProfileNavbarView(event) {
        if (!event?.relatedTarget || !this.profileNavbarViewRef.current?.contains(event?.relatedTarget)) {
            this.setState({ showProfileNavbar: false})
        }else{
            event?.currentTarget.focus()
        }
    }

    obtainFullUrl(endPoint: string): string {
        let url = new Array()
        url.push("https://")
        url.push(this.domain)
        url.push("/")
        url.push(endPoint)
        return url.join("")
    }

    render() {
        const { showProfileNavbar, showNotifications, showShoppingCart, styleNavbarBurger, styleNavbarMenu, productsToBuy } = this.state
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return (
            <div>
                <nav className="navbar navbar-index" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Image width={200} height={60} src={logo} alt="Logo"/>
                        <a role="button" className={styleNavbarBurger} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={()=>{this.handleNavbarBurger()}}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className={styleNavbarMenu}>
                        <div className="navbar-start">
                            <Link href={this.obtainFullUrl("buy")}>
                                <a className={this.checkIfIsActive("/buy") ? "navbar-custom is-active" : "navbar-custom"}>
                                    {obtainTextTranslated["buttons"]["buy"]}
                                </a>
                            </Link>
                            <Link href={this.obtainFullUrl("sell")}>
                                <a className={this.checkIfIsActive("/sell") ? "navbar-custom is-active" : "navbar-custom"}>
                                    {obtainTextTranslated["buttons"]["sell"]}
                                </a>
                            </Link>
                            <Link href={this.obtainFullUrl("management")}>
                                <a style={{display: this.state.admin == "true" ? 'flex' : 'none' }} className={this.checkIfIsActive("/management") ? "navbar-custom is-active" : "navbar-custom"}>
                                    {obtainTextTranslated["buttons"]["management"]}
                                </a>
                            </Link>
                        </div>
                        <div className="navbar-end">
                            {LanguageSelect(this)}
                            <div className="navbar-item">
                                <span tabIndex={-1} onBlur={this.blurNotificationView.bind(this)} onClick={() => {this.showNotificationView()}} className="customIcon">
                                    <i className={`${showNotifications ? 'fas' : 'far'} fa-bell`}></i>
                                </span>
                            </div>
                            <div className="navbar-item">
                                <span tabIndex={-1} onBlur={this.blurShoppingCartView.bind(this)} onClick={() => {this.showShoppingCartView()}} className="customIcon">
                                    <i className="fa fa-shopping-cart"></i>
                                </span>
                                <span className="badge">{productsToBuy.length}</span>
                            </div>
                            <div className="navbar-brand">
                                <div className={`profile ${showProfileNavbar ? 'profile-active' : ''}`} tabIndex={-1} onBlur={this.blurProfileNavbarView.bind(this)} onClick={() => {this.showProfileNavbarView()}}>
                                    <div className="profile-picture">
                                        <Image src={this.state.avatar ? `/api/users/avatar/${this.state.avatar}` : `/api/users/avatar`} width={60} height={60} alt="User Profile"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {
                    showNotifications && NotificationsView(this)
                }
                {
                    showShoppingCart && ShoppingCartView(this)
                }
                {
                    showProfileNavbar && ProfileNavbarView(this)
                }
            </div>
        )
    }
}
