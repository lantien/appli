import { createStackNavigator, createAppContainer } from "react-navigation";

//import components
import Orders from './orderTabs/orders.js';

const AppNavigator = createStackNavigator({
    Orders: Orders
  },
  {
<<<<<<< HEAD
    initialRouteName: "Orders"
=======
    initialRouteName: "Orders",
    headerMode : 'none',
>>>>>>> 7ce744cea03bd425d7629b27a8bf8cc120fd67ca
  }
);

export default createAppContainer(AppNavigator);