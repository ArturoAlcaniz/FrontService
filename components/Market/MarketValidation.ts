import { setErrors } from "@root/components/Commons/Validator";

export function modifyProductValidation(thisComponent: any) {
    let lista: Map<string, string> = new Map<string, string>();
    if (!thisComponent.state.id) {
        setErrors(thisComponent, "modifyProductError", "product_notexist", "product");
        return false;
    }

    if (!thisComponent.state.productname) {
        setErrors(thisComponent, "modifyProductError", "productname_empty", "name");
        return false;
    }

    if (!thisComponent.state.category) {
        setErrors(thisComponent, "modifyProductError", "productcategory_empty", "category");
        return false;
    }

    if (!thisComponent.state.description) {
        setErrors(thisComponent, "modifyProductError", "productdescription_empty", "description");
        return false;
    }

    if (!thisComponent.state.price) {
        setErrors(thisComponent, "modifyProductError", "productprice_empty", "price");
        return false;
    }
    return true
}

export function createProductValidation(thisComponent: any) {
    if (!thisComponent.state.productname) {
        setErrors(thisComponent, "createProductError", "productname_empty", "name");
        return false;
    }

    if (!thisComponent.state.category) {
        setErrors(thisComponent, "createProductError", "productcategory_empty", "category");
        return false;
    }

    if (!thisComponent.state.description) {
        setErrors(thisComponent, "createProductError", "productdescription_empty", "description");
        return false;
    }

    if (!thisComponent.state.price) {
        setErrors(thisComponent, "createProductError", "productprice_empty", "price");
        return false;
    }
    return true;
}
