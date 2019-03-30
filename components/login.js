import React from 'react';
import { StyleSheet, TextInput,ImageBackground, View, Button, TouchableOpacity,StatusBar , KeyboardAvoidingView, Text, Platform } from 'react-native';

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

            <ImageBackground
                source={require('../assets/Background_1.jpg')}
                style={styles.containerImage}>

        
            

                <View style={styles.logoText}>

                    <Text style={styles.title}>
                        Drive
                    </Text>
                </View>

                <View style={styles.textInput}>
                <Hoshi

                    style={styles.input}
                    label={'Email adress'}
                  // this is used as active border color
                    
                  // this is used to set backgroundColor of label mask.
                  // please pass the backgroundColor of your TextInput container.
                    borderColor={'#f77571'}
                    returnKeyType="next"
                    onSubmitEditing = {() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}

                    onChangeText={(text) => this._setLogin(text)}
                    
                />

                <Hoshi
                    
                    style={styles.input2}
                    label={'Password'}
                    // this is used as active border color
                    borderColor={'#f77571'}
                    // this is used to set backgroundColor of label mask.
                    // please pass the backgroundColor of your TextInput container.
                    secureTextEntry
                    ref={(input) => this.passwordInput = input}
                    returnKeyType= "go"
                                        
                    onChangeText={(text) => this._setPassword(text)}
                    
                />
                </View>

            
                

                {/* Mot de passe oublié */}


                <View style={styles.passwordForgotten}>
                <TouchableOpacity
                onPress={() => navigate('ForgotPassword')}/* {() => this.requestLogin()} */
                >                   
                <Text style={styles.forgottenCustom}>Forget Password ?</Text>
                </TouchableOpacity>
                </View>

                 {/* Login  */}


                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => this.requestLogin()}/* {() => this.requestLogin()} */                    
                    style={styles.buttonCustom}
                >
                <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                </View>


                {/* Pas de compte */}


                <View style={styles.containerSignUp}>
                <Text style={styles.textSignUp}>Don't have an account ? </Text>
                <TouchableOpacity
                    onPress={() => navigate('CreateAccount')}/* {() => this.requestLogin()} */
                >
                    <Text style={styles.signUp}>Sign up</Text>
                </TouchableOpacity>
                </View>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        padding: 20,
        flexDirection: 'column',
      },
      containerImage:{
        flex: 1,
        width: '100%',
        height : '100%',
      },
    textInput:{
        backgroundColor: '#FFF',
        marginBottom : -10,

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
        color: '#e8175d',
        fontSize: 25,
        marginTop: 10,
        width: 190,
        textAlign: 'center'
      },

      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
      },

      buttonCustom: {
        backgroundColor: '#f77571',
        paddingVertical: 15,
        width: 280,
        height: 50,
        borderRadius: 30
      },

      buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '500',
        fontSize: 17
      },

      passwordForgotten: {
        backgroundColor: '#FFF',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },

      forgottenCustom: {
        color: '#bfbfbf',
        fontSize: 17,
      },

      containerSignUp:{
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'center'
      },
      textSignUp:{
        fontSize: 17,
        color: '#bfbfbf',
      },
      signUp: {
        color: '#e8175d',
        fontSize: 17
    
      }


})