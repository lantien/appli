import React from 'react';
import { Text } from 'react-native';

import { connect } from 'react-redux';

import apiUrl from '../../config/api.url.js';

/* export default */ class Account extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

        this.getProfile();
    }

    getProfile() {

        fetch(apiUrl + 'me/user', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': this.props.token
            },
        })
        .then(data => {
  
            return data.json();
        })
        .then(data => {
  
          console.log(data);
        })
        .catch(err => {
  
            console.log(err);
        })
    }

    render() {

        return (
            <Text>
                Display account infos
            </Text>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(Account);