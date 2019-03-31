import Shop from './components/shop.tab.js'
import Order from './components/order.tab.js'
import Account from './components/account.tab.js'

import React from 'react';
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  

const TabNavigator = createMaterialBottomTabNavigator({
    Shop: {
        screen: Shop,
        navigationOptions: {
            tabBarLabel: 'Restaurants',
            tabBarIcon: ({tintColor, activeTintColor}) => (
                <Icon name="restaurant" color={tintColor} />
            ),
            tabBarColor: "#FA0129"
        }
    },
    Order: {
        screen: Order,
        navigationOptions: {
            tabBarLabel: 'Order',
            tabBarIcon: ({tintColor, activeTintColor}) => (
                <Icon name="menu" color={tintColor} />
            ),
            tabBarColor: "#4cbb17"
        }
    },
    Account: {
        screen: Account,
        navigationOptions: {
            tabBarLabel: 'Compte',
            tabBarIcon: ({tintColor, activeTintColor}) => (
                <Icon name="account-box" color={tintColor} />
            ),
            tabBarColor: "#2F7DE1"
        }
    }
},
{
    initialRouteName: "Shop",
    activeColor: '#FFFFFF',
    headerMode: 'none',
    inactiveColor: '#fefee2',
    shifting: true
});

export default createAppContainer(TabNavigator);