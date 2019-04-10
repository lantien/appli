import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';


import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

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
            <View>

                <Text h1>
                    {item.item.name}
                </Text>
                <FlatList
                    data={item.item.content}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderProduit}
                />
            </View>

            );
    }

    showSupplement = (item) => {

        this.props.navigation.navigate('addBasket', {
            item
        });
    }

    renderProduit = item => {

        return (
            <View>
                <Button
                    title={item.item.prod + " " + item.item.prix}
                    color="#841584"
                    onPress={this.showSupplement.bind(this, item)}
                />
            </View>
        );
    }

    render() {

        return (
            <View>
               <View style={styles.header}>

                    <View style={styles.headerLeft}> 

                    </View>


                    <View style={styles.headerCenter}>
                        <Text style = {{color:'#000', fontWeight : '700', fontSize: 15}}>Home</Text>
                    </View>

                    <View style = {styles.headerRight}>
                    <Text
                        onPress={() =>{

                            this.props.navigation.navigate('Basket');
                        }}
                    >

                        {this.props.total}
                    </Text>

                    </View>

                </View>
                            <FlatList
                    data={this.state.catalogue}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderCatalogue}
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