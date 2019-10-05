import React from 'react';
import { Text, View, ScrollView,StyleSheet,TouchableOpacity, TouchableWithoutFeedback, AsyncStorage} from 'react-native';
import Modal from "react-native-modal";

import { Feather, MaterialIcons, AntDesign } from 'react-native-vector-icons'

import { StackActions, NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';

import convertCurrency from '../../tools/convertCurrency.js';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';
import Toast from 'react-native-root-toast';

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
            firstname : "",
            showSupport: false
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

    componentWillUpdate() {

        
        if(this.props.willPay) {

            let toast = Toast.show('Compte crée avec succès !', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });

            store.dispatch({
                type: 'SET_WILLPAY',
                willPay: false
            });
            this.props.screenProps.rootNavigation.navigate({ routeName: 'Shop' });
        }
    }


    logout() {

        store.dispatch({
            type: 'SET_TOKEN',
            token: null
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

            store.dispatch({
                type: 'SET_USER',
                user: data
            });

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

              if(!data.success) {

                return;
              }
  
              for(var i in data) {

                if(data[i]._id != undefined) {

                    var date = new Date(data[i].createdAt);
  
                    data[i].createdAt = date.toLocaleDateString();
                    const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                    data[i].heure = date.getHours() + ":" +  min;
                    displayData.push(data[i]);
                }
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

            <View style= {{height: 0.4, backgroundColor : '#E8E8E8' ,}}>        
              </View>

            <ScrollView>
            
           {/*  <ScrollView> */}

            <View style={styles.name}>
                <Text style={styles.firstname}>
                    {this.props.user.firstname}  
                </Text>
                <Text style={styles.lastname}>
                    {this.props.user.lastname}  
                </Text>
            </View>

            <View style={styles.email}>
                <Text style={styles.emailText}>
                    {this.props.user.email}  
                </Text>
            </View> 

           {/*  --------------------------------- My Account --------------------------------------- */}

            <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>
                   </View>

            <TouchableOpacity 
                style = {{ padding: 18, flexDirection: 'row',backgroundColor : '#fff', }}
                onPress={() => {

                    this.props.navigation.navigate('Settings');
                }}
            >

                <AntDesign name = "profile" size={18} color ="#000"/>
                <Text style = {{color : '#505050', fontSize: 16, fontWeight: '500', marginHorizontal: 15}}>Account details</Text>

            </TouchableOpacity>


            <View style= {{height: 0.4, backgroundColor : '#E8E8E8', marginBottom: 25}}>
                   </View>



                {/* --------------------------------------------- Payment ------------------------------------------------------- */}

                <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>
                   </View>

            <TouchableOpacity 
                style = {{ padding: 18, flexDirection: 'row',backgroundColor : '#fff', }}
                onPress={() => {

                    this.props.navigation.navigate('PaymentOptions');
                }}
            >
                <MaterialIcons name = "payment" size={18} color ="#000"/>
                <Text style = {{color : '#505050', fontSize: 16, fontWeight: '500', marginHorizontal: 15}}>Payment options</Text>
            </TouchableOpacity>

            <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>
                   </View>


                {/* --------------------------------------- Support ------------------------------------------------------- */}

            
            <TouchableOpacity 
                style = {{ padding: 18, flexDirection: 'row',backgroundColor : '#fff', }}
                onPress={() => {

                    this.setState({
                        showSupport: true
                    });
                }}
            >
            
                <Feather name = "help-circle" size={18} color ="#000"/>

                <Text style = {{color : '#505050', fontSize: 16, fontWeight: '500', marginHorizontal: 15}}>Support</Text>

            </TouchableOpacity>

            <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>
                   </View>

                {/* ---------------------------------------------------Log Out --------------------------------------------------- */}       

                <TouchableOpacity 
                    style = {{ paddingVertical: 18, paddingHorizontal: 20,flexDirection: 'row',backgroundColor : '#fff',  }}

                    onPress={() => {
                        this.logout();
                    }}
                >
                    <Feather name = "log-out" size={18} color ="#000"/>
                    <Text style = {{color : '#505050', fontSize: 16, fontWeight: '500', marginHorizontal: 15}}>Log out</Text>

                </TouchableOpacity>
                <View style= {{height: 0.4, backgroundColor : '#E8E8E8'}}>
                   </View>

            </ScrollView>

            <Modal
                isVisible={this.state.showSupport}
                backdropOpacity={0.7}
                animationIn={'zoomIn'}
                animationOut={'zoomOut'}
                animationInTiming={350}
                animationOutTiming={350}
                backdropTransitionInTiming={350}
                backdropTransitionOutTiming={350}
                onRequestClose={() => {
                
                    this.setState({
                        showSupport: false
                    });
                }}
            >
            <TouchableOpacity
                onPress={() => {

                    this.setState({
                        showSupport: false
                    });
                }}
                style={{flex:1, justifyContent:'center', alignItems:'center',}}
            >
                <View style={styles.modalContent}>
                        <TouchableWithoutFeedback style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text>Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou Issou</Text>
                        </TouchableWithoutFeedback>
                </View>
            </TouchableOpacity>
            </Modal>

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
        backgroundColor: '#f9fafb'    
      },
      header :{
        height : 65,
        backgroundColor : '#fff',
        flexDirection : 'row',    
        justifyContent : 'space-between',
        alignItems : 'center', 
        shadowColor: "#808080",
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
        fontWeight : '500',
        color : '#2F7DE1',
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
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }

})