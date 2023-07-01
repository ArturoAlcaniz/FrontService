import { setErrors } from "@root/components/Commons/Validator";

export default function loginValidation(thisComponent: any) {
    let lista: Map<string, string> = new Map<string, string>();
    
    if (!thisComponent.state.email) {
        lista.set("loginError", "email_empty");
        thisComponent.setState({ formError: "email" });
        setErrors(thisComponent, lista);
        return false;
    }
    
    if (!thisComponent.state.password) {
        lista.set("loginError", "pass_empty");
        thisComponent.setState({ formError: "password" });
        setErrors(thisComponent, lista);
        return false;
    }
      
    return true;
}
