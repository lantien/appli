import { createStackNavigator, createAppContainer } from "react-navigation";

//import components
import Login from './accountTabs/login.js';
import CreateAccount from './accountTabs/createAccount.js';
import ForgotPassword from './accountTabs/forgotPassword.js';
import Account from './accountTabs/account.js';
import isLogged from './accountTabs/isLogged.js';

const AppNavigator = createStackNavigator({
    Login: Login,
    CreateAccount: CreateAccount,
    ForgotPassword: ForgotPassword,
    Account: Account,
    isLogged: isLogged
  },
  {
    initialRouteName: "isLogged"
  }
);

export default createAppContainer(AppNavigator);