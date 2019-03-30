import React from 'react';
import { View, Text } from 'react-native';

export default class MyAccount extends React.Component {

    static navigationOptions = {

        header: null
    }

    constructor(props) {

        super(props);
    }

    render() {

        return (
            <View>
                <Text>MyAccount</Text>
            </View>
        );
    }
}