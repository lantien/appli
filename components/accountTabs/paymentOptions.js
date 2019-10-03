import React from 'react';
import {FlatList, Alert, StyleSheet, View, TextInput, TouchableOpacity, Keyboard,Text, StatusBar, ScrollView, Image } from 'react-native';

import { AntDesign, MaterialIcons } from 'react-native-vector-icons';


import apiUrl from '../../config/api.url.js';
import { connect } from 'react-redux';
import store from '../redux/store.js';

import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import stripeKey from '../../config/stripe.config';


Stripe.setOptionsAsync({
  publishableKey: stripeKey.publicKey
});

class PaymentOptions extends React.Component {

    constructor(props) {
        super(props);


        this.state = {

          listCard: []
        }
    }

    componentWillMount() {

      this.getCard();
    }

    _keyExtractor = (item, index) => index.toString();

    async getCard() {

      try {

        var res = await fetch(apiUrl + 'me/card', {
                              method: 'GET',
                              headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                  'x-access-token': this.props.token
                              }
                            });
        const data = await res.json();
        this.setState({
          listCard: data.data
        });

      } catch(err) {

        console.log(err);
      }
    }

    async deleteCard(cardID) {


      try {

        var res = await fetch(apiUrl + 'me/card', {
                              method: 'DELETE',
                              headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                  'x-access-token': this.props.token
                              },
                              body: JSON.stringify({
                                cardID: cardID
                              })
                            });
        const data = await res.json();
        this.setState({
          listCard: data.data
        });

      } catch(err) {

        console.log(err);
      }
    }

    async addCard() {

      try {

        const token = await Stripe.paymentRequestWithCardFormAsync();
        var res = await fetch(apiUrl + 'me/card', {
                              method: 'POST',
                              headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                  'x-access-token': this.props.token
                              },
                              body: JSON.stringify({
                                tokenCard: token.tokenId
                              })
                            });
        const data = await res.json();
        this.setState({
          listCard: data.data
        });

      } catch(err) {

        console.log(err);
      }
    }

    render() {

        return (
            <View style={styles.container}
              barStyle="light-content"
            >
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
                  <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>Payment options</Text>
                </View>

                <View style = {styles.headerRight}>
              
                </View>

              </View>

              <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>        
              </View>
            <ScrollView
              keyboardShouldPersistTaps='always'
            >

              <View style= {{height: 0.4, backgroundColor : '#E8E8E8', marginTop: 25}}> 
              </View>

                <TouchableOpacity 
                  style = {{ padding: 15, flexDirection: 'row',backgroundColor : '#fff'}}
                  onPress={() => {

                    this.addCard();
                  }}
                > 

                  <MaterialIcons name = "payment" size={22} color ="#2F7DE1"/>
                  <Text style = {{color : '#000', fontSize: 15, fontWeight: '500', marginHorizontal: 8, marginVertical : 2}}>Add payment method</Text>
                          
                </TouchableOpacity>

                <FlatList
                    data={this.state.listCard}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={(card) => {

                      card = card.item;
                      return (
                        <View>
                          <View style= {{height: 0.4, backgroundColor : '#E8E8E8', marginHorizontal: 25}}> 
                          </View>
          
          
                          <TouchableOpacity 
                            style = {{ padding: 15, flexDirection: 'row',backgroundColor : '#fff'}}
                          > 
          
                            <MaterialIcons name = "payment" size={22} color ="#2F7DE1"/>
                            <Text style = {{color : '#000', fontSize: 15, fontWeight: '500', marginHorizontal: 8, marginVertical : 2}}>****-****-****-{card.last4}</Text>
                            <View style= {{height : 35, justifyContent: 'center', alignItems :'center', paddingHorizontal : 5}}>
                              <AntDesign 
                                name = "closecircle" 
                                size={13} 
                                color ="#cacaca"
                                onPress={() => {

                                  this.deleteCard(card.id);
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      )
                    }}
                />

                

            </ScrollView>


          </View>
        );
    }
}

function mapStateToProps(state) {

  return state;
}

export default connect(mapStateToProps)(PaymentOptions);

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