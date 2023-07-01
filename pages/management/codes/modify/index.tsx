import React from 'react';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';
import { handleChangeCoins, handleChangeId, handleChangeStartCode, handleChangeEndCode, handleChangeAmount } from '@root/components/Management/ManagementLogic';
import { handleCreateCode, handleObtainCode } from '@root/components/Management/Codes/CodesLogic';
import CustomErrorMessage from '@root/utils/CustomErrorMessage';

export default class ModifyCodePage extends CustomBasicPageLogged{

    static async getInitialProps(ctx: any) {
        const baseProps = await super.getInitialProps(ctx);
        return {
            ...baseProps,
            idCode: ctx.query.code,
        }
    }

    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            componentName: "Modify Code | TI-Shop",
            id: props.id || "",
            starts: "",
            ends: "",
            amount: 0,
            coins: "0.0",
        }
        handleObtainCode(this);
    }

    handleGoManageCodes() {

    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]
        const { coins, starts, ends, id, amount, formError } = this.state
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('modifyCodeError')]

        return (
            <>
                {super.render()}
                <div className="pageCentered">
                    <form onSubmit={handleCreateCode.bind(this)}>
                        <div className="card createProductForm">
                            <div className="card-content">

                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["code_name"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={id} onChange={handleChangeId.bind(this)} type="text" autoComplete="off"></input>
                                    </div>
                                    { formError=='id' && CustomErrorMessage(msgError) }
                                </div>

                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["coins"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={coins} onChange={handleChangeCoins.bind(this)} type="number" autoComplete="off"></input>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["start_code"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={starts} onChange={handleChangeStartCode.bind(this)} type="datetime-local" autoComplete="off"></input>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["end_code"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={ends} onChange={handleChangeEndCode.bind(this)} type="datetime-local" autoComplete="off"></input>
                                    </div>
                                    { formError=='ends' && CustomErrorMessage(msgError) }
                                </div>

                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["amount"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={amount} onChange={handleChangeAmount.bind(this)} type="number" min={0} autoComplete="off"></input>
                                    </div>
                                </div>
                                <p className="help form-feedback-ok">
                                    {obtainTextTranslated["requestOK"][this.state.requestOK.get('createCodeOk')]}
                                </p>
                                <div className="field">
                                    { formError=='access' && CustomErrorMessage(msgError) }
                                    <p className="control">
                                        <button className="button">
                                            {obtainTextTranslated["buttons"]["create_code"]}
                                        </button>
                                    </p>
                                </div>
                            </div>  
                        </div>
                    </form>
                </div>
            </>
        )
    }
}