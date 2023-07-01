import Router from "next/router";
import {
    createCodeRequest,
    deleteCodeRequest,
    obtainAllCodesRequest,
    redeemCodeRequest,
    obtainCodeRequest,
    modifyCodeRequest,
} from "./CodesRequest";

function handleGoCreateCodes() {
    Router.push("codes/create");
}

function handleCreateCode(event: any) {
    event.preventDefault();

    createCodeRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "createCodeOk",
                    response.data.message[0]
                );
                this.setState({
                    formError: "",
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "createCodeError",
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

function handleModifyCode(event: any) {
    event.preventDefault();

    modifyCodeRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "modifyCodeOk",
                    response.data.message[0]
                );
                this.setState({
                    formError: "",
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "modifyCodeError",
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

async function handleDeleteCode(id, thisComponent) {
    await deleteCodeRequest(id).then(
        (response) => {
            if(response.status == 200) {
                let codesActual: Array<any> = thisComponent.state.codes
                let codesArray: Array<any> = codesActual.filter((code) => code.id != id)
                thisComponent.setState({codes: codesArray})
            }
        },
        (error) => {
            console.log(error);
        }
    )
}

async function handleObtainAllCodes(thisComponent) {
    await obtainAllCodesRequest().then(
        (response) => {
            if (response.status == 200) {
                let codesArray: Array<any> = [];
                for (const code of response.data) {
                    codesArray.push(code);
                }
                thisComponent.setState({codes: codesArray});
            }
        },
        (error) => {
            console.log(error);
        }
    );
}

async function handleObtainCode(thisComponent) {
    await obtainCodeRequest(thisComponent).then(
        (response) => {
            if (response.status == 200) {
                thisComponent.setState({
                    starts: response.data.starts,
                    ends: response.data.ends,
                    amount: response.data.amount,
                    coinsProduct: response.data.coins,
                })
            }
        },
        (error) => {
            console.log(error);
        }
    )
}

function handleChangeCode(event: any) {
    this.setState({codeRedeem: event.target.value});
}

function handleRedeemCode(event: any) {
    redeemCodeRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "redeemCodeOk",
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
                "redeemCodeError",
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

async function handleGoModifyCode(ID) {
    Router.push(`/management/codes/modify?code=${ID}`, "/management/codes/modify");
}

export {
    handleGoCreateCodes,
    handleCreateCode,
    handleObtainAllCodes,
    handleChangeCode,
    handleRedeemCode,
    handleDeleteCode,
    handleObtainCode,
    handleGoModifyCode,
    handleModifyCode,
};
