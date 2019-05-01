import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView , Image } from 'react-native';
import { View, Text, Container, Content, Right, Grid, Col, Row, Body, Drawer, Button, Card, CardItem, Thumbnail } from 'native-base';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

export default class CardGridWithoutBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentWillMount() {
        const {api} = this.props
        axios.get(api ? api : '').then(response => 
            this.setState({
                items: response.data
            }))
        .catch((error) => {
            console.error(error)
        })
    }


    renderContent() {
        const {cardColStyle, imageStyle} = styles
        const items = this.state.items
        return items.map((item, itemIndex) => (
            <View key={itemIndex} style={cardColStyle}>
                <TouchableOpacity onPress={() => this.onItemPress(item)}>
                    <Thumbnail square resizeMode="stretch"  source={{ uri: item.image }} style={imageStyle} />
                </TouchableOpacity>
            </View>
        ));
    }

    renderItems() {
        const {cardRowStyle} = styles
        return (<View style={cardRowStyle}>{this.renderContent()}</View>) 
    }

    onItemPress(item) {
        const {navigation} = this.props
        const navigateAction = NavigationActions.navigate({
            routeName: 'ItemDetails',
            params: {item: item}
        })
        navigation.navigate(navigateAction)
    }
    
    render() {
        return (
            this.renderItems()
        )
    }
}

const styles = StyleSheet.create({
    cardRowStyle: {
        marginBottom: 0,flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },

    cardColStyle: {
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        width: '50%'
    },

    imageStyle: {
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: null, 
        flex: 1
    },

    cardStyle: {
        borderRadius: 7
    }
});

