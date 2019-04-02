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

    showOrder(item)  {

        this.props.navigation.navigate('OrderDetail', item);
    }

    render() {
        
        return (
            <View>

                <FlatList
                    data={this.props.orders}
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