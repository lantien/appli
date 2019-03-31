import React from 'react';
import { TextInput, View, Button, Text, Platform } from 'react-native';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import { connect } from 'react-redux';

export default class Login extends React.Component {

    constructor(props) {

        super(props);
        this.email = "";
    }

    componentDidMount() {

        this.navigate = this.props.navigation;
    }

    _navigate(compoNanme) {

        this.navigate.navigate(compoNanme);
    }

    _setEmail(text) {

        this.email = text;
    } 

    requestPassword() {
        
        console.log("Send email to :", this.email);
    }

    render() {

        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this._setEmail(text)}
                    placeholder="Email"
                />

                <Button
                    onPress={() => this.requestPassword()}/* {() => this.requestLogin()} */
                    title="Send email"
                />

                <Button
                    onPress={() => this.props.navigation.goBack()}/* {() => this.requestLogin()} */
                    title="Retour"
                />
            </View>
        );
    }
}