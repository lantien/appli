import { createStackNavigator, createAppContainer } from "react-navigation";

//import components
import Shop from './shopTabs/shops.js';

const AppNavigator = createStackNavigator({
    Shop: Shop
  },
  {
    initialRouteName: "Shop"
  }
);

export default createAppContainer(AppNavigator);