//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SupplyChain,{ScreenOptions as SupplyScreen}  from '../screens/SupplyChain';
import SupplyChainEdit, {ScreenOptions as SupplyChainOption} from '../screens/SupplyChainEdit'



const Stack = createStackNavigator();

// create a component
const SupplyNavigator = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen 
        name="SupplyChain" 
        component={SupplyChain}
        options = {SupplyScreen}
        />
        <Stack.Screen 
        name="AddNewProduct" 
        component={SupplyChainEdit}
        options = {SupplyChainOption}
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
export default SupplyNavigator;
