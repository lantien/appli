import { createStackNavigator, createAppContainer } from "react-navigation";

//import components
import Orders from './orderTabs/orders.js';

const AppNavigator = createStackNavigator({
    Orders: Orders
  },
  {
    initialRouteName: "Orders",
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);