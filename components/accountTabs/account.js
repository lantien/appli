import React from 'react';
import { Text, View, ScrollView,StyleSheet,TouchableOpacity, Button, AsyncStorage } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';

import convertCurrency from '../../tools/convertCurrency.js';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

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

    componentWillMount() {

        this.navigate = this.props.navigation;
    }

    componentDidMount() {

        this.getProfile();
        this.getOrders();

        if(this.props.navigation.getParam('justLogged', false)) {
            
            this.props.screenProps.rootNavigation.navigate({ routeName: 'Shop' });
        }
    }

    logout() {

        store.dispatch({
            type: 'SET_TOKEN',
            token: ""
        });
        store.dispatch({
            type: 'SET_ORDERS',
            orderList: []
        });
        AsyncStorage.clear();

        const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Login" })],
        });
    
        this.navigate.dispatch(navigateAction);
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
        })
        .catch(err => {
  
            console.log(err);
        })
    }

    getOrders() {

            fetch(apiUrl + 'me/order', {
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

                var displayData = [];

                for(var i in data) {
                    var date = new Date(data[i].createdAt);

                    data[i].createdAt = date.toLocaleDateString();
                    data[i].symbol = convertCurrency(data[i].currency);
                    data[i].heure = date.getHours() + ":" + date.getMinutes();
                    data[i].ite = i;
                    displayData.push(data[i]);
                }

                store.dispatch({
                    type: 'SET_ORDERS',
                    orderList: displayData
                });
            })
            .catch(err => {

                console.log("error", err);
            })
    }

    render() {

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

            <TouchableOpacity style={styles.settingContainer}>
                <Text style={styles.textTitles}>Payment options</Text>
            </TouchableOpacity>

            <View style={styles.line}>
                   </View>

            <View style={styles.containerLogOut}>

                <TouchableOpacity 
                    style={styles.logOutButton}
                    onPress={() => {
                        this.logout();
                    }}
                >

                    <Text style={styles.logOutText}>Log out</Text>

                </TouchableOpacity>
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
        flexDirection : 'row',
        marginHorizontal : 20,
        justifyContent : 'center',
        alignItems : 'flex-end',
        padding : 10
    },
    firstname: {
        marginHorizontal : 3,
        fontSize : 17,
        fontWeight: '500',     
    },
    lastname : {
        fontSize : 17,
        fontWeight: '500',
    },
    email:{
       
        flexDirection : 'row',
        marginHorizontal : 20,
        justifyContent : 'center',
        alignItems : 'flex-end',
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
        padding : 20,
        justifyContent : 'center',
        alignItems : 'flex-start',
        paddingHorizontal : 10
    },
    textTitles:{
        color :'#808080'
    },
    containerLogOut: {
        alignItems: 'center',
        flexDirection:'column',
        justifyContent:'center',
        paddingVertical : 60,
    },
    logOutButton:{
        backgroundColor: '#2F7DE1',
        paddingVertical: 15,
        width: 280,
        height: 50,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    logOutText:{
        color : '#FFF',
        fontSize : 17
    }

})