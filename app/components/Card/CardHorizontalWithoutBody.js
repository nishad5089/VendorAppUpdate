import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Dimensions, Image } from 'react-native';
import { Container, Content, Grid, Row, Col, Card, CardItem, Body, Thumbnail } from 'native-base';
import axios from 'axios';

export default class CardHorizontalWithoutBody  extends Component {
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
        const {imageStyle, cardStyle} = styles
        if(rowItems.length > 0) {
            return rowItems.map((rowItem, index) => {
                return (
                    <TouchableOpacity key={index}>
                        <Thumbnail square resizeMode="stretch"  source={{ uri: rowItem.image }} style={imageStyle} />
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
        height: 150,
        width: 300
    }
});
