import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar, Image,ScrollView, BackHandler } from 'react-native';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';

import { connect } from 'react-redux';

import { Localization } from 'expo';

import OrderDetail from './orderDetail.js';

import convertCurrency from '../../tools/convertCurrency.js';
import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import moment from 'moment';
import 'moment/locale/fr';

class Orders extends React.Component {
    static navigationOptions = {
      title: 'My orders',
      };

    navigationOptions =  {
      headerLeft: null
    };


    constructor(props) {
        super(props);

    }

    componentWillMount() {

      moment.locale(Localization.locale.substring(0, 2));
    }


    _keyExtractor = (item, index) => index.toString();

    showOrder(item)  {

      this.props.navigation.navigate('OrderDetail', {
        item
      });
    }

    convertDate(date) {

      return moment(date, 'MM/DD/YYYY').format('ddd DD MMMM').toString();
    }
    
    render() {
      
        return (

            <View  style={styles.container}>

          <View style={styles.header} > 

          <View style={styles.headerLeft}> 
                        
            </View>


          <View style={styles.headerCenter}>
            <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>Orders</Text>
            </View>

            <View style = {styles.headerRight}>
            
            </View>

          </View>
          <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>        
              </View>
              <ScrollView>

              <FlatList
                    data={this.props.orderList}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => 
                                            <TouchableOpacity
                                                style={styles.containerCardItem}
                                                onPress={() => {
                                                    this.showOrder(item);
                                                }}
                                            >

                                            <StatusBar
                                                barStyle="dark-content"
                                            />

                                            
                                                
                                               <View style={{height : 0.4, backgroundColor : '#E8E8E8'}}></View>
                                                
                                                

                                              <View style ={styles.containerName}>

                                                <View style ={{flexDirection : 'row', padding : 5, alignItems : 'center'}}>

                                                  <Image
                                                    style = {{height : 35, width: 35, borderRadius : 35/2}}
                                                    source={
                                                      {
                                                        uri: apiUrl + 'images/' + item.shopID + '_order.jpg'
                                                      }
                                                    }
                                                  />

                                                  <Text style={styles.name}>{item.shop_name}</Text>
                                                  </View>

                                                  <View style={styles.orderNumber}>
                                                    <Text>Order n° : {parseInt(item._id.substr(item._id.length - 4), 16)}</Text>
                                                  </View>

                                                </View>

                                              <View style={{backgroundColor : '#F0F0F0', height : 0.5}}></View>

                                              <View style ={{ flexDirection : 'row'}}>

                                              <View style={{ flexDirection :'row',width : '50%'/* , backgroundColor : '#02f1' */}}>

                                              <View style={{paddingVertical : 8, paddingHorizontal : 5 }}>

                                                    <AntDesign name="checkcircleo" size={12} color="#00d751"/>
                                              </View>

                                              <View style={{padding : 5, flexDirection : 'column', alignItems : 'center'}}>

                                              <Text style={{fontSize : 14, fontWeight : '500', marginLeft : 10}}>Commande terminée</Text>

                                              <View style={{ flexDirection : 'row', paddingHorizontal : 5}}>
                                              <Text style ={{color : '#A9A9A9'}}>{this.convertDate(item.createdAt)} à {item.heure}</Text>
                                              </View>

                                                </View >

                                              </View>

                                              <View style={{ flexDirection :'row', height : '100%',width : '50%'/* , backgroundColor :'#f021' */, justifyContent :'flex-end', alignItems : 'flex-end', padding : 5}}>
                                              <Text style={{fontSize : 15, fontWeight : '600'}}> Total: {item.total}{convertCurrency(item.currency)}</Text>
                                              </View>

                                              </View>
                                             <View style={{backgroundColor : '#E8E8E8', height : 0.5}}></View>
                                            </TouchableOpacity>
                                }
                    
                />

              </ScrollView>
            </View >
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(Orders);

const styles = StyleSheet.create({
    container:{
      flex: 1 ,
      backgroundColor: '#f9fafb'
    },

    /* -----------------HEADER------------------------- */
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

      /* ---------------FIN HEADER----------------------- */


      containerCardItem :{
        flex : 0.1618,
        backgroundColor : '#fff',
        marginTop : 15
      },
      containerName: {
        flexDirection :'row',
        justifyContent: 'space-between'
      },
      name : {
        marginLeft : 5,
        fontSize : 15,
        fontWeight : '600'
      },
      orderNumber :{
        flexDirection : 'row',
        padding : 5,
        alignItems : 'center'
      }
  
});