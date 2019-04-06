import React from 'react';
import { View} from 'react-native';

import { Text } from 'react-native-elements'

import apiUrl from '../../config/api.url.js';
import store from '../redux/store.js';

import { connect } from 'react-redux';

class addBasket extends React.Component {

    state = { selectedFruits: [] }

    constructor(props) {
        super(props);


        this.setState({ selectedFruits })
    }

    onSelectionsChange = (selectedFruits) => {
        // selectedFruits is array of { label, value }
        this.setState({ selectedFruits })
        console.log("state", selectedFruits);
    }

    componentWillMount() {

        console.log(this.props.navigation.getParam('item', null));
    }


    render() {

        return (
            <View>
                <Text>
                    Show supplements
                </Text>

                <SelectMultiple
                items={['Apples', 'Oranges', 'Pears']}
                selectedItems={this.state.selectedFruits}
                onSelectionsChange={this.onSelectionsChange} />
            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(addBasket);