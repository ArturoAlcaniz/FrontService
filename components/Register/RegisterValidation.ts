import { setErrors } from "../Commons/Validator";

export default function registerValidation(thisComponent: any) {
    if (!thisComponent.state.username) {
        setErrors(thisComponent, "registerError", "username_empty", "username");
        return false;
    }
    if (!thisComponent.state.email) {
        setErrors(thisComponent, "registerError", "email_empty", "email");
        return false;
    }
    if (!thisComponent.state.password) {
        setErrors(thisComponent, "registerError", "pass_empty", "password");
        return false;
    }
    if (thisComponent.state.password != thisComponent.state.confirmPassword) {
        setErrors(thisComponent, "registerError", "confirm_password_not_equals", "cPassword");
        thisComponent.setState({password: "", confirmPassword: ""});
        return false;
    }
    return true;
}
