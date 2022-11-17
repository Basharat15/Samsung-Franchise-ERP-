//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Marketing, {ScreenOptions as MarketingScreen} from '../screens/MarketingAndSales';
import SellNowScreen, {ScreenOptions as SellNowScreenDesign} from '../screens/SellNowScreen'


const Stack = createStackNavigator();

// create a component
const MarketingNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'silver' } }}>
        <Stack.Screen 
        name="Sales And Marketing"
         component={Marketing}
         options = {MarketingScreen}

        />
        <Stack.Screen
         name="SellNowScreen"
         component={SellNowScreen}
         options = {SellNowScreenDesign}
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
export default MarketingNavigator;
