import Router from "next/router";
import {
    createProductRequest,
    deleteProductRequest,
    modifyProductRequest,
    obtainAllProductsRequest,
    obtainMyProductRequest,
    obtainMyProductsRequest,
} from "./MarketRequest";
import {
    createProductValidation,
    modifyProductValidation,
} from "./MarketValidation";

export function uploadImageProduct(event: any) {
    if (event.target.files && event.target.files.length > 0) {
        this.setState({images: event.target.files});
    }
}

async function handleGoSellProduct(ID) {
    Router.push(`/sell/my-product?product=${ID}`, "/sell/my-product");
}

async function handleGoBuyProduct(ID) {
    Router.push(`/buy/product?product=${ID}`, "/buy/product");
}

async function handleObtainProduct(thisComponent) {
    await obtainMyProductRequest(thisComponent).then((response) => {
        if (response.status == 200) {
            let start = "";
            let end = "";

            if (
                response.data.starts != null &&
                response.data.starts.length > 0
            ) {
                start = response.data.starts.slice(
                    0,
                    response.data.starts.length - 8
                );
            }

            if (response.data.ends != null && response.data.ends.length > 0) {
                end = response.data.ends.slice(
                    0,
                    response.data.ends.length - 8
                );
            }

            thisComponent.setState({
                product: response.data,
                productname: response.data.productName,
                description: response.data.description,
                category: response.data.category,
                imagesAlreadyAdded: response.data.images,
                startsell: start,
                endsell: end,
                price: response.data.price,
                images: response.data.images
            });
        }
    });
}

async function handleObtainMyProducts(thisComponent) {
    await obtainMyProductsRequest().then(
        (response) => {
            if (response.status == 200) {
                let productsArray: Array<any> = [];
                for (let i = 0; i < response.data.length; i++) {
                    productsArray.push(response.data[i]);
                }
                thisComponent.setState({myProducts: productsArray});
            }
        },
        (error) => {
            console.log(error);
        }
    );
}

async function handleObtainAllProducts(thisComponent) {
    await obtainAllProductsRequest().then(
        (response) => {
            if (response.status == 200) {
                let productsArray: Array<any> = [];
                for (let i = 0; i < response.data.length; i++) {
                    productsArray.push(response.data[i]);
                }
                thisComponent.setState({products: productsArray});
            }
        },
        (error) => {
            console.log(error);
        }
    );
}

function handleDeleteProduct(thisComponent: any) {
    deleteProductRequest(thisComponent).then((response) => {
        if (response.status == 200) {
            Router.push("/sell/my-products");
        }
    });
}

function handleModifyProduct(event: any) {
    event.preventDefault();

    if (!modifyProductValidation(this)) {
        return;
    }

    modifyProductRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "modifyProductOk",
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
                "modifyProductError",
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

function handleCreateProduct(event: any) {
    event.preventDefault();

    if (!createProductValidation(this)) {
        return;
    }

    createProductRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "createProductOk",
                    response.data.message[0]
                );
                this.setState({
                    formError: "",
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
                setTimeout(() => {
                    Router.push("https://tishoptfg.com/sell");
                }, 1000);
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "createProductError",
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

function handleChangeProductName(event: any) {
    this.setState({productname: event.target.value});
}

function handleChangeCategory(event: any) {
    this.setState({category: event.target.value});
}

function handleChangeDescription(event: any) {
    this.setState({description: event.target.value});
}

function handleChangeStartSell(event: any) {
    this.setState({startsell: event.target.value});
}

function handleChangeEndsell(event: any) {
    this.setState({endsell: event.target.value});
}

function handleChangePrice(event: any) {
    this.setState({price: event.target.value});
}

function handleAddProduct(event: any) {
    event.preventDefault();

    if (this.state.productsToBuy.length > 0 && this.state.productsToBuy.some(product => product.id === this.state.id)) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "addProductError",
            "product_already_added"
        );
        this.setState({
            requestOK: new Map<String, String>(),
            requestErrors: lista
        })
        return;
    }

    let lista: Map<string, string> = new Map<string, string>().set(
        "addProductOk",
        "successfully_product_added"
    );
    let newProductsToBuy: {id: number, productname: string, price: number}[] = [
        ...this.state.productsToBuy,
        { id: this.state.id, productname: this.state.productname, price: this.state.price, image: this.state.images.length > 0 ? this.state.images[0].name : undefined }
    ];    
    this.setState({
        requestOK: lista,
        requestErrors: new Map<String, String>(),
        productsToBuy: newProductsToBuy
    },
    this.headerViewRef.current.setState({
        productsToBuy: newProductsToBuy,
    }))
    const productsToBuyString: string = JSON.stringify(newProductsToBuy);
    document.cookie = `productsToBuy=${productsToBuyString};`;

}

export {
    handleCreateProduct,
    handleObtainMyProducts,
    handleObtainProduct,
    handleGoBuyProduct,
    handleGoSellProduct,
    handleModifyProduct,
    handleDeleteProduct,
    handleObtainAllProducts,
    handleChangeProductName,
    handleChangeCategory,
    handleChangeDescription,
    handleChangeStartSell,
    handleChangeEndsell,
    handleChangePrice,
    handleAddProduct,
};
