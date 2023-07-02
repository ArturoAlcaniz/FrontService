import Router from "next/router";

function handleGoCodesManage() {
    Router.push("management/codes");
}

function handleGoUsersManage() {
    Router.push("management/users");
}

function handleChangeCoins(event: any) {
    this.setState({coinsProduct: event.target.value});
}

function handleChangeId(event: any) {
    this.setState({id: event.target.value});
}

function handleChangeStartCode(event: any) {
    this.setState({starts: event.target.value});
}

function handleChangeEndCode(event: any) {
    this.setState({ends: event.target.value});
}

function handleChangeAmount(event: any) {
    this.setState({amount: event.target.value});
}

export {
    handleGoCodesManage,
    handleChangeCoins,
    handleChangeId,
    handleChangeStartCode,
    handleChangeEndCode,
    handleChangeAmount,
    handleGoUsersManage,
};
