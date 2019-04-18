import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import convertCurrency from '../../tools/convertCurrency.js';

import { connect } from 'react-redux';

class Shop extends React.Component {

    position = [45.754516, 4.848909];

    constructor(props) {
        super(props);

        this.state = {
            listShops: [],
            latitude: null,
            longitude: null,
            error: null,
        }
    }

    componentDidMount() {

        navigator.geolocation.getCurrentPosition(

            (position) => {
                
                this.state.latitude = position.coords.latitude;
                this.state.longitude = position.coords.longitude;
                this.state.error = null;

                this._getShops(position.coords.latitude, 
                    position.coords.longitude);
            },
            () => {

                this._getShops(this.position[0], this.position[1]);
            },
            { 
                enableHighAccuracy: true, 
                timeout: 20000, 
                maximumAge: 1000 
            },
        );
    }

    _getShops(latitude, longitude) {

        fetch(apiUrl + 'shop', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'distance': 5000,
              'latitude': latitude,
              'longitude': longitude
            },
        })
        .then(data => {

            return data.json();
        })
        .then(data => {

            this.setState({
                listShops: data
            });
        })
        .catch(err => {

            console.log(err);
        })
    }

    _keyExtractor = (item, index) => item._id;

    showShop = id => {

        store.dispatch({
            type: 'SET_SHOP',
            id: this.state.listShops[id]._id
        });

        store.dispatch({
            type: 'SET_CURRENCY',
            currency: this.state.listShops[id].currency
        });

        this.props.navigation.navigate('Catalogue', {
            shopData: this.state.listShops[id]
        });
    }

    hexToBase64 = (str) => {
      
      return String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "));
    }

    renderListShop = item => {

        var strType = item.item.type.join(" • ");
        
        let currency = convertCurrency(item.item.currency);
        
        var strPrice = "";

        for(var i = 0; i < item.item.rate_price; i++) {

          strPrice += currency;
        }

        strPrice += " •";

        return(

          <TouchableOpacity 
            style={styles.containerCardItem}
            onPress={ () => this.showShop(item.index)}
          >
                  <View style={styles.containerPicture}>
                  <View style={styles.pictureButton} onPress={this._onPressButton} underlayColor="grey">
                    <Image 
                      style={styles.pictureLogo}
                      source={{uri: `data:image/gif;base64,${item.item.frontImg}`}} 
                    />

                    </View>
                  </View>

                    
                    <View onPress={this._onPressButton} underlayColor="white">
                      <View style={styles.containerDescription}>
                        <Text style={styles.nameRestaurant}>{item.item.name}</Text>
                        <Text style={styles.descriptionRestaurant}>{strType}</Text>

                        <View style={styles.containerNote}>
                          <Text style={styles.priceRange}>{strPrice}</Text>
                          <Text style={styles.noteRestaurant}>{item.item.average_time_prep}</Text>
                        </View>
                    </View>
                  </View>

          </TouchableOpacity>
        );
    }

    render() {

        return (
            <View style={{flex : 1, backgroundColor : '#fff'}}>

                <View style={styles.header}>

                    <View style={styles.headerLeft}> 

                    </View>


                    <View style={styles.headerCenter}>
                        <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>Home</Text>
                    </View>

                    <View style = {styles.headerRight}>


                    </View>

                </View>

                    <View style= {{height: 1, backgroundColor : '#E8E8E8' ,}}>        
                </View>


               <FlatList
                    data={this.state.listShops}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderListShop}
                />

                <View>
              </View>
            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(Shop);

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
      containerCardItem: {
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 20
      },
    
      containerPicture:{
        padding: 5,
        alignItems: 'center',
    
      },
      pictureButton:{
        borderRadius: 3
      },
      pictureLogo:{
        height: 200,
        width: 390,
        borderRadius: 3
      },
    
      containerDescription:{
        backgroundColor :'#FFF',
        height: 80,
        justifyContent: 'space-between',
        paddingHorizontal: 15
    
      },
      nameRestaurant: {
        fontSize: 18,
        fontWeight :'500',
        marginTop: 5,
      },
      descriptionRestaurant: {
        fontSize: 13,
        fontWeight :'400',
        color: '#8e8e8e'
      },
      containerNote:{
        flexDirection:'row',
        alignItems: 'center',
        width: 100,
      },
      noteRestaurant :{
        color :'#00b38B',
        fontSize: 13,
        fontWeight :'500',
        marginLeft : 5
      },
      priceRange: {
        color : '#8e8e8e',
    
      }
  
    });