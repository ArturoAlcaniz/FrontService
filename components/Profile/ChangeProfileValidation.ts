import { setErrors } from "@root/components/Commons/Validator";

export default function changeProfileValidation(thisComponent: any) {
    if (!thisComponent.state.username) {
        setErrors(thisComponent, "changeProfileError", "username_empty", "username");
        return false;
    }

    if (!thisComponent.state.email) {
        setErrors(thisComponent, "changeProfileError", "email_empty", "email");
        return false;
    }

    if (
        thisComponent.state.newPassword !=
        thisComponent.state.newConfirmPassword
    ) {
        setErrors(thisComponent, "changeProfileError", "confirm_newPassowrd_not_equals", "newPassword");
        return false;
    }
    return true;
}
