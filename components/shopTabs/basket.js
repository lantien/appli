import React from 'react';
import { View, Text, FlatList, ScrollView  ,Button , StyleSheet , TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback,TextInput} from 'react-native';
import { Appbar } from 'react-native-paper';


import { AntDesign,Ionicons, MaterialIcons, Feather } from 'react-native-vector-icons'


import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import convertCurrency from '../../tools/convertCurrency.js';

import { connect } from 'react-redux';

class Basket extends React.Component {

    constructor(props) {
        super(props);

    }

    makeOrder = () => {

        fetch(apiUrl + 'me/order', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': store.getState().token
            },
            body: JSON.stringify({
                shopID: this.props.shopID,
                orderContent: this.props.basket,
                currency: this.props.currency
            })
        })
        .then(data => {
  
            return data.json();
        })
        .then(data => {

          var date = new Date(data.createdAt);

          data.createdAt = date.toLocaleDateString();
          //data.symbol = convertCurrency(data.currency);
          data.heure = date.getHours() + ":" + date.getMinutes();
  
          store.dispatch({
            type: 'ADD_ORDER',
            orderList: data
          });
        })
        .catch(err => {
  
            console.log(err);
        })
    }

    deleteItem = (id, prix) => {

        store.dispatch({
            type: 'REMOVE_ITEM',
            obj: {
                id,
                prix
            }
        });
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = (item) => {

        let id = item.index;

        item = item.item;
        return (            
      
            <View style={styles.orderDetails}>
                <View style={styles.numberOfArticle}>
                    <Text style={styles.textNumberOfArticle}>1x</Text>
                </View>
                <View style={styles.contentOfArticle}>
                    <Text style={styles.textContentOfArticle}>{item.nom}</Text>
                    </View>
                <View style={styles.priceOfArticle}>
                    <Text style={styles.textContentOfArticle}>{item.prix}</Text>
                </View>
                <Button
                    onPress={() => {

                        this.deleteItem(id, item.prix);
                    }}
                    title="X"
                    color="#841584"
                />
            </View>
        );
    }

    render() {

        return (
            <View style={{flex:1, backgroundColor : '#fff'}}>

{/* ------------------------------------------------------------HEADER------------------------------------------------- */}
            <Appbar
                    style={styles.header}
                >
                    <Appbar.Action
                        style={{backgroundColor :'#fff',}}
                        size={20}
                        icon ="close"
                        onPress={() => {

                            this.props.navigation.goBack();
                        }}
                    />
                    <Appbar.Content
                        style={{backgroundColor :'#fff'}}
                        color= '#000'
                        title= "Votre panier"
                        />
                    <Appbar.Action
                    
                    />
                                        
                </Appbar>

            <View style= {{height: 1, backgroundColor : '#E8E8E8' ,}}>        
                </View>

              {/* ----------------------------------------------------------------------------------------- */}

          <ScrollView>

          <View style={{backgroundColor : '#fff', justifyContent: 'center', alignItems : 'center', paddingTop: 20}}>
            
              <Text style={{fontSize: 23, fontWeight : '400'}}>Antoinette Pain & Brioche</Text>
              
            </View>
            <View>

          <TouchableOpacity style={{justifyContent: 'center', alignItems:'center', paddingTop: 10, paddingBottom: 25}}>
              <Text style={{fontSize: 13, fontWeight: '500'}}>117 Rue Sébastien Gryphe, 69007 Lyon</Text>
          </TouchableOpacity>
            
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom :25}}>
            <View style={{height :1.2, backgroundColor: '#505050', width : '8%'}}></View>
            </View>
            
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 25}}>
                <MaterialIcons name="timer" size={17} color="#505050"/>
                <Text style={{color:'#505050', fontWeight: '500', paddingStart: 10}}>Dés que possible</Text>
                </TouchableOpacity>
          
          {/* --------------------------------------------- ITEM BASKET ------------------------------- */}
          <View style={styles.line}>
                </View>

            <View style={styles.containerCardItem}>
        <View style={styles.containerLeft}>

            <TouchableOpacity style={styles.containerMinus}>
              <Feather name="minus" size={17} color="#00b38B"/>
              </TouchableOpacity>

            <View style={styles.containerNumber}>
              <Text style={styles.numberOfArticle}>1</Text>
              </View>

            <TouchableOpacity style={styles.containerPlus}>
              <Feather name="plus" size={17} color="#00b38B"/>
              </TouchableOpacity>
          </View>

          <View style={styles.containerCenter}>
          <View style={styles.contentOfArticle}>
            <Text style={styles.textContentOfArticle}>Menu midi (Sandwich, Canette, ...</Text>
            </View>
          <View style={styles.priceOfArticle}>
            <Text style={styles.textContentOfArticle}>5,50€</Text>
          </View>

              {/* ---------------------------------------------------------------------------------------------- */}
           
           </View>

        </View>
              </View>

              <View style={styles.line}>
                </View>

                  <View style={styles.containerPayment}>
                    <View style={styles.containerTotal}>
                      <Text style={styles.totalText}>Total</Text>
                      <Text style={styles.tvaText}> (incl. TVA)</Text>
                      </View>
                    <Text style={styles.totalPrice}>22€</Text>
                  </View>

                <View style={styles.line}>
                  </View>

                <View style={styles.containerInstructions}>

                  <TouchableWithoutFeedback style={{width : '100%'}}>
                    <Text style={{color : '#808080', fontSize : 14, fontWeight : '500'}}>Ajouter un commentaire</Text>
                    </TouchableWithoutFeedback>
                  </View>
                  
                  <View style={styles.line}>
                  </View>
              
                <Text>Show basket</Text>
                <FlatList
                    data={this.props.basket}
                    extraData={this.props}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
                
          
          </ScrollView>

          <View style={styles.containerFooter}>
              <View style={styles.containerButton}>
                <TouchableOpacity style={styles.confirmButton}
                  onPress={this.makeOrder}
                >
                  <Text style={styles.buttonText}>Confirmer</Text>
                  </TouchableOpacity>
                </View>
            </View>

            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(Basket);

const styles = StyleSheet.create({
    container:{
      flex: 1 ,
      backgroundColor: '#fafbfb'
    },

/* -----------------HEADER------------------------- */
header :{
    backgroundColor :'#fff', 
    paddingTop: 25 ,
    height: 65, 
    justifyContent: 'flex-end', 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    
    elevation: 1,
  },

headerLeft:{
  backgroundColor :'#fff',
  flex :1/3,
  height : '75%',
  marginLeft : 10,
  justifyContent : 'flex-end',
  alignItems :'flex-start'

},
headerCenter:{
  backgroundColor :'#fff',
  flex :1/3,
  height : '75%',
  justifyContent : 'flex-end',
  alignItems : 'center',
  paddingBottom :3,
  paddingLeft :2,
},

headerRight: {
  flex :1/3,
  height : '50%',
  marginRight : 15,
  alignItems : 'flex-end',
  justifyContent :'flex-end'
  },

  /* ---------------FIN HEADER----------------------- */





    // Partie Supérieure
    containerDetails:{
  
      padding: 5,
      alignItems: 'center'
  
    },
    containerName:{
      marginTop: 5
    },
    name: {
      fontSize: 23,
      fontWeight: 'bold'
    },
    containerOrderNumber:{
      alignItems: 'center',
      marginTop: 30
    },
    orderNumberHeader:{
      fontSize: 13,
      fontWeight: '500',
      color: '#8e8e8e',
      marginBottom: 5
    },
    orderNumber:{
      fontSize: 20,
      fontWeight: '600',
      color: '#000'
    },
    containerAdress:{
      alignItems: 'center',
      marginTop: 25,
      marginBottom: 5
    },
    adressHeader:{
      fontSize: 13,
      fontWeight: '500',
      color: '#8e8e8e',
      marginBottom: 5
    },
    adress:{
      fontSize: 14,
      fontWeight: '400',
      color: '#000'
    },
    zipCode:{
      fontSize: 14,
      fontWeight: '400',
      color: '#000'
    },
    containerStatus:{
      alignItems: 'center',
      marginTop: 25,
      marginBottom: 10
    },
    statusHeader: {
      fontSize: 13,
      fontWeight: '500',
      color: '#8e8e8e',
      marginBottom: 5
    },
    status:{
      fontSize: 14,
      fontWeight: '400',
      color: '#000'
    },
    line:{
      backgroundColor: '#e0e0e0',
      height: 0.5
    },
    containerHeaderArticles:{
      alignItems: 'center',
      padding: 15
    },
    headerText:{
      fontSize: 13,
      fontWeight: '500',
      color: '#8e8e8e',
    },
  
    //Paiement
    containerPayment:{
      flexDirection: 'row',
      justifyContent:'space-between',
      paddingVertical: 15,
      paddingHorizontal: 10
    },
    totalText:{
      fontSize: 16,
      fontWeight: '600',
      color: '#000'
    },
    orderDetails:{
        flexDirection : 'row',
        marginBottom: 10
      },
      numberOfArticle:{
        padding: 10
      },
      textNumberOfArticle:{
        fontSize: 15,
        fontWeight: '500',
        color: '#8e8e8e',
      },
    
      contentOfArticle:{
        padding: 10,
        marginLeft: 5
      },
      textContentOfArticle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
      },
      priceOfArticle:{
        flex : 1,
        alignItems: 'flex-end',
        padding: 10
      },

      /* -------------------------CONTAINER CARD ITEM ----------------- */

      containerName2:{
        flexDirection:'row',
        marginTop: 10,
        alignItems: 'flex-end'
      },
      containerNameText:{
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 8
      },
      name:{
      fontSize: 15,
      fontWeight: '400'
    },
      line:{
        backgroundColor: '#DCDCDC',
        height: 0.5,
        flex: 1,
        alignItems: 'flex-end'
      },
      greyLine:{
        backgroundColor: '#e0e0e0',
        height: 1,
        flex: 1,
      },
      containerPayment:{
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
        
      },
      containerTotal:{
        flexDirection: 'row',
      },
      tvaText:{
        fontSize: 16,
        fontWeight: '500',
        color: '#8e8e8e',
    
      },
      totalText:{
        fontSize: 16,
        fontWeight: '600',
        color: '#000'
      },
      totalPrice:{
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        paddingHorizontal: 20
      },
    
      containerInstructions: {
        
        flexDirection: 'row',
        paddingHorizontal: 10, 
        paddingVertical: 15,   
      },
      containerTextInput:{
        backgroundColor :'#FFF',
        flex: 1
      },
      containerFooter:{
        backgroundColor: '#FFF',
        shadowOpacity: 0.1
      },
      containerButton:{
        alignItems: 'center',
        padding: 15,
    
      },
      confirmButton:{
        backgroundColor: '#00b38B',
        padding: 10,
        borderRadius: 3,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      },
      buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: '#FFF',
      },

      /* ---------------------- CARD ITEM ---------------------- */

      containerCardItem:{
        backgroundColor: '#FFF',
        flexDirection: 'row'
      },
      containerLeft:{
        backgroundColor: '#FFF',
        flexDirection: 'row'
      },
      containerMinus:{
        paddingVertical: 20,
        paddingHorizontal: 8
      },
      containerNumber:{
        paddingVertical: 20,
        paddingHorizontal: 8
      },
      numberOfArticle:{
        fontSize: 15,
        fontWeight: '400'
      },
      containerPlus:{
        paddingVertical: 20,
        paddingHorizontal: 8
      },
      
      // container Centre
      containerCenter: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
      },
      textContentOfArticle:{
        fontSize: 14,
        fontWeight: '400',
        color: '#000',
      },
      contentOfArticle:{
        paddingVertical: 20,
        paddingHorizontal: 10
      },
      priceOfArticle: {
        backgroundColor: '#FFF',
        padding: 20
      },
    
});