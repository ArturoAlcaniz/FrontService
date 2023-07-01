import React from 'react';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';
import CustomErrorMessage from '@root/utils/CustomErrorMessage';
import { handleChangeCoins, handleCreateUser, handleChangeRol } from '@root/components/Management/Users/UsersLogic';
import { handleChangeConfirmPassword, handleChangeEmail, handleChangePassword, handleChangeUsername, loadPasswordStrength, showCPass, showPass } from "@root/components/Register/RegisterLogic"
import passwordStrengthMeter from '@root/components/Commons/PasswordStrengthMeter';
import shortid from 'shortid';
import { Rol } from '@entities-lib/src/entities/rolUser.enum'

export default class CreateUserPage extends CustomBasicPageLogged{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            formError: "",
            username: "",
            email: "",
            password: "",
            rol: "",
            confirmPassword: "",
            passwordStrength: "0", // NOSONAR
            passwordStrengthText: "",
            coinsUser: 0,
            showPassword: false,
            showCPassword: false,
            rolList: Object.values(Rol).map((r: string) => r),
            componentName: "Create user | TI-Shop",
        }
        
    }

    obtainClassPasswordStrength(): string {
        if(this.state.passwordStrength<60) {
            return "passWeak"
        }

        if(this.state.passwordStrength<100) {
            return "passGood"
        }

        if(this.state.passwordStrength==100) {
            return "passStrong"
        }
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { username, coinsUser, rol, email, password, confirmPassword, showPassword, showCPassword, formError, passwordStrength, passwordStrengthText } = this.state
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('createUserError')]

        return (
            <>
                {super.render()}
                <div className="pageCentered">
                    <form onSubmit={handleCreateUser.bind(this)}>
                        <div className="card createProductForm">
                            <div className="card-content">

                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["usuario"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input value={username} onChange={handleChangeUsername.bind(this)} className={`input ${this.state.formError=='username' ? 'is-danger' : ''}`} type="text" autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                    { formError=='username' && CustomErrorMessage(msgError) }
                                </div>

                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["correo"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input value={email} onChange={handleChangeEmail.bind(this)} className={`input ${formError=='email' ? 'is-danger' : ''}`} type="email" autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                                <i className="fas fa-envelope"></i>    
                                        </span>
                                    </div>
                                    { formError=='email' && CustomErrorMessage(msgError) }
                                </div>

                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["pass"]}
                                    </label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input onInput={(e) => {loadPasswordStrength(e)}} value={password} onChange={handleChangePassword.bind(this)} className={`input inputpass fas ${formError=='password' ? 'is-danger' : ''}`} type={showPassword ? "text" : "password"} autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            <i onMouseUp={(e) => {e.preventDefault()}} onMouseDown={(e) => {e.preventDefault()}} className={`showpass fas fa-eye${showPassword ? '' : '-slash'}`} onClick={showPass.bind(this)}></i>
                                        </span>
                                        {passwordStrengthMeter(passwordStrength)}
                                        <div className={`passwordStrengthText ${this.obtainClassPasswordStrength()}`}>{passwordStrengthText}</div>
                                    </div>
                                    { formError=='password' && CustomErrorMessage(msgError) }
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["confirm_pass"]}
                                    </label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input value={confirmPassword} onChange={handleChangeConfirmPassword.bind(this)} className={`input inputpass fas ${formError=='cPassword' ? 'is-danger' : ''}`} type={showCPassword ? "text" : "password"} autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            <i onMouseUp={(e) => {e.preventDefault()}} onMouseDown={(e) => {e.preventDefault()}} className={`showpass fas fa-eye${showCPassword ? '' : '-slash'}`} onClick={showCPass.bind(this)}></i>
                                        </span>
                                    </div>
                                    { formError=='cPassword' && CustomErrorMessage(msgError) }
                                </div>
                                <div className="field">
                                    <label>
                                        {obtainTextTranslated["labels"]["rol"]}
                                    </label>
                                    <div className="control">
                                        <select className="select" value={rol} onChange={handleChangeRol.bind(this)} autoComplete="off">
                                        {this.state.rolList && this.state.rolList.length>0 && this.state.rolList.map(r => {
                                            return (
                                                <option key={shortid.generate()} value={r}>{r}</option>
                                                );
                                            })
                                        }
                                        </select>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["coins"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={coinsUser} onChange={handleChangeCoins.bind(this)} type="number" autoComplete="off"></input>
                                    </div>
                                </div>

                                <p className="help form-feedback-ok">
                                    {obtainTextTranslated["requestOK"][this.state.requestOK.get('createUserOk')]}
                                </p>
                                <div className="field">
                                    { formError=='access' && CustomErrorMessage(msgError) }
                                    <p className="control">
                                        <button className="button">
                                            {obtainTextTranslated["buttons"]["create_user"]}
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