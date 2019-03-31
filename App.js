import Shop from './components/homeTabs/shops.js'
import Order from './components/homeTabs/ordersTabs.js'
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