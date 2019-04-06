import { createStackNavigator, createAppContainer } from "react-navigation";

//import components
import Orders from './orderTabs/orders.js';
import OrderDetail from './orderTabs/orderDetail.js';

const AppNavigator = createStackNavigator({
    Orders: Orders,
    OrderDetail: OrderDetail
  },
  {
    initialRouteName: "Orders",
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);