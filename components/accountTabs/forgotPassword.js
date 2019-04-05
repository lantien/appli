import React from 'react';
import { TextInput, View, StyleSheet,TouchableOpacity, Button, Text, Platform } from 'react-native';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import { connect } from 'react-redux';

export default class Login extends React.Component {
    
    static navigationOptions = {
        title: 'Password forgotten',
      };

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
            <View style={styles.container}>

            <View style = {{flex : 0.15, flexDirection :'column', justifyContent : 'flex-end'}}> 
                <TextInput
                    style={{backgroundColor : '#FFF', height: 45, borderColor: 'gray', borderWidth: 1, paddingHorizontal : 10,}}
                    onChangeText={(text) => this._setEmail(text)}
                    placeholder="Email"
                    keyboardType="email-address"
                />
            </View>
            
            <View style = {{flex : 0.075, flexDirection : 'column', justifyContent :'flex-end', alignItems: 'center',}}>
                <Text style ={{color: '#2F7DE1', fontSize : 15}}>Enter the email address associated with your account.</Text>
            </View>

            

            <View  style={styles.containerButton}>

                    <TouchableOpacity
                        onPress={() => this.requestPassword()}/* {() => this.requestLogin()} */
                        style={styles.signUpButton}
                    >
                    
                    <Text style={styles.buttonText}>Continue</Text>

                    </TouchableOpacity>
                </View>

                <Button
                    onPress={() => this.props.navigation.goBack()}/* {() => this.requestLogin()} */
                    title="Retour"
                />
            
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

      containerButton: {
        flex : 0.12,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'flex-end',
      },

      signUpButton: {
        backgroundColor: '#2F7DE1',      
        width: '100%',
        height: 45,
        borderRadius: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent : 'center',
      },
      buttonText: {
          color: '#fff',
          fontSize : 17
      }
    })    