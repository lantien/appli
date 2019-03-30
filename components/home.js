import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements'

import BottomNavigation, {FullTab } from 'react-native-material-bottom-navigation'

import Shop from './homeTabs/shops.js'
import Order from './homeTabs/ordersTabs.js'
import Account from './homeTabs/myAccount.js'
   
export default class Home extends React.Component {

    static navigationOptions = {

        header: null
    }

    tabs = [
        {
            key: 'music',
            icon: 'restaurant',
            label: 'Restaurants',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'movies-tv',
            icon: 'account-box',
            label: 'Compte',
            barColor: '#B71C1C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'order',
            icon: 'menu',
            label: 'Commandes',
            barColor: '#B71C1C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ]

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
        isActive={isActive}
        key={tab.key}
        label={tab.label}
        renderIcon={this.renderIcon(tab.icon)}
        />
    )

    render() {
        let tabs;

        if(!this.state || this.state.activeTab == 'music') {

            tabs = <Shop/>;

        } else if (this.state.activeTab == 'order') {

            tabs = <Order/>;
        } else if (this.state.activeTab == 'movies-tv') {

            tabs = <Account/>;
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {tabs}
                </View>
                <BottomNavigation
                onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                renderTab={this.renderTab}
                tabs={this.tabs}
                />
            </View>
        )
    }
}