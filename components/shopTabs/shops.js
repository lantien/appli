import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, RefreshControl, TextInput, Keyboard } from 'react-native';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import convertCurrency from '../../tools/convertCurrency.js';

import { connect } from 'react-redux';
import { AntDesign, Ionicons, MaterialIcons, Feather } from 'react-native-vector-icons';

import * as JsSearch from 'js-search';
import { Notifications } from 'expo';

class Shop extends React.Component {

    position = [45.754516, 4.848909];

    constructor(props) {
        super(props);

        
        this.state = {
            listShops: [],
            latitude: null,
            longitude: null,
            error: null,
            isLoading: false,
            search: '',
            showCancelSearch: false,
            nativeSearch: null,
            searchList: null,
            openOrder: null
        }
    }


    async componentDidMount() {

      this.getNearShops();
    }

    /* _handleNotifications = async (notification) => {

      const {origin} = notification;

      if(origin == 'selected' && notification.data.orderID != undefined) {

        console.log("set true open order");
        this.setState({
          openOrder: true
        });
        this.props.screenProps.rootNavigation.navigate('Order');
      }
    } */
    

    getNearShops() {

      navigator.geolocation.getCurrentPosition(

        (position) => {
            
              this.state.latitude = position.coords.latitude;
              this.state.longitude = position.coords.longitude;
              this.state.error = null;

              this._getShops(this.position[0], this.position[1]);
          },
          () => {

              this._getShops(this.position[0], this.position[1]);
          },
          { 
              enableHighAccuracy: false, 
              timeout: 20000, 
              maximumAge: 1000 
          },
      );
    }

    _parseForSearch() {
      var searchIndex = new JsSearch.Search('name');
      searchIndex.addIndex('name');
      searchIndex.addIndex('type');
      searchIndex.addIndex('adress');
      searchIndex.addIndex('categorieCata');
      searchIndex.addIndex('zip');


      for(var i in this.state.listShops) {

        const parsedCata = JSON.parse(this.state.listShops[i].catalogue);

        this.state.listShops[i].categorieCata = [];

        for(var j in parsedCata) {

          this.state.listShops[i].categorieCata.push(parsedCata[j].name);
        }
      }

      searchIndex.addDocuments(this.state.listShops);

      this.setState({
        searchList: searchIndex
      });
    }

    _setSearch(text) {

      const isEmpty = text.length > 0;

      if(isEmpty) {

        this.setState({
          listShops: this.state.searchList.search(text),
          search: text,
          showCancelSearch: isEmpty
        });
      } else {

        this.setState({
          listShops: this.state.nativeSearch,
          search: text,
          showCancelSearch: isEmpty
        });
      }
    }

    resetSearch() {

      this.setState({
        listShops: this.state.nativeSearch,
        search: '',
      });
    }

