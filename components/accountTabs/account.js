import React from 'react';
import { Text, View, ScrollView,StyleSheet,TouchableOpacity,Button } from 'react-native';

import { connect } from 'react-redux';

import apiUrl from '../../config/api.url.js';

class Account extends React.Component {

    static navigationOptions = {
        title: 'My account',
      };

    constructor(props) {
        super(props);

        this.state = {
            lastname : "",
            email: "",
            phone_number: "",
            firstname : ""
        }

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
            this.setState(data);
            console.log(data);
        })
        .catch(err => {
  
            console.log(err);
        })
    }

    render() {
        console.log(this.state); 

        return (
            <ScrollView style={styles.container}>
            
           {/*  <ScrollView> */}

            <View style={styles.name}>
                <Text style={styles.firstname}>
                    {this.state.firstname}  
                </Text>
                <Text style={styles.lastname}>
                    {this.state.lastname}  
                </Text>
            </View>

            <View style={styles.email}>
                <Text style={styles.emailText}>
                    {this.state.email}  
                </Text>
            </View> 

            <View style={styles.line}>
                   </View>

            <TouchableOpacity style={styles.settingContainer}>
                <Text style={styles.textTitles}>Settings</Text>
            </TouchableOpacity>

            <View style={styles.line}>
                   </View>

            <TouchableOpacity style={styles.settingContainer}>
                <Text style={styles.textTitles}>Support</Text>
            </TouchableOpacity>

            <View style={styles.line}>
                   </View>

            </ScrollView>
            

        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(Account);


const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#F8F8F8',
    },
    
    name : {
        backgroundColor :'#012',
        flexDirection : 'row',
        marginHorizontal : 20,
        justifyContent : 'center',
        alignItems : 'flex-end',
        flex : 0.2,
    },
    firstname: {
        marginHorizontal : 3,        
    },
    lastname : {

    },
    email:{
       
        flexDirection : 'row',
        marginHorizontal : 20,
        justifyContent : 'center',
        alignItems : 'flex-end',
        flex : 0.05,
        marginBottom : 25,
        
    },
    emailText: {
        color : '#0258',
    },
    line:{
        backgroundColor: '#bfbfbf',
        height:1,
      },
    settingContainer:{
        backgroundColor: '#fff',
        flex : 0.08,
        justifyContent : 'center',
        alignItems : 'flex-start',
        paddingHorizontal : 10
    },
    textTitles:{
        color :'#808080'
    },

})