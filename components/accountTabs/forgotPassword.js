import React from 'react';
import { TextInput, View, StyleSheet,TouchableOpacity, Button, Text, Platform } from 'react-native';

import { Feather, MaterialIcons } from 'react-native-vector-icons'

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
            <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>Reset password</Text>
            </View>

            <View style = {styles.headerRight}>
            
            </View>

            </View>


            <View style = {{flex : 0.15, flexDirection :'column', justifyContent : 'flex-end', paddingHorizontal : 20}}> 
                <TextInput
                    style={{backgroundColor : '#FFF', height: 45, borderColor: '#D3D3D3', borderWidth: 0.5, borderRadius : 5,paddingHorizontal : 10,}}
                    onChangeText={(text) => this._setEmail(text)}
                    placeholder="Email"
                    keyboardType="email-address"
                />
            </View>
            
            <View style = {{flex : 0.075, flexDirection : 'column', justifyContent :'flex-end', alignItems: 'center',}}>
                <Text style ={{color: '#A9A9A9', fontSize : 14, fontWeight : '600'}}>Enter the email address associated with your account.</Text>
            </View>

            

            <View  style={styles.containerButton}>

                    <TouchableOpacity
                        onPress={() => this.requestPassword()}/* {() => this.requestLogin()} */
                        style={styles.signUpButton}
                    >
                    
                    <Text style={styles.buttonText}>Continue</Text>

                    </TouchableOpacity>
                </View>
            
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

      containerButton: {
        flexDirection: 'column',
        alignItems :'center',
        marginVertical: 20,
        paddingHorizontal : 20
      },

      signUpButton: {       
        backgroundColor: '#2F7DE1',
        justifyContent: 'center',
        alignItems :'center',
        width : '100%',
        height: 40,
        borderRadius: 5
      },
      buttonText: {
          color: '#fff',
          fontSize : 17
      }
    })    