import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, 
	Thumbnail, Text, View, Input, Item } from 'native-base';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';

export default class CommentList extends Component {
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

    onPressComment() {
    	alert('comment added')
    }

    renderList() {
    	const rowItems = this.state.items
    	return rowItems.map((rowItem, index) => {
	    	return (
	    		<List key={index}>
					<ListItem avatar noBorder>
						<Left>
							<Thumbnail source={{ uri: rowItem.image }} />
						</Left>
						<Body>
							<Text>Kumar Pratik</Text>
							<Text note>Doing what you like will always keep you happy . .</Text>
						</Body>
						<Right>
							<Text note>3:43 pm</Text>
						</Right>
					</ListItem>
		    	</List>
			)
		})
    }

	render() {
		return (
			<View>
	    		<List>
					<ListItem avatar noBorder>
						<Item>
	    					<Input placeholder='Write your comments...' />
	    					<Icon active size={35} name='rightcircle' style={{'paddingRight': 10}} onPress={()=>this.onPressComment()} />
	  					</Item>
					</ListItem>
		    	</List>				
				{this.renderList()}
			</View>
		);
	}
}