import { createStackNavigator, createAppContainer } from "react-navigation";

//import components
import Shop from './shopTabs/shops.js';
import Catalogue from './shopTabs/catalogue.js';


const AppNavigator = createStackNavigator({
    Shop: Shop,
    Catalogue: Catalogue
  },
  {
    initialRouteName: "Shop",
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);