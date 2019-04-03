import React from 'react';
import { TextInput, View, StyleSheet, ScrollView, Button, Text, Platform } from 'react-native';

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
                    onChangeText={(text) => this._setLastname(text)}
                    placeholder="Lastname"
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this._setFirstname(text)}
                    placeholder="Firstname"
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this._setEmail(text)}
                    placeholder="email"
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this._setNumber(text)}
                    placeholder="Phone number"
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this._setPassword(text)}
                    placeholder="password"
                />
                </View>

                <Button
                    onPress={() => this.createAccount()}/* {() => this.requestLogin()} */
                    title="Create Account"
                />

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
  backgroundColor: '#F8F8F8',
  paddingHorizontal: 20,
  flexDirection: 'column',
  },

  containerForm:{
     
      flex : 0.6,
      flexDirection :'column',
      justifyContent : 'space-between'
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
  input :{
    backgroundColor : '#FFF' ,
    height: 40,
    marginBottom: 10,   
    borderColor : 'gray',
    borderWidth : 1,    
    paddingHorizontal :10,
  },

})