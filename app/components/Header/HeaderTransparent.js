import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Header, Icon, Left, Body } from 'native-base';

export default class HeaderTransparent extends Component {
    render() {
        const {navigation} = this.props
        const {drawerIcon} = styles
        return (
            <Header transparent>
                <Left>
                    <Icon name='arrow-back' style={drawerIcon} onPress={()=> navigation.goBack()} />
                </Left>
                <Body />
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    drawerIcon: {
        color: '#000'
    }
});

