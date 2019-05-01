
// import React, { Component } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   ActivityIndicator,
//   Platform,
//   StyleSheet,
//   Button
// } from 'react-native';


// import firebase from 'react-native-firebase';

// const imageUrl =
//   'https://www.shareicon.net/data/512x512/2016/07/19/798524_sms_512x512.png';

// export default class PhoneAuth extends Component {
//   static getDefaultState() {
//     return {
//       error: '',
//       codeInput: '',
//       phoneNumber: '+880',
//       auto: Platform.OS === 'android',
//       autoVerifyCountDown: 0,
//       sent: false,
//       started: false,
//       user: null,
//     };
//   }
//   componentDidMount() {
//     this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         this.setState({ user: user.toJSON() });
//       } else {
//         // User has been signed out, reset the state
//         this.setState({
//         error: '',
//         codeInput: '',
//         phoneNumber: '+880',
//         auto: Platform.OS === 'android',
//         autoVerifyCountDown: 0,
//         sent: false,
//         started: false,
//         user: null,
//         });
//       }
//     });
//   }
//   componentWillUnmount() {
//     if (this.unsubscribe) this.unsubscribe();
//  }
//  signOut = () => {
//     firebase.auth().signOut();
//   }
//   constructor(props) {
//     super(props);
//     this.timeout = 20;
//     this._autoVerifyInterval = null;
//     this.state = PhoneAuth.getDefaultState();
//   }

//   _tick() {
//     this.setState({
//       autoVerifyCountDown: this.state.autoVerifyCountDown - 1,
//     });
//   }

//   /**
//    * Called when confirm code is pressed - we should have the code and verificationId now in state.
//    */

//   confirmCode = () => {
//     const { codeInput, confirmResult } = this.state;

//     if (confirmResult && codeInput.length) {
//       confirmResult.confirm(codeInput)
//         .then((user) => {
//           this.setState({ message: 'Code Confirmed!' });
//         })
//         .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
//     }
//   };
//   afterVerify = () => {
//     const { codeInput, verificationId } = this.state;
//     const credential = firebase.auth.PhoneAuthProvider.credential(
//       verificationId,
//       codeInput
//     );

//     // TODO do something with credential for example:
//     firebase
//       .auth()
//       .signInWithCredential(credential)
//       .then(user => {
//         console.log('PHONE AUTH USER ->>>>>', JSON.stringify(user));
//         this.setState({ 
//           user: user.user
//          });
//         alert(user.user.phoneNumber);
//       })
//       .catch(console.error);
//   };
// //      signIn = () => {
// //        const { phoneNumber } = this.state;
// //        this.setState({ message: 'Sending code ...' });
   
// //        firebase.auth().signInWithPhoneNumber(phoneNumber)
// //          .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
// //          .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
// //      };
//   signIn = () => {
//     const { phoneNumber } = this.state;
//     this.setState(
//       {
//         error: '',
//         started: true,
//         autoVerifyCountDown: this.timeout,
//       },
//       () => {
//         firebase
//           .auth()
//           .verifyPhoneNumber(phoneNumber)
//           .on('state_changed', phoneAuthSnapshot => {
//             console.log(phoneAuthSnapshot);
//             switch (phoneAuthSnapshot.state) {
//               case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
//                 // update state with code sent and if android start a interval timer
//                 // for auto verify - to provide visual feedback
//                 this.setState(
//                   {
//                     sent: true,
//                     verificationId: phoneAuthSnapshot.verificationId,
//                     autoVerifyCountDown: this.timeout,
//                   },
//                   () => {
//                     if (this.state.auto) {
//                       this._autoVerifyInterval = setInterval(
//                         this._tick.bind(this),
//                         1000
//                       );
//                     }
//                   }
//                 );
//                 break;
//               case firebase.auth.PhoneAuthState.ERROR: // or 'error'
//                 // restart the phone flow again on error
//                 clearInterval(this._autoVerifyInterval);
//                 this.setState({
//                   ...PhoneAuth.getDefaultState(),
//                   error: phoneAuthSnapshot.error.message,
//                 });
//                 break;

//               // ---------------------
//               // ANDROID ONLY EVENTS
//               // ---------------------
//               case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
//                 clearInterval(this._autoVerifyInterval);
//                 this.setState({
//                   sent: true,
//                   auto: false,
//                   verificationId: phoneAuthSnapshot.verificationId,
//                 });
//                 break;
//               case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
//                 clearInterval(this._autoVerifyInterval);
//                 this.setState({
//                   sent: true,
//                   codeInput: phoneAuthSnapshot.code,
//                   verificationId: phoneAuthSnapshot.verificationId,
//                 });
//                 break;
//               default:
//               // will never get here - just for linting
//             }
//           });
//       }
//     );
//   };

