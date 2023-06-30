import Image from 'next/image'
import { setCookie } from '@root/utils/CookieHandler';
import HeaderLogged from './HeaderLogged';

export default function ShoppingCartView(thisComponent: HeaderLogged) {
    let languageSelected = thisComponent.state.languageSelected
    let obtainTextTranslated = thisComponent.translations[languageSelected]

    const totalPrice: number = thisComponent.state.productsToBuy.reduce((acc: number, item: {price: string}) => {
        const itemPrice = parseFloat(item.price);
        return acc + itemPrice;
    }, 0);

    const deleteProductToBuy = (product: any) => {
        let newProductsToBuy =  thisComponent.state.productsToBuy.filter(p => p.id !== product.id)
        thisComponent.setState({
            productsToBuy: newProductsToBuy
        })
        thisComponent.props.setProductsToBuy(newProductsToBuy)
        const productsToBuyString: string = JSON.stringify(newProductsToBuy);
        setCookie('productsToBuy', productsToBuyString);
    }

    return(
        <div tabIndex={0} ref={thisComponent.notificationViewRef} id="shoppingCartView" className="box customBox shopping-cart">
            <div className="shoppingCartTitleContainer">
                <div className="shoppingCartTitle">{obtainTextTranslated["titles"]["cesta"]}</div>
            </div>
            <ul className="shopping-cart-items">
                {thisComponent.state.productsToBuy && thisComponent.state.productsToBuy.length>0 && thisComponent.state.productsToBuy.map(product => {
                    return (
                        <>
                            <li key={product.id} className="clearfix">
                                <Image width={70} height={70} src={product.image ? `/api/products/image/${product.image}` : `/api/products/image`} alt="Product Image"/>
                                <span className="item-name">{product.productname}</span>
                                <span className="item-price">{product.price}</span>
                                <i onClick={() => {deleteProductToBuy(product)}} className="item-trash gg-trash"></i>
                            </li>
                            <hr />
                        </>
                    )
                })}
            </ul>
            <div className="shopping-cart-footer">
                <div className="shopping-cart-total">
                    <span className="lighter-text">Total: </span>
                    <span className="main-color-text">{Number(totalPrice)}</span>
                </div>
            </div>
        </div>
    )
}