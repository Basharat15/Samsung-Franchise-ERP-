import React from 'react'
import { Button, View, Text, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth'

const CustomDrawerContent = (props) => {
    const dispatch = useDispatch()
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Image style={styles.image} source={require('../assets/images/logofinal.png')}  />
                <Text style={styles.text}>Integrated Samsung Franchie</Text>
            </View>
            <DrawerItemList {...props} />
            <View style={styles.logoutBtn}>
                <Button
                    title='Logout'
                    color={Colors.green}
                    onPress={() => {
                        // props.navigation.navigate('AuthScreen')
                        dispatch(authActions.logout());
                    }}
                />
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 125,
        width: '90%',
        marginHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: 'silver',
        borderBottomColor: 'silver',
        borderBottomWidth: 1.3,
        marginBottom: 2,
        // backgroundColor: 'yellow'
    },
    image: {
        width: 90,
        height: 80,
        borderRadius: 5
    },
    text: {
        fontWeight: 'bold',
        marginTop: 10,
        // color: Colors.green,
        color: '#282A35',
        fontSize: 17,
        fontFamily: 'OpenSansRegular'
    },
    logoutBtn: {
        marginTop: 12,
        width: '91%',
        justifyContent: 'center',
        marginHorizontal: 12
    }

})

export default CustomDrawerContent;