    displaySearchAction() {

      if(this.state.showCancelSearch) {

          return (
            <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
            <View style= {{height : 35, justifyContent: 'center', alignItems :'center', paddingHorizontal : 5}}>
              <AntDesign 
                name = "closecircle" 
                size={13} 
                color ="#cacaca"
                onPress={() => {

                  this.resetSearch();
                }}
              />
            </View>


            <View style= {{ backgroundColor : '#fff', width : 1, height: 35, justifyContent :'center', alignItems :'center'}}>
              <View style= {{ backgroundColor : '#cacaca', width : 1, height: 25}}>
              </View>
            </View>

            <TouchableOpacity 
              style ={{height : 35, justifyContent:'center', paddingHorizontal : 5}}
              onPress={() => {

                this._setSearch('');
                Keyboard.dismiss();
              }}
            >
              <Text style={{fontSize : 15, fontWeight : '400', color : '#000'}}>Annuler</Text>
            </TouchableOpacity>
          </View>);
      }
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
                listShops: data,
                isLoading: false,
                nativeSearch: data
            });
            this._parseForSearch();
        })
        .catch(err => {

            console.log(err);
        })
    }

    _keyExtractor = (item, index) => item._id;

    showShop = id => {

      if(typeof this.state.listShops[id].catalogue != 'object') {

        this.state.listShops[id].catalogue = JSON.parse(this.state.listShops[id].catalogue);
      }
      

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

    _onRefresh = () => {
      
      this.getNearShops();
    };

    renderListShop = item => {

        var strType = item.item.type.join(" • ");
        
        let currency = convertCurrency(item.item.currency);
        
        var strPrice = "";

        for(var i = 0; i < item.item.rate_price; i++) {

          strPrice += currency;
        }

        strPrice += " • ";

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

                        

                        <View style={styles.containerNote}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.priceRange}>{strPrice}</Text>
                          <Text style={styles.descriptionRestaurant}>{strType}</Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{backgroundColor :'#F0F0F0', borderRadius :2, padding :4}}>
                              <Text style={styles.waitingTime}>{item.item.average_time_prep}</Text>
                            </View> 
                            <View style={{backgroundColor :'#F0F0F0', borderRadius :2, padding : 4, marginLeft : 5}}>
                              <Text style={styles.noteRestaurant}> {(item.item.sum_note/item.item.nb_note).toFixed(1)} ★</Text>
                            </View>
                          </View>

                        </View>
                    </View>
                  </View>

          </TouchableOpacity>
        );
    }

    render() {
      
        return (
            <View style={{flex : 1, backgroundColor : '#fff'}}>

              {/* Avant clic sur icon recherche */} 
                 {/* <View style={styles.header}>

                <View style={{flex : 1 ,backgroundColor :'#fff', marginTop : 20, flexDirection : 'row',justifyContent : 'space-between', alignItems : 'center',}}>
              
                <View style = {{height : 35, justifyContent : 'flex-end'}}>

                    <TouchableOpacity style={styles.headerLeft}>

                        <View style ={{ marginVertical : 2}}>
                          <Feather name="clock" size={15} color="#00b38B"/> 
                          </View>  

                          <View style={{}}>                          
                          <Text style={{color : '#404040', fontSize : 17, fontWeight : '500', paddingLeft : 5}}>Dés que possible</Text> 
                          </View>

                    </TouchableOpacity>
                    </View>
 
                    
                    <View style={{height: 35, justifyContent :'flex-end', alignItems: 'center', }}>

                    <TouchableOpacity style = {{paddingEnd : 20, marginVertical : -2, flexDirection :'row'}}>
                    <Ionicons name="ios-search" size={22} color="#000"/>
                    </TouchableOpacity>
                    </View>

                </View>
                </View> */}

                 {/* ////////////////////////////////////////////// */}

                 {/* Après clic sur icon recherche */}

                  {<View style={styles.header2}>

                    <View style={{flex : 1 ,backgroundColor :'#fff', marginTop : 20, flexDirection : 'row',justifyContent : 'space-between', alignItems : 'center',}}>

                      <View style={{flex : 1, flexDirection: 'row', alignItems :'center',backgroundColor : "#fff", borderRadius : 8, paddingStart: 20,}}>
                    
                        <Ionicons name="ios-search" size={18} color="#000"/>
                                        
                        <TextInput 
                          style ={{height : 35, flex : 1, paddingHorizontal: 8, fontWeight : '300', color : '#000'}}
                          placeholder= "Trouver un restaurant"
                          onChangeText={(text) => {

                            this._setSearch(text);
                          }}
                          onFocus={() => {

                            this.setState({

                              showCancelSearch: true
                            });
                          }}
                          value={this.state.search}
                        /> 

                      </View>

                      {this.displaySearchAction()}
                      </View>
                  </View>}
                


                 {/* ////////////////////////////////////////////////// */}



                    {/* <View style= {{height: 1, backgroundColor : '#E8E8E8' ,}}>        
                </View> */}


               <FlatList
                    data={this.state.listShops}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderListShop}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this._onRefresh}
                      />
                    }
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
      backgroundColor: '#ECEFF1'
    
    },
    header :{
      height : 70,
      backgroundColor : '#fff',      
      shadowColor: "#808080",
      shadowOffset: {
	    width: 0,
	    height: 1,},
      shadowOpacity: 0.22,
      shadowRadius: 20,
      

      },

      header2 :{
        height : 80,
        backgroundColor : '#fff',
        shadowColor: "#808080",
        shadowOffset: {
        width: 0,
        height: 1,},
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
  
        },

    headerLeft:{
      backgroundColor :'#fff',
      paddingLeft : 20,
      paddingRight : 10,
      justifyContent : 'center',
      flexDirection :'row',
    },
    headerCenter:{
      height : '50%',
      justifyContent : 'flex-end',
      alignItems : 'center'
    },

    headerRight: {
     
      marginRight : 15,
      /* alignItems : 'flex-end',
      justifyContent :'flex-end' */
      },

      containerCardItem: {
        
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 20
      },
    
      containerPicture:{
        alignItems: 'center',
        paddingHorizontal : 20,
        paddingVertical : 5,
      },

      pictureButton:{
        borderRadius: 3,
        width : '100%',
        
      },
      pictureLogo:{
        height: 150,
        
        borderRadius: 3
      },
    
      containerDescription:{
        
        paddingHorizontal: 20
      },

      nameRestaurant: {
        fontSize: 16,
        color: '#404040',
        fontWeight :'400',
        marginTop: 5,
      },
      priceRange: {
        color : '#808080',
        fontSize: 14,
      },
      descriptionRestaurant: {
        fontSize: 14,
        fontWeight :'400',
        color: '#808080'
      },
      containerNote:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent : 'space-between',
        paddingVertical : 5,
      },
      noteRestaurant :{
        color :'#24445C',
        fontSize: 13,
        fontWeight :'400', 
      },
      waitingTime:{
        fontSize: 13,
        fontWeight :'400', 
      },
      
  
    });