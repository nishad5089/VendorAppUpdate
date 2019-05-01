import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Body, View, Left, Right } from 'native-base';
import validate from "../utility/validation";
export default class Verification extends Component {
	state = {
		controls: {
		  Varification: {
			value: "",
			valid: false,
			validationRules: {			  
				notEmpty: true,			  
			},
			touched: false
		  }
		}
	};
	phoneVerificationInputHandler = val => {
		this.setState(prevState => {
		  return {
			controls: {
			  ...prevState.controls,
			  Varification: {
				...prevState.controls.Varification,
				value: val,
				valid: validate(val, prevState.controls.Varification.validationRules),
				touched: true
			  }
			}
		  };
		});
	  };
	onPressLogin() {
		this.props.navigation.navigate('Drawer')
	}	

	render() {
		const {loginContainer, signInButton, input, link} = styles
		return (
			<Container style={loginContainer}>
				<Content>
					<Form>
						<Input 
						placeholder='Verification Code'
						onChangeText={ this.phoneVerificationInputHandler }
						style={[styles.input, !this.state.controls.Varification.valid && this.state.controls.Varification.touched ? styles.invalid : null]} />
						
						<Button 
						primary
						block 
						style={signInButton}
						disabled={!this.state.controls.Varification.valid}
						onPress={()=>this.onPressLogin()}>
							<Text> Confirm </Text>
						</Button>
					</Form>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	loginContainer: {
		flex:1,
		justifyContent: 'center', 
		alignItems: 'center',
		flexDirection: 'row',
		padding: 40
	},

	input: {
		backgroundColor: '#eee',
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#eee",
		padding: 5,
		borderRadius: 8,
		},
	invalid: {
			backgroundColor: '#f9c0c0',
			borderColor: "red"
		},

	link: {
		fontSize: 13
	},

	signInButton: {
		marginTop: 20
	}
});
