import { createStackNavigator, createAppContainer } from "react-navigation";

//import components
import Shop from './shopTabs/shops.js';
import Catalogue from './shopTabs/catalogue.js';
import addBasket from './shopTabs/addBasket.js';
import Basket from './shopTabs/basket.js';


const AppNavigator = createStackNavigator({
    Shop: Shop,
    Catalogue: Catalogue,
    addBasket: addBasket,
    Basket: Basket
  },
  {
    initialRouteName: "Shop",
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);