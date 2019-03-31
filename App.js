import Shop from './components/shop.tab.js'
import Order from './components/order.tab.js'
import Account from './components/account.tab.js'

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  

const TabNavigator = createMaterialBottomTabNavigator({
    Shop: Shop,
    Order: Order,
    Account: Account
},
{
    initialRouteName: "Shop",
    headerMode: 'none',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#4CBB17' },
});

export default createAppContainer(TabNavigator);