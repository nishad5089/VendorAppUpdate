import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Content } from 'native-base';
import CardDetails  from '../components/Card/CardDetails';
import CommentList  from '../components/List/CommentList';

export default class ItemDetailsScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
        item: []
        }
    }

    componentDidMount() {
        const {state} = this.props.navigation
        this.setState({
            item: state.params.item
        })
    }

    render() {
        const { contents } = styles
        let listImageProps = {
            navigation: this.props.navigation,
            api: 'http://rallycoding.herokuapp.com/api/music_albums',
        }
        
        return (
            <Content style={contents}>
                <CardDetails item={this.state.item} />
                <CommentList {...listImageProps} />
            </Content>
        );
    }
}

const styles = StyleSheet.create({
	contents: {
        padding: 0
	}
});
