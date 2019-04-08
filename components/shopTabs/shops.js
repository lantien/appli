import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

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

        this.props.navigation.navigate('Catalogue', {
            shopData: this.state.listShops[id]
        });
    }

    renderListShop = item => {

        return(
        <Text
            onPress={ () => this.showShop(item.index)}
        >
            {item.item._id}
        </Text>)
        
        ;
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
      }
  
    });