import React from 'react';
import { Text, View, ScrollView,StyleSheet,TouchableOpacity, Button, AsyncStorage } from 'react-native';

import { Feather, MaterialIcons, AntDesign } from 'react-native-vector-icons'

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

        this.getOrders();
        this.getProfile();

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

        if(this.props.orderList.length == 0) {
          
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
      }

    render() {

        return (

            <View style={styles.container}>

            <View style={styles.header}>

            <View style={styles.headerLeft}> 
          
            </View>


      <View style={styles.headerCenter}>
        <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>My account</Text>
        </View>

        <View style = {styles.headerRight}>
        

            </View>

            </View>

            <View style= {{height: 1, backgroundColor : '#E8E8E8' ,}}>        
              </View>

            <ScrollView>
            
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

           {/*  --------------------------------- My Account --------------------------------------- */}

            <View style= {{height: 1, backgroundColor : '#E8E8E8'}}>
                   </View>

            <TouchableOpacity 
                style = {{ padding: 18, flexDirection: 'row',backgroundColor : '#fff', }}
                onPress={() => {

                    this.props.navigation.navigate('Settings');
                }}
            >

                <AntDesign name = "profile" size={18} color ="#989898"/>
                <Text style = {{color : '#505050', fontSize: 16, fontWeight: '500', marginHorizontal: 15}}>My account</Text>

            </TouchableOpacity>


            <View style= {{height: 1, backgroundColor : '#E8E8E8', marginBottom: 25}}>
                   </View>



                {/* --------------------------------------------- Payment ------------------------------------------------------- */}

                <View style= {{height: 1, backgroundColor : '#E8E8E8'}}>
                   </View>

            <TouchableOpacity 
                style = {{ padding: 18, flexDirection: 'row',backgroundColor : '#fff', }}
                onPress={() => {

                    this.props.navigation.navigate('PaymentOptions');
                }}
            >
                <MaterialIcons name = "payment" size={18} color ="#989898"/>
                <Text style = {{color : '#505050', fontSize: 16, fontWeight: '500', marginHorizontal: 15}}>Payment options</Text>
            </TouchableOpacity>

            <View style= {{height: 1, backgroundColor : '#E8E8E8'}}>
                   </View>


                {/* --------------------------------------- Support ------------------------------------------------------- */}

            
            <TouchableOpacity style = {{ padding: 18, flexDirection: 'row',backgroundColor : '#fff', }}>
            
                <Feather name = "help-circle" size={18} color ="#989898"/>

                <Text style = {{color : '#505050', fontSize: 16, fontWeight: '500', marginHorizontal: 15}}>Support</Text>

            </TouchableOpacity>

            <View style= {{height: 1, backgroundColor : '#E8E8E8'}}>
                   </View>

                {/* ---------------------------------------------------Log Out --------------------------------------------------- */}       

                <TouchableOpacity 
                    style = {{ paddingVertical: 18, paddingHorizontal: 20,flexDirection: 'row',backgroundColor : '#fff',  }}

                    onPress={() => {
                        this.logout();
                    }}
                >
                    <Feather name = "log-out" size={18} color ="#989898"/>
                    <Text style = {{color : '#505050', fontSize: 16, fontWeight: '500', marginHorizontal: 15}}>Log out</Text>

                </TouchableOpacity>
                <View style= {{height: 1, backgroundColor : '#E8E8E8'}}>
                   </View>

            </ScrollView>

            </View>
            

        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(Account);


const styles = StyleSheet.create({
    container:{
        flex: 1 ,
        backgroundColor: '#f5f5f5'    
      },
      header :{
        height : 65,
        backgroundColor : '#fff',
        flexDirection : 'row',    
        justifyContent : 'space-between',
        alignItems : 'center', 
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,},
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
  
        },
  
      headerLeft:{
        backgroundColor :'#fff',
        flex :0.33,
        height : '75%',
        marginLeft : 10,
        justifyContent : 'flex-end',
    
      },
      headerCenter:{
        
        flex :0.33,
        height : '50%',
        justifyContent : 'flex-end',
        alignItems : 'center'
      },
  
      headerRight: {
        flex :0.33,
        height : '50%',
        marginRight : 15,
        alignItems : 'flex-end',
        justifyContent :'flex-end'
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