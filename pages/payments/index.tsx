import React from 'react'
import { handleBuyCoins, handleChangeCoinsToBuy } from '@components/Payments/PaymentsLogic';
import CustomErrorMessage from '@utils/CustomErrorMessage';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';

export default class PaymentsPage extends CustomBasicPageLogged{
    headerLogged: any;

    constructor(props: any) {
        super(props);
        this.headerLogged = React.createRef()

        this.state = {
            ...this.state,
            componentName: "Buy coins | TI-Shop",
            formError: "",
            coinsToBuy: ""
        }
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('paymentsError')]
        let thisComponent = this
        const { coinsToBuy, formError } = this.state

        return (
            <div>
                {super.render()}
                <div className="pageCentered">
                    <form>
                        <div className="card buyCoinsForm">
                            <div className="card-content">
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["coins"]}
                                    </label>
                                    <div className="control has-icons-right">
                                        <input className="input" autoComplete='off' type="text" value={coinsToBuy} onChange={handleChangeCoinsToBuy.bind(this)}></input>
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-dollar-sign"></i>    
                                        </span>
                                    </div>
                                    { formError=='coins' && CustomErrorMessage(msgError) }
                                </div>
                        
                                <PayPalScriptProvider
                                    options={{
                                        "clientId": "ATybTlAE7_-nAfMs1l_KmQ9xpKakPpQHp0e3Cf4quc4nqNa3UMt0O6EmBdDVZPV-3rbaEFAPz-8sEYas"
                                    }}
                                >
                                    <PayPalButtons
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: this.state.coinsToBuy,
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={(_, actions) => {
                                            return actions.order.capture().then(async (details) => {
                                                const id = details.id
                                                alert(await handleBuyCoins(id, thisComponent))
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}