import { createStackNavigator, createAppContainer } from "react-navigation";


//import components
import Login from './components/login.js';


const AppNavigator = createStackNavigator({
    Home: Login
  },
  {
    initialRouteName: "Home",
  }
);

export default createAppContainer(AppNavigator);