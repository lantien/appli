import React from 'react';
import { View, Text } from 'react-native';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

export default class Orders extends React.Component {

    static navigationOptions = {

        header: null
    }

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <View>
                <Text>Orders</Text>
            </View>
        );
    }
}