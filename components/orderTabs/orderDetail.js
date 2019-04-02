import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Provider, connect } from 'react-redux';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

export default class OrderDetail extends React.Component {

    constructor(props) {
        super(props);

        console.log(props);
    }

    render() {
        
        return (
            <Text>
                Order detail
            </Text>
        );
    }
}/* 

function mapStateToProps(state) {

    return state;
}

const ConnectedRoot = connect(mapStateToProps)(Orders);

export default class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <ConnectedRoot/>
            </Provider>
        );
    }
} */
