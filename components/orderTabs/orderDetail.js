import React from 'react';
import { Text } from 'react-native';

export default class OrderDetail extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        const item = this.props.navigation.getParam('item', "no_data");
        console.log("item", item);

        return (
            <Text>
                Order detail
            </Text>
        );
    }
}