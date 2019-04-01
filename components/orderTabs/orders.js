import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

import { Provider, connect } from 'react-redux';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

class Orders extends React.Component {

    constructor(props) {
        super(props);

    }

    _keyExtractor = (item, index) => item._id;

    render() {

        console.log(this.props.orders);

        return (
            <Provider store={store}>
                <FlatList
                    data={this.props.orders}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => <Text>{item._id}</Text>}
                />
            </Provider> 
        );
    }
}

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
}
