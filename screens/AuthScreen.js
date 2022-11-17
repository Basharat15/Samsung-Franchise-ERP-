



import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet, Button, ActivityIndicator, Alert, ImageBackground,Image,Modal,Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { AntDesign, Feather, FontAwesome5, MaterialIcons,FontAwesome } from '@expo/vector-icons';

import LoginInput from '../components/LoginInput';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {

    if (action.type === FORM_INPUT_UPDATE) {
        const updateValues = {
            ...state.inputValidate,
            [action.input]: action.value
        };
        const formValidation = {
            ...state.inputValidaiton,
            [action.input]: action.isValid
        };
        let formSubmit = true;
        for (const key in formValidation) {
            formSubmit = formSubmit && formValidation[key]
        };

        return {

            inputValidate: updateValues,
            inputValidaiton: formValidation,
            formIsValid: formSubmit

        }
    }

    return state;
}




const AuthScreen = props => {
    // const[error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const [alert, setalert] = useState(false);

    const dispatch = useDispatch();




    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValidate: {
            email: '',
            password: ''
        },

        inputValidation: {
            email: false,
            password: false
        },

        formIsValid: false
    })


    const inputValidaiton = useCallback((id, text, isValid) => {
        dispatchFormState({
            value: text,
            type: FORM_INPUT_UPDATE,
            input: id,
            isValid: isValid
        })
    }, [dispatchFormState]);


    useEffect(() => {
        if (error) {
            setalert(true)
        }
    }, [error])



    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signUp(
                formState.inputValidate.email,
                formState.inputValidate.password
            )
        } else {
            action = authActions.login(
                formState.inputValidate.email,
                formState.inputValidate.password
            )
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            // props.navigation.navigate('Shop')
        } catch (err) {
            setError(err.message)
            setIsLoading(false);
        }
    }

    // https://c4.wallpaperflare.com/wallpaper/966/387/707/portrait-display-vertical-pattern-digital-art-wallpaper-preview.jpg
    //https://w0.peakpx.com/wallpaper/601/222/HD-wallpaper-red-metallic-tech-gaming-grey-and-black-high-quality-lights-new-latest-premium-luxury-technology.jpg

    // const url1 = 'https://w0.peakpx.com/wallpaper/601/222/HD-wallpaper-red-metallic-tech-gaming-grey-and-black-high-quality-lights-new-latest-premium-luxury-technology.jpg'
    const url1 = 'https://media.istockphoto.com/illustrations/grey-and-brown-background-illustration-id157616926?k=20&m=157616926&s=612x612&w=0&h=cexBaf-6IWIwLwjkiWigz_izwSUQcjXjafSH2TSlkmw='
    const url2 = 'https://w0.peakpx.com/wallpaper/911/426/HD-wallpaper-metallic-tech-design-dark-luxury-premium-round-silver-speaker-technology-thumbnail.jpg'
    const url3 = 'https://cdn.wallpapersafari.com/7/68/UhpqSr.jpg'
    const url4 = 'https://images.unsplash.com/photo-1542328689-df6c076c1604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
    const url5 = 'https://images.unsplash.com/photo-1533495720786-6dade9109c5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
    return (
        <View style={styles.screen}>
            {/* <LinearGradient colors={['#282A35', 'white', 'pink']} style={styles.grandient}> */}
            {/* <View style = {styles.loginHeader}>
                        <Text style = {styles.loginHeaderText}> {!isSignup ? 'Login' : 'SignUp'}</Text>
                    </View> */}
                     
            <ImageBackground style={styles.bgImage} source={{ uri: url5 }} resizeMode='cover'>
                <Card style={styles.inputContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Welcome to {isSignup ? 'Sign Up' : 'Login'}</Text>
                    </View>
                    <View style ={{ padding: 8, justifyContent: 'center', alignItems: 'center'}}>
                    <FontAwesome name="user-circle-o" size={93} color='#282A35' />
                    </View>
                    <ScrollView>
                        <View style={styles.inputView}>
                            <FontAwesome5
                                name="envelope"
                                size={16}
                                color='#282A35'
                                style={{ marginTop: 15.2, marginRight: 3 }} />

                            <LoginInput
                                id='email'
                                label='E-mail'
                                email
                                required
                                keyboardType='email-address'
                                autoCaptialize='none'
                                onChangeInput={inputValidaiton}
                                placeholder='Enter Your Email'
                                initialValue=''
                                errorMsg="Please Enter Valid Email Address"
                                style={{ marginLeft: -20 }}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <MaterialIcons
                                name="lock-outline"
                                size={19}
                                color='#282A35'
                                style={{ marginTop: 12, marginRight: 1 }} />

                            <LoginInput
                                id='password'
                                label='Password'
                                initialValue=''
                                secureTextEntry
                                required
                                minLength={6}
                                keyboardType='default'
                                onChangeInput={inputValidaiton}
                                placeholder='Enter Your Password'
                                errorMsg="Please Enter Correct Password"
                                style={{ marginLeft: -20 }}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                {isLoading ? <ActivityIndicator size='small' color={Colors.green} /> :
                                    <Button
                                        title={isSignup ? 'Sign Up' : 'Login'}
                                        color={Colors.green}
                                        onPress={authHandler}
                                    />}
                            </View>
                            <View style={styles.button}>
                                <Button
                                    title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                                    color='#282A35'
                                    onPress={() => {
                                        setIsSignup(prevState => !prevState)
                                    }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </Card>
            </ImageBackground>
            {/* </LinearGradient> */}
            <Modal visible={alert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setalert(false)
                }}
            >
                <View style={styles.center_View}>
                    <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                            {error ? <Text style={styles.text1}>Error Occured</Text> : <Text style={styles.text1}>Warning</Text>}
                        </View>
                        <View style={styles.warning_Message}>
                            {error ? <Text style={styles.text2}>{error}</Text> : <Text style={styles.text2}>Please Check Your Form Enteries</Text>}
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Colors.green }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text1}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '85%',
        maxWidth: 400,
        maxHeight: 422,
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 3
    },
    button: {
        width: '100%',
        marginTop: 5,
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 19,
        fontFamily: 'OpenSansRegular',
        marginBottom: 10
    },
    header: {
        backgroundColor: '#282A35',
        paddingVertical: 3,
        borderRadius: 4,
        marginTop: 6,
        marginBottom: 2
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'RobotoBold',
        fontSize: 22,
        padding: 3,
        color: 'white'
    },
    inputView: {
        flexDirection: 'row',
        paddingHorizontal: 1
    },
    warning_modal: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.green,
        borderRadius: 20,
    },
    warning_title: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Colors.green,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    center_View: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    warning_Message: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        fontFamily: 'OpenSansRegular',

    },
    text1: {
        // color: 'white',
        fontSize: 19,
        // padding: 5,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'OpenSansRegular',
    },
    text2: {
        // color: 'white',
        fontSize: 19,
        // padding: 5,
        textAlign: 'center',
        color: '#282A35',
        fontFamily: 'OpenSansRegular',
    },
    reset: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Colors.green,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    }
});

export const ScreenOptions = navData => {
    return {
        headerTitle: 'Login/SignUp',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.green : 'white'
        },
        headerTitleStyle: {

        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.green,

    }
}


export default AuthScreen;

