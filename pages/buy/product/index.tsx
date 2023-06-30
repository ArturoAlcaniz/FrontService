import React from 'react'
import CustomErrorMessage from '@root/utils/CustomErrorMessage';
import { handleObtainProduct, handleAddProduct } from '@root/components/Market/MarketLogic';
import Link from 'next/link';
import Image from 'next/image'
import shortid from 'shortid';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';
import { Category } from '@entities-lib/src/entities/categoryProduct.enum';
import CustomOkMessage from '../../../utils/CustomOkMessage';

export default class BuyProductPage extends CustomBasicPageLogged{

    static async getInitialProps(ctx: any) {
        const baseProps = await super.getInitialProps(ctx);
        return {
            ...baseProps,
            idProduct: ctx.query.product,
        }
    }


    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            formError: "",
            componentName: "Buy Product | TI-Shop",
            id: props.idProduct,
            productname: "",
            startsell: "",
            endsell: "",
            category: "",
            description: "",
            price: 0.0,
            images: [],
            product: null,
            productCategories: Object.values(Category).map((c: string) => c),
        }
        handleObtainProduct(this);
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { formError, productname, category, description, price, startsell, endsell } = this.state
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('addProductError')]
        let msgOk = obtainTextTranslated["requestOK"][this.state.requestOK.get('addProductOk')]
        let fields = `createProducts  ${this.state.product==null ? 'hidden' : ''}`

        return (
            <div>
                {super.render()}
                <div className='buttonCentered'>
                    <Link href="/sell" passHref>
                        <button className="button is-primary">{obtainTextTranslated["buttons"]["my_products"]}</button>
                    </Link>
                </div>
                
                <div className={fields}>
                    <form onSubmit={handleAddProduct.bind(this)}>
                        <div className="card createProductForm">
                            <div className="card-content">
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["product_name"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={productname} type="text" autoComplete="off" disabled></input>
                                    </div>
                                    { formError=='name' && CustomErrorMessage(msgError) }
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["productimage"]}
                                    </label>
                                    <div className="media-scroller snaps-inline">
                                        { this.state.images && this.state.images.size > 0 && this.state.images.map(image => {
                                            return (
                                                <div key={image.id} className="media-element">
                                                    <Image src={`/api/products/image/${image.name}`} max-width={300} max-heigh={200} width={300} height={200} alt="Product Image"/>
                                                </div>
                                            )
                                        })

                                        }
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["product_category"]}
                                    </label>
                                    <div className="control">
                                        <select className="select" autoComplete="off" disabled>
                                        {this.state.productCategories && this.state.productCategories.length>0 && this.state.productCategories.map(c => {
                                            return (
                                                <option selected={c === category} key={shortid.generate()} value={c}>{c}</option>
                                                );
                                            })
                                        }
                                        </select>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["product_description"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={description} type="text" autoComplete="off" disabled></input>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["product_price"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={price} type="number" autoComplete="off" disabled></input>
                                    </div>
                                </div>
                                { CustomOkMessage(msgOk) }
                                { CustomErrorMessage(msgError) }
                                <div className="field">
                                    <p className="control">
                                        <button className="button">
                                            {obtainTextTranslated["buttons"]["add_shoppingCart"]}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}