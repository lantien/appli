import React from 'react';
import { View, FlatList, Button } from 'react-native';

import { Text } from 'react-native-elements';
import SelectMultiple from 'react-native-select-multiple';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import { connect } from 'react-redux';

const items = [
    {
      name: 'Fruits',
      id: 0,
      icon: { uri: 'https://cdn4.iconfinder.com/data/icons/free-crystal-icons/512/Gemstone.png' }, // Make sure the icon const is set, or you can remove this
    },
    {
      name: 'Gems',
      id: 1,
      icon: { uri: 'https://cdn4.iconfinder.com/data/icons/free-crystal-icons/512/Gemstone.png' }, // web uri
      children: [
        {
          name: 'Quartz',
          id: 20,
        },
        {
          name: 'Zircon',
          id: 21,
        },
        {
          name: 'Sapphire',
          id: 22,
        },
        {
          name: 'Topaz',
          id: 23,
        },
      ],
    },
    {
      name: 'Plants',
      id: 2,
      icon: 'filter_vintage', // material icons icon name
      children: [
        {
          name: "Mother In Law's Tongue",
          id: 30,
        },
        {
          name: 'Yucca',
          id: 31,
        },
        {
          name: 'Monsteria',
          id: 32,
        },
        {
          name: 'Palm',
          id: 33,
        },
      ],
    },
  ];

class addBasket extends React.Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {

        var item = this.props.navigation.getParam('item', []).item;
        this.setState({
            ref: item.ref,
            supplements: item.supplements,
            selectedSupps: [],
            showSupps: false
        });
    }

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

        var cardItem = this.props.navigation.getParam('item', []).item;

        var item = {
            ref: this.state.ref,
            supps: this.state.selectedSupps.map(e => JSON.parse(e)),
            nom: cardItem.name,
            nom_supps: [],
            prix: 0
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
            prix: total
        });

        this.setState({
          selectedSupps: []
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
                        (item) => {
                                item = item.item;
                                return <View>
                                    <Text>{item.question}</Text>
                                    <Text>{JSON.stringify(item.list)}</Text>
                                </View>;
                            
                    }}
                />
                
            <Button
                 onPress={this.addBasket}
                title="AddBasket"
                color="#841584"
            />

            <Button
                 onPress={() => {

                    this.setState({
                        showSupps: true
                    });
                 }}
                title="showModal"
                color="#841584"
            />

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
            />

            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(addBasket);