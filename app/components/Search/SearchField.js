import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {Item, Input, Container} from 'native-base';

export default class SearchField extends Component {
  render() {
    return (
        <Item searchBar style={styles.searhField}>
            <Input placeholder='Search Item'/>
        </Item>
    )
  }
}

const styles = StyleSheet.create({
	searhField: {
        backgroundColor: '#fff',
        height: 35
	}
});

