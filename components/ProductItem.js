
//samsungproductitem
import React, { version } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    StyleSheet
}
    from 'react-native';
import Colors from '../constants/Colors';

import Card from './Card';

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <Card style={styles.mainContainer}>
            {/* <TouchableCmp onPress = {props.viewDetails}> */}
            <TouchableCmp>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: props.imageUrl }} />
                </View>
                <View style={styles.badgeContainer}>
                   {props.quantity === 0 ? <Text style={styles.badgeText0}>X</Text> : <Text style={styles.badgeText}>{props.quantity}</Text>}
                    {/* {props.quantity ? props.quantity : props.quantity2}
                    <Text style={styles.badgeText}>{props.quantity || props.quantity2}</Text> */}
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>Rs. {props.price}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.btn1}>
                        <Button
                            color={Colors.green}
                            title="Details"
                            onPress={props.viewDetails}
                        />
                    </View>

                    <View style={styles.btn2}>
                        <Button
                            color='#282A35'
                            title=" Sell Now "
                            onPress={props.sellNow}
                        />
                    </View>
                </View>
            </TouchableCmp>
        </Card>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        height: 350,
        width: '45%',
        marginVertical: 12,
        marginHorizontal: 11,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5'
    },
    imageContainer: {
        height: '70%',
        overflow: 'hidden',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    titleContainer: {
        alignItems: 'center',
        height: '10%',
        marginVertical: 7,
        backgroundColor: '#f5f5f5'
    },
    title: {
        // paddingVertical: 5,
        fontSize: 16,
        fontFamily: 'OpenSansRegular'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'OpenSansRegular'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'center',
        height: '20%',
        backgroundColor: '#f5f5f5',
        marginTop: 3
    },
    btn1: {
        width: 82,
    },
    btn2: {
        width: 82
    },
    badgeContainer: {
        backgroundColor: Colors.green,
        width: 30,
        height: 30,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0
    },
    badgeText: {
        color: 'white',
        fontSize: 12
    },
    badgeText0: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }

});

export default ProductItem;