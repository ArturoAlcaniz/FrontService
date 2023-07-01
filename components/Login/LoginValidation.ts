import { setErrors } from "@root/components/Commons/Validator";

export default function loginValidation(thisComponent: any) {
    
    if (!thisComponent.state.email) {
        setErrors(thisComponent, "loginError", "email_empty", "email");
        return false;
    }
    
    if (!thisComponent.state.password) {
        setErrors(thisComponent, "loginError", "pass_empty", "password");
        return false;
    }
      
    return true;
}
