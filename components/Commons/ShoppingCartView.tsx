export default function ShoppingCartView(thisComponent) {
    let languageSelected = thisComponent.state.languageSelected
    let obtainTextTranslated = thisComponent.translations[languageSelected]

    return(
        <div tabIndex={0} ref={thisComponent.notificationViewRef} id="shoppingCartView" className="box customBox">
            <div className="shoppingCartTitleContainer">
                <div className="shoppingCartTitle">{obtainTextTranslated["titles"]["cesta"]}</div>
            </div>
        </div>
    )
}