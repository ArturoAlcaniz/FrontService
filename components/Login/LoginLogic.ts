import Router from "next/router";
import {
    loginGoogleRequest,
    loginRequest,
    sendCodeRequest,
} from "./LoginRequest";
import loginValidation from "./LoginValidation";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {firebaseApp} from "@root/firebase-config";
import { LoginGoogleDto } from "@root/../entities-lib/src/requests/loginGoogle.dto";
import { LoginDto } from "@root/../entities-lib/src/requests/login.dto";
import { SendCodeLoginDto } from "@root/../entities-lib/src/requests/sendCodeLogin.dto";

function handleButtonLoginGoogle() {
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account",
    });

    signInWithPopup(firebaseAuth, provider).then((response: any) => {
        handleLoginToBack(this, response._tokenResponse.oauthIdToken);
    });
}

function handleLoginToBack(thisComponent, idToken: string) {
    let loginGoogleDto: LoginGoogleDto = {token: idToken}
    loginGoogleRequest(loginGoogleDto).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "loginOk",
                    response.data.message[0]
                );
                thisComponent.setState({
                    formError: "",
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
                document.cookie = `username=${response.data.userName};`;
                document.cookie = `email=${response.data.email};`;
                document.cookie = `coins=${response.data.coins};`;
                document.cookie = `avatar=${response.data.avatar};`;
                document.cookie = `rol=${response.data.rol};`;
                document.cookie = `admin=${response.data.rol === "ADMIN"}`;
                setTimeout(() => {
                    Router.push("buy");
                }, 1000);
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "loginError",
                error.response.data.message[0]
            );
            thisComponent.setState({
                formError: "",
                requestErrors: lista,
                requestOK: new Map<string, string>(),
            });
        }
    );
}

function showPass(event: any) {
    event.preventDefault();
    this.setState({showPassword: !this.state.showPassword});
}

function handleLogin2(event: any) {
    event.preventDefault();

    let sendCodeLoginDto: SendCodeLoginDto = {code: this.state.code}
    sendCodeRequest(sendCodeLoginDto).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "loginOk",
                    response.data.message[0]
                );
                this.setState({
                    formError: "",
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
                document.cookie = `username=${response.data.userName};`;
                document.cookie = `email=${response.data.email};`;
                document.cookie = `coins=${response.data.coins};`;
                document.cookie = `avatar=${response.data.avatar};`;
                document.cookie = `rol=${response.data.rol};`;
                document.cookie = `admin=${response.data.rol === "ADMIN"}`;
                setTimeout(() => {
                    Router.push("buy");
                }, 1000);
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "loginError",
                error.response.data.message[0]
            );
            this.setState({
                formError: error.response.data.formError,
                requestErrors: lista,
                requestOK: new Map<string, string>(),
            });
        }
    );
}

function handleChangePassword(event: any) {
    this.setState({password: event.target.value});
}

function handleChangeEmail(event: any) {
    this.setState({email: event.target.value});
}

function handleChangeCode(event: any) {
    this.setState({code: event.target.value});
}

function handleLogin(event: any) {
    event.preventDefault();

    if (!loginValidation(this)) {
        return;
    }

    let loginDto: LoginDto = {email: this.state.pass, pass: this.state.password}
    loginRequest(loginDto).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "loginOk",
                    response.data.message[0]
                );
                this.setState({
                    step: "2",
                    formError: "",
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "loginError",
                error.response.data.message[0]
            );
            let secondsBanned = "";
            if (error.response.data.bannedDuring) {
                secondsBanned = error.response.data.bannedDuring;
            }
            this.setState({
                formError: error.response.data.formError,
                requestErrors: lista,
                bannedSeconds: secondsBanned,
                requestOK: new Map<string, string>(),
            });
            bannedCountdown(this);
        }
    );
}

function bannedCountdown(thisComponent) {
    if (thisComponent.bannedInterval) {
        clearInterval(thisComponent.bannedInterval);
    }
    thisComponent.bannedInterval = setInterval(function () {
        let actualValue = parseInt(thisComponent.state.bannedSeconds);
        let newValue = 0;

        if (actualValue > 0) newValue = actualValue - 1;

        thisComponent.setState({bannedSeconds: newValue.toString()});

        if (newValue === 0) {
            clearInterval(thisComponent.bannedInterval);
        }
    }, 1000);
}

export {
    handleLogin,
    handleButtonLoginGoogle,
    showPass,
    handleLogin2,
    handleChangePassword,
    handleChangeEmail,
    handleChangeCode,
};
