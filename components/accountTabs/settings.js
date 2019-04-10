import React from 'react';
import {Alert, StyleSheet, View, TextInput, TouchableOpacity, Keyboard,Text, StatusBar, ScrollView, Image } from 'react-native';

import { Feather, MaterialIcons } from 'react-native-vector-icons'

export default class Settings extends React.Component {

    constructor(props) {
        super(props);

    }
  
    render() {

        return (

            <View style={styles.container}
              barStyle="light-content"
            >

<StatusBar
          barStyle="dark-content"
          /> 

      {/* <Header
  
      centerComponent={{ text: 'MY TITLE', style: { color: '#000' , fontWeight : '700'} }}   
      outerContainerStyles= {{backgroundColor: '#FFF'}}
 
      /> */}

      <View style={styles.header} > 

      <View style={styles.headerLeft}> 
          <TouchableOpacity>

          <MaterialIcons name = "keyboard-return" size={28} color ="#2F7DE1"/>

          </TouchableOpacity>
        </View>


      <View style={styles.headerCenter}>
        <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>Account details</Text>
        </View>

        <View style = {styles.headerRight}>
        <TouchableOpacity>

          <Text style={{color:'#2F7DE1', fontSize: 15, fontWeight: '600'}}>Save</Text>

        </TouchableOpacity>
        </View>

      </View>

      <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>        
              </View>
      



      <ScrollView style = {{flex : 1, }} keyboardDismissMode='on-drag'>

        <View style= {{height: 0.4, backgroundColor : '#E8E8E8', marginTop : 25}}> 
          
        </View>
          
        {/* Firstname */}

          <View style = {{ padding: 15, flexDirection: 'column',backgroundColor : '#fff', }}> 
            
                       <Text style = {{color : '#808080', marginBottom : 5, fontSize: 12, fontWeight: '500'}}>Firstname</Text>
                       <TextInput 
                        placeholder = 'Mettre le prenom ici'
                        style= {{fontSize: 17}}
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
            ></TextInput>

            </View>
            

            <View style= {{height: 0.4, backgroundColor : '#B8B8B8', marginHorizontal: 40}}> 
            </View> 

            {/* Phone Number */}

            <View style = {{ padding: 15, flexDirection: 'column',backgroundColor : '#fff', }}> 
            
            <Text style = {{color : '#808080', marginBottom : 5, fontSize: 12, fontWeight: '500'}}>Phone number</Text>
            <TextInput 
             placeholder = 'Mettre le numero de telephone ici'
             style= {{fontSize: 17}}
            ></TextInput>

            </View>

            {/* Email adress */}

            <View style= {{height: 0.4, backgroundColor : '#B8B8B8', marginHorizontal: 40}}> 
            </View> 

            <View style = {{ padding: 15, flexDirection: 'column',backgroundColor : '#fff', }}> 
            
            <Text style = {{color : '#808080', marginBottom : 5, fontSize: 12, fontWeight: '500'}}>Email adress</Text>
            <TextInput 
             placeholder = 'Mettre l\adresse email' 
             style= {{fontSize: 17}}
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

      </View>
        );
    }
}

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