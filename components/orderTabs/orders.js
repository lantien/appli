import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

import { connect } from 'react-redux';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

class Orders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: []
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
    
        if(this.props.token != "") {
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

                this.setState({
                    orders: data
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
                    renderItem={({item}) => <Text onPress={() => {
                                                this.showOrder({item});
                                            }}>
                                                {item._id}
                                            </Text>}
                    
                />
            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(Orders);