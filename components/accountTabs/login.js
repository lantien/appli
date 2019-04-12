import React from 'react';
import { StyleSheet, KeyboardAvoidingView,View, TouchableOpacity, TouchableWithoutFeedback,Keyboard,TextInput, Text, AsyncStorage } from 'react-native';


import { StackActions, NavigationActions } from 'react-navigation';

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
    }s

    componentDidMount() {

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

            this._getOrders(
              store.dispatch({
                type: 'SET_TOKEN',
                token: data.token
              })
            );

            return AsyncStorage.setItem('token', data.token);
        })
        .then(() => {

          const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ 
                        routeName: "Account",
                        params: {justLogged: true}
                      }
            )],
          });
        
          this.navigate.dispatch(navigateAction);
        })
        .catch(err => {

            console.log("err", err);
        });
    }

    _getOrders() {
    
      fetch(apiUrl + 'me/order', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': store.getState().token
          },
      })
      .then(data => {

          return data.json();
      })
      .then(data => {

        store.dispatch({
          type: 'SET_ORDER',
          data: data
        });
      })
      .catch(err => {

          console.log(err);
      })
    }

    render() {

        return (
          <View style={styles.container}>

            

          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <KeyboardAvoidingView behavior="padding" style={styles.container}>


                <View style={styles.logoText}>             

                    <Text style={{fontSize: 33, color : '#000', fontWeight :'600'}} >
                        foodr
                    </Text>

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
                <Text style={styles.forgottenCustom}>Forgot Password</Text>
                </TouchableOpacity>
                </View>

                 {/* Login  */}


                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => this.requestLogin()}/* {() => this.requestLogin()} */                    
                    style={styles.buttonCustom}
                >
                <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                </View>

                {/* diviseur */}

               

                <View style={styles.divider}>

                  <View style={styles.line2}>
                   </View>
                   
                   <Text style={styles.or}>OR</Text>
                   
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

            </TouchableWithoutFeedback>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
     
      flexDirection: 'column',
      justifyContent : 'center',
      },
      
      line:{
        backgroundColor: '#A9A9A9',
        height:1,
        marginBottom: 15,
      },
      line2:{
        backgroundColor: '#E8E8E8',
        height:1,
        flex : 1,
      },
      
      containerImage:{
        flex: 1,
        width: '100%',
        height : '100%',
      },

    textInput:{
        paddingHorizontal : 20
                
    },
    input :{
        backgroundColor : '#f9fafb' ,
        height: 40,
        marginBottom: 10,   
        borderColor : '#DCDCDC',
        borderWidth: 0.6,    
        paddingHorizontal :10,
        width :'100%',
        borderRadius : 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        
        elevation: 1,

      },

    input2: {
        backgroundColor : '#f9fafb' ,
        height: 40,
        marginBottom: 10,
        borderColor : '#DCDCDC',
        borderWidth : 0.6,
        paddingHorizontal :10,
        borderRadius : 5,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.18,
shadowRadius: 1.00,

elevation: 1,
      },

    logoText: {
        alignItems: 'center',
        justifyContent:'center',
        height: 80,
        marginBottom: 15,
        marginTop: 0,
      },
      title: {
        backgroundColor: '#F8F8F8',
        color: '#FA0129',
        fontSize: 30,
        marginTop: 10,
        width: 190,
        textAlign: 'center',
        
      },

      buttonContainer: {
        flexDirection: 'column',
        alignItems :'center',
        marginBottom: 10,
        paddingHorizontal : 20
      },

      buttonCustom: {
        backgroundColor: '#2F7DE1',
        justifyContent: 'center',
        width : '100%',
        height: 40,
        borderRadius: 5
      },

      buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '500',
        fontSize: 14,
        fontWeight : '500'
      },

      passwordForgotten: {
        
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal : 20,
        marginBottom : 20,
      },

      forgottenCustom: {
        color: '#2F7DE1',
        fontSize: 13,
        fontWeight : '700',
        marginTop: 10,
      },

      divider:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        height: 50,     
        paddingHorizontal : 20   
      },
      or :{
        color: '#A9A9A9',
        marginHorizontal: 15,
        fontSize : 10,
        fontWeight :'700'
      },

      containerSignUp:{
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'center'
      },
      textSignUp:{
        fontSize: 14,
        color: '#909090',
        
        fontWeight :'500'
      },
      signUp:{
        color : '#2F7DE1',
        fontSize: 14,
        fontWeight : '500'
      },
      signUpButton: {
        flexDirection: 'row',
        justifyContent: 'center',
       
      }


})