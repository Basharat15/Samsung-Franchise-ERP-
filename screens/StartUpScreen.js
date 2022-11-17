import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartUpScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        const loginTry = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                // props.navigation.navigate('AuthScreen')
                dispatch(authActions.tryAutoLogin());
                return;
            }
            const convertedObjUserData = JSON.parse(userData);
            const { tokenId, userId, expiryDate } = convertedObjUserData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !tokenId || !userId) {
                // props.navigation.navigate('AuthScreen')
                dispatch(authActions.tryAutoLogin());
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();

            // props.navigation.navigate('Shop');
            dispatch(authActions.authentication(userId, tokenId, expirationTime));
        }
        loginTry();
    }, [dispatch])



    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.green} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartUpScreen;