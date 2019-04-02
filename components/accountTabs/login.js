import React from 'react';
import { StyleSheet, KeyboardAvoidingView,View, TouchableOpacity, TextInput, Text, AsyncStorage } from 'react-native';

import {StackActions, NavigationActions} from 'react-navigation';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

export default class Login extends React.Component {

  static navigationOptions = {
    title: 'Sign in',
  };

  constructor(props) {
    super(props);

    this.login = ""; 
    this.password = "";
  }

  async componentDidMount() {

    this.navigate = this.props.navigation;
  }

  _setLogin(text) {

    this.login = text;
  } 

  _setPassword(text) {

    this.password = text;
  }

  _navigate(compoNanme) {

    this.navigate.navigate(compoNanme);
  }

  requestLogin() {

      fetch(apiUrl + 'login', {
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

          store.dispatch({
            type: 'SET_TOKEN',
            token: data.token
          });

          return AsyncStorage.setItem('token', data.token);
      })
      .then(() => {
        const navigateAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Account" })],
        });
      
        this.navigate.dispatch(navigateAction);
      })
      .catch(err => {

          console.log("err", err);
      });
  }

    render() {

        return (
          <View style={styles.container}>

            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.logoText}>             

                    <Text style={styles.title} >
                        Drive
                    </Text>

                </View>

                <View style={styles.line}>
              </View>

                <View style={styles.textInput}>
                <TextInput

                    style={styles.input}
                    placeholder="Email adress"
                    returnKeyType="next"
                    onSubmitEditing = {() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}

                    onChangeText={(text) => this._setLogin(text)}
                    
                />

                

                <TextInput
                    
                    style={styles.input2}
                    placeholder="Password"
                    secureTextEntry
                    ref={(input) => this.passwordInput = input}
                    returnKeyType= "go"
                                        
                    onChangeText={(text) => this._setPassword(text)}
                    
                />
                </View>

            
                

                {/* Mot de passe oublié */}


                <View style={styles.passwordForgotten}>
                <TouchableOpacity
                onPress={() => this._navigate('ForgotPassword')}/* {() => this.requestLogin()} */
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

                {/* diviseur */}

               

                <View style={styles.divider}>

                  <View style={styles.line2}>
                   </View>
                   
                   <Text style={styles.or}> or</Text>
                   
                   <View style={styles.line2}>
                   </View>

                   </View>
                  
                

                {/* Pas de compte */}


                <View style={styles.containerSignUp}>
                <Text style={styles.textSignUp}>Don't have an account ? </Text>

                <TouchableOpacity
                    onPress={() => this._navigate('CreateAccount')}/* {() => this.requestLogin()} */
                    style={styles.signUpButton}
                >
                    <Text style={styles.signUp}>Sign up</Text>

                </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>

            </View>
        );
    }
}

const styles = StyleSheet.create({

  test :{
    backgroundColor : '#000'
  },

    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      paddingHorizontal: 20,
      flexDirection: 'column',
      },
      
      line:{
        backgroundColor: '#A9A9A9',
        height:1,
        marginBottom: 15,
      },
      line2:{
        backgroundColor: '#000',
        height:1,
        flex : 1,
      },
      
      containerImage:{
        flex: 1,
        width: '100%',
        height : '100%',
      },

    textInput:{
        backgroundColor: '#F8F8F8',
        
    },
    input :{
        backgroundColor : '#FFF' ,
        height: 40,
        marginBottom: 10,   
        borderColor : 'gray',
        borderWidth : 1,    
        paddingHorizontal :10,
      },

    input2: {
        backgroundColor : '#FFF' ,
        height: 40,
        marginBottom: 10,
        borderColor : 'gray',
        borderWidth : 1,
        paddingHorizontal :10,

      },

    logoText: {
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent:'center',
        height: 80,
        marginBottom: 15,
        marginTop: 0,
      },
      title: {
        backgroundColor: '#F8F8F8',
        color: '#FA0129',
        fontSize: 25,
        marginTop: 10,
        width: 190,
        textAlign: 'center',
        
      },

      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
      },

      buttonCustom: {
        backgroundColor: '#FA0129',
        paddingVertical: 15,
        width: 280,
        height: 50,
        borderRadius: 5
      },

      buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '500',
        fontSize: 17
      },

      passwordForgotten: {
        
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
      },

      forgottenCustom: {
        color: '#2F7DE1',
        fontSize: 14,
        marginTop: 10,
      },

      divider:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        height: 50,        
      },
      or :{
        marginHorizontal: 15,
      },

      containerSignUp:{
        alignItems: 'center',
        flexDirection:'column',
        justifyContent:'center'
      },
      textSignUp:{
        fontSize: 14,
        color: '#2F7DE1',
        marginBottom : 15
      },
      signUp:{
        color : '#FFF',
      },
      signUpButton: {
        backgroundColor: '#2F7DE1',
        paddingVertical: 15,
        width: 280,
        height: 50,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
      }


})