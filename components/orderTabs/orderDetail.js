import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, StatusBar, ScrollView } from 'react-native';

import convertCurrency from '../../tools/convertCurrency.js';

export default class OrderDetail extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        var item = this.props.navigation.getParam('item', "no_data");
        item.displaynum = parseInt(item._id.substr(item._id.length - 4), 16);
        item.displaytotal = item.total + convertCurrency(item.currency);
        item.zipdisplay = item.zip + " " + item.city;

        return (
            <View style={styles.container}>

            <StatusBar
              barStyle="dark-content"
              />
    
              <View style={styles.containerHeader}>
                </View>
    
              <ScrollView>
    
              <View style={styles.containerDetails}>
    
                <TouchableOpacity style={styles.containerName}>
                  <Text style={styles.name}>{item.shop_name}</Text>
                </TouchableOpacity>
    
                <View style={styles.containerOrderNumber}>
                  <Text style={styles.orderNumberHeader}>Numéro de commande</Text>
                  <Text style={styles.orderNumber}>{item.displaynum}</Text>
                </View>
    
                <View style={styles.containerAdress}>
                  <Text style={styles.adressHeader}>Récupérée au</Text>
                  <Text style={styles.adress}>{item.shop_adress}</Text>
                  <Text style={styles.zipCode}>{item.zipdisplay}</Text>
                </View>
    
                <View style={styles.containerStatus}>
                  <Text style={styles.statusHeader}>Statut</Text>
                  <Text style={styles.status}>En cours 8 avril 2018</Text>
                </View>
    
                </View>
    
                <View style={styles.line}>
                  </View>
    
                <View style={styles.containerReceipt}>
                    <View style={styles.containerHeaderArticles}>
                      <Text style={styles.headerText}>Articles & Paiement</Text>
                    </View>
    
                        <View>
                        <View style={styles.containerOrderDetails}>

        <View style={styles.orderDetails}>
          <View style={styles.numberOfArticle}>
            <Text style={styles.textNumberOfArticle}>1x</Text>
            </View>
          <View style={styles.contentOfArticle}>
            <Text style={styles.textContentOfArticle}>Menu Burger végétarien</Text>
            </View>
          <View style={styles.priceOfArticle}>
            <Text style={styles.textContentOfArticle}>11,90€</Text>
          </View>

        </View>

      </View>
                        </View>
    
                        <View style={styles.line}>
                          </View>
    
                      <View style={styles.containerPayment}>
                        <Text style={styles.totalText}>Total</Text>
                        <Text style={styles.totalText}>{item.displaytotal}</Text>
                      </View>
    
                    </View>
    
                  </ScrollView>
    
          </View>
        );
    }
}



const styles = StyleSheet.create({
    container:{
      flex: 1 ,
      backgroundColor: '#fafbfb'
    },
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
      height: 1
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
    
});