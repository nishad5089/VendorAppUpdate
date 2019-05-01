import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Image } from 'react-native';
import { Container, Content, Grid, Row, Col, Card, CardItem, Body } from 'native-base';
import axios from 'axios';

export default class CardHorizontalWithBody  extends Component {
	constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentWillMount() {
        const {api} = this.props
        axios.get(api).then(response => 
            this.setState({
                items: response.data
            }))
        .catch((error) => {
            console.error(error);
        })
    }

	renderHorizontalContents() {
        const rowItems = this.state.items
        const { cardStyle, cardItemStyle, imageStyle, itemInfoStyle, itemNameStyle, itemPriceStyle } = styles;
        if(rowItems.length > 0) {
            return rowItems.map((rowItem, index) => {
                return (
                    <TouchableOpacity key={index}>
                        <Card style={cardStyle}>
                            <CardItem cardBody>
                                <Image resizeMode="stretch" source={{ uri: rowItem.image }} style={imageStyle} />
                            </CardItem>
                            <CardItem style={cardItemStyle}>
                                <Body style={itemInfoStyle}>
                                    <Text style={itemNameStyle} numberOfLines={1}>{rowItem.title}</Text>
                                    <Text style={itemPriceStyle}>{rowItem.artist}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                )
            })
        }
    } 
    
    render() {
        return (
            <Row>
            	<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                	{this.renderHorizontalContents()}
                </ScrollView>
            </Row>
        );
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        flex: 1,
        height: 150,
        width: 200,
    },

    itemInfoStyle: {
        alignItems: 'center'
    },

    itemNameStyle: {
        fontSize: 16
    },

    itemPriceStyle: {
        fontWeight: 'bold',
        color: '#ccc'
    }
});
