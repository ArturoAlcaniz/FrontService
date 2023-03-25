import {LoginDto} from "@entities-lib/src/requests/login.dto";
import {LoginGoogleDto} from "@entities-lib/src/requests/loginGoogle.dto";
import {SendCodeLoginDto} from "@entities-lib/src/requests/sendCodeLogin.dto";
import axios, {AxiosPromise} from "axios";

function obtainAvatar(): AxiosPromise<any> {
    return axios({
        method: "get",
        url: "/api/users/avatar",
        data: {},
        responseType: "blob",
    });
}

function sendCodeRequest(
    sendCodeLoginDto: SendCodeLoginDto
): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/login2",
        data: {
            code: sendCodeLoginDto.code,
        },
    });
}

function loginGoogleRequest(loginGoogleDto: LoginGoogleDto): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/loginGoogle",
        data: {
            token: loginGoogleDto.token,
        },
    });
}

function loginRequest(loginDto: LoginDto): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/login",
        data: {
            email: loginDto.email,
            pass: loginDto.pass,
        },
    });
}

export {loginGoogleRequest, loginRequest, sendCodeRequest, obtainAvatar};
