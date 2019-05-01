import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container } from 'native-base';

export default class ContentTitle extends Component {
    render() {
        const {contentTitle} = this.props
        return (
            <Text style={styles.contentTitleStyle}>{contentTitle}</Text>
        )
    }
}

const styles = StyleSheet.create({
	contentTitleStyle: {
		fontSize: 14,
	    color: "#000",
	    marginLeft: 20,
	    paddingTop: 10,
	    paddingBottom: 10
	}
});

