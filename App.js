import React from 'react'
import { Provider } from 'react-redux'
import Store from './components/redux/store.js'
import Entry from './components/main.js';

export default class App extends React.Component {
    render() {
      return (
        <Provider store={Store}>
          <Entry/>
        </Provider>
      )
    }
  }