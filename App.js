import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import Store from './components/redux/store.js';
import Entry from './components/main.js';

import convertCurrency from './tools/convertCurrency.js';

import apiUrl from './config/api.url';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    
  }

  getOrders(token) {

      fetch(apiUrl + 'me/order', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token
          },
      })
      .then(data => {

          return data.json();
      })
      .then(data => {

          var displayData = [];

          for(var i in data) {
              var date = new Date(data[i].createdAt);

              data[i].createdAt = date.toLocaleDateString();
              //data[i].symbol = convertCurrency(data[i].currency);
              data[i].heure = date.getHours() + ":" + date.getMinutes();
              displayData.push(data[i]);
          }

          Store.dispatch({
              type: 'SET_ORDERS',
              orderList: displayData
          });
      })
      .catch(err => {

          console.log("error", err);
      })

  }

  async componentWillMount() {

    try {
      const value = await AsyncStorage.getItem('token');

      this.getOrders(value);
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