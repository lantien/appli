import React from 'react';
import {Alert, StyleSheet, View,TextInput, TouchableOpacity, TouchbableWithoutFeedBack,Text, StatusBar, ScrollView, Image } from 'react-native';

import { Ionicons, MaterialIcons } from 'react-native-vector-icons'

export default class Settings extends React.Component {

    constructor(props) {
        super(props);

    }
  
    render() {

        return (

            <View style={styles.container}
              barStyle="light-content"
            >

      {/* <Header
  
      centerComponent={{ text: 'MY TITLE', style: { color: '#000' , fontWeight : '700'} }}   
      outerContainerStyles= {{backgroundColor: '#FFF'}}
 
      /> */}

      <View style={styles.header} > 

      <View style={styles.headerLeft}> 
          <TouchableOpacity>

          <MaterialIcons name = "keyboard-return" size={28} color ="#34DA4F"/>

          </TouchableOpacity>
        </View>


      <View style={{marginBottom : 10}}>
        <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>Settings</Text>
        </View>

        <View style = {styles.headerRight}>
          
        </View>

      </View>
      



      <ScrollView style = {{flex : 0.905,}}>

        <View style= {{height: 1, backgroundColor : '#E8E8E8', marginTop : 25}}> 
          
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

      </ScrollView>

      </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
      flex: 1 ,
      backgroundColor: '#f5f5f5'
    
    },
    header :{
      flex : 0.095,
      backgroundColor : '#ffff',
      flexDirection : 'row',    
      justifyContent : 'space-between',
      alignItems : 'flex-end', 
      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,
    },

    headerLeft:{
      backgroundColor :'#fff',
      width : 60,
      marginLeft : 10,
    
    },
    headerRight: {
        width : 60,
        marginRight : 10
    }
  
    });
  