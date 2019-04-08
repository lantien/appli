import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

import apiUrl from '../../config/api.url.js';

import { connect } from 'react-redux';

class Basket extends React.Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {

        console.log("order", {
            shopID: this.props.shopID,
            orderContent: this.props.basket
        });
    }

    render() {

        return (
            <View>
                <Text>Show basket</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(Basket);