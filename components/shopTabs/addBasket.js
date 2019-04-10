import React from 'react';
import { View, FlatList, Button } from 'react-native';

import { Text } from 'react-native-elements';
import SelectMultiple from 'react-native-select-multiple';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import { connect } from 'react-redux';

class addBasket extends React.Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {

        var item = this.props.navigation.getParam('item', []).item;

        this.setState({
            ref: item.ref,
            supplements: item.supplements,
            selectedSupps: []
        });
    }

    addBasket = () => {

        var item = {
            ref: this.state.ref,
            supps: this.state.selectedSupps
        };

        var cardItem = this.props.navigation.getParam('item', []).item;

        var total = Number(cardItem.prix);

        for(var i in item.supps) {

            let x = item.supps[i].value[0];
            let y = item.supps[i].value[1];

            total += Number(cardItem.supplements[x].list[y].prix);
        }

        store.dispatch({
            type: 'ADD_ITEM',
            item: item,
            prix: total
        });
    }

    _keyExtractor = (item, index) => {
        
        return index.toString();
    }

    render() {

        return (
            <View>
                <Text>
                    Show supplements
                </Text>
                
                <FlatList
                    data={this.state.supplements}
                    keyExtractor={this._keyExtractor}
                    extraData={this.state}
                    renderItem={
                        ({item}) => {
                        
                                return <View>
                                    <Text>{item.nom}</Text>


                                    <SelectMultiple
                                        items={item.list}
                                        selectedItems={this.state.selectedSupps}
                                        onSelectionsChange={(selectedSupps) => {

                                            this.setState({
                                                selectedSupps
                                            })
                                        }}>
                                        </SelectMultiple>
                                </View>;
                            
                    }}
                />
            <Button
                 onPress={this.addBasket}
                title="AddBasket"
                color="#841584"
            />
            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(addBasket);