//   renderInputPhoneNumber() {
//     const { phoneNumber } = this.state;
//     return (
//       <View >
//         <Text>Enter phone number:</Text>
//         <TextInput
//           autoFocus
//           style={styles.input}
//           onChangeText={value => this.setState({ phoneNumber: value })}
//           placeholder="Phone number ... "
//           value={phoneNumber}
//           keyboardType = 'phone-pad'
//         />
//         <Button
//           title="Begin Verification"
//           color="green"
//           onPress={this.signIn}
//         />
//       </View>
//     );
//   }

//   renderSendingCode() {
//     const { phoneNumber } = this.state;

//     return (
//       <View style={{ paddingBottom: 15 }}>
//         <Text style={{ paddingBottom: 25 }}>
//           {`Sending verification code to '${phoneNumber}'.`}
//         </Text>
//         <ActivityIndicator animating style={{ padding: 50 }} size="large" />
//       </View>
//     );
//   }

//   renderAutoVerifyProgress() {
//     const {
//       autoVerifyCountDown,
//       started,
//       error,
//       sent,
//       phoneNumber,
//     } = this.state;
//     if (!sent && started && !error.length) {
//       return this.renderSendingCode();
//     }
//     return (
//       <View style={{ padding: 0 }}>
//         <Text style={{ paddingBottom: 25 }}>
//           {`Verification code has been successfully sent to '${phoneNumber}'.`}
//         </Text>
//         <Text style={{ marginBottom: 25 }}>
//           {`We'll now attempt to automatically verify the code for you. This will timeout in ${autoVerifyCountDown} seconds.`}
//         </Text>
//         <Button
//           style={{ paddingTop: 25 }}
//           title="I have a code already"
//           color="green"
//           onPress={() => this.setState({ auto: false })}
//         />
//       </View>
//     );
//   }

//   renderError() {
//     const { error } = this.state;

//     return (
//       <View
//         style={{
//           padding: 10,
//           borderRadius: 5,
//           margin: 10,
//           backgroundColor: 'rgb(255,0,0)',
//         }}
//       >
//         <Text style={{ color: '#fff' }}>{error}</Text>
//       </View>
//     );
//   }
// renderVerificationCodeInput(){
//     const { started, error, codeInput, sent, auto, user } = this.state;
//     return (
//         <View style={{ marginTop: 15 }}>
//          <Text>Enter verification code below:</Text>
//          <TextInput
//           style={styles.input}
//           autoFocus    
//           onChangeText={value => this.setState({ codeInput: value })}
//           placeholder="Code ... "
//           value={codeInput}
//          />
//          <Button
//           title="Confirm Code"
//           color="#841584"
//           onPress={this.afterVerify}
//         />
//       </View>
//     )
// }
//   render() {
//     const { started, error, codeInput, sent, auto, user } = this.state;
//     return (
//       <View
//         style={{ flex: 1, backgroundColor: user ? 'rgb(0, 200, 0)' : '#fff' }}
//       >
//         <View
//           style={{
//             padding: 5,
//             justifyContent: 'center',
//             alignItems: 'center',
//             flex: 1,
//           }}
//         >
//           <Image
//             source={{ uri: imageUrl }}
//             style={{
//               width: 128,
//               height: 128,
//               marginTop: 25,
//               marginBottom: 15,
//             }}
//           />
//           <Text style={{ fontSize: 25, marginBottom: 20 }}>
//             Phone Auth Example
//           </Text>
//           {error && error.length ? this.renderError() : null}

//           {!user && !started && !sent ? this.renderInputPhoneNumber() : null}

//           {started && auto && !codeInput.length ? this.renderAutoVerifyProgress() : null}
          
