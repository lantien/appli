import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity,ScrollView, Button, Text, Platform } from 'react-native';

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

            <ScrollView style={styles.container}>


                <View style={styles.logoText}>             

                    <Text style={styles.title} >
                    Drive
                </Text>

                </View>

                <View style={styles.containerForm}>             
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this._setFirstname(text)}  
                    placeholder="Firstname"
                    returnKeyType= "next"
                    onSubmitEditing = {() => this.lastNameInput.focus()}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this._setLastname(text)}
                    placeholder="Lastname"
                    returnKeyType= "next"
                    onSubmitEditing = {() => this.emailInput.focus()}
                    ref={(input) => this.lastNameInput = input}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this._setEmail(text)}
                    placeholder="email"
                    returnKeyType= "next"
                    keyboardType="email-address"
                    onSubmitEditing = {() => this.phoneNumberInput.focus()}
                    ref={(input) => this.emailInput = input}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this._setNumber(text)}
                    placeholder="Phone number"
                    returnKeyType= "next"
                    onSubmitEditing = {() => this.passwordInput.focus()}
                    ref={(input) => this.phoneNumberInput = input}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this._setPassword(text)}
                    placeholder="Password"
                    ref={(input) => this.passwordInput = input}
                    secureTextEntry
                    returnKeyType= "next"
                    onSubmitEditing = {() => this.confirmPasswordInput.focus()}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this._setPassword(text)}
                    placeholder="Confirm password"
                    ref={(input) => this.confirmPasswordInput = input}
                    secureTextEntry
                    returnKeyType= "go"
                />
                </View>

                <View style={styles.line}>
              </View>

                <View  style={styles.containerButton}>
                    <TouchableOpacity
                        onPress={() => this._navigate('CreateAccount')}/* {() => this.requestLogin()} */
                        style={styles.signUpButton}
                    >
                    
                    <Text style={styles.signUp}>Sign up</Text>

                    </TouchableOpacity>
                </View>

                <Button
                    onPress={() => this.props.navigation.goBack()}/* {() => this.requestLogin()} */
                    title="Retour login"
                />
                

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

container: {
  flex: 1,
  backgroundColor: '#F5F5F5',
  paddingHorizontal: 15,
  flexDirection: 'column',
  },

  containerForm:{
      flexDirection :'column',
      justifyContent : 'space-between',
  },
  
  logoText: {
    alignItems: 'center',
    justifyContent:'center',
    height: 80,
    marginBottom: 15,
    marginTop: 0,
  },

  title: {
    color: '#FA0129',
    fontSize: 25,
    marginTop: 10,
    textAlign: 'center',  
  },
  input :{
    backgroundColor : '#FFF' ,
    height: 45,
    marginBottom: 10,   
    borderColor : '#bfbfbf',
    borderWidth : 1,    
    padding :10,
  },
  containerButton: {
    
    alignItems: 'center',
    flexDirection:'column',
    justifyContent:'center',
    marginTop : 10,
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
  },
  line :{
      backgroundColor : '#bfbfbf',
      height : 1,
      margin: 10,
  }

})