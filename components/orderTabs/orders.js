import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';

import convertCurrency from '../../tools/convertCurrency.js';
import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

class Orders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            fetch: false
        };
    }

    _keyExtractor = (item, index) => item._id;

    showOrder(item)  {

        this.props.navigation.navigate('OrderDetail', item);
    }

    componentWillMount() {

        this._getOrders();
    }

    componentWillUpdate() {

        this._getOrders();
    }

    _getOrders() {
    
        if(this.props.token != "" && !this.state.fetched) {

            this.setState({
                fetched: true
            })

            fetch(apiUrl + 'me/order', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.props.token
                },
            })
            .then(data => {

                return data.json();
            })
            .then(data => {

                var displayData = data.map(function(element) {

                    var date = new Date(element.createdAt);

                    element.createdAt = date.toLocaleDateString();
                    element.symbol = convertCurrency(element.currency);
                    element.heure = date.getHours() + ":" + date.getMinutes();
                    return element;
                });

                this.setState({
                    orders: displayData
                });
            })
            .catch(err => {

                console.log("error", err);
            })
        }
    }

    render() {
        
        return (
            <View>

                <FlatList
                    data={this.state.orders}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => 
                                            <TouchableOpacity
                                                style={styles.container}
                                                onPress={() => {
                                                    this.showOrder({item});
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
                                                        <MaterialIcons name="chevron-right" size={35} color="#16B6BE"/>
                                                    </TouchableOpacity>

                                                </View>

                                                <View style={styles.line}>
                                                </View>
                                            </ScrollView>
                                            </TouchableOpacity>
                                }
                    
                />
            </View>
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