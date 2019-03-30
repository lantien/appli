import React from 'react';
import { View, Text } from 'react-native';

export default class CreateAccount extends React.Component {

    static navigationOptions = {

        header: null
    }

    constructor(props) {

        super(props);
    }

    render() {

        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Iloul</Text>
            </View>
        );
    }
}