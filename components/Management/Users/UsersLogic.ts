import { CreateUserManagementDto } from "@entities-lib/src/requests/createUserManagement.dto";
import { createUserRequest, obtainAllUsersRequest } from "./UsersRequest";

function handleChangeCoins(event: any) {
    event.preventDefault();
    this.setState({coinsUser: event.target.value})
}

function handleChangeRol(event: any) {
    this.setState({rol: event.target.value});
}

async function handleCreateUser(event: any) {
    event.preventDefault();
    let userDto: CreateUserManagementDto = {
        username: this.state.username,
        pass: this.state.password,
        email: this.state.email,
        rol: this.state.rol,
        coins: this.state.coinsUser,
    }
    await createUserRequest(userDto).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "createUserOk",
                    response.data.message[0]
                );
                this.setState(
                    {
                        formError: "",
                        requestOK: lista,
                        requestErrors: new Map<string, string>(),
                        coins: response.data.coins,
                    },
                    this.headerViewRef.current.setState({
                        coins: response.data.coins,
                    })
                );
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "createUserError",
                error.response.data.message[0]
            );
            this.setState({
                formError: error.response.data.formError,
                requestOK: new Map<string, string>(),
                requestErrors: lista,
            });
        }
    );
}

async function handleObtainAllUsers(thisComponent) {
    await obtainAllUsersRequest().then(
        (response) => {
            if (response.status == 200) {
                let usersArray: Array<any> = [];
                for (const user of response.data) {
                    usersArray.push(user);
                }
                thisComponent.setState({users: usersArray});
            }
        },
        (error) => {
            console.log(error);
        }
    );
}

export {
    handleChangeRol,
    handleCreateUser,
    handleObtainAllUsers,
    handleChangeCoins
};
