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
<<<<<<< HEAD
    initialRouteName: "Login"
=======
    initialRouteName: "Login",
      
>>>>>>> 7ce744cea03bd425d7629b27a8bf8cc120fd67ca
  }
);

export default createAppContainer(AppNavigator);