//           {!user && started && sent && (codeInput.length || !auto) ? this.renderVerificationCodeInput() : null}
//           {user ? (
//             <View style={{ marginTop: 15 }}>
//               <Text>{`Signed in with phone number: '${user.phoneNumber}'`}</Text>
//               {/* <Text>{`Started: '${started}'`}</Text>
//               <Text>{`sent: '${sent}'`}</Text>
//               <Text>{`CodeInput: '${codeInput.length}'`}</Text>
//               <Text>{`auto: '${codeInput.length}'`}</Text> */}
//               <Button style={{ padding: 5, marginTop: 20}} title="Sign Out" color="red" onPress={this.signOut} />
//             </View>
//           ) : null}
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
// 	loginContainer: {
// 		flex:1,
// 		justifyContent: 'center', 
// 		alignItems: 'center',
// 		flexDirection: 'row',
// 		padding: 40
// 	},
// 	link: {
// 		fontSize: 13
// 	},
// 	signInButton: {
// 		marginTop: 20
// 	},
//     input: {
//         width: "100%",
//         borderWidth: 1,
//         borderColor: "#eee",
//         padding: 5,
//         marginTop: 8,
//         marginBottom: 8,
//         borderRadius: 8,
//        // backgroundColor: '#000'
//     },
// 	invalid: {
// 		backgroundColor: '#f9c0c0',
// 		borderColor: "red"
// 	}
// });
// import React, { Component } from 'react';
// import {
//   View,
//   Button,
//   Text,
//   TextInput,
//   Image,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';

// import firebase from 'react-native-firebase'

// const imageUrl =
//   'https://www.shareicon.net/data/512x512/2016/07/19/798524_sms_512x512.png';

// export default class PhoneAuth extends Component {
//   static getDefaultState() {
//     return {
//       error: '',
//       codeInput: '',
//       phoneNumber: '+880',
//       auto: Platform.OS === 'android',
//       autoVerifyCountDown: 0,
//       sent: false,
//       started: false,
//       user: null,
//     };
//   }

//   constructor(props) {
//     super(props);
//     this.timeout = 20;
//     this._autoVerifyInterval = null;
//     this.state = PhoneAuth.getDefaultState();
//   }

//   _tick() {
//     this.setState({
//       autoVerifyCountDown: this.state.autoVerifyCountDown - 1,
//     });
//   }

//   /**
//    * Called when confirm code is pressed - we should have the code and verificationId now in state.
//    */
//   afterVerify = () => {
//     const { codeInput, verificationId } = this.state;
//     const credential = firebase.auth.PhoneAuthProvider.credential(
//       verificationId,
//       codeInput
//     );

//     // TODO do something with credential for example:
//     firebase
//       .auth()
//       .signInWithCredential(credential)
//       .then(user => {
//         console.log('PHONE AUTH USER ->>>>>', user.toJSON());
//         this.setState({ user: user.toJSON() });
//       })
//       .catch(console.error);
//   };

//   signIn = () => {
//     const { phoneNumber } = this.state;
//     this.setState(
//       {
//         error: '',
//         started: true,
//         autoVerifyCountDown: this.timeout,
//       },
//       () => {
//         firebase
//           .auth()
//           .verifyPhoneNumber(phoneNumber)
//           .on('state_changed', phoneAuthSnapshot => {
//             console.log(phoneAuthSnapshot);
//             switch (phoneAuthSnapshot.state) {
//               case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
//                 // update state with code sent and if android start a interval timer
//                 // for auto verify - to provide visual feedback
//                 this.setState(
//                   {
//                     sent: true,
//                     verificationId: phoneAuthSnapshot.verificationId,
//                     autoVerifyCountDown: this.timeout,
//                   },
//                   () => {
//                     if (this.state.auto) {
//                       this._autoVerifyInterval = setInterval(
//                         this._tick.bind(this),
//                         1000
//                       );
//                     }
//                   }
//                 );
//                 break;
//               case firebase.auth.PhoneAuthState.ERROR: // or 'error'
//                 // restart the phone flow again on error
//                 clearInterval(this._autoVerifyInterval);
//                 this.setState({
//                   ...PhoneAuth.getDefaultState(),
//                   error: phoneAuthSnapshot.error.message,
//                 });
//                 break;

//               // ---------------------
//               // ANDROID ONLY EVENTS
//               // ---------------------
//               case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
//                 clearInterval(this._autoVerifyInterval);
//                 this.setState({
//                   sent: true,
//                   auto: false,
//                   verificationId: phoneAuthSnapshot.verificationId,
//                 });
//                 break;
//               case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
//                 clearInterval(this._autoVerifyInterval);
//                 this.setState({
//                   sent: true,
//                   codeInput: phoneAuthSnapshot.code,
//                   verificationId: phoneAuthSnapshot.verificationId,
//                 });
//                 break;
//               default:
//               // will never get here - just for linting
//             }
//           });
//       }
//     );
//   };

//   renderInputPhoneNumber() {
//     const { phoneNumber } = this.state;
//     return (
//       <View style={{ flex: 1 }}>
//         <Text>Enter phone number:</Text>
//         <TextInput
//           autoFocus
//           style={{ height: 40, marginTop: 15, marginBottom: 15 }}
//           onChangeText={value => this.setState({ phoneNumber: value })}
//           placeholder="Phone number ... "
//           value={phoneNumber}
//           keyboardType = 'phone-pad'
//         />
//         <Button
//           title="Begin Verification"
//           color="green"
//           onPress={this.signIn}
//         />
//       </View>
//     );
//   }

