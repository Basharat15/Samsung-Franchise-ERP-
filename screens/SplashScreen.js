//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Button,Image,Dimensions,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import Color from '../constants/Colors'
// create a component
const SplashScreen = (props) => {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            < Image
            source={require('../assets/images/logofinal.png')} 
            style={styles.logo}
            resizeMode='cover'
            />
          </View>
          <View style={styles.footer}>
            <Text style={styles.title}>Integrated Management System</Text>
            <Text style={styles.text}>Singup to Continue</Text>
            <View style={styles.button}>
             <TouchableOpacity onPress={()=>{
                props.navigation.navigate('AuthScreen')
             }}>
                <LinearGradient
                colors={['#059862','#059862']}
                style={styles.sigIn}
                >
                  <Text style={styles.textSign}>Get Started </Text> 
                  <MaterialIcons name="navigate-next" size={25} color="#fff" /> 
                </LinearGradient>
             </TouchableOpacity>
            </View>
          </View>
        </View>
    );
};

export const ScreenOptions= navdata => {
    return {
        headerTitle: 'Samsung Franchise',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? '#3EB493': 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.green,
        
    }

}

// define your styles
const { height } = Dimensions.get('screen')
const height_logo = height * 0.29;

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: Color.green,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: Color.green,
        fontSize: 32,
        marginVertical:5,
        fontFamily: 'OpenSansBold'
    },
    text: {
        color: 'gray',
        marginTop: 5,
        fontSize:20 ,
        fontFamily: 'OpenSansRegular'
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    sigIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontFamily: 'OpenSansBold',
        fontSize: 16,
        fontFamily: 'OpenSansRegular'

    }
});

//make this component available to the app
export default SplashScreen;
