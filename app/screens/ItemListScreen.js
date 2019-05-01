import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { View, Text, Container, Content, Right, Grid, Col, Row, Drawer, Button } from 'native-base';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

import ContentTitle  from '../components/ContentTitle/ContentTitle';
import CardHorizontalWithBody  from '../components/Card/CardHorizontalWithBody';
import CardHorizontalWithoutBody  from '../components/Card/CardHorizontalWithoutBody';
import CardGridWithoutBody  from '../components/Card/CardGridWithoutBody';
import CardGridWithBody  from '../components/Card/CardGridWithBody';
import HeaderWithSearchButton  from '../components/Header/HeaderWithSearchButton';


export default class ItemListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }
    
    render() {
        let headerProps = {
            navigation: this.props.navigation
        }

        let CardHorizontalWithoutBodyProps = {
            api: 'http://rallycoding.herokuapp.com/api/music_albums'
        }

        let CardHorizontalWithBodyProps = {
            api: 'http://rallycoding.herokuapp.com/api/music_albums'
        }

        let CardGridWithBodyProps = {
            navigation: this.props.navigation,
            api: 'http://rallycoding.herokuapp.com/api/music_albums',
            gridNumber: 2
        }

        let CardGridWithoutBodyProps = {
            navigation: this.props.navigation,
            api: 'http://rallycoding.herokuapp.com/api/music_albums',
            gridNumber: 2
        }

        return (
            <Container>
                <HeaderWithSearchButton {...headerProps} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <ContentTitle contentTitle={'Advertise'} />
                        <CardHorizontalWithoutBody {...CardHorizontalWithoutBodyProps} />
                    </View>
                    <View>
                        <ContentTitle contentTitle={'Albums'} />
                        <View style={styles.content}>
                            <CardGridWithoutBody {...CardGridWithoutBodyProps} />
                        </View>
                    </View>
                    <View>
                        <ContentTitle contentTitle={'Albums'} />
                        <View style={styles.content}>
                            <CardGridWithBody {...CardGridWithBodyProps} />
                        </View>
                    </View>
                    <View>
                        <ContentTitle contentTitle={'Related Albums'} />
                        <CardHorizontalWithBody {...CardHorizontalWithBodyProps} />
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        marginLeft: 0,
        marginRight: 0,
    }
});
