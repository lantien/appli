import React from 'react';
import { View, Text } from 'react-native';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

export default class Orders extends React.Component {

    static navigationOptions = {

        header: null,
    }

    constructor(props) {
        super(props);

    }

    _getOrders() {

        fetch(apiUrl + 'me/order', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': store.getState().token
            },
        })
        .then(data => {

            return data.json();
        })
        .then(data => {

            this.setState({
                listShops: data
            });
            console.log(this.state.listShops);
        })
        .catch(err => {

            console.log(err);
        })
    }

    render() {

        return (
            <View>
                <Text>Orders</Text>
            </View>
        );
    }
}