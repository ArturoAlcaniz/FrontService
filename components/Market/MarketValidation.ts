import { setErrors } from "@root/components/Commons/Validator";

export function modifyProductValidation(thisComponent: any) {
    let lista: Map<string, string> = new Map<string, string>();
    if (!thisComponent.state.id) {
        lista.set("modifyProductError", "product_notexist");
        thisComponent.setState({ formError: "product" });
        setErrors(thisComponent, lista);
        return false;
    }

    if (!thisComponent.state.productname) {
        lista.set("modifyProductError", "productname_empty");
        thisComponent.setState({ formError: "name" });
        setErrors(thisComponent, lista);
        return false;
    }

    if (!thisComponent.state.category) {
        lista.set("modifyProductError", "productcategory_empty");
        thisComponent.setState({ formError: "category" });
        setErrors(thisComponent, lista);
        return false;
    }

    if (!thisComponent.state.description) {
        lista.set("modifyProductError", "productdescription_empty");
        thisComponent.setState({ formError: "description" });
        setErrors(thisComponent, lista);
        return false;
    }

    if (!thisComponent.state.price) {
        lista.set("modifyProductError", "productprice_empty");
        thisComponent.setState({ formError: "price" });
        setErrors(thisComponent, lista);
        return false;
    }
    return true
}

export function createProductValidation(thisComponent: any) {
    let lista: Map<string, string> = new Map<string, string>();
    if (!thisComponent.state.productname) {
        lista.set("createProductError", "productname_empty");
        thisComponent.setState({ formError: "name" });
        setErrors(thisComponent, lista);
        return false;
    }

    if (!thisComponent.state.category) {
        lista.set("createProductError", "productcategory_empty");
        thisComponent.setState({ formError: "category" });
        setErrors(thisComponent, lista);
        return false;
    }

    if (!thisComponent.state.description) {
        lista.set("createProductError", "productdescription_empty");
        thisComponent.setState({ formError: "description" });
        setErrors(thisComponent, lista);
        return false;
    }

    if (!thisComponent.state.price) {
        lista.set("createProductError", "productprice_empty");
        thisComponent.setState({ formError: "price" });
        setErrors(thisComponent, lista);
        return false;
    }
    return true;
}
