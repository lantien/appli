import { createStackNavigator, createAppContainer } from "react-navigation";

//import components
import Login from './components/login.js';
import Home from './components/home.js';
import CreateAccount from './components/createAccount.js';
import ForgotPassword from './components/forgotPassword.js';


const AppNavigator = createStackNavigator({
    Login: Login,
    Home: Home,
    CreateAccount: CreateAccount,
    ForgotPassword: ForgotPassword
  },
  {
    initialRouteName: "Login",
  }
);

export default createAppContainer(AppNavigator);