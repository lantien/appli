import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import registerNotif from './tools/notificationRegister';

import Store from './components/redux/store.js';
import Entry from './components/main.js';

import { Provider as PaperProvider } from 'react-native-paper';

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

          if(data.success == false) {

            return;
          }

          for(var i in data) {
              var date = new Date(data[i].createdAt);

              data[i].createdAt = date.toLocaleDateString();
              const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
              data[i].heure = date.getHours() + ":" +  min;
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

      Store.dispatch({
        type: 'SET_TOKEN',
        token: value
      });

      if(value != null) {

        this.getOrders(value);
      }

      const res = await registerNotif();
      const json = await res.json();

    } catch(err) {

      console.log(err)
    }
  }

  render() {
    return (
      <Provider store={Store}>
        <PaperProvider>
          <Entry/>
        </PaperProvider>
      </Provider>
    )
  }
}