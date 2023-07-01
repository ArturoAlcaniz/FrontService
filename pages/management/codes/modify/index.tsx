import React from 'react';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';
import { handleChangeCoins, handleChangeStartCode, handleChangeEndCode, handleChangeAmount } from '@root/components/Management/ManagementLogic';
import { handleModifyCode, handleObtainCode } from '@root/components/Management/Codes/CodesLogic';
import CustomErrorMessage from '@root/utils/CustomErrorMessage';
import Link from 'next/link';

export default class ModifyCodePage extends CustomBasicPageLogged{

    static async getInitialProps(ctx: any) {
        const baseProps = await super.getInitialProps(ctx);
        return {
            ...baseProps,
            code: ctx.query.code,
        }
    }

    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            componentName: "Modify Code | TI-Shop",
            id: props.code || "",
            starts: "",
            ends: "",
            amount: 0,
            coinsProduct: "0.0",
        }
        handleObtainCode(this);
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]
        const { coinsProduct, starts, ends, id, amount, formError } = this.state
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('modifyCodeError')]

        return (
            <>
                {super.render()}
                <div className='buttonCentered'>
                    <Link href="/management/codes" passHref>
                        <button className="button is-primary">{obtainTextTranslated["buttons"]["manage_codes"]}</button>
                    </Link>
                </div>
                <div className="pageCentered">
                    <form onSubmit={handleModifyCode.bind(this)}>
                        <div className="card createProductForm">
                            <div className="card-content">

                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["code_name"]}
                                    </label>
                                    <div className="control">
                                        <input disabled className="input" value={id} type="text" autoComplete="off"></input>
                                    </div>
                                    { formError=='id' && CustomErrorMessage(msgError) }
                                </div>

                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["coins"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={coinsProduct} onChange={handleChangeCoins.bind(this)} type="number" autoComplete="off"></input>
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
                                            {obtainTextTranslated["buttons"]["modify_code"]}
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