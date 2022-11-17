//import liraries
import React, { useReducer, useEffect, useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, ActivityIndicator, TouchableOpacity, TextInput, Modal, ScrollView,Pressable, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import * as SellAction from '../store/actions/Sell'
import * as ProductAction from '../store/actions/Supplyproduct';
import * as AmountAction from '../store/actions/TotalBudget'
import Colors from '../constants/Colors'
import Card from '../components/Card';
import Input from '../components/Input'
import { useSelector, useDispatch } from 'react-redux';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const fromReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const UpdatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const UpdatedValidities = {
            ...state.inputValidities,
            [action.input]: action.IsValid
        }

        let fromIsValid = true;
        for (const key in UpdatedValidities) {
            fromIsValid = fromIsValid && UpdatedValidities[key]
        }
        return {
            inputValues: UpdatedValues,
            inputValidities: UpdatedValidities,
            fromIsValid: fromIsValid
        }
    };
    return state;
}

// create a component
const Accounting = props => {
    // imagePath = 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    const image = { uri: 'https://images.unsplash.com/photo-1625225229083-f256754cf34e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' };


    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Error, SetError] = useState()
    const [amount, Setamount] = useState('')
    const [Isalert, setIsalert] = useState(false)
    const [alert, setalert] = useState(false);
    

    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            price: '',
        },
        inputValidities: {
            price: false,
        },
        FormValiditity: {
            fromIsValid: false,
        }
    })

    const Changetext = useCallback((inputIdentifier, inputValue, inputValiditiy) => {
        DispatchstateFrom({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            IsValid: inputValiditiy,
            input: inputIdentifier,
        });

    }, [DispatchstateFrom]);

    // BELOW CODE IS FOR REVENUE

    const Sellproduct = useCallback(async () => {
        SetError(null)
        try {
            SetIsloading(true)
            await dispatch(SellAction.fetchData());
            SetIsloading(false)
        } catch (err) {
            SetError(err.message)
        }
    }, [dispatch])

    useEffect(() => {
        Sellproduct();
    }, [dispatch, Sellproduct])

    //total amout fetch

    const AmountFetch = useCallback(async () => {
        SetError(null)
        try {
            SetIsloading(true)
            await dispatch(AmountAction.fetchAmount());
            SetIsloading(false)
        } catch (err) {
            SetError(err.message)
        }
    }, [dispatch])

    useEffect(() => {
        AmountFetch();
    }, [dispatch, AmountFetch])


    //BELOW CODE IS FOR PROFIT

    const LoadedProduct = useCallback(async () => {
        // console.log('product')
        // SetIsrefreshing(true)
        SetError(null)
        try {
            await dispatch(ProductAction.fetchData());
        } catch (err) {
            SetError(err.message)
        }
        // SetIsrefreshing(false)

    }, [dispatch])

    useEffect(() => {
        // Setisloading(true)
        LoadedProduct().then(() => {
            // Setisloading(false)
        });
    }, [dispatch, LoadedProduct])


    const revenueArray = useSelector(state => state.Sellitem.Sell)
    let array1 = revenueArray.map(a => a.price);

    let revenue = 0;
    for (let i = 0; i < array1.length; i++) {
        revenue += array1[i];
    }

    const purchaseArray = useSelector(state => state.PurchaseItem.purches)
    let array2 = purchaseArray.map(a => a.price);

    let totalPurchase = 0;
    for (let j = 0; j < array2.length; j++) {
        totalPurchase += array2[j];
    }

    //For Profit

    const profit = useSelector(state => state.Sellitem.Sell)
    let arr = profit.map(a => a.profit);

    let totalProfit = 0;
    for (let j = 0; j < arr.length; j++) {
        totalProfit += arr[j];
    }


    //total amount 
    const allamount = useSelector(state => state.Amount.Amount)
    const budgets = allamount.map(a => a.amount)
    let bug = 0;
    for (let i = 0; i < budgets.length; i++) {

        bug += budgets[i];
    }


    

    
    const SubmitFunction = useCallback(async () => {
        if (!stateFrom.fromIsValid) {
            setalert(true)
            return;
        }

        SetIsloading(true)
        SetError(null)
        try {

            await dispatch(AmountAction.TotalAmount(
                +stateFrom.inputValues.price
            ))
        } catch (err) {
            SetError(err.message)
        }
        setIsalert(false)
        SetIsloading(false)

    }, [stateFrom, dispatch]);

    //SEPERATE



    if (Isloading) {
        return (
            <View style={styles.Centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.green}
                />
            </View>
        )
    }



    return (


        <ImageBackground source={require('../assets/images/finance.jpg')} resizeMode='cover' style={styles.image}>
            <View style={styles.container}>
                <View style={styles.addAmountBtn}>
                    <Button title='Add Amount' color={Colors.green} onPress={() => { setIsalert(true) }} />
                </View>

                <Modal visible={Isalert}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => {
                        setIsalert(false)
                    }}
                >
                    <View style={styles.centerView}>
                        {/* <ScrollView> */}
                        <Card style={styles.AuthContainer}>
                            {/* <ScrollView> */}
                            <View style={styles.useInfo}>
                                <Text style={styles.useInfoText}>Enter Investment Amount</Text>
                            </View>

                            {/* <TextInput
                                keyboardType='decimal-pad'
                                autoCapitalize='sentences'
                                returnKeyType='next'
                                placeholder='Enter Enter Your Price'
                                onChangeText={changingText}
                                
                            /> */}

                            <Input
                                id='price'
                                // label='Amount's
                                // email
                                required
                                keyboardType='decimal-pad'
                                autoCaptialize='none'
                                onChangeInput={Changetext}
                                placeholder='Please Enter Some Amount'
                                style={{ borderWidth: 1, borderColor: 'silver', paddingHorizontal: 15, paddingVertical: 4, fontFamily: 'OpenSansRegular', textAlign: 'center',marginTop:-35 }}
                            // inputValidity={!!itemSelected}
                            // initialValue=''
                            // errorMsg="Please Enter Valid Title"
                            />

                            <View style={styles.btnContainerModal}>
                                <Button title='Submit' color={Colors.green} onPress={SubmitFunction} />
                            </View>
                            {/* </ScrollView> */}
                        </Card>
                        {/* </ScrollView> */}
                    </View>
                </Modal>

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
                            {Error ? <Text style={styles.text1}>An Error Occured</Text> : <Text style={styles.text1}>Warning</Text>}
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ? <Text style={styles.text2}>Something Went Wrong</Text> : <Text style={styles.text2}>Please Check Your Form Enteries</Text>}
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

                <View style={styles.card}>
                    <Text style={{ ...styles.cardText, ...styles.cardTextTitle }}>Total Budget</Text>
                    <Text style={styles.cardText}>Rs. {bug}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={{ ...styles.cardText, ...styles.cardTextTitle }}>Profit</Text>
                    <Text style={styles.cardText}>Rs. {totalProfit}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={{ ...styles.cardText, ...styles.cardTextTitle }}>Revenue</Text>
                    <Text style={styles.cardText}>Rs. {revenue}</Text>
                </View>

                {/* </Card> */}
                <View style={styles.btnContainer}>
                    <View style={styles.detailBtn}>
                        <Button
                            color={Colors.green}
                            title=" Sales Detail "
                            onPress={() => {
                                props.navigation.navigate('SaleDetailsScreen')
                                console.log("totalPurchase", totalPurchase)
                            }}
                        />
                    </View>
                    <View style={styles.detailBtn}>
                        <Button
                            color='#282A35'
                            title="Purchase Detail"
                            onPress={() => {
                                props.navigation.navigate('PurchaseDetailScreen')
                            }}
                        />
                    </View>
                </View>

            </View>
        </ImageBackground>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // width: 200
        // marginTop: 20
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    cardText: {
        fontFamily: 'OpenSansRegular',
        fontSize: 19,
        color: Colors.green
    },
    cardTextTitle: {
        fontFamily: 'OpenSansRegular',
        fontSize: 18,
        color: '#282A35'
    },
    bigCard: {
        padding: 22,
        borderWidth: 0.5,
        // width: 200,
        borderColor: Colors.green
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        width: 250,
        borderWidth: 0.5,
        borderColor: 'white',
        margin: 5,
        borderRadius: 1,
        elevation: 1
    },
    btnContainer: {
        marginTop: 20,
        flexDirection: 'row'
    },
    detailBtn: {
        width: 150,
        margin: 3,
        padding: 7,
    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'red',
        fontSize: 20,
        fontFamily: 'OpenSansBold'
    },
    btnContainer2: {
        width: 120,
        marginVertical: 10
    },
    action: {
        marginBottom: 10,
        padding: 5,
        fontSize: 20
    },
    AuthContainer: {
        width: 270,
        height: 210,
        paddingHorizontal: 30,
        justifyContent: 'space-evenly',
        // alignItems: 'center',
        backgroundColor: 'white',
        // marginTop: '115%'
    },
    useInfo: {
        alignItems: 'center',
        // marginBottom: 20,
        backgroundColor: '#282A35',
        // height: 35,
        paddingVertical: 10,
        // paddingHorizontal: 25,
        justifyContent: 'center',
        borderRadius: 5,
        marginTop:10
    },
    useInfoText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'OpenSansRegular'
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        // marginTop: 25,
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    btnContainerModal: {
        // alignItems: 'center',
        marginTop: -15,
        // backgroundColor: Colors.green,
        width: 110,
        marginHorizontal: 65,
        marginLeft: 47

    },
    addAmountBtn: {
        marginBottom: 15
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

    },
    text1: {
        // color: 'white',
        fontSize: 19,
        // padding: 5,
        textAlign: 'center',
        color: 'white'
    },
    text2: {
        // color: 'white',
        fontSize: 19,
        // padding: 5,
        textAlign: 'center',
        color: '#282A35'
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
        headerTitle: 'Accounting and Finance',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.green : 'white'
        },
        headerTitleStyle: {

        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.green,
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Menu'
                        iconName={Platform.OS === 'android' ? 'menu' : 'menu'}
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        },
        // headerRight: () => {
        //     return (
        //         <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //             <Item
        //                 title='Add'
        //                 iconName={Platform.OS === 'android' ? 'plus-square' : 'plus-square'}
        //                 onPress={()=> {}}
        //             />
        //         </HeaderButtons>
        //     )
        // }
    }
}

//make this component available to the app
export default Accounting;
