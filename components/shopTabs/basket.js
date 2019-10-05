import React from 'react';
import { View, Text, FlatList, AppRegistry, ScrollView  ,Button , StyleSheet , TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback,TextInput} from 'react-native';
import { Appbar } from 'react-native-paper';

import { AntDesign,Ionicons, MaterialIcons, Feather } from 'react-native-vector-icons';


import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import convertCurrency from '../../tools/convertCurrency.js';

import ScrollPicker from 'react-native-picker-scrollview';

import { connect } from 'react-redux';
import stripeKey from '../../config/stripe.config';


import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import Modal from "react-native-modal";


class Basket extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          listTimer: [
            'Dés que possible',
            'Dans 5 minutes',
            'Dans 10 minutes',
            'Dans 20 minutes',
            'Dans 30 minutes',
            'Dans 1 heure',
            'Dans 2 heures'
          ],
          selectedTime: 0,
          commentsModal: false
        };
    }

    requestPayment = async (askCard) => {

      try {

        if(store.getState().token == null) {

          store.dispatch({
            type: 'SET_WILLPAY',
            willPay: true
          });

          this.props.screenProps.rootNavigation.navigate('Account');
        } else if(askCard == true) {

          const token = await Stripe.paymentRequestWithCardFormAsync();
          return this.doPayment(token.tokenId);
        } else {

          await this.doPayment();
        }
        
      } catch(err) {

        console.log(err);
      }

      
    }

    getInMinutes = (i) => {

      switch (i) {

        case 0:

          return 0;
        case 1:

          return 5;
        case 2:

          return 10;
        case 3:

          return 20;
        case 4:

          return 30;
        case 5:
          
          return 60;
        case 6:
          
          return 120;
      }
    }

    doPayment = async (tokenId) => {

      try {
        const orderRes = await fetch(apiUrl + 'me/order', {
                                          method: 'POST',
                                          headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'x-access-token': store.getState().token
                                          },
                                          body: JSON.stringify({
                                              shopID: this.props.shopID,
                                              orderContent: this.props.basket,
                                              currency: this.props.currency,
                                              tokenId: tokenId,
                                              time: this.getInMinutes(this.state.selectedTime)
                                          })
                                      });
        if(orderRes.status != 200) {

          console.log(orderRes);
          throw 'Fail payment not 200';
        }
        const order = await orderRes.json();

        var date = new Date(order.createdAt);

        order.createdAt = date.toLocaleDateString();
        order.heure = date.getHours() + ":" + date.getMinutes();

        store.dispatch({
          type: 'ADD_ORDER',
          orderList: order
        });

      } catch(err) {

        this.requestPayment(true);
      }
    }

    componentWillMount() {

      Stripe.setOptionsAsync({
        publishableKey: stripeKey.publicKey
      });
      this.setState(this.props.navigation.getParam('shopData', null));
    }

    deleteItem = (id, prix) => {

        store.dispatch({
            type: 'REMOVE_ITEM',
            obj: {
                id,
                prix
            }
        });
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = (item) => {

        let id = item.index;

        item = item.item;
        return (

          <View>
            <View style={styles.containerCardItem}>

              <View style={styles.containerLeft}>

                <TouchableOpacity 
                  style={styles.containerMinus}
                  onPress={() => {

                    store.dispatch({
                        type: 'MINUS_ONE',
                        id: id,
                        prix: item.prix
                    });
                  }}
                >
                  <Feather name="minus" size={17} color="#00b38B"/>
                </TouchableOpacity>

                <View style={styles.containerNumber}>
                  <Text style={styles.numberOfArticle}>{item.quantity}</Text>
                </View>

                <TouchableOpacity 
                  style={styles.containerPlus}
                  onPress={() => {

                    store.dispatch({
                        type: 'PLUS_ONE',
                        id: id,
                        prix: item.prix
                    });
                  }}
                >
                  <Feather name="plus" size={17} color="#00b38B"/>
                </TouchableOpacity>
              </View>

              <View style={styles.containerCenter}>
                <View style={styles.contentOfArticle}>
                  <Text style={styles.textContentOfArticle}>{item.nom}</Text>
                </View>
              </View>

              <View style={{flex : 0.2, alignItems: 'flex-end'}}>
                <View style={styles.priceOfArticle}>
                  <Text style={styles.textContentOfArticle}>{item.prix*item.quantity}{this.state.currency}</Text>
                </View>
              </View>
            </View>
          </View>
        );
    }

    render() {

        return (
            <View style={{flex:1, backgroundColor : '#fff'}}>

{/* ------------------------------------------------------------HEADER------------------------------------------------- */}
            <Appbar
                    style={styles.header}
                >
                    <Appbar.Action
                        style={{backgroundColor :'#fff',}}
                        size={20}
                        icon ="close"
                        onPress={() => {

                            this.props.navigation.goBack();
                        }}
                    />
                    <Appbar.Content
                        style={{backgroundColor :'#fff'}}
                        color= '#000'
                        title= "Votre panier"
                        />
                    <Appbar.Action
                    
                    />
                                        
                </Appbar>

            <View style= {{height: 1, backgroundColor : '#E8E8E8' ,}}>        
                </View>

              {/* ----------------------------------------------------------------------------------------- */}

          <ScrollView>

          <View style={{backgroundColor : '#fff', justifyContent: 'center', alignItems : 'center', paddingTop: 20}}>
            
              <Text style={{fontSize: 23, fontWeight : '400'}}>{this.state.shopName}</Text>
              
            </View>
            <View>

          <TouchableOpacity style={{justifyContent: 'center', alignItems:'center', paddingTop: 10, paddingBottom: 25}}>
              <Text style={{fontSize: 13, fontWeight: '500'}}>{this.state.adress}</Text>
          </TouchableOpacity>
            
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom :25}}>
            <View style={{height :1.2, backgroundColor: '#505050', width : '8%'}}></View>
            </View>
            
            {/* <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 25}}
              onPress={() => {

                this.setState({
                  isDateTimePickerVisible: true
                })
              }}
            >
                <MaterialIcons name="timer" size={17} color="#505050"/>
                <Text style={{color:'#505050', fontWeight: '500', paddingStart: 10}}>{this.state.selectedTime}</Text>
            </TouchableOpacity> */}

<View style={{backgroundColor : '#fff'}}>
            <ScrollPicker
              style={{backgroundColor : '#fff'}}
              ref={(sp) => {this.sp = sp}}

              dataSource={this.state.listTimer}
              selectedIndex={0}
              itemHeight={30}
              wrapperHeight={80}
              highlightColor={'#d8d8d8'}
              renderItem={(data, index, isSelected) => {
                  return(
                      <View style={{backgroundColor : '#fff'}}>
                          <Text >{data}</Text>
                      </View>
                  )
              }}
              onValueChange={(data, selectedIndex) => {
                  
                this.setState({
                  selectedTime: selectedIndex
                });
              }}
            />
            </View>


          
          {/* --------------------------------------------- ITEM BASKET ------------------------------- */}
          <View style={styles.line}>
          </View>

          <View style={{paddingVertical: 10, paddingHorizontal: 20}}> 
                <Text style={{fontSize: 17, fontWeight : '500'}}>Votre commande</Text>
          </View>

          <FlatList
                    data={this.props.basket}
                    extraData={this.props}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />

              {/* ---------------------------------------------------------------------------------------------- */}
           
           

        </View>

              <View style={styles.line}>
                </View>

                  

                <View style={styles.containerInstructions}>

                  <TouchableWithoutFeedback 
                    style={{width : '100%'}}
                    onPress={() => {

                      this.setState({
                        commentsModal: true
                      });
                    }}
                  >
                    <Text style={{color : '#808080', fontSize : 14, fontWeight : '500'}}>Ajouter un commentaire</Text>
                    </TouchableWithoutFeedback>
                  </View>
                  
                  <View style={styles.line}>
                  </View>
              
                  <View>

                  </View>


                  <View style={styles.containerPayment}>
                  
                    <View style={styles.containerTotal}>
                      <Text style={styles.totalText}>Total</Text>
                      <Text style={styles.tvaText}> (incl. TVA)</Text>
                      </View>
                    <Text style={styles.totalPrice}>{this.props.total}{this.state.currency}</Text>
                  </View>

                <View style={styles.line}>
                  </View>
                
          
          </ScrollView>

          <View style={styles.containerFooter}>
              <View style={styles.containerButton}>
                <TouchableOpacity style={styles.confirmButton}
                  onPress={this.requestPayment}
                >
                  <Text style={styles.buttonText}>Confirmer</Text>
                  </TouchableOpacity>
                </View>
            </View>

              <Modal
                  isVisible={this.state.commentsModal}
                  backdropOpacity={0.7}
                  animationIn={'zoomIn'}
                  animationOut={'zoomOut'}
                  animationInTiming={350}
                  animationOutTiming={350}
                  backdropTransitionInTiming={350}
                  backdropTransitionOutTiming={350}
                  onRequestClose={() => {
                
                    this.setState({
                      commentsModal: false
                    });
                }}
              >
                <TouchableOpacity
                    onPress={() => {

                        this.setState({
                          commentsModal: false
                        });
                    }}
                    style={{flex:1, justifyContent:'center', alignItems:'center',}}
                >
                    <View style={styles.modalContent}>
                      <TextInput
                          multiline={true}
                          underlineColorAndroid='black'
                          placeholder="Enter comments"
                          style={{ height: 40 }}
                      />
                    </View>
                </TouchableOpacity>
              </Modal>
            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(Basket);

const styles = StyleSheet.create({
    container:{
      flex: 1 ,
      backgroundColor: '#fafbfb'
    },

/* -----------------HEADER------------------------- */
header :{
    backgroundColor :'#fff', 
    paddingTop: 25 ,
    height: 65, 
    justifyContent: 'flex-end', 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    
    elevation: 1,
  },

headerLeft:{
  backgroundColor :'#fff',
  flex :1/3,
  height : '75%',
  marginLeft : 10,
  justifyContent : 'flex-end',
  alignItems :'flex-start'

},
headerCenter:{
  backgroundColor :'#fff',
  flex :1/3,
  height : '75%',
  justifyContent : 'flex-end',
  alignItems : 'center',
  paddingBottom :3,
  paddingLeft :2,
},

headerRight: {
  flex :1/3,
  height : '50%',
  marginRight : 15,
  alignItems : 'flex-end',
  justifyContent :'flex-end'
  },

  /* ---------------FIN HEADER----------------------- */





    // Partie Supérieure
    containerDetails:{
  
      padding: 5,
      alignItems: 'center'
  
    },
    containerName:{
      marginTop: 5
    },
    name: {
      fontSize: 23,
      fontWeight: 'bold'
    },
    containerOrderNumber:{
      alignItems: 'center',
      marginTop: 30
    },
    orderNumberHeader:{
      fontSize: 13,
      fontWeight: '500',
      color: '#8e8e8e',
      marginBottom: 5
    },
    orderNumber:{
      fontSize: 20,
      fontWeight: '600',
      color: '#000'
    },
    containerAdress:{
      alignItems: 'center',
      marginTop: 25,
      marginBottom: 5
    },
    adressHeader:{
      fontSize: 13,
      fontWeight: '500',
      color: '#8e8e8e',
      marginBottom: 5
    },
    adress:{
      fontSize: 14,
      fontWeight: '400',
      color: '#000'
    },
    zipCode:{
      fontSize: 14,
      fontWeight: '400',
      color: '#000'
    },
    containerStatus:{
      alignItems: 'center',
      marginTop: 25,
      marginBottom: 10
    },
    statusHeader: {
      fontSize: 13,
      fontWeight: '500',
      color: '#8e8e8e',
      marginBottom: 5
    },
    status:{
      fontSize: 14,
      fontWeight: '400',
      color: '#000'
    },
    line:{
      backgroundColor: '#e0e0e0',
      height: 0.5
    },
    containerHeaderArticles:{
      alignItems: 'center',
      padding: 15
    },
    headerText:{
      fontSize: 13,
      fontWeight: '500',
      color: '#8e8e8e',
    },
  
    //Paiement
    containerPayment:{
      flexDirection: 'row',
      justifyContent:'space-between',
      paddingVertical: 15,
      paddingHorizontal: 10
    },
    totalText:{
      fontSize: 16,
      fontWeight: '600',
      color: '#000'
    },
    orderDetails:{
        flexDirection : 'row',
        marginBottom: 10
      },
      numberOfArticle:{
        padding: 10
      },
      textNumberOfArticle:{
        fontSize: 15,
        fontWeight: '500',
        color: '#8e8e8e',
      },
    
      contentOfArticle:{
        padding: 10,
        marginLeft: 5
      },
      textContentOfArticle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
      },
      priceOfArticle:{
        flex : 1,
        alignItems: 'flex-end',
        padding: 10
      },

      /* -------------------------CONTAINER CARD ITEM ----------------- */

      containerName2:{
        flexDirection:'row',
        marginTop: 10,
        alignItems: 'flex-end'
      },
      containerNameText:{
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 8
      },
      name:{
      fontSize: 15,
      fontWeight: '400'
    },
      line:{
        backgroundColor: '#DCDCDC',
        height: 0.5,
        flex: 1,
        alignItems: 'flex-end'
      },
      greyLine:{
        backgroundColor: '#e0e0e0',
        height: 1,
        flex: 1,
      },
      containerPayment:{
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        
      },
      containerTotal:{
        flexDirection: 'row',
      },
      tvaText:{
        fontSize: 16,
        fontWeight: '500',
        color: '#8e8e8e',
    
      },
      totalText:{
        fontSize: 16,
        fontWeight: '600',
        color: '#000'
      },
      totalPrice:{
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        paddingHorizontal: 10
      },
    
      containerInstructions: {
        
        flexDirection: 'row',
        paddingHorizontal: 20, 
        paddingVertical: 20,   
      },
      containerTextInput:{
        backgroundColor :'#FFF',
        flex: 1
      },
      containerFooter:{
        backgroundColor: '#FFF',
        shadowOpacity: 0.1
      },
      containerButton:{
        alignItems: 'center',
        padding: 15,
    
      },
      confirmButton:{
        backgroundColor: '#14a093',
        padding: 10,
        borderRadius: 3,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      },
      buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: '#FFF',
      },

      /* ---------------------- CARD ITEM ---------------------- */

      containerCardItem:{
        backgroundColor: '#FFF',
        flexDirection: 'row', 
        width : '100%',
        paddingTop :10,
        paddingBottom: 20
      },
      containerLeft:{
        backgroundColor: '#FFF',
        flexDirection: 'row',
        flex : 0.15,
        justifyContent:'space-between',
        paddingLeft: 20
      },
      containerMinus:{
        
      },
      containerNumber:{
        
      },
      numberOfArticle:{
        fontSize: 15,
        fontWeight: '400'
      },
      containerPlus:{
      },
      
      // container Centre
      containerCenter: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flex : 0.6
      },
      textContentOfArticle:{
        fontSize: 14,
        fontWeight: '400',
        color: '#000',
      },
      contentOfArticle:{
        flex : 1,
        alignItems: 'flex-end',
      },
      priceOfArticle: {
        backgroundColor: '#fff',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      input: {
        paddingRight: 10,
        lineHeight: 10,
        flex: 2,
        textAlignVertical: 'top'
    },
});