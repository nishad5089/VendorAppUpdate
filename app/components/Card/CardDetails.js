import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class CardDetails extends Component {
    render() {
        const item = this.props.item
        return (
            <Card style={{flex: 0}}>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: item.image}} />
                    <Body>
                        <Text>{item.title}</Text>
                        <Text note>{item.artist}</Text>
                    </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Image source={{uri: item.image}} style={{height: 200, width: '100%', flex: 1}}/>
                        <Text>
                            Lorem Ipsum is simply dummy text of the printing 
                            and typesetting industry. Lorem Ipsum has been the 
                            industrysstandard dummy text ever since the, when an 
                            unknown printer took a galley of type and scrambled it.
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent textStyle={{color: '#87838B'}}>
                            <Icon name="logo-github" />
                            <Text>1,926 stars</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button danger textStyle={{color: '#87838B'}}>
                            <Text>Buy Now</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}