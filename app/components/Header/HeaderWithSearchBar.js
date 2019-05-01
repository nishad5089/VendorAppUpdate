import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Header, Body, Text, Icon, Left, Right, Button, Item, Input } from 'native-base';
import SearchField from '../Search/SearchField';

export default class HeaderWithSearchBar extends Component {
	onSearchPress() {
		const {navigation} = this.props
		navigation.navigate('ItemSearch')
	}
    render() {
        const {navigation, headerText} = this.props
        const {searchIcon, searhField, searchButtonContainer, searchButtonText, leftContent, drawerIcon} = styles
        return (
            <Header>
                <Left style={leftContent}>
                    <Icon name='arrow-back' style={drawerIcon} onPress={()=> navigation.goBack()} />
                </Left>
                <Body style={searchButtonContainer}>
                    <Item searchBar style={searhField}>
			            <Input placeholder='Search Item'/>
			        </Item>
                </Body>
            </Header>
        );
    }
}

const styles = StyleSheet.create({

    searchButtonContainer: {
        flex: 6
    },

    searhField: {
        backgroundColor: '#fff',
        height: 30,
        borderRadius: 1,
        justifyContent: 'flex-start',
        width: '100%',
	},

    searchIcon: {
        color: '#555'
    },

    searchButtonText: {
        color: '#555'
    },

    leftContent: {
        flex: 1, 
        justifyContent: 'center',
    },

    drawerIcon: {
        color: 'white'
    }
});

