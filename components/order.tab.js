import { createStackNavigator, createAppContainer } from "react-navigation";

//import components
import Orders from './orderTabs/orders.js';

const AppNavigator = createStackNavigator({
    Orders: Orders
  },
  {
    initialRouteName: "Orders"
  }
);

export default createAppContainer(AppNavigator);