//import liraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen, {ScreenOptions as AuthScreenDesign} from '../screens/AuthScreen'
// import SplashScreen, {ScreenOptions as SplashScreenDesign} from '../screens/SplashScreen'


const Stack = createStackNavigator();

// create a component
const AuthNavigator = () => {
    return (
        <Stack.Navigator>
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} options = {SplashScreenDesign} /> */}
        <Stack.Screen name="AuthScreen" component={AuthScreen} options = {AuthScreenDesign} />
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
export default AuthNavigator;
