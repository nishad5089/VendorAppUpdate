import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Body, Text, Icon, Left, Right } from 'native-base';

export default class AppHeader extends Component {
    render() {
        const {navigation, headerText} = this.props
        const {header, text, drawerIcon } = styles
        return (
            <Header>
                <Left>
                    <Icon  name='menu' style={drawerIcon} onPress={()=> navigation.openDrawer()} />
                </Left>
                <Body style={header}>
                    <Text style={text}>{headerText}</Text>
                </Body>
                <Right></Right>
            </Header>
        );
    }
}

const styles = StyleSheet.create({
	drawerIcon: {
        color: '#fff'
    },

    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

