import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Header, Body, Text, Icon, Left, Right, Button } from 'native-base';
import SearchField from '../Search/SearchField';

export default class HeaderWithSearchButton extends Component {
	onSearchPress() {
		const {navigation} = this.props
		navigation.navigate('ItemSearch')
	}
    render() {
        const {navigation} = this.props
        const {searchButton, searchIcon, searchButtonContainer, searchButtonText, rightContent, drawerIcon} = styles
        return (
            <Header>
                <Body style={searchButtonContainer}>
                    <Button style={searchButton} onPress={() => this.onSearchPress()} >
                        <Icon name='search' style={searchIcon} />
                        <Text uppercase={false} style={searchButtonText}>Search Service</Text>
                  	</Button>
                </Body>
                <Right style={rightContent}>
                    <Icon name='menu' style={drawerIcon} onPress={() => navigation.openDrawer()} />
                </Right>
            </Header>
        );
    }
}

const styles = StyleSheet.create({
	searchButton: {       
        backgroundColor: '#fff',
        height: 35,
        justifyContent: 'flex-start',
        width: '100%',
        paddingLeft: 10
    },

    searchButtonContainer: {
        flex: 5
    },

    searchIcon: {
        color: '#555'
    },

    searchButtonText: {
        color: '#555'
    },

    rightContent: {
        flex: 1, 
        justifyContent: 'center',
        marginLeft: 8
    },

    drawerIcon: {
        color: 'white'
    }
});

