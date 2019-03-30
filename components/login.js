import React from 'react';
import { StyleSheet, TextInput, View, Button, TouchableOpacity,StatusBar , KeyboardAvoidingView, Text, Platform } from 'react-native';

import { Hoshi } from 'react-native-textinput-effects';

import apiUrl from '../config/api.url.js';
import store from './store.js';

import { connect } from 'react-redux';

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

        console.log("login account : ", {
            login: this.login,
            password: this.password,
        });

        /* store.getState().apiUrl */
        /* fetch(apiUrl + 'login', {
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

            return res.json();
        })
        .then(data => {

            //store.dispatch('SET_TOKEN', data.token);
            this.navigate('Home');
        })
        .catch(err => {

            console.log(err);
        }); */
    }

    render() {

        const {navigate} = this.props.navigation;
        return (

            

            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.logoText}>

                    <Text style={styles.title}>
                        Drive
                    </Text>
                </View>

                <View>
                <Hoshi

                    style={styles.input}
                    label={'Adresse email'}
                  // this is used as active border color
                    borderColor={'#16B6BE'}
                  // this is used to set backgroundColor of label mask.
                  // please pass the backgroundColor of your TextInput container.
                    backgroundColor={'#FFF'}
                    returnKeyType="next"
                    onSubmitEditing = {() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}

                    onChangeText={(text) => this._setLogin(text)}
                    
                />
                </View>

            

                <Hoshi
                    
                    style={styles.input2}
                    label={'Password'}
                    // this is used as active border color
                    borderColor={'#16B6BE'}
                    // this is used to set backgroundColor of label mask.
                    // please pass the backgroundColor of your TextInput container.
                    backgroundColor={'#FFF'}
                    secureTextEntry
                    ref={(input) => this.passwordInput = input}
                    returnKeyType= "go"
                                        
                    onChangeText={(text) => this._setPassword(text)}
                    
                />

                <Button
                    onPress={() => this.requestLogin()}/* {() => this.requestLogin()} */
                    title="Login"
                />

                <Button
                    onPress={() => navigate('CreateAccount')}/* {() => this.requestLogin()} */
                    title="CreateAccount"
                />

                <Button
                    onPress={() => navigate('ForgotPassword')}/* {() => this.requestLogin()} */
                    title="ForgotPassword"
                />



            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        padding: 20,
        flexDirection: 'column',
      },

    input :{
        height: 40,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal : 10
    },
    
    input2: {
        height: 40,
        marginBottom: 25,
        paddingVertical: 10,
        paddingHorizontal : 10
      },

    logoText: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent:'center',
        height: 80,
        marginBottom: 25,
        marginTop: 25,
      },
      title: {
        color: '#00b38B',
        fontSize: 25,
        marginTop: 10,
        width: 190,
        textAlign: 'center'
      },
})