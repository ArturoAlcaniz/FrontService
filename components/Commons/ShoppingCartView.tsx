export default function ShoppingCartView(thisComponent) {
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
        const productsToBuyString: string = JSON.stringify(newProductsToBuy);
        document.cookie = `productsToBuy=${productsToBuyString};`;
    }

    return(
        <div tabIndex={0} ref={thisComponent.notificationViewRef} id="shoppingCartView" className="box customBox">
            <div className="shoppingCartTitleContainer">
                <div className="shoppingCartTitle">{obtainTextTranslated["titles"]["cesta"]}</div>
                <div className="shopping-cart" style={{display: 'block'}}>
                    <div className="shopping-cart-header">
                        <div className="shopping-cart-total">
                            <span className="lighter-text">Total: </span>
                            <span className="main-color-text">{Number(totalPrice)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="shopping-cart-items">
                {thisComponent.state.productsToBuy && thisComponent.state.productsToBuy.length>0 && thisComponent.state.productsToBuy.map(product => {
                    return (
                        <li key={product.id} className="cleafix">
                            <img src={`/api/products/image/${product.image}`}></img>
                            <span className="item-name">{product.productname}</span>
                            <span className="item-price">{product.price}</span>
                            <i onClick={() => {deleteProductToBuy(product)}} className="gg-trash"></i>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}