import React from 'react';
import { Text } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Account extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <Text>
                Display account infos
            </Text>
        );
    }
}