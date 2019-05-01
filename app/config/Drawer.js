import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import ItemListScreen from '../screens/ItemListScreen';
import SideBar from '../components/SideBar/SideBar';

export const Drawer = createDrawerNavigator(
    {
        Home: { screen: ItemListScreen }
    },
    {
        navigationOptions: () => ({
            drawerLockMode: 'locked-closed'
        }),
        initialRouteName: "Home",
        drawerPosition: 'left',
        contentComponent: props => <SideBar {...props} />
    }
);
