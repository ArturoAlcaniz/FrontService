import { CreateUserManagementDto } from "@entities-lib/src/requests/createUserManagement.dto";
import axios, {AxiosPromise} from "axios";

export function obtainAllUsersRequest(): AxiosPromise<any> {
    return axios({
        method: "get",
        url: "/api/users/obtainAllUsers",
        data: [],
    });
}

export function createUserRequest(userDto: CreateUserManagementDto): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/createUser",
        data: {
            username: userDto.username,
            email: userDto.email,
            pass: userDto.pass,
            rol: userDto.rol,
            coins: userDto.coins
        }
    })
}

export function obtainUserRequest(username: string): AxiosPromise<any> {
    return axios({
        method: "get",
        url: `/api/users/obtain/${username}`,
        data: [],
    })
}

export function deleteUserRequest(id): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/deleteUser",
        data: {
            id: id
        }
    })
}