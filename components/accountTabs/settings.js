import React from 'react';
import {Alert, StyleSheet, View, TextInput, TouchableOpacity, TouchableWithoutFeedback,Keyboard,Text, StatusBar, ScrollView, Image } from 'react-native';


import apiUrl from '../../config/api.url.js';
import { connect } from 'react-redux';
import store from '../redux/store.js';

import { Feather, MaterialIcons } from 'react-native-vector-icons'

class Settings extends React.Component {

    constructor(props) {
      super(props);


      this.state = {
        lastname : this.props.user.lastname,
        email: this.props.user.email,
        firstname : this.props.user.firstname
      }
    }

    updateUserInfos() {

      fetch(apiUrl + 'me/user', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.props.token
        },
        body: JSON.stringify({
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            email: this.state.email
        }),
      })
      .then(data => {

          return data.json();
      })
      .then(data => {

          store.dispatch({
              type: 'SET_USER',
              user: data
          });

          this.setState({
            lastname : data.lastname,
            email: data.email,
            firstname : data.firstname
          });
      })
      .catch(err => {

          console.log(err);
      });
    }
  
    render() {

        return (

            <View style={styles.container}
              barStyle="light-content"
            >

<StatusBar
          barStyle="dark-content"
          /> 

      {/* ----------------------------------------------------HEADER------------------------------------- */}

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
        <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>Account details</Text>
        </View>

        <View style = {styles.headerRight}>
        <TouchableOpacity
          onPress={() => {

            this.updateUserInfos();
          }}
        >

          <Text style={{color:'#2F7DE1', fontSize: 15, fontWeight: '600'}}>Save</Text>

        </TouchableOpacity>
        </View>

      </View>

      <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>        
              </View>
      

{/* --------------------------------------------------------END HEADER------------------------------------------------------------ */}
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style = {{flex : 1, }} keyboardDismissMode='on-drag'>

        <View style= {{height: 0.4, backgroundColor : '#E8E8E8', marginTop : 25}}> 
          
        </View>
          
        {/* Firstname */}

          <View style = {{ padding: 15, flexDirection: 'column',backgroundColor : '#fff', }}> 
            
                       <Text style = {{color : '#808080', marginBottom : 5, fontSize: 12, fontWeight: '500'}}>Firstname</Text>
                       <TextInput 
                        placeholder = 'Mettre le prenom ici'
                        style= {{fontSize: 17}}
                        value={this.state.firstname}
                        onChangeText={(input) => {

                          this.setState({
                            firstname: input
                          });
                        }}
                       ></TextInput>
          
          </View>

          <View style= {{height: 0.4, backgroundColor : '#B8B8B8', marginHorizontal: 40}}> 
          </View>
        
          {/* Lastname */}
          
          <View style = {{ padding: 15, flexDirection: 'column',backgroundColor : '#fff'}}> 
            
            <Text style = {{color : '#808080', marginBottom : 5, fontSize: 12, fontWeight: '500'}}>Lastname</Text>
            <TextInput 
             placeholder = 'Mettre le nom ici'
             style= {{fontSize: 17}}
             value={this.state.lastname}
            ></TextInput>

            </View>
            

            <View style= {{height: 0.4, backgroundColor : '#B8B8B8', marginHorizontal: 40}}> 
            </View> 


            {/* Email adress */}

            <View style= {{height: 0.4, backgroundColor : '#B8B8B8', marginHorizontal: 40}}> 
            </View> 

            <View style = {{ padding: 15, flexDirection: 'column',backgroundColor : '#fff', }}> 
            
            <Text style = {{color : '#808080', marginBottom : 5, fontSize: 12, fontWeight: '500'}}>Email adress</Text>
            <TextInput 
             placeholder = 'Mettre l\adresse email' 
             style= {{fontSize: 17}}
             value={this.state.email}
            ></TextInput>

            </View>

            <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>        
              </View>

            
            
                {/* Current password */}

                <View style= {{height: 0.4, backgroundColor : '#E8E8E8', marginTop : 10}}> 
          
                  </View>
          
                    <TouchableOpacity style = {{ padding: 15, flexDirection: 'row',backgroundColor : '#fff', }}> 

                      <Feather name = "lock" size={15} color ="#808080"/>

                       <Text style = {{color : '#000', fontSize: 15, fontWeight: '500', marginHorizontal: 8}}>Reset your password</Text>
                                 
                      </TouchableOpacity>

                      <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}> 
                     </View>
                
              
            

            

      </ScrollView>
      </TouchableWithoutFeedback>

      </View>
        );
    }
}

function mapStateToProps(state) {

  return state;
}

export default connect(mapStateToProps)(Settings);

const styles = StyleSheet.create({
    container:{
      flex: 1 ,
      backgroundColor: '#f9fafb'
    
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
      }
  
    });