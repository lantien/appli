import React from 'react';
import { View, Text } from 'react-native';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

export default class Shop extends React.Component {

    position = [45.754516, 4.848909];

    constructor(props) {
        super(props);

        this.state = {
            listShops: [],
            latitude: null,
            longitude: null,
            error: null,
        }
    }

    componentDidMount() {

        navigator.geolocation.getCurrentPosition(

            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });

                this._getShops(position.coords.latitude, 
                    position.coords.longitude);
            },
            () => {

                this._getShops(this.position[0], this.position[1]);
            },
            { 
                enableHighAccuracy: true, 
                timeout: 20000, 
                maximumAge: 1000 
            },
        );
    }

    _getShops(latitude, longitude) {

        fetch(apiUrl + 'shop', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'distance': 5000,
              'latitude': latitude,
              'longitude': longitude
            },
        })
        .then(data => {

            return data.json();
        })
        .then(data => {

            this.setState({
                listShops: data
            });
        })
        .catch(err => {

            console.log(err);
        })
    }

    render() {

        return (
            <View>
                <Text>Shops</Text>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
            </View>
        );
    }
}