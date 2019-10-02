import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback, Alert, Text, Platform } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';


import { AsyncStorage } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

export default class CreateAccount extends React.Component {

    static navigationOptions = {
        title: 'Sign Up',
      };

    constructor(props) {

        super(props);

        this.state = {
            validateEmail: false,
            validatePassword: false,
            email: "",
            firstname: "",
            lastname: "",
            password: ""
        }
    }

    componentDidMount() {

        this.navigate = this.props.navigation;
    }

    _setLastname(text) {

        this.setState({
            lastname: text
        });
    }

    _setFirstname(text) {

        this.setState({
            firstname: text
        });
    }

    _setEmail(text) {

        regEmail=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/     
        
        if(regEmail.test(text)){
            
            this.setState({
                validateEmail:true,
            });
        }
        else {   

            this.setState({
                validateEmail:false,
            });
        } 

        this.setState({
            email: text
        });
    }


    _setPassword(text) {
        var regPass = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");


        if(regPass.test(text)) {

            this.setState({
                validatePassword:true,
            })
        } else {
            
            this.setState({
                validatePassword:false,
            })
        }

        this.setState({
            password: text
        });
    }

    async createAccount() {

        if(this.state.validateEmail && this.state.validatePassword) {

            try {

                const token_expo = await AsyncStorage.getItem('token_expo');

                const res = await fetch(apiUrl + 'user', {
                                method: 'POST',
                                headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    lastname: this.state.lastname,
                                    firstname: this.state.firstname,
                                    email: this.state.email,
                                    password: this.state.password,
                                    token_expo: token_expo
                                })
                            });
                const login = await fetch(apiUrl + 'login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        login: this.state.email,
                        password: this.state.password,
                        token_expo: token_expo
                    }),
                });
                const logData = await login.json();

                store.dispatch({
                    type: 'SET_TOKEN',
                    token: logData.token
                });
    
                await AsyncStorage.setItem('token', logData.token);
                const navigateAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "Account" })],
                });
            
                this.navigate.dispatch(navigateAction);

            } catch(err) {

                console.log(err);
            }

            /* var globalToken_expo;

            AsyncStorage.getItem('token_expo')
            .then(token_expo => {

                console.log(token_expo);
                globalToken_expo = token_expo;
                return fetch(apiUrl + 'user', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        lastname: this.state.lastname,
                        firstname: this.state.firstname,
                        email: this.state.email,
                        password: this.state.password,
                        token_expo: token_expo
                    }),
                });
            })
            .then(res => {
    
                return fetch(apiUrl + 'login', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      login: this.state.email,
                      password: this.state.password,
                      token_expo: globalToken_expo
                    }),
                });
            })
            .then(data => {
    
                return data.json();
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
    
                console.log(err);
            }); */
        }
        else if (this.state.validateEmail == false) {
            Alert.alert(
                "Quelque chose s\'est mal passé!",
                'Verifiez le format de votre adresse',
                [
                    {text: 'OK'},
                ],
                {cancelable: false},
            );
        }else if(this.state.validatePassword == false) {
            Alert.alert(
                "Impossible d'enregistrer le mot de passe",
                'Verifiez que votre mot de passe \ncontient au moins : \n• 8 caractères \n• 1 chiffre \n• 1 lettre majuscule et \n1 lettre minuscule',
                [
                    {text: 'OK'},
                ],
                {cancelable: false},
            );
        }
        
        
    }

    render() {

        const {navigate} = this.props.navigation;

        return (

            <View style={styles.container}>


                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <View style={styles.container}>

             {/* ------------------------------------------------- HEADER ----------------------------------------------- */}
             <View style={styles.header} > 

                <View style={styles.headerLeft}> 
                <TouchableOpacity
                onPress={() => {

                    this.props.navigation.goBack();
                }}
                >

                <MaterialIcons name = "keyboard-return" size={28} color ="#2F7DE1"/>

                </TouchableOpacity>
                    
                </View>


                <View style={styles.headerCenter}>
                <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>Sign up</Text>
                </View>

                <View style = {styles.headerRight}>

                </View>

                </View>
                <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>        
                    </View>

                    {/* ----------------------------------------------------------------------------------------------------- */}

                <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}
                >
                <View style={styles.containerForm}>      

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this._setEmail(text, 'email')}
                    onSubmitEditing = {() => this.firstnameInput.focus()}
                    placeholder="Email adress"
                    placeholderTextColor="#A9A9A9"
                    returnKeyType= "next"
                    keyboardType="email-address"
                /> 
                    
                    <View style= {{height: 1, backgroundColor : '#E8E8E8'}}>        
                </View>

                    <TextInput
                    style={styles.input}
                    placeholderTextColor="#A9A9A9"
                    onChangeText={(text) => this._setFirstname(text)}  
                    placeholder="Firstname"
                    returnKeyType= "next"
                    ref={(input) => this.firstnameInput = input}
                    onSubmitEditing = {() => this.lastNameInput.focus()}
                    />

                    <View style= {{height: 0.8, backgroundColor : '#E8E8E8', marginHorizontal : 20}}>        
                    </View>

                 <TextInput
                    style={styles.input}
                    placeholderTextColor="#A9A9A9"
                    onChangeText={(text) => this._setLastname(text)}
                    placeholder="Lastname"
                    returnKeyType= "next"
                    onSubmitEditing = {() => this.passwordInput.focus()}
                    ref={(input) => this.lastNameInput = input}
                />

                    <View style= {{height: 0.8, backgroundColor : '#E8E8E8', marginHorizontal : 20}}>        
                </View>

                <TextInput
                    style={styles.input}
                    placeholderTextColor="#A9A9A9"
                    onChangeText={(text) => this._setPassword(text)}
                    placeholder="Password"
                    ref={(input) => this.passwordInput = input}
                    secureTextEntry
                    returnKeyType= "go"
                    /* onSubmitEditing = {() => this.confirmPasswordInput.focus()} */
                />

                <View style= {{height: 1, backgroundColor : '#E8E8E8'}}>        
                    </View>
                {/* <TextInput
                    style={styles.input}
                    onChangeText={(text) => this._setPassword(text)}
                    placeholder="Confirm password"
                    ref={(input) => this.confirmPasswordInput = input}
                    secureTextEntry
                    returnKeyType= "go"
                /> */} 
                </View>

                
                <View  style={styles.containerButton}>
                    <TouchableOpacity
                        onPress={() => this.createAccount()}/* {() => this.requestLogin()} */
                        style={styles.signUpButton}
                    >
                    
                    <Text style={styles.signUp}>Continue</Text>

                    </TouchableOpacity>
                </View>

                                
                </KeyboardAvoidingView>
                
                </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }
}

