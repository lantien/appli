import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar, ScrollView, BackHandler } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';

import OrderDetail from './orderDetail.js';

import convertCurrency from '../../tools/convertCurrency.js';
import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

class Orders extends React.Component {

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

    _keyExtractor = (item, index) => item._id;

    showOrder(id)  {

      this.setState({
        showDetail: <OrderDetail order={this.props.orderList[id]}/>
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
                                                    this.showOrder(item.ite);
                                                }}
                                            >

                                            <StatusBar
                                                barStyle="dark-content"
                                            />

                                            <ScrollView>
                                                

                                                <View style={styles.line}>
                                                </View>


                                                <View style={styles.containerCardItem}>

                                                    <View style={styles.containerLeft}>
                                                    
                                                        <View style={styles.containerName}>
                                                            <Text style={styles.statusOrder}>Complétée à </Text>
                                                            <Text style={styles.statusOrder}>{item.heure}</Text>
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
                                                        <MaterialIcons name="chevron-right" size={35} color="#2F7DE1"/>
                                                    </TouchableOpacity>

                                                </View>

                                                <View style={styles.line}>
                                                </View>
                                            </ScrollView>
                                            </TouchableOpacity>
                                }
                    
                />;
      }

        return (
            <View  style={styles.container}>
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
      backgroundColor: '#f7f7f7'
    },
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
      height:1
    },
    containerCardItem: {
      flexDirection: 'row',
      flex : 0.15,
      backgroundColor: '#FFF',
      justifyContent: 'space-between'
    },
    containerLeft:{
      backgroundColor: '#FFF',
    },
    containerName:{
      backgroundColor:'#FFF',
      height: 45,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical : 2,
      marginBottom: 10
    },
    statusOrder: {
      color :'#bfbfbf',
      fontWeight: '500',
      fontSize: 13
    },
    name: {
      fontSize: 15,
      fontWeight: '400',
      color: '#000'
    },
    containerPrice: {
      backgroundColor: '#FFF',
      flexDirection: 'row',
      height: 20,
      marginBottom: 10,
      paddingHorizontal: 20
    },
    price:{
      color :'#bfbfbf',
      fontWeight: '500',
      fontSize: 13
    },
    containerRight: {
      backgroundColor: '#FFF',
      justifyContent: 'center',
      paddingHorizontal: 20
    }
  
});