import React from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from 'react-native';


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

    _keyExtractor = (item, index) => item.name;

    _keyExtractorProd = (item, index) => item.prod;

    renderCatalogue = (item) => {

        return(
            <View>
                <Text h1
                >
                    {item.item.name}

                    
                </Text>

                <FlatList
                    data={item.item.content}
                    keyExtractor={this._keyExtractorProd}
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
               <Text>Show shop</Text>
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