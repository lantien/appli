import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar, ScrollView, BackHandler } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';

import OrderDetail from './orderDetail.js';

import convertCurrency from '../../tools/convertCurrency.js';
import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

class Orders extends React.Component {
    static navigationOptions = {
      title: 'My orders',
      };

    navigationOptions =  {
      headerLeft: null
    }

    constructor(props) {
        super(props);

        this.state = {

          showDetail: false
        };

        this.navigationOptions.headerLeft = this.state.showDetail;
    }

    componentWillMount(){

      BackHandler.addEventListener('hardwareBackPress', () => {

        if(this.state.showDetail) {

          this.setState({
            showDetail: false
          });

          return true;
        }
      });
    }

    shouldComponentUpdate(nextState) {

      if(nextState.token == "") {

        this.state.showDetail = false;
        return true;
      }

      return true;
    }

    _keyExtractor = (item, index) => index.toString();

    showOrder(item)  {

      this.setState({
        showDetail: <OrderDetail order={item}/>
      });
    }

    render() {

      if(!this.state.showDetail) {

        var list = <FlatList
                    data={this.props.orderList}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => 
                                            <TouchableOpacity
                                                style={styles.container}
                                                onPress={() => {
                                                    this.showOrder(item);
                                                }}
                                            >

                                            <StatusBar
                                                barStyle="dark-content"
                                            />

                                            <ScrollView>
                                                

                                                <View style={{height: 0.8, backgroundColor : '#E8E8E8', marginTop : 10}}>
                                                </View>


                                                <View style={styles.containerCardItem}>

                                                    <View style={styles.containerLeft}>
                                                    
                                                        <View style={styles.containerName}>
                                                          <View style={{flexDirection :'row'}}>
                                                            <Text style={styles.statusOrder}>Complétée à </Text>
                                                            <Text style={styles.statusOrder}>{item.heure}</Text>
                                                            </View>
                                                            <Text style={styles.name}>{item.shop_name}</Text>
                                                            
                                                        </View>

                                                        <View style={styles.containerPrice}>
                                                            <Text style={styles.price}>{item.total}</Text>
                                                            <Text style={styles.price}>{item.symbol}</Text>
                                                            <Text style={styles.price}> • </Text>
                                                            <Text style={styles.price}>{item.createdAt}</Text>
                                                        </View>

                                                    </View>

                                                    <TouchableOpacity style={styles.containerRight}>
                                                        <Ionicons name="ios-arrow-forward" size={18} color="#00d751"/>
                                                    </TouchableOpacity>

                                                </View>

                                                <View style={{height: 0.8, backgroundColor : '#E8E8E8'}}>
                                                </View>
                                            </ScrollView>
                                            </TouchableOpacity>
                                }
                    
                />;
      }

        return (
            <View  style={styles.container}>

          <View style={styles.header} > 

          <View style={styles.headerLeft}> 
          <TouchableOpacity
            onPress={() => {

              this.props.navigation.goBack();
            }}
          >

          <MaterialIcons name = "keyboard-return" size={28} color ="#00d751"/>

          </TouchableOpacity>
              
            </View>


          <View style={styles.headerCenter}>
            <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>Orders</Text>
            </View>

            <View style = {styles.headerRight}>
            
            </View>

          </View>
          <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>        
              </View>

            {this.state.showDetail}
            {list}
                
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


    containerLeft:{
      height: '100%',
      width: '100%',
    },
    statusContainer:{
      marginBottom: 10,
      marginTop: 10,
      marginLeft: 20
    },
    statusText:{
      fontSize: 16,
      fontWeight: '500'
    },
    line:{
      backgroundColor: '#e0e0e0',
      height:1,
      marginTop : 20,
    },
    containerCardItem: {
      flexDirection: 'row',
      flex : 0.15,
      backgroundColor: '#FFF',
      justifyContent: 'space-between',
    },
    containerLeft:{
      backgroundColor: '#FFF',
    },
    containerName:{
      backgroundColor:'#FFF',
      height: 45,
      paddingHorizontal: 20,
      paddingVertical : 2,

    },
    statusOrder: {
      color :'#A9A9A9',
      fontWeight: '500',
      fontSize: 14
        },
    name: {
      fontSize: 15,
      fontWeight: '400',
      color: '#000',
    },
    containerPrice: {
      backgroundColor: '#FFF',
      flexDirection: 'row',
      
      marginBottom: 10,
      paddingHorizontal: 20
    },
    price:{
      
      fontWeight: '500',
      fontSize: 13
    },
    containerRight: {
      backgroundColor: '#FFF',
      justifyContent: 'center',
      paddingHorizontal: 20
    }
  
});