import React from 'react';
import { Appbar } from 'react-native-paper';
import { View, Text, TextInput,TouchableHighlight,Image,Dimensions,FlatList, Platform, Linking,Button, StyleSheet, ScrollView ,TouchableOpacity } from 'react-native';

import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import store from '../redux/store.js';
import apiUrl from '../../config/api.url.js';

import convertCurrency from '../../tools/convertCurrency.js';

import { connect } from 'react-redux';

import openMap from 'react-native-open-maps';

class Catalogue extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            catalogue: [],
            isModalVisible: false,
            ref: null,
            selectedSupps: [],
            showSupps: false,
            supplements: []
        }
    }

    componentWillMount() {

        let tmpShop = this.props.navigation.getParam('shopData', null);

        var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';

        let currency = convertCurrency(tmpShop.currency);
        
        var strPrice = "• ";

        for(var i = 0; i < tmpShop.rate_price; i++) {

          strPrice += currency;
        }
        
        if(tmpShop != null) {

            this.setState({
                catalogue: tmpShop.catalogue,
                shopName: tmpShop.name,
                note: (tmpShop.sum_note/tmpShop.nb_note).toFixed(1),
                adress: tmpShop.adress + " " + tmpShop.zip + " " + tmpShop.city,
                urlMap: scheme + tmpShop.latitude + ',' + tmpShop.longitude,
                currency: currency,
                priceRange: strPrice,
                position: {
                    latitude: tmpShop.latitude,
                    longitude: tmpShop.longitude
                },
                logo: {
                    uri: apiUrl + tmpShop.logo
                }
            });
        }
    }

    _keyExtractor = (item, index) => index.toString();

    extractSupps(supp) {

        var resObject = [];
  
        for(var i in supp) {
  
          var tmpObj = {
            name: supp[i].question,
            id: i,
            children: []
          };
  
          for(var j in supp[i].list) {
  
            tmpObj.children.push({
              name: supp[i].list[j].nom,
              id: JSON.stringify([i, j])
            })
          }
  
          resObject.push(tmpObj);
        }
  
        return resObject;
      }
  
      addBasket = () => {
  
          var cardItem = this.state.catalogue[this.state.ref[0]].content[this.state.ref[1]];
  
          var item = {
              ref: this.state.ref,
              supps: this.state.selectedSupps.map(e => JSON.parse(e)),
              nom: cardItem.name,
              nom_supps: [],
              prix: 0,
              quantity: 1
          };
  
          var total = Number(cardItem.prix);
  
          for(var i in item.supps) {
  
              let x = item.supps[i][0];
              let y = item.supps[i][1];
  
              item.nom_supps.push(cardItem.supplements[x].list[y].nom);
  
              total += Number(cardItem.supplements[x].list[y].prix);
          }
  
          item.prix = total;
  
          store.dispatch({
              type: 'ADD_ITEM',
              item: item,
              prix: total*item.quantity
          });
  
          this.setState({
            selectedSupps: [],
            showSupps: false
          });
      }

    renderCatalogue = (item) => {

        return(
            <View style={styles.cardItemName}> 
                <View style={styles.containerName}>
                    <Text style={styles.nameCategory}>{item.item.name}</Text>
                </View>

                <FlatList
                    data={item.item.content}
                    keyExtractor={this._keyExtractor}
                    renderItem={(childItem) => this.renderProduit(childItem, item.index)}
                />
                <View style={styles.greyLine}>
                </View>
            </View>
            );
    }

    showSupplement = (item) => {

        this.setState({
            ref: item.item.ref,
            supplements: item.item.supplements
        });
        this.addBasket();

        /* this.setState({
            ref: item.item.ref,
            supplements: item.item.supplements,
            showSupps: true
        }); */
    }

    renderProduit = (item, motherIndex) => {

        item.item.ref = [motherIndex, item.index];

        return (

            <TouchableOpacity 
                style={styles.categoryCustom}
                onPress={this.showSupplement.bind(this, item)}
            >
                    <Text style={styles.itemName}>{item.item.name}</Text>
                    <Text style={styles.itemDescription}>{item.item.desc}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.itemPrice}>{item.item.prix}{this.state.currency}</Text>
                        </View>
                        <View style={styles.greyLine}>
                        </View>
            </TouchableOpacity>
        );
    }

    render() {

        return (
            <View style={{flex : 1, backgroundColor: '#f5f5f5'}}>

                               
                <Appbar
                    style={{backgroundColor :'#fff', paddingTop: 25 ,height: 65, justifyContent: 'flex-end',}}
                >
                    <Appbar.Action
                        style={{backgroundColor :'#fff',}}
                        size={20}
                        icon ="arrow-back"
                        onPress={() => {

                            this.props.navigation.goBack();
                        }}
                    />
                    <Appbar.Content
                        style={{backgroundColor :'#fff'}}
                        color= '#000'
                        title= {this.state.shopName}
                        />
                    <Appbar.Action
                    
                    />
                                        
                </Appbar>

                <View style= {{height: 1, backgroundColor : '#E8E8E8' }}>        
                </View>

                <ScrollView style={{flex : 1 }}>   


{/* ----------------------------------------NAME/DESCRIPTION---------------------------------------------------- */}
                <View style={styles.containerCardItem}>

                    <View style={styles.containerLogo}>
                    <Image style={styles.pictureLogo}
                    source={this.state.logo}
                    />
                    </View>

                    <View style={styles.descriptionRestaurant}>
                        <Text style={styles.nameRestaurant}>{this.state.shopName}</Text>

                        <View style={styles.containerNote}>
                            <View style={{backgroundColor :'#F0F0F0', flexDirection : 'row', alignItems : 'center', justifyContent : 'center', borderRadius : 5, padding : 2}}>
                                <Ionicons name="md-star" size={20} color="#00b38B"/>
                                <Text style={styles.noteRestaurant}>{this.state.note}</Text>
                                <Text style={styles.priceRange}>{this.state.priceRange}</Text>
                            </View>
                            <TouchableOpacity 
                                style={{paddingLeft : 10, flexDirection: 'row', justifyContent : 'center', alignItems: 'center'}}
                                onPress={() => {

                                    openMap({ travelType: 'walk', end: this.state.adress });
                                }}
                            >
                                <MaterialCommunityIcons name="map-marker" size={22} color="#00b38B" />
                                <Text style={{fontWeight: '400', color : '#646464', fontSize: 15, color :'#00b38B'}}>1.2km</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                        onPress={() => {

                            openMap({ travelType: 'walk', end: this.state.adress });
                        }}
                        >
                        <Text style={styles.descriptionText}>
                            {this.state.adress}
                        </Text>
                        </TouchableOpacity>

                        </View>

                    </View>

                    <View style={styles.greyLine}>
                    </View>

                    <View style={styles.foodAllergy}>
                    <Text style={styles.allergyText}>Vous pouvez renseigner vos détails allergies dans votre panier.</Text>
                    </View>

                    {/* --------------------------------------------------------------------------------------------------------- */}
            
                    <View style={styles.containerMain}>

                        <FlatList
                            data={this.state.catalogue}
                            keyExtractor={this._keyExtractor}
                            renderItem={this.renderCatalogue}
                        />
                    </View>

                </ScrollView>

            <TouchableHighlight
                style={styles.footerContainer}
                onPress={() => {
                    this.props.navigation.navigate('Basket',{ 
                        shopData: this.state
                    });
                }}
            >

                <View 
                style={{flexDirection: 'row',backgroundColor:'#14a093', flex : 1, paddingHorizontal: 10, justifyContent :'space-between'}}            
                >


                <View style={{flexDirection : 'row', flex : 1, justifyContent: 'space-between', alignItems: 'center'}}>
                    
            
                    <View style={{alignItems: 'flex-start', backgroundColor: '#108075',borderRadius : 5}}>
                        <Text style={{fontSize: 16, fontWeight : '600', color : '#fff', marginHorizontal: 4,marginVertical : 2,}}>{this.props.basketSize}</Text>
                    </View>
                    
                    
                    <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight : '600', color : '#fff'}}>Voir la commande</Text>
                    </View>
                    <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight : '600', color : '#fff'}}>{this.props.total}{this.state.currency}</Text>
                    </View>

                </View>
                
                </View>
                
            </TouchableHighlight>

            <SectionedMultiSelect
                items={this.extractSupps(this.state.supplements)}
                uniqueKey="id"
                subKey="children"
                showDropDowns={false}
                readOnlyHeadings={true}
                hideSearch={true}
                showCancelButton={true}
                showChips={false}
                showModal={this.state.showSupps}
                hideSelect={true}
                onSelectedItemsChange={(selectedSupps) => {

                    this.setState({ selectedSupps });
                }}
                selectedItems={this.state.selectedSupps}
                onConfirm={() => {

                    this.addBasket();
                }}
                onCancel={() => {

                    this.setState({
                        selectedSupps: [],
                        showSupps: false
                    });
                }}
            />

            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(Catalogue);

