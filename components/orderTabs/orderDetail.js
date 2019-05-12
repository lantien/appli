import React from 'react';
import { StyleSheet, View, Animated, FlatList,TouchableOpacity, Text, StatusBar, ScrollView } from 'react-native';

import { Localization } from 'expo';

import convertCurrency from '../../tools/convertCurrency.js';
import { connect } from 'react-redux';

import moment from 'moment';
import 'moment/locale/fr';

class OrderDetail extends React.Component {

  static navigationOptions = {
      title: 'Order Details',
  };

  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }


    constructor(props) {
        super(props);

    }

    componentWillMount() {

      moment.locale(Localization.locale.substring(0, 2));
    }

    convertDate(date) {

      return moment(date, 'MM/DD/YYYY').format('dddd DD MMMM').toString();
    }

    shouldComponentUpdate(nextState) {

      if(nextState.token == "") {

        return false;
      } else {

        return true;
      }
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = (orderList) => {
      
      let tmpPrice = orderList.item.prix + convertCurrency(this.props.order.currency);
      return (
        <View style={styles.orderDetails}>
          <View style={styles.numberOfArticle}>
            <Text style={styles.textNumberOfArticle}>1x</Text>
          </View>
          <View style={styles.contentOfArticle}>
            <Text style={styles.textContentOfArticle}>{orderList.item.prod}</Text>
            </View>
          <View style={styles.priceOfArticle}>
            <Text style={styles.textContentOfArticle}>{tmpPrice}</Text>
          </View>
        </View>
      );
    }

    componentDidMount() {

      Animated.timing(                  // Animate over time
        this.state.fadeAnim,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 200,              // Make it take a while
        }
      ).start();
    }

    render() {

        var item = this.props.order;
        item.displaynum = parseInt(item._id.substr(item._id.length - 4), 16);
        item.displaytotal = item.total + convertCurrency(item.currency);
        item.zipdisplay = item.zip + " " + item.city;

        let { fadeAnim } = this.state;

        return (

          <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >

          
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
                  <Text style={styles.status}>En cours {this.convertDate(item.createdAt)}</Text>
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

        <FlatList
          data={this.props.order.content}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />

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
          </Animated.View>
        );
    }
}

function mapStateToProps(state) {

  return state;
}

export default connect(mapStateToProps)(OrderDetail);


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