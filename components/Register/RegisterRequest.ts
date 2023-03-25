import {CreateUserDto} from "@entities-lib/src/requests/createUser.dto";
import {SendCodeDto} from "@entities-lib/src/requests/sendcode.dto";
import axios, {AxiosPromise} from "axios";

function registerRequest(createUser: CreateUserDto): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/register2",
        data: {
            code: createUser.code,
        },
    });
}

function sendCodeRequest(sendCode: SendCodeDto): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/register",
        data: {
            username: sendCode.username,
            email: sendCode.email,
            pass: sendCode.pass,
        },
    });
}

export {registerRequest, sendCodeRequest};
