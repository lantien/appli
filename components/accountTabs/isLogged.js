import React from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';

class isLogged extends React.Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        
        if(this.props.token == null) {

            const navigateAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Login" })],
            });
        
            this.props.navigation.dispatch(navigateAction);
        } else {

            const navigateAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Account" })],
            });
        
            this.props.navigation.dispatch(navigateAction);
        }
    }

    render() {
        
        return (
            <View>
            </View>
        );
    }
}

function mapStateToProps(state) {

    return state;
}

export default connect(mapStateToProps)(isLogged);