//   renderSendingCode() {
//     const { phoneNumber } = this.state;

//     return (
//       <View style={{ paddingBottom: 15 }}>
//         <Text style={{ paddingBottom: 25 }}>
//           {`Sending verification code to '${phoneNumber}'.`}
//         </Text>
//         <ActivityIndicator animating style={{ padding: 50 }} size="large" />
//       </View>
//     );
//   }

//   renderAutoVerifyProgress() {
//     const {
//       autoVerifyCountDown,
//       started,
//       error,
//       sent,
//       phoneNumber,
//     } = this.state;
//     if (!sent && started && !error.length) {
//       return this.renderSendingCode();
//     }
//     return (
//       <View style={{ padding: 0 }}>
//         <Text style={{ paddingBottom: 25 }}>
//           {`Verification code has been successfully sent to '${phoneNumber}'.`}
//         </Text>
//         <Text style={{ marginBottom: 25 }}>
//           {`We'll now attempt to automatically verify the code for you. This will timeout in ${autoVerifyCountDown} seconds.`}
//         </Text>
//         <Button
//           style={{ paddingTop: 25 }}
//           title="I have a code already"
//           color="green"
//           onPress={() => this.setState({ auto: false })}
//         />
//       </View>
//     );
//   }

//   renderError() {
//     const { error } = this.state;

//     return (
//       <View
//         style={{
//           padding: 10,
//           borderRadius: 5,
//           margin: 10,
//           backgroundColor: 'rgb(255,0,0)',
//         }}
//       >
//         <Text style={{ color: '#fff' }}>{error}</Text>
//       </View>
//     );
//   }

//   render() {
//     const { started, error, codeInput, sent, auto, user } = this.state;
//     return (
//       <View
//         style={{ flex: 1, backgroundColor: user ? 'rgb(0, 200, 0)' : '#fff' }}
//       >
//         <View
//           style={{
//             padding: 5,
//             justifyContent: 'center',
//             alignItems: 'center',
//             flex: 1,
//           }}
//         >
//           <Image
//             source={{ uri: imageUrl }}
//             style={{
//               width: 128,
//               height: 128,
//               marginTop: 25,
//               marginBottom: 15,
//             }}
//           />
//           <Text style={{ fontSize: 25, marginBottom: 20 }}>
//             Phone Auth Example
//           </Text>
//           {error && error.length ? this.renderError() : null}
//           {!started && !sent ? this.renderInputPhoneNumber() : null}
//           {started && auto && !codeInput.length
//             ? this.renderAutoVerifyProgress()
//             : null}
//           {!user && started && sent && (codeInput.length || !auto) ? (
//             <View style={{ marginTop: 15 }}>
//               <Text>Enter verification code below:</Text>
//               <TextInput
//                 autoFocus
//                 style={{ height: 40, marginTop: 15, marginBottom: 15 }}
//                 onChangeText={value => this.setState({ codeInput: value })}
//                 placeholder="Code ... "
//                 value={codeInput}
//               />
//               <Button
//                 title="Confirm Code"
//                 color="#841584"
//                 onPress={this.afterVerify}
//               />
//             </View>
//           ) : null}
//           {user ? (
//             <View style={{ marginTop: 15 }}>
//               <Text>{`Signed in with new user id: '${user.uid}'`}</Text>
//             </View>
//           ) : null}
//         </View>
//       </View>
//     );
//   }
// // }
// import React, { Component } from 'react';
// import {
//   View,
//   Button,
//   Text,
//   TextInput,
//   Image,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';

// import firebase from 'react-native-firebase'

// const imageUrl =
//   'https://www.shareicon.net/data/512x512/2016/07/19/798524_sms_512x512.png';

// export default class PhoneAuth extends Component {
//   static getDefaultState() {
//     return {
//       error: '',
//       codeInput: '',
//       phoneNumber: '+880',
//       auto: Platform.OS === 'android',
//       autoVerifyCountDown: 0,
//       sent: false,
//       started: false,
//       user: null,
//     };
//   }

//   constructor(props) {
//     super(props);
//     this.timeout = 20;
//     this._autoVerifyInterval = null;
//     this.state = PhoneAuth.getDefaultState();
//   }

