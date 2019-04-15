import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback,Button, Text, Platform } from 'react-native';
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

        this.lastname = "";
        this.firstname = "";
        this.email = "";
        this.phone_number = "";
        this.password = "";
    }

    componentDidMount() {

        this.navigate = this.props.navigation;
    }

    _setLastname(text) {

        this.lastname = text;
    }

    _setFirstname(text) {

        this.firstname = text;
    }

    _setEmail(text) {

        this.email = text;
    }

    _setNumber(text) {

        this.phone_number = text;
    }

    _setPassword(text) {

        this.password = text;
    }

    createAccount() {
        
        fetch(apiUrl + 'user', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastname: this.lastname,
                firstname: this.firstname,
                email: this.email,
                phone_number: this.phone_number,
                password: this.password,
            }),
        })
        .then(res => {

            return fetch(apiUrl + 'login', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  login: this.email,
                  password: this.password,
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
        });
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

               {/*  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this._setEmail(text)}
                    placeholder="Email adress"
                    returnKeyType= "next"
                    keyboardType="email-address"
                /> */}
                    
                    <View style= {{height: 1, backgroundColor : '#E8E8E8'}}>        
                </View>

                    <TextInput
                    style={styles.input}
                    placeholderTextColor="#A9A9A9"
                    onChangeText={(text) => this._setFirstname(text)}  
                    placeholder="Firstname"
                    returnKeyType= "next"
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
                    onSubmitEditing = {() => this.phoneNumberInput.focus()}
                    ref={(input) => this.lastNameInput = input}
                />

                    <View style= {{height: 0.8, backgroundColor : '#E8E8E8', marginHorizontal : 20}}>        
                </View>

                <TextInput
                    style={styles.input}
                    placeholderTextColor="#A9A9A9"
                    onChangeText={(text) => this._setNumber(text)}
                    placeholder="Phone number"
                    returnKeyType= "next"
                    onSubmitEditing = {() => this.passwordInput.focus()}
                    ref={(input) => this.phoneNumberInput = input}
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
                        onPress={() => this._navigate('CreateAccount')}/* {() => this.requestLogin()} */
                        style={styles.signUpButton}
                    >
                    
                    <Text style={styles.signUp}>Continue</Text>

                    </TouchableOpacity>
                </View>

                <Button
                    onPress={() => this.props.navigation.goBack()}/* {() => this.requestLogin()} */
                    title="Retour login"
                />
                
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