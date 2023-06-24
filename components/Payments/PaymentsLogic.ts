import {buyCoinsRequest} from "./PaymentsRequest";
import { setCookie } from "@root/utils/CookieHandler";

async function handleBuyCoins(id: string, thisComponent: any): Promise<string> {
    let languageSelected = thisComponent.state.languageSelected;
    let obtainTextTranslated = thisComponent.translations[languageSelected];

    var msgResult = "";

    await buyCoinsRequest(id).then(
        (response) => {
            if (response.status == 200) {
                setCookie('coins', response.data.coins);
                thisComponent.headerLogged.current.changeCoins(
                    response.data.coins
                );
                msgResult =
                    obtainTextTranslated["requestOK"][response.data.message[0]];
            }
        },
        () => {
            msgResult = "Error buying coins";
        }
    );

    return msgResult;
}

function handleChangeCoinsToBuy(event: any) {
    this.setState({coinsToBuy: event.target.value});
}

export {handleBuyCoins, handleChangeCoinsToBuy};
