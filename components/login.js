import React from 'react';
import { TextInput, View, Button } from 'react-native';
import { Provider } from 'react-redux'

import store from './store.js';

export default class Login extends React.Component {

    static navigationOptions = {

        header: null
    }

    constructor(props) {

        super(props);
        this.login = ""; 
        this.password = "";
    }

    _setLogin(text) {

        this.login = text;
    } 

    _setPassword(text) {

        this.password = text;
    }

    requestLogin() {

        console.log(this.login, this.password);
        fetch(store.getState().apiUrl + 'login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login: this.login,
              password: this.password,
            }),
        })
        .then(res => {

            console.log(res);
        })
        .catch(err => {

            console.log(err);
        });

    }

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this._setLogin(text)}
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this._setPassword(text)}
                />

                <Button
                    onPress={() => this.requestLogin()}
                    title="Login"
                />
            </View>
        );
    }
}