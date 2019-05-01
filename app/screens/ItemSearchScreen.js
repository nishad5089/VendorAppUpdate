import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import HeaderWithSearchBar  from '../components/Header/HeaderWithSearchBar';

export default class ItemSearchScreen  extends Component {
    
    render() {
        let headerProps = {
            navigation: this.props.navigation,
            headerText: 'Album List'
        }
        return (
            <Container>
                <HeaderWithSearchBar {...headerProps} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
	
});
