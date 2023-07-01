import React from 'react';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';
import { handleObtainAllUsers } from '@root/components/Management/Users/UsersLogic';
import Link from 'next/link';
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
                    <div className="ListCodes">
                        <table className="table">
                            <thead>
                                <th>{obtainTextTranslated["labels"]["user_name"]}</th>
                                <th>{obtainTextTranslated["labels"]["user_email"]}</th>
                            </thead>
                            <tbody>
                                {this.state.codes && this.state.users.length>0 && this.state.users.map(user => {
                                    return (
                                        <tr key={user.email}>
                                            <th>{user.name}</th>
                                            <td>{user.email}</td>
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