//     componentDidMount() {
//     this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         this.setState({ user: user.toJSON() });
//       } else {
//         // User has been signed out, reset the state
//         this.setState({
//         error: '',
//         codeInput: '',
//         phoneNumber: '+880',
//         auto: Platform.OS === 'android',
//         autoVerifyCountDown: 0,
//         sent: false,
//         started: false,
//         user: null,
//         });
//       }
//     });
//   }
//   componentWillUnmount() {
//     if (this.unsubscribe) this.unsubscribe();
//  }

//   _tick() {
//     this.setState({
//       autoVerifyCountDown: this.state.autoVerifyCountDown - 1,
//     });
//   }

//   /**
//    * Called when confirm code is pressed - we should have the code and verificationId now in state.
//    */
//   afterVerify = () => {
//     const { codeInput, verificationId } = this.state;
//     const credential = firebase.auth.PhoneAuthProvider.credential(
//       verificationId,
//       codeInput
//     );

//     // TODO do something with credential for example:
//     firebase
//       .auth()
//       .signInWithCredential(credential)
//       .then(user => {
//         console.log('PHONE AUTH USER ->>>>>', JSON.stringify(user));
//         this.setState({ user: JSON.stringify(user) });
//       })
//       .catch(console.error);
//   };

//   signIn = () => {
//     const { phoneNumber } = this.state;
//     this.setState(
//       {
//         error: '',
//         started: true,
//         autoVerifyCountDown: this.timeout,
//       },
//       () => {
//         firebase
//           .auth()
//           .verifyPhoneNumber(phoneNumber)
//           .on('state_changed', phoneAuthSnapshot => {
//             console.log(phoneAuthSnapshot);
//             switch (phoneAuthSnapshot.state) {
//               case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
//                 // update state with code sent and if android start a interval timer
//                 // for auto verify - to provide visual feedback
//                 this.setState(
//                   {
//                     sent: true,
//                     verificationId: phoneAuthSnapshot.verificationId,
//                     autoVerifyCountDown: this.timeout,
//                   },
//                   () => {
//                     if (this.state.auto) {
//                       this._autoVerifyInterval = setInterval(
//                         this._tick.bind(this),
//                         1000
//                       );
//                     }
//                   }
//                 );
//                 break;
//               case firebase.auth.PhoneAuthState.ERROR: // or 'error'
//                 // restart the phone flow again on error
//                 clearInterval(this._autoVerifyInterval);
//                 this.setState({
//                   ...PhoneAuth.getDefaultState(),
//                   error: phoneAuthSnapshot.error.message,
//                 });
//                 break;

//               // ---------------------
//               // ANDROID ONLY EVENTS
//               // ---------------------
//               case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
//                 clearInterval(this._autoVerifyInterval);
//                 this.setState({
//                   sent: true,
//                   auto: false,
//                   verificationId: phoneAuthSnapshot.verificationId,
//                 });
//                 break;
//               case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
//                 clearInterval(this._autoVerifyInterval);
//                 this.setState({
//                   sent: true,
//                   codeInput: phoneAuthSnapshot.code,
//                   verificationId: phoneAuthSnapshot.verificationId,
//                 });
//                 break;
//               default:
//               // will never get here - just for linting
//             }
//           });
//       }
//     );
//   };

//   renderInputPhoneNumber() {
//     const { phoneNumber } = this.state;
//     return (
//       <View style={{ flex: 1 }}>
//         <Text>Enter phone number:</Text>
//         <TextInput
//           autoFocus
//           style={{ height: 40, marginTop: 15, marginBottom: 15 }}
//           onChangeText={value => this.setState({ phoneNumber: value })}
//           placeholder="Phone number ... "
//           value={phoneNumber}
//           keyboardType = 'phone-pad'
//         />
//         <Button
//           title="Begin Verification"
//           color="green"
//           onPress={this.signIn}
//         />
//       </View>
//     );
//   }

//   renderSendingCode() {
//     const { phoneNumber } = this.state;

//     return (
//       <View style={{ paddingBottom: 15 }}>
//         <Text style={{ paddingBottom: 25 }}>
//           {`Sending verification code to '${phoneNumber}'.`}
//         </Text>
//         <ActivityIndicator animating style={{ padding: 50 }} size="large" />
//       </View>
//     );
//   }

