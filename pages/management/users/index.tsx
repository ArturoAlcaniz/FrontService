import React from 'react';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';
import { handleObtainAllUsers, handleGoModifyUser, handleDeleteUser } from '@root/components/Management/Users/UsersLogic';
import CenteredButton from '@root/components/Commons/CenteredButton';

export default class UsersManagePage extends CustomBasicPageLogged{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            componentName: "Users Manage | TI-Shop",
            users: [],
        }

        handleObtainAllUsers(this).catch(e => console.log("Failed to get codes", e));
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return (
            <div>
                {super.render()}
                {CenteredButton("/management/users/create", obtainTextTranslated["buttons"]["create_user"])}
                <div className="pageCentered">
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <th>{obtainTextTranslated["labels"]["usuario"]}</th>
                                <th>{obtainTextTranslated["labels"]["correo"]}</th>
                                <th>{obtainTextTranslated["labels"]["actions"]}</th>
                            </thead>
                            <tbody>
                                {this.state.users && this.state.users.length>0 && this.state.users.map(user => {
                                    return (
                                        <tr key={user.email}>
                                            <th>{user.userName}</th>
                                            <td>{user.email}</td>
                                            <td>
                                                <button onClick={() => handleGoModifyUser(user.id)} className="button is-info actions">{obtainTextTranslated["buttons"]["edit"]}</button>
                                                <button onClick={async () => {await handleDeleteUser(user.id,this)}} className="button is-danger actions">{obtainTextTranslated["buttons"]["delete"]}</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}