const styles = StyleSheet.create({
    container:{
      flex: 1 ,
      backgroundColor: '#ECEFF1'
    /* -------------------------------------------------------HEADER--------------------------------------------------------- */
    },
    header :{
      height : 65,
      backgroundColor : '#fff',
      flexDirection : 'row',    
      justifyContent : 'center',
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
      height : '75%',
      marginRight : 15,
      alignItems : 'flex-end',
      justifyContent :'flex-end'
      },
/* ------------------------------------------------------------------------------------------------------ */
      
    containerCardItem:{
        backgroundColor: '#FFF',
        flexDirection : 'row',

    },
    containerLogo:{
        backgroundColor: '#FFF',
        padding: 10

    },
    pictureLogo:{
        width: 150,
        height: 150,
        borderRadius : 10
    },
    descriptionRestaurant:{
        flex : 1,
        backgroundColor: '#fff',
        padding : 10
    },
    nameRestaurant:{
        fontSize: 20,
        fontWeight: '700',
    },
    containerNote:{
        flexDirection:'row',
        alignItems: 'center',
        marginVertical: 5
        
    },
    noteRestaurant:{
        color :'#00b38B',
        fontSize: 13,
        fontWeight :'300',
        marginLeft : 5
    },
    priceRange:{
        color : '#808080',
        marginLeft: 10
    },
    descriptionText:{
        color : '#808080',
        fontSize: 13,
        fontWeight: '500'
    },
    greyLine:{
        flex: 1,
        backgroundColor: '#e0e0e0',
        height: 0.8,
    },

    foodAllergy:{
       
        alignItems: 'center',
        paddingTop: 20, 
    },
    
    allergyText:{
        color: '#808080',
        fontSize: 13,
        fontWeight: '500',
        justifyContent: 'center'
    },
    containerMain:{
        
        marginBottom: 55
    },
    containerName:{
        paddingLeft : 15,
        paddingVertical: 15,
        
    },
    nameCategory:{
        color: '#000',
        fontSize: 18,
        fontWeight: '600'
    },
    categoryCustom:{
        backgroundColor: '#FFF',
        paddingTop: 10,
        paddingLeft: 15
    },
    itemName:{
        color: '#000',
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 5
    },
    itemDescription:{
        color: '#8e8e8e',
        fontSize: 13,
        fontWeight: '500',
    },
    priceContainer:{
        backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems:'flex-end',
        marginBottom: 5
    },
    itemPrice:{
        marginTop: 10,
        fontSize: 15,
        fontWeight: '400',
        marginRight:10
    },
    popularity:{
        color:'#0fdfbd',
        fontSize: 15,
        fontWeight: '500',
        marginLeft:5
    },

    /* -------------------------------------FOOTER----------------------- */
    footerContainer:{

        backgroundColor :'#fff', 
        flex : 0.085, 
        width: '100%', 
       }
    
    });