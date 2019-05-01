import React from 'react';
import { createStackNavigator, HeaderBackButton } from 'react-navigation';
import { Drawer } from './Drawer';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import ItemSearchScreen from '../screens/ItemSearchScreen';
import LoginScreen from '../screens/LoginScreen';

import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import Verification from '../screens/Verification';
import PhoneAuth from '../screens/PhoneAuth';

export const App = createStackNavigator(
    {
        Drawer: { 
            screen: Drawer
        },

        Login: {
            screen: PhoneAuth
        },
        Verification: {
            screen: Verification
        },

        ForgotPassword: {
           screen: ForgotPasswordScreen
        },

        ItemDetails: {
            screen: ItemDetailsScreen
        },

        ItemSearch: {
            screen: ItemSearchScreen
        }
    },
    {
        initialRouteName: "Login",
        headerMode: "none"
    }
)