const styles = StyleSheet.create({

container: {
  flex: 1,
  backgroundColor: '#f9fafb',
  flexDirection: 'column',
  },

  /* -----------------HEADER------------------------- */
  header :{
    height : 65,
    backgroundColor : '#fff',
    flexDirection : 'row',    
    justifyContent : 'space-between',
    alignItems : 'center', 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    },

  headerLeft:{
    backgroundColor :'#fff',
    flex :0.33,
    height : '75%',
    marginLeft : 10,
    justifyContent : 'flex-end',

  },
  headerCenter:{
    
    flex :0.33,
    height : '50%',
    justifyContent : 'flex-end',
    alignItems : 'center'
  },

  headerRight: {
    flex :0.33,
    height : '50%',
    marginRight : 15,
    alignItems : 'flex-end',
    justifyContent :'flex-end'
    },

    /* ---------------FIN HEADER----------------------- */

  containerForm:{
      
      flexDirection :'column',
      marginTop: 20,      
  },
  
   input :{
    backgroundColor : '#FFF' ,
         
    paddingHorizontal :20,
    paddingVertical :15,
    fontSize : 16,
    fontWeight : '500',
    
  },
  containerButton: {
    
    alignItems: 'center',
    flexDirection:'column',
    justifyContent:'center',
    marginTop : 40,
    paddingHorizontal: 20,
  },
  signUpButton: {
    backgroundColor: '#2F7DE1',
    
    width: '100%',
    height: 45,
    borderRadius: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent : 'center',
    marginBottom: 10
  },
  signUp :{
      color : '#fff',
      fontSize : 17,
      fontWeight : '500'
  },
  line :{
      backgroundColor : '#bfbfbf',
      height : 1,
      margin: 10,
  }

})