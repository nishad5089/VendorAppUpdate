import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView , Image } from 'react-native';
import { View, Text, Container, Content, Right, Grid, Col, Row, Body, Drawer, Button, Card, CardItem } from 'native-base';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

export default class CardGridWithBody extends Component {
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

    createGridArray(totalColumns) {
        items = this.state.items
        let gridArray = [[]]
        let countColumns = 1
        for (var i = 0; i < items.length; i++) {
            gridArray[gridArray.length - 1].push(items[i])
            if (countColumns <= totalColumns) {
                countColumns++;
            }
            if (countColumns > totalColumns && i !== items.length - 1) {
                countColumns = 1
                gridArray.push([])
            }
        }
        return gridArray;
    }

    renderGrid(gridArray) {
    	const {cardRowStyle} = styles
        return gridArray.map((row, rowIndex) => (
            <Row style={cardRowStyle} key={rowIndex}>{row.map((col, colIndex) => (this.renderColumn(col, rowIndex,colIndex)))}</Row>
        ));
    }

    renderColumn(colItem, rowIndex, colIndex) {
        const {cardColStyle, cardStyle, imageStyle, itemInfoStyle, itemNameStyle, itemPriceStyle} = styles
        return (
            <Col style={rowIndex == 0 ? [cardColStyle, {paddingTop: 0}] : cardColStyle} key={colIndex}>
                <TouchableOpacity onPress={() => this.onItemPress(colItem)}>
                    <Card style={cardStyle}>
                        <CardItem cardBody>
                            <Image resizeMode="stretch" source={{ uri: colItem.image }} style={imageStyle} />
                        </CardItem>
                        <CardItem>
                            <Body style={itemInfoStyle}>
                                <Text style={itemNameStyle} numberOfLines={1}>{colItem.title}</Text>
                                <Text style={itemPriceStyle}>{colItem.artist}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </Col>
        )
    }

    renderContent() {
    	const {gridNumber} = this.props
        let gridArray = this.createGridArray(gridNumber)
        return this.renderGrid(gridArray)
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
            this.renderContent()
        )
    }
}

const styles = StyleSheet.create({
    cardRowStyle: {
        marginBottom: 0
    },

    cardColStyle: {
        padding: 5
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

