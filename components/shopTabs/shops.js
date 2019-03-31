import React from 'react';
import { View, Text } from 'react-native';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

export default class Shop extends React.Component {

    position = [45.754516, 4.848909];

    constructor(props) {
        super(props);

        this.state = {
            listShops: []
        }
    }

    componentDidMount() {

        this._getShops();
    }

    _getShops() {

        fetch(apiUrl + 'shop', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'distance': 5000,
              'latitude': this.position[0],
              'longitude': this.position[1]
            },
        })
        .then(data => {

            return data.json();
        })
        .then(data => {

            this.setState({
                listShops: data
            });
            console.log("shop fetched");
        })
        .catch(err => {

            console.log(err);
        })
    }

    render() {

        return (
            <View>
                <Text>Shops</Text>
            </View>
        );
    }
}