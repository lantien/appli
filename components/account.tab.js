import { createStackNavigator, createAppContainer } from "react-navigation";

//import components
import Login from './accountTabs/login.js';
import CreateAccount from './accountTabs/createAccount.js';
import ForgotPassword from './accountTabs/forgotPassword.js';

const AppNavigator = createStackNavigator({
    Login: Login,
    CreateAccount: CreateAccount,
    ForgotPassword: ForgotPassword
  },
  {
    initialRouteName: "Login",
      
  }
);

export default createAppContainer(AppNavigator);