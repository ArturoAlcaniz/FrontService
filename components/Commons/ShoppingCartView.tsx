export default function ShoppingCartView(thisComponent) {
    let languageSelected = thisComponent.state.languageSelected
    let obtainTextTranslated = thisComponent.translations[languageSelected]

    const totalPrice: number = thisComponent.state.productsToBuy.reduce((acc: number, item: {price: string}) => {
        const itemPrice = parseFloat(item.price);
        return acc + itemPrice;
    }, 0);

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
        </div>
    )
}