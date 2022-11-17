import React from 'react';
import { version } from 'react-dom';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native'
import Colors from '../constants/Colors'
import Card from '../components/Card'

const SupplyProductitem = props => {
    let TouchableTem = TouchableOpacity;
    if (Platform.OS == 'android' && version >= 21) {
        TouchableTem = TouchableNativeFeedback
    }
    return (
        <Card style={styles.container}>
                <TouchableTem onPress={props.EditProduct}>
                {/* <Image style={styles.image} source={{ uri: props.image }} /> */}
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: props.image }} />
                </View>
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{props.Quantity}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>Rs. {props.price}</Text>
                </View>
                <View style={styles.action}>
                    <View style={styles.button}>
                        <Button
                            title='Add To Marketing'
                            onPress={props.AddToCart}
                            color={Colors.green}
                            
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Update Product"
                            onPress={props.EditProduct}
                            // color={Colors.green}
                            color = '#282A35'
                        />
                    </View>
                </View>
        </TouchableTem>
            </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        // // height: 300,
        // // width: 200,
        // // margin: 15, 
        // height: 357,
        // width: 182,
        // // width: '45%',
        // marginVertical: 12,
        // marginHorizontal: 11,
        // // overflow: 'hidden',
        // backgroundColor: 'white'
        // flex:1,
        // justifyContent: 'center',
        // alignItems: 'center',
        height: 350,
        width: '45%',
        marginVertical: 10,
        marginHorizontal: 11,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5'
    },
    imageContainer: {
        height: '62%',
        overflow: 'hidden',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    // image: {
    //     width: '100%',
    //     height: '60%',
    // },
    detail: {
        alignItems: 'center',
        marginVertical: 5,
        height: '10%',
        backgroundColor: '#f5f5f5'
        // backgroundColor: 'yellow'
    },
    title: {
        fontSize: 16,
        fontFamily: 'OpenSansRegular'
        // marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'OpenSansRegular'
    },
    action: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '28%',
        backgroundColor: '#f5f5f5'
        // backgroundColor: 'black'
    },
    button: {
        width: '96%',
        marginVertical: 2
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

});

export default SupplyProductitem