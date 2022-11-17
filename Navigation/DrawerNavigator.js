//import liraries
// import React, { Component } from 'react'; 
import * as React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import Colors from '../constants/Colors';
import AccountingNavigator from './AccountingNavigator';
import MarketingNavigator from './MaketingNavigator';
import SupplyNavigator from './SupplyNavigator';
import HomeNavigator from './HomeStack'
import SaleNavigator from './SellDetailStack'
import PurchaseNavigator from './PurchaseStack'
import CustomDrawerContent from '../components/CustomDrawerContent';
import { Ionicons, AntDesign, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';

const ShopDrawerNavigator = createDrawerNavigator();

export const DrawerNavigator = () => {
    
    return (
        <ShopDrawerNavigator.Navigator
            drawerContent={props => {  
                return <CustomDrawerContent {...props} />
            }
            }

            screenOptions={
                {
                    headerShown: false,
                    drawerStyle: {
                        backgroundColor: 'white',
                        width: '60%',
                    },
                    drawerActiveTintColor: 'white',
                    drawerActiveBackgroundColor: Colors.green
                }
            }>
                 <ShopDrawerNavigator.Screen
                name='Home Screen'
                component={HomeNavigator}
                options={
                    {
                        drawerIcon: props => (
                            <Ionicons
                                name='home-outline'
                                size={24}
                                color={props.color}
                            />
                        )
                    }
                }
            />
          
            <ShopDrawerNavigator.Screen
                name='Accounting'
                component={AccountingNavigator}
                options={
                    {
                        drawerIcon: props => (
                            <AntDesign
                                name='wallet'
                                size={24}
                                color={props.color}
                            />
                        )
                    }
                }
            />
              <ShopDrawerNavigator.Screen
                name='Marketing'
                component={MarketingNavigator}
                options={
                    {
                        drawerIcon: props => (
                            <Ionicons
                                name='md-cart'
                                size={24}
                                color={props.color}
                            />
                        )
                    }
                }
            />
            <ShopDrawerNavigator.Screen
                name='Supply'
                component={SupplyNavigator}
                options={
                    {
                        drawerIcon: props => (
                            <AntDesign
                                name='user'
                                size={24}
                                color={props.color}
                            />
                        )
                    }
                }
            />
              <ShopDrawerNavigator.Screen
                name='Purchase'
                component={PurchaseNavigator}
                options={
                    {
                        drawerIcon: props => (
                            <FontAwesome 
                            name="exchange" 
                            size={24}
                             color={props.color} />
                        )
                    }
                }
            />
            <ShopDrawerNavigator.Screen
                name='Sales'
                component={SaleNavigator}
                options={
                    {
                        drawerIcon: props => (
                            <MaterialCommunityIcons 
                            name="cash-100" 
                            size={24}
                             color={props.color} />
                        )
                    }
                }
            />
        </ShopDrawerNavigator.Navigator>
    )
}
