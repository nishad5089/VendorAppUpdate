import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, Drawer } from 'native-base';
import { App } from './config/Routes';
import AppHeader from './components/Header/Header';

export default class Index extends Component {
    render() {
        const { globalContainer } = styles;
        return (
            <App style={ globalContainer } navigation={this.props.navigation}></App>
        )
    }
}

const styles = StyleSheet.create({
	globalContainer: {
	}
});


