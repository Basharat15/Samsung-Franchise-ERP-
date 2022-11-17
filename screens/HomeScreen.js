

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Card from '../components/Card';

const url1 = 'https://media.istockphoto.com/illustrations/grey-and-brown-background-illustration-id157616926?k=20&m=157616926&s=612x612&w=0&h=cexBaf-6IWIwLwjkiWigz_izwSUQcjXjafSH2TSlkmw='
const url2 = 'https://w0.peakpx.com/wallpaper/911/426/HD-wallpaper-metallic-tech-design-dark-luxury-premium-round-silver-speaker-technology-thumbnail.jpg'
const url3 = 'https://cdn.wallpapersafari.com/7/68/UhpqSr.jpg'
const url4 = 'https://i.pinimg.com/originals/6b/78/4e/6b784e520dde662300605284f6129e89.jpg'
const url5 = 'https://i.pinimg.com/736x/9d/11/cc/9d11cc00e9507ad97142b307d7e40e9f.jpg'

// create a component
const HomeScreen = props => {
    const url = url5;
    return (

        <ImageBackground source={{ uri: url }} resizeMode='cover' style={{ justifyContent: 'center', flex: 1 }}>

            <View style={styles.container}>
                <View style={styles.mainTitleContainer}>
                    <Text style={styles.mainTitle}>Integrated Samsung Franchise</Text>
                </View>
                <View style={styles.screenMainContainer}>
                    <Card style={styles.cardContainer}>
                        {/* <ImageBackground source={{ uri: ms }} resizeMode='cover' style={{ justifyContent: 'center', flex: 1 }}> */}
                        <Pressable
                            onPress={() => {
                                props.navigation.navigate('Marketing')
                            }}
                            android_ripple={{ color: Colors.green }}
                        >
                            <View style={styles.screenContainer}>
                                <View style={styles.screenCard}>
                                    <AntDesign
                                        name='user'
                                        size={35}
                                        color={Colors.green}
                                        style={styles.icon}
                                    />
                                </View>
                                <View style={styles.screenCard}>
                                    <Text style={styles.screenTitle}>    Sales and Marketing   </Text>
                                </View>
                            </View>
                        </Pressable>
                        {/* </ImageBackground> */}
                    </Card>

                    <Card style={styles.cardContainer}>
                        <Pressable
                            onPress={() => {
                                props.navigation.navigate('Supply')
                            }}
                            android_ripple={{ color: Colors.green }}
                        >
                            <View style={styles.screenContainer}>
                                <View style={styles.screenCard}>
                                    <Ionicons
                                        name='md-cart'
                                        size={35}
                                        color={Colors.green}
                                        style={styles.icon}
                                    />
                                </View>
                                <View style={styles.screenCard}>
                                    <Text style={styles.screenTitle}>Supply Chain Mangement</Text>
                                </View>
                            </View>
                        </Pressable>
                    </Card>

                    <Card style={styles.cardContainer}>
                        <Pressable
                            onPress={() => {
                                props.navigation.navigate('Accounting')
                            }}
                            android_ripple={{ color: Colors.green }}
                        >
                            <View style={styles.screenContainer}>
                                <View style={styles.screenCard}>
                                    <Ionicons
                                        name='wallet'
                                        size={35}
                                        color={Colors.green}
                                        style={styles.icon}
                                    />
                                </View>
                                <View style={styles.screenCard}>
                                    <Text style={styles.screenTitle}>Accounting and Finanace</Text>
                                </View>
                            </View>
                        </Pressable>
                    </Card>
                </View>
            </View>
        </ImageBackground>

    )
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'silver',
        marginBottom: 20
    },
    mainTitleContainer: {
        // backgroundColor: 'yellow',
        // height: 60,
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.green,
        paddingVertical: 13,
        marginBottom: 35,
        borderRadius: 5
    },
    mainTitle: {
        fontFamily: 'OpenSansRegular',
        fontSize: 22,
        color: 'white'
    },
    cardContainer: {
        marginVertical: 15,
        borderWidth: 1,
        marginHorizontal: 12,
        borderColor: 'white',
        // borderColor: 'white',
        height: 140,
        width: 260,
        // padding: 18,
        backgroundColor: 'white',
        borderRadius: 10
    },
    screenContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-evenly',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        // backgroundColor: 'blue'
    },
    icon: {
        textAlign: 'center',
        // marginTop: 5
    },
    screenCard: {
        justifyContent: 'center',
        // marginVertical: 10,
        // backgroundColor: 'yellow',
        width: '100%'
    },
    screenTitle: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'OpenSansRegular',
        color: '#010127',
        textAlign: 'center'
    },
    screenMainContainer: {
        flexDirection: 'column',
        //    backgroundColor: 'pink'
    }

});

//make this component available to the app
export default HomeScreen;

