import Shop from './components/shop.tab.js'
import Order from './components/order.tab.js'
import Account from './components/account.tab.js'

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator({
    Shop: Shop,
    Account: Account,
    Order: Order
},
{
    initialRouteName: "Shop",
    headerMode: 'none'
});

export default createAppContainer(TabNavigator);