//   renderAutoVerifyProgress() {
//     const {
//       autoVerifyCountDown,
//       started,
//       error,
//       sent,
//       phoneNumber,
//     } = this.state;
//     if (!sent && started && !error.length) {
//       return this.renderSendingCode();
//     }
//     return (
//       <View style={{ padding: 0 }}>
//         <Text style={{ paddingBottom: 25 }}>
//           {`Verification code has been successfully sent to '${phoneNumber}'.`}
//         </Text>
//         <Text style={{ marginBottom: 25 }}>
//           {`We'll now attempt to automatically verify the code for you. This will timeout in ${autoVerifyCountDown} seconds.`}
//         </Text>
//         <Button
//           style={{ paddingTop: 25 }}
//           title="I have a code already"
//           color="green"
//           onPress={() => this.setState({ auto: false })}
//         />
//       </View>
//     );
//   }

//   renderError() {
//     const { error } = this.state;

//     return (
//       <View
//         style={{
//           padding: 10,
//           borderRadius: 5,
//           margin: 10,
//           backgroundColor: 'rgb(255,0,0)',
//         }}
//       >
//         <Text style={{ color: '#fff' }}>{error}</Text>
//       </View>
//     );
//   }
//   signOut = () => {
//     firebase.auth().signOut();
//   }
//   render() {
//     const { started, error, codeInput, sent, auto, user } = this.state;
//     return (
//       <View
//         style={{ flex: 1, backgroundColor: user ? 'rgb(0, 200, 0)' : '#fff' }}
//       >
//         <View
//           style={{
//             padding: 5,
//             justifyContent: 'center',
//             alignItems: 'center',
//             flex: 1,
//           }}
//         >
//           <Image
//             source={{ uri: imageUrl }}
//             style={{
//               width: 128,
//               height: 128,
//               marginTop: 25,
//               marginBottom: 15,
//             }}
//           />
//           <Text style={{ fontSize: 25, marginBottom: 20 }}>
//             Phone Auth Example
//           </Text>
//           {error && error.length ? this.renderError() : null}
//           {!user && !started && !sent ? this.renderInputPhoneNumber() : null}
//           {started && auto && !codeInput.length
//             ? this.renderAutoVerifyProgress()
//             : null}
//           {!user && started && sent && (codeInput.length || !auto) ? (
//             <View style={{ marginTop: 15 }}>
//               <Text>Enter verification code below:</Text>
//               <TextInput
//                 autoFocus
//                 style={{ height: 40, marginTop: 15, marginBottom: 15 }}
//                 onChangeText={value => this.setState({ codeInput: value })}
//                 placeholder="Code ... "
//                 value={codeInput}
//               />
//               <Button
//                 title="Confirm Code"
//                 color="#841584"
//                 onPress={this.afterVerify}
//               />
//             </View>
//           ) : null}
//           {user ? (
//             <View style={{ marginTop: 15 }}>
//               <Text>{`Signed in with new user id: '${user.phoneNumber}'`}</Text>
//               <Button title="Sign Out" color="red" onPress={this.signOut} />
//             </View>
//           ) : null}
//         </View>
//       </View>
//     );
//   }
// }

import React, { Component } from 'react';
import {
  TextInput,
  Image,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native';

import { Container,
    Header, Content,
     Form, Item,
      Input, Label,
       Button, Text, 
       Body, View,
       Left, Right } from 'native-base';

import firebase from 'react-native-firebase';
import validate from "../utility/validation";
const imageUrl =
  'https://www.shareicon.net/data/512x512/2016/07/19/798524_sms_512x512.png';

export default class PhoneAuth extends Component {
  static getDefaultState() {
    return {
      error: '',
      //codeInput: '',
      //phoneNumber: '+880',
      auto: Platform.OS === 'android',
      autoVerifyCountDown: 0,
      sent: false,
      started: false,
      user: null,
      controls: {
        mobileNumber: {
            value: '+880',
            valid: false,
            validationRules: {
                ismobileNumber: true,
                notEmpty: true,
                maxLength: 11
          },
          touched: false
        },
        Varification: {
			value: '',
			valid: false,
			validationRules: {			  
				notEmpty: true,			  
			},
			touched: false
		  }
      }
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
        error: '',
        //codeInput: '',
        //phoneNumber: '+880',
        auto: Platform.OS === 'android',
        autoVerifyCountDown: 0,
        sent: false,
        started: false,
        user: null,
        controls: {
            mobileNumber: {
              value: '+880',
              valid: false,
              validationRules: {
                ismobileNumber: true,
                notEmpty: true,
                maxLength: 15
              },
              touched: false
            },
            Varification: {
                value: '',
                valid: false,
                validationRules: {			  
                    notEmpty: true,			  
                },
                touched: false
              }
          }
        });
      }
    });
  }
  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
 }
 signOut = () => {
    firebase.auth().signOut();
  }
  constructor(props) {
    super(props);
    this.timeout = 20;
    this._autoVerifyInterval = null;
    this.state = PhoneAuth.getDefaultState();
  }
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
  _tick() {
    this.setState({
      autoVerifyCountDown: this.state.autoVerifyCountDown - 1,
    });
  }

  /**
   * Called when confirm code is pressed - we should have the code and verificationId now in state.
   */

