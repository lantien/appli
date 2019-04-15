import React from 'react';
import {Alert, StyleSheet, View, TextInput, TouchableOpacity, Keyboard,Text, StatusBar, ScrollView, Image } from 'react-native';

import { Feather, MaterialIcons } from 'react-native-vector-icons'

export default class PaymentOptions extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <View style={styles.container}
              barStyle="light-content"
            >
                <View style={styles.header} > 

                <View style={styles.headerLeft}> 
                    <TouchableOpacity>

                    <MaterialIcons name = "keyboard-return" size={28} color ="#2F7DE1"/>

                    </TouchableOpacity>
                </View>


                <View style={styles.headerCenter}>
                <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>Payment options</Text>
                </View>

                <View style = {styles.headerRight}>
                
                    </View>

                </View>

               <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>        
                </View>
            <ScrollView>

            <View style= {{height: 0.4, backgroundColor : '#E8E8E8', marginTop: 25}}> 
                     </View>
            <TouchableOpacity style = {{ padding: 15, flexDirection: 'row',backgroundColor : '#fff'}}> 

                <MaterialIcons name = "payment" size={22} color ="#2F7DE1"/>

                <Text style = {{color : '#000', fontSize: 15, fontWeight: '500', marginHorizontal: 8, marginVertical : 2}}>Add payment method</Text>
                        
                </TouchableOpacity>

                <View style= {{height: 0.4, backgroundColor : '#E8E8E8', marginHorizontal: 25}}> 
                     </View>


              <TouchableOpacity style = {{ padding: 15, flexDirection: 'row',backgroundColor : '#fff'}}> 

                <MaterialIcons name = "payment" size={22} color ="#2F7DE1"/>

                <Text style = {{color : '#000', fontSize: 15, fontWeight: '500', marginHorizontal: 8, marginVertical : 2}}>Payer avec la carte Ticket Restaurant</Text>
                        
                </TouchableOpacity>

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