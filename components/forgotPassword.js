import React from 'react';
import { TextInput, View, Button, Text, Platform } from 'react-native';

import apiUrl from '../config/api.url.js';
import store from './store.js';

import { connect } from 'react-redux';

export default class Login extends React.Component {

    static navigationOptions = {

        header: null
    }

    constructor(props) {

        super(props);
        this.email = "";
    }

    _setEmail(text) {

        this.email = text;
    } 

    requestPassword() {
        
        console.log("Send email to :", this.email);
    }

    render() {

        const {navigate} = this.props.navigation;
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
                    onPress={() => navigate('Login')}/* {() => this.requestLogin()} */
                    title="Retour"
                />
            </View>
        );
    }
}