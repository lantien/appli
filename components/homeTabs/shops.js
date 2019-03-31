import React from 'react';
import { View, Text } from 'react-native';

export default class Shop extends React.Component {

    static navigationOptions = {

        header: null
    }

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log("compo mounted");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            
            console.log(position);
          },
          (error) => console.log(error),
          {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
        );
      }

    render() {

        return (
            <View>
                <Text>Shops</Text>
            </View>
        );
    }
}