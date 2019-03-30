import React from 'react';
import { View, Text } from 'react-native';

export default class Shop extends React.Component {

    static navigationOptions = {

        header: null
    }

    constructor(props) {

        super(props);
    }

    render() {

        return (
            <View>
                <Text>Shops</Text>
            </View>
        );
    }
}