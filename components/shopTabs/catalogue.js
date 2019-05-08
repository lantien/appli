import React from 'react';
import { Appbar } from 'react-native-paper';
import { View, Text, TextInput,TouchableHighlight,Image,Dimensions,FlatList, Platform, Linking,Button, StyleSheet, ScrollView ,TouchableOpacity } from 'react-native';

import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import apiUrl from '../../config/api.url.js';

import convertCurrency from '../../tools/convertCurrency.js';

import { connect } from 'react-redux';

class Catalogue extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            catalogue: [],
            isModalVisible: false
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
                priceRange: strPrice
            });
        }
    }

    _keyExtractor = (item, index) => index.toString();

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

        this.props.navigation.navigate('addBasket', {
            item
        });
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
                        <Text style={styles.itemPrice}>{item.item.prix}</Text>
                        </View>
                        <View style={styles.greyLine}>
                        </View>
            </TouchableOpacity>
        );
    }

    render() {

        let pic ={
            uri: 'https://scontent-cdt1-1.xx.fbcdn.net/v/t31.0-8/13403146_184981928566610_276148320834237026_o.jpg?_nc_cat=105&_nc_ht=scontent-cdt1-1.xx&oh=d820c14f5b388820204a2d36a0f395a5&oe=5D40135A'
          }

        return (
            <View style={{flex : 1, backgroundColor: '#f5f5f5'}}>

                               
                <Appbar
                    style={{backgroundColor :'#fff', paddingTop: 25 ,height: 65, justifyContent: 'flex-end',}}
                >
                    <Appbar.Action
                        style={{backgroundColor :'#fff',}}
                        size={20}
                        icon ="arrow-back"
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
                    source={pic}
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
                                    Linking.openURL(this.state.urlMap);
                                }}
                            >
                                <MaterialCommunityIcons name="map-marker" size={22} />
                                <Text style={{fontWeight: '400', color : '#646464', fontSize: 15}}>1.2km</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.descriptionText}>
                            {this.state.adress}
                        </Text>

                        </View>

                    </View>

                    <View style={styles.greyLine}>
                    </View>

                    <View style={styles.foodAllergy}>
                    <Text style={styles.allergyText}>Vous pouvez renseignez vos détails allergies dans votre panier.</Text>
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
                    this.props.navigation.navigate('Basket');
                }}
            >

                <View 
                style={{flexDirection: 'row',backgroundColor:'#4cbb17', flex : 1, paddingHorizontal: 10,}}            
                >


                <View style={{flexDirection : 'row', flex : 1, justifyContent: 'center', alignItems: 'center'}}>
                        
                    <View style={{flex: 0.2, alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 16, fontWeight : '600', color : '#fff', backgroundColor: '#44a814', padding : 3}}>0</Text>
                    </View>
                    
                    <View style={{flex : 0.7, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight : '600', color : '#fff'}}>Voir la commande</Text>
                    </View>
                    <View style={{flex: 0.2, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight : '600', color : '#fff'}}>{this.props.total}{this.state.currency}</Text>
                    </View>

                </View>

                <View style={{}}>
                    
                </View>

                <View style={{}}>
                    
                </View>
                
                </View>
                
            </TouchableHighlight>

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