import axios, {AxiosPromise} from "axios";

export function obtainAllUsersRequest(): AxiosPromise<any> {
    return axios({
        method: "get",
        url: "/api/users/obtainAllUsers",
        data: [],
    });
}
