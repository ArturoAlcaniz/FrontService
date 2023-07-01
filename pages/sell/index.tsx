import React from 'react'
import { handleGoSellProduct, handleObtainMyProducts } from '@root/components/Market/MarketLogic';
import Image from 'next/image'
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';
import Link from 'next/link';
import CenteredButton from '@root/components/Commons/CenteredButton';

export default class MyProductsPage extends CustomBasicPageLogged{

    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            formError: "",
            componentName: "My Products | TI-Shop",
            myProducts: []
        }

        handleObtainMyProducts(this).catch(e => console.log("Failed to get products", e));
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]
        
        return (
            <div>
                {super.render()}
                {CenteredButton("/sell/create", obtainTextTranslated["buttons"]["add_product"])}

                <div className="pageCentered">
                    <ul className="ListProducts">
                        {this.state.myProducts && this.state.myProducts.length>0 && this.state.myProducts.map(product => {
                            return (
                                <li key={product.id}>
                                    <div className="box clickable" onClick={() => handleGoSellProduct(product.id)}>
                                        <div className="content">
                                            <>
                                                <Image 
                                                    src={product.images[0] ? `/api/products/image/${product.images[0].name}` : `/api/products/image`} 
                                                    alt="Product Image"
                                                    width={300}
                                                    height={200}
                                                    style={{ width: '300px', height: '200px' }} 
                                                />
                                            </>
                                            <p>
                                                <strong>{product.productName}</strong><br></br>
                                                <div className="productPrice">
                                                    {product.price}
                                                </div>
                                                <div className="productCoin">
                                                    {' Coins'}
                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}