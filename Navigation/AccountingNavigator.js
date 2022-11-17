//import liraries
import React, { Component } from 'react';
import {  StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import Accounting from '../screens/AccountingAndFinance';
import Accounting, { ScreenOptions as AccountingScreen } from '../screens/AccountingAndFinance';
import SalesDetails, { ScreenOptions as SalesDetailsScreen } from '../screens/SalesDetailScreen';
import PurchaseDetail, { ScreenOptions as PurchaseDetailScreen } from '../screens/PurchaseDetailScreen';
import RevenueDetail, { ScreenOptions as RevenueDetailScreen } from '../screens/RevenueScreen'

const Stack = createStackNavigator();

// create a component
const AccountingNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AccountingScreen"
                component={Accounting}
                options={AccountingScreen}
            />
            <Stack.Screen
                name="SaleDetailsScreen"
                component={SalesDetails}
                options={SalesDetailsScreen}
            />
            <Stack.Screen
                name="PurchaseDetailScreen"
                component={PurchaseDetail}
                options={PurchaseDetailScreen}
            />
            <Stack.Screen
                name="RevenueDetailScreen"
                component={RevenueDetail}
                options={RevenueDetailScreen}
            />
        </Stack.Navigator>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default AccountingNavigator;
