import React from 'react';
import { View, Text, TextInput,TouchableHighlight,Image,Dimensions,FlatList, Button, StyleSheet, ScrollView ,TouchableOpacity } from 'react-native';

import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import apiUrl from '../../config/api.url.js';

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

        this.setState({
            catalogue: this.props.navigation.getParam('shopData', []).catalogue
        });
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
               <View style={styles.header}>

                    <View style={styles.headerLeft}> 

                    </View>


                    <View style={styles.headerCenter}>
                        <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>Home</Text>
                    </View>

                    <View style = {styles.headerRight}>
                    <TouchableOpacity
                        style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}
                        onPress={() =>{

                            this.props.navigation.navigate('Basket');
                        }}
                    >

                        <Ionicons name="md-basket" size={20} color="#00b38B"/>
                        <Text style={{paddingLeft : 5}}>
                        {this.props.total}
                        </Text>
                    </TouchableOpacity>

                    </View>
                    
                </View>

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
                        <Text style={styles.nameRestaurant}>Antoinette Pain & Brioche </Text>

                        <View style={styles.containerNote}>
                            <View style={{backgroundColor :'#F0F0F0', flexDirection : 'row', alignItems : 'center', justifyContent : 'center', borderRadius : 5, padding : 2}}>
                                <Ionicons name="md-star" size={20} color="#00b38B"/>
                                <Text style={styles.noteRestaurant}>4.2</Text>
                                <Text style={styles.priceRange}>• €</Text>
                            </View>
                            <TouchableOpacity style={{paddingLeft : 10}}>
                                <MaterialCommunityIcons name="map-marker" size={22} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.descriptionText}>
                            117 Rue Sébastien Gryphe, 69007 Lyon 
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
    }    


    
    });