//   confirmCode = () => {
//     const { confirmResult } = this.state;

//     if (this.state.controls.Varification.value && this.state.controls.Varification.value.length) {
//       confirmResult.confirm(this.state.controls.Varification.value)
//         .then((user) => {
//           this.setState({ message: 'Code Confirmed!' });
//         })
//         .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
//     }
//   };
  afterVerify = () => {
    const { controls, verificationId } = this.state;
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
     controls.Varification.value
    );

    // TODO do something with credential for example:
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(user => {
        console.log('PHONE AUTH USER ->>>>>', JSON.stringify(user));
        this.setState({ 
          user: user.user
         });
        //alert(user.user.phoneNumber);
      })
      .catch(console.error);
  };
//      signIn = () => {
//        const { phoneNumber } = this.state;
//        this.setState({ message: 'Sending code ...' });
   
//        firebase.auth().signInWithPhoneNumber(phoneNumber)
//          .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
//          .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
//      };
  signIn = () => {
    const { controls } = this.state;
    this.setState(
      {
        error: '',
        started: true,
        autoVerifyCountDown: this.timeout,
      },
      () => {
        firebase
          .auth()
          .verifyPhoneNumber(controls.mobileNumber.value)
          .on('state_changed', phoneAuthSnapshot => {
            console.log(phoneAuthSnapshot);
            switch (phoneAuthSnapshot.state) {
              case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
                // update state with code sent and if android start a interval timer
                // for auto verify - to provide visual feedback
                alert(controls.mobileNumber.value);
                this.setState(
                  {
                    sent: true,
                    verificationId: phoneAuthSnapshot.verificationId,
                    autoVerifyCountDown: this.timeout,
                  },
                  () => {
                    if (this.state.auto) {
                      this._autoVerifyInterval = setInterval(
                        this._tick.bind(this),
                        1000
                      );
                    }
                  }
                );
                break;
              case firebase.auth.PhoneAuthState.ERROR: // or 'error'
                // restart the phone flow again on error
                clearInterval(this._autoVerifyInterval);
                this.setState({
                  ...PhoneAuth.getDefaultState(),
                  error: phoneAuthSnapshot.error.message,
                });
                break;

              // ---------------------
              // ANDROID ONLY EVENTS
              // ---------------------
              case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
                clearInterval(this._autoVerifyInterval);
                this.setState({
                  sent: true,
                  auto: false,
                  verificationId: phoneAuthSnapshot.verificationId,
                });
                alert(controls.mobileNumber.value);
                break;
              case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
                clearInterval(this._autoVerifyInterval);
                this.setState({
                  sent: true,
                  //codeInput: phoneAuthSnapshot.code,
                  controls: {
                    Varification: {
                      value: phoneAuthSnapshot.code,
                      value: true,
                      //valid: validate(phoneAuthSnapshot.code, prevState.controls.Varification.validationRules),
                      touched: true
                    }
                  },
                  verificationId: phoneAuthSnapshot.verificationId,
                });
                alert(controls.mobileNumber.value);
              
                break;
              default:
              // will never get here - just for linting
            }
          });
      }
    );
  };

  renderInputPhoneNumber() {
   const { controls } = this.state;
    return (
            <View style={{ }}>
				<Form>
                    <Input
                        placeholder="Phone number ... "
                        style={[styles.input, !controls.mobileNumber.valid && controls.mobileNumber.touched ? styles.invalid : null]}
                        onChangeText={ this.phoneNumberInputHandler }
                        value={controls.mobileNumber.value}
                        autoCorrect={false}
                        keyboardType = 'phone-pad'
                        autoFocus
                        />
                
                    <Button 
                    primary 
                    block
                    style={styles.signInButton}
                    disabled={!controls.mobileNumber.valid}
                    onPress={this.signIn}>
                      <Text> Sign In</Text>
                    </Button>
				</Form>
				
            </View>
    //   <View >
    //     <Text>Enter phone number:</Text>
    //     <TextInput
    //       autoFocus
    //       style={styles.input}
    //       onChangeText={value => this.setState({ phoneNumber: value })}
    //       placeholder="Phone number ... "
    //       value={phoneNumber}
    //       keyboardType = 'phone-pad'
    //     />
    //     <Button
    //       title="Begin Verification"
    //       color="green"
    //       onPress={this.signIn}
    //     />
    //   </View>
    );
  }

  renderSendingCode() {
    const { controls } = this.state;

    return (
      <View style={{ paddingBottom: 15 }}>
        <Text style={{ paddingBottom: 25 }}>
          {`Sending verification code to '${controls.mobileNumber.value}'.`}
        </Text>
        <ActivityIndicator animating style={{ padding: 50 }} size="large" />
      </View>
    );
  }

  renderAutoVerifyProgress() {
    const {
      autoVerifyCountDown,
      started,
      error,
      sent,
      controls
    } = this.state;
    if (!sent && started && !error.length) {
      return this.renderSendingCode();
    }
    return (
      <View style={{ padding: 0 }}>
        <Text style={{ paddingBottom: 25 }}>
          {`Verification code has been successfully sent to '${controls.mobileNumber.value}'.`}
        </Text>
        <Text style={{ marginBottom: 25 }}>
          {`We'll now attempt to automatically verify the code for you. This will timeout in ${autoVerifyCountDown} seconds.`}
        </Text>
        <Button style={{ paddingTop: 25 }}  onPress={() => this.setState({ auto: false })}>
          <Text>I have a code already</Text>
          
         
         
          </Button>
      </View>
    );
  }

  renderError() {
    const { error } = this.state;

    return (
      <View
        style={{
          padding: 10,
          borderRadius: 5,
          margin: 10,
          backgroundColor: 'rgb(255,0,0)',
        }}
      >
        <Text style={{ color: '#fff' }}>{error}</Text>
      </View>
    );
  }
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
renderVerificationCodeInput(){
    const { started, error, sent, auto, user,controls } = this.state;
    return (
        <View style={{ }}>
           
				<Form>
                    <Label>Enter verification code below:</Label>
                    <Input 
						placeholder='Code ...'
						onChangeText={ this.phoneVerificationInputHandler }
                        style={[styles.input, !controls.Varification.valid && controls.Varification.touched ? styles.invalid : null]}
                        value={controls.Varification.value}
                        />
                
                    <Button 
                    primary 
                    block
                    style={styles.signInButton}
                    disabled={!controls.mobileNumber.valid}
                    onPress={this.afterVerify}>
                      <Text> Confirm Code</Text>
                    </Button>
				</Form>
				
            </View>
    //     <View style={{ marginTop: 15 }}>
    //      <Text>Enter verification code below:</Text>
    //      <TextInput
    //       style={styles.input}
    //       autoFocus    
    //       onChangeText={value => this.setState({ codeInput: value })}
    //       placeholder="Code ... "
    //       value={codeInput}
    //      />
    //      <Button
    //       title="Confirm Code"
    //       color="#841584"
    //       onPress={this.afterVerify}
    //     />
    //   </View>
    )
}
  render() {
    const { started, error, sent, auto, user,controls } = this.state;
    return (
       
         <View
          style={{
            padding:40
          }}
        > 
        <View>
           <View style={{  }}>
                <Image
                    source={{ uri: imageUrl }}
                    style={{
                    width: 128,
                    height: 128,
                    marginTop: 25,
                    marginBottom: 15,
                    }}
                /> 
                <Text style={{ fontSize: 25, marginBottom: 20 }}>
                    Phone Auth Example
                </Text>
                </View>
          {error && error.length ? this.renderError() : null}

          {!user && !started && !sent ? this.renderInputPhoneNumber() : null}

          {started && auto && !controls.Varification.value.length ? this.renderAutoVerifyProgress() : null}
          
          {!user && started && sent && (controls.Varification.value.length || !auto) ? this.renderVerificationCodeInput() : null}
          {user ? (
            <View style={{ marginTop: 15 }}>
              <Text>{`Signed in with phone number: '${user.phoneNumber}'`}</Text>
              {/* <Text>{`Started: '${started}'`}</Text>
              <Text>{`sent: '${sent}'`}</Text>
              <Text>{`CodeInput: '${codeInput.length}'`}</Text>
              <Text>{`auto: '${codeInput.length}'`}</Text> */}
              <Button style={{ padding: 5, marginTop: 20}} title="Sign Out" color="red" onPress={this.signOut} />
            </View>
          ) : null}
           </View>
         </View> 
       
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
        width: "100%",
        borderWidth: 1,
        borderColor: "#eee",
        padding: 5,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 8,
        height:20

    },
	invalid: {
		backgroundColor: '#f9c0c0',
		borderColor: "red"
	}
});