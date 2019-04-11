import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import convertCurrency from '../../tools/convertCurrency.js';

import { connect } from 'react-redux';

class Basket extends React.Component {

    constructor(props) {
        super(props);

    }

    makeOrder = () => {

        fetch(apiUrl + 'me/order', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': store.getState().token
            },
            body: JSON.stringify({
                shopID: this.props.shopID,
                orderContent: this.props.basket,
                currency: this.props.currency
            })
        })
        .then(data => {
  
            return data.json();
        })
        .then(data => {

            var date = new Date(data.createdAt);

            data.createdAt = date.toLocaleDateString();
            data.symbol = convertCurrency(data.currency);
            data.heure = date.getHours() + ":" + date.getMinutes();
  
          store.dispatch({
            type: 'ADD_ORDER',
            orderList: data
          });
        })
        .catch(err => {
  
            console.log(err);
        })
    }

    render() {

        console.log(this.props.basket);

        return (
            <View>
                <Text>Show basket</Text>
                <Button
                        onPress={this.makeOrder}
                        title="Buy"
                        color="#841584"
                    />
            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(Basket);