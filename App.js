import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import Store from './components/redux/store.js';
import Entry from './components/main.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    
  }

  async componentWillMount() {

    try {
      const value = await AsyncStorage.getItem('token');

      Store.dispatch({
        type: 'SET_TOKEN',
        token: value
      });

    } catch(err) {

      console.log(err)
    }
  }

  render() {
    return (
      <Provider store={Store}>
        <Entry/>
      </Provider>
    )
  }
}