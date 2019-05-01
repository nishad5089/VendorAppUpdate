import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, 
Icon, Left, Body, Right, Switch, Button } from 'native-base';

export default class SideBar extends Component {
	render() {
		const { headerText } = styles;
    	return (
    		<Container>
			    <Header><Text style={headerText}>Drawer Header</Text></Header>
			    <Content>
			        <ListItem icon>
			            <Left>
			                <Button style={{ backgroundColor: "#FF9501" }}>
			                    <Icon active name="plane" />
			                </Button>
			            </Left>

			            <Body>
			                <Text>Airplane Mode</Text>
			            </Body>
			            <Right>
			                <Switch value={false} />
			            </Right>
			        </ListItem>
			        <ListItem icon>
			            <Left>
			                <Button style={{ backgroundColor: "#007AFF" }}>
			                    <Icon active name="wifi" />
			                </Button>
			            </Left>

			            <Body>
			                <Text>Wi-Fi</Text>
			            </Body>
			            <Right>
			                <Text>GeekyAnts</Text>
			                <Icon active name="arrow-forward" />
			            </Right>
			        </ListItem>
			        <ListItem icon>
			            <Left>
			                <Button style={{ backgroundColor: "#007AFF" }}>
			                    <Icon active name="bluetooth" />
			                </Button>
			            </Left>

			            <Body>
			                <Text>Bluetooth</Text>
			            </Body>
			            <Right>
			                <Text>On</Text>
			                <Icon active name="arrow-forward" />
			            </Right>
			        </ListItem>
			    </Content>
			</Container>
    	)
	}
}

const styles = StyleSheet.create({
	headerText: {
		flex: 1,
    	justifyContent: 'center',
    	alignSelf: 'center',
    	color: '#fff',
    	textAlign: 'center'
	}
});
