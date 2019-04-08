import React from 'react';
import { View, FlatList } from 'react-native';

import { Text } from 'react-native-elements';
import SelectMultiple from 'react-native-select-multiple';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import { connect } from 'react-redux';

class addBasket extends React.Component {

    state = {
        ref: null,
        supplements: []
    }

    constructor(props) {
        super(props);

    }

    onSelectionsChange = (selectedFruits) => {

        if(selectedFruits.length <= 2 ) {

            this.setState({selectedFruits});
        }
    }

    componentWillMount() {

        var item = this.props.navigation.getParam('item', []).item;

        this.setState({
            ref: item.ref,
            supplements: item.supplements
        });
    }

    _keyExtractor = (item, index) => {
        
        return item.nom;
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
                    renderItem={({item}) => {
                        
                        return (
                            <View>
                                <Text>{item.nom}</Text>

                                <SelectMultiple
                                    items={item.list/* () => {

                                        let list = [];

                                        for(var i in item.list) {

                                            list.push(item.list[i].nom);
                                        }

                                        return list;
                                    } */}
                                    onSelectionsChange={(supp) => {

                                        if(supp.length <= item.nb_option) {
                                
                                            this.setState({supp});
                                        }
                                    }}>
                                    </SelectMultiple>
                            </View>
                        );
                    }}
                />

            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(addBasket);