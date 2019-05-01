import React, { Component } from 'react';
import { StyleSheet,Platform,Dimensions } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Body, View, Left, Right } from 'native-base';
import validate from "../utility/validation";

export default class LoginScreen extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.unsubscribe = null;
	// 	this.state = {
	// 	  user: null,
	// 	  codeInput: '',
	// 	  phoneNumber: '+88',
	// 	  confirmResult: null,
	// 	};
	//   }
	state = {
		controls: {
		  mobileNumber: {
			value: "",
			valid: false,
			validationRules: {
			  ismobileNumber: true,
			  notEmpty: true,
			  maxLength: 11
			},
			touched: false
		  }
		}
	};

	phoneNumberInputHandler = val => {
		this.setState(prevState => {
		  return {
			controls: {
			  ...prevState.controls,
			  mobileNumber: {
				...prevState.controls.mobileNumber,
				value: val,
				valid: validate(val, prevState.controls.mobileNumber.validationRules),
				touched: true
			  }
			}
		  };
		});
	  };

	onPressLogin() {
		this.props.navigation.navigate('Verification')
	}
	loginUser = (email,password) =>{
		try {
		 firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
		   console.log(user);
		 })
		}
		catch(error) {
		  console.log(error.toString())
		}
	  }
	render() {
		const {loginContainer, signInButton, input, link} = styles
		return (
			<Container style={loginContainer}>
				<Content>
					<Form>
						<Input
						
						 placeholder='Mobile Number'
						 style={[styles.input, !this.state.controls.mobileNumber.valid && this.state.controls.mobileNumber.touched ? styles.invalid : null]}
						 onChangeText={ this.phoneNumberInputHandler }
						 value={this.state.controls.mobileNumber.value}
						  />
					
						<Button 
						primary 
						block
						style={signInButton}
						disabled={!this.state.controls.mobileNumber.valid}
						onPress={()=>this.onPressLogin()}>
							<Text> Sign In</Text>
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
	link: {
		fontSize: 13
	},
	signInButton: {
		marginTop: 20
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
	}
});
