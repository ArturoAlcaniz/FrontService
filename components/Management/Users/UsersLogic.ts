function showPass(event: any) {
    event.preventDefault();
    this.setState({showPassword: !this.state.showPassword});
}

function showCPass(event: any) {
    event.preventDefault();
    this.setState({showCPassword: !this.state.showCPassword});
}

function handleChangeUsername(event: any) {
    this.setState({username: event.target.value});
}

function handleChangeEmail(event: any) {
    this.setState({email: event.target.value});
}

function handleChangePassword(event: any) {
    this.setState({password: event.target.value});
}

function handleChangeConfirmPassword(event: any) {
    this.setState({confirmPassword: event.target.value});
}

function handleChangeRol(event: any) {
    this.setState({rol: event.target.value});
}

function handleCreateUser(event: any) {
    event.preventDefault();
    //TODO: Create user from management
}

export {
    showCPass,
    showPass,
    handleChangeUsername,
    handleChangeEmail,
    handleChangePassword,
    handleChangeConfirmPassword,
    handleChangeRol,
    handleCreateUser,
};
