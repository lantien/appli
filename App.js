import { createStackNavigator, createAppContainer } from "react-navigation";

//import components
import Login from './components/login.js';
import Home from './components/home.js';


const AppNavigator = createStackNavigator({
    Login: Login,
    Home: Home
  },
  {
    initialRouteName: "Login",
  }
);

export default createAppContainer(AppNavigator);