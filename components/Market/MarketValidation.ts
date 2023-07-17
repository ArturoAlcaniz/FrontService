import { setErrors } from "@root/components/Commons/Validator";

export function modifyProductValidation(thisComponent: any) {
    if (!thisComponent.state.id) {
        setErrors(thisComponent, "modifyProductError", "product_notexist", "product");
        return false;
    }

    return validationProduct(thisComponent, "modifyProductError");
}

export function createProductValidation(thisComponent: any) {
    return validationProduct(thisComponent, "createProductError");
}

function validationProduct(thisComponent: any, formError: string) {
    if (!thisComponent.state.productname) {
        setErrors(thisComponent, formError, "productname_empty", "name");
        return false;
    }

    if (!thisComponent.state.category) {
        setErrors(thisComponent, formError, "productcategory_empty", "category");
        return false;
    }

    if (!thisComponent.state.description) {
        setErrors(thisComponent, formError, "productdescription_empty", "description");
        return false;
    }

    if (!thisComponent.state.price) {
        setErrors(thisComponent, formError, "productprice_empty", "price");
        return false;
    }
    return true;
}