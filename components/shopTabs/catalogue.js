import React from 'react';
import { View, Text, FlatList } from 'react-native';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import { connect } from 'react-redux';

class Catalogue extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <View>
               <Text>Show shop</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(Catalogue);