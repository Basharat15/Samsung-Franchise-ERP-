//import liraries
import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator, ScrollView, Modal, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import * as CustomerActions from '../store/action/customer'
import Colors from '../constants/Colors';
import Card from '../components/Card';
import Input from '../components/Input';
// import * as CustomerActions from '../store/actions/customer'
import * as ProductionAction from '../store/actions/Sell'
import * as ProductAction from '../store/actions/Supplyproduct'
import * as AmountAction from'../store/actions/TotalBudget'

//useReducer
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {

    if (action.type === FORM_INPUT_UPDATE) {
        const updateValues = {
            ...state.inputValues,
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

            inputValues: updateValues,
            inputValidaiton: formValidation,
            formIsValid: formSubmit

        }
    }

    return state;
}

// create a component
const SellNowScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [alert, setalert] = useState(false);
    // const [quantityremain, setQuantityRemain]= useState()
    const title = props.route.params.productTitle;
    const price = props.route.params.productPrice;
    const quantity = props.route.params.productQuantity
    const imageUrl = props.route.params.productUrl
    const pid = props.route.params.pid
    const ram = props.route.params.productRam
    const purchasePrice = (props.route.params.purchasePrice)

    // setQuantityRemain(quantity)

    const dispatch = useDispatch();

    const [stateForm, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: title,
            price: price,
            name: '',
            number: '',
            Quantity: ''
            // price: editProduct ? editProduct.price : ''
        },

        inputValidation: {
            title: true,
            price: true,
            name: false,
            number: false,
            Quantity: false,

            // price: editProduct ? true : false
        },

        formIsValid: false
    })

    useEffect(() => {
        if (error) {
            // Alert.alert('Error:  ', error, [{ text: 'Okay' }]);
            setalert(true)
            
        }
    }, [error])

    const inputValidaiton = useCallback((id, text, isValid) => {
        dispatchFormState({
            value: text,
            type: FORM_INPUT_UPDATE,
            input: id,
            isValid: isValid
        })
    }, [dispatchFormState]);



    const submitCustomerHandler = useCallback(async () => {

        // console.log('purchase price on Sell nOw screen',typeof(purchasePrice))

      
        // console.log("product has been submited")
        if (!stateForm.formIsValid) {
            setalert(true)
            return;
        }
        setError(null);
        setIsLoading(true);
        try {

            // await dispatch(CustomerActions.customerRecord(
            //     // productId,
            //     formState.inputValidate.pTitle,
            //     +formState.inputValidate.pPrice,
            //     formState.inputValidate.customerName,
            //     +formState.inputValidate.customerNumber,
            //     +formState.inputValidate.customerCNIC,
            //     +formState.inputValidate.pQuantity,)
            // );

            // await dispatch(ProductionAction.TotalRevenue(
            //     stateForm.inputValues.price * +stateForm.inputValues.Quantity,
            // ))

            await dispatch(ProductAction.SellProduct(
                pid,
                stateForm.inputValues.title,
                stateForm.inputValues.price,
                stateForm.inputValues.name,
                stateForm.inputValues.number,
                imageUrl,
                ram,
                quantity - stateForm.inputValues.Quantity,
            ))

            await dispatch(ProductionAction.Sellproduct(
                stateForm.inputValues.title,
                stateForm.inputValues.price * stateForm.inputValues.Quantity,
                stateForm.inputValues.name,
                +stateForm.inputValues.number,
                +stateForm.inputValues.Quantity,
                +stateForm.inputValues.price * stateForm.inputValues.Quantity - purchasePrice * stateForm.inputValues.Quantity
                )
                )

                await dispatch(AmountAction.TotalAmount(
                    stateForm.inputValues.price * stateForm.inputValues.Quantity
                    )
                    )

            // const q = quantity - +stateForm.inputValues.Quantity;

            // console.log(+quantity - +stateForm.inputValues.Quantity)
            // props.navigation.goBack();
            props.navigation.navigate('Sales And Marketing'
                //   {
                //     remainQty:  quantity - stateForm.inputValues.Quantity,
                //     pid: pid
                // }
            )

        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false);

    }, [dispatch, stateForm]);


    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size='large' color={Colors.green} />
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <Card>
                    <Text style={styles.modalText}>Customer Details</Text>
                    <View style={styles.modalContainer}>
                        <Input
                            id='title'
                            label='Title'
                            required
                            keyboardType='default'
                            autoCaptialize='none'
                            onChangeInput={inputValidaiton}
                            // placeholder={title}
                            inputValidity={!!title}
                            initialValue={title}
                            editable={false}
                            errorMsg="Enter Valid Customer Name"
                        // maxLength = {20}
                        />
                        <Input
                            id='price'
                            label='Price'
                            required
                            keyboardType='numeric'
                            autoCaptialize='none'
                            onChangeInput={inputValidaiton}
                            inputValidity={!!price}
                            initialValue={price}
                            editable={false}
                            errorMsg="Enter Valid Customer Name"
                        // maxLength = {20}
                        />
                        <Input
                            id='name'
                            label='Customer Name'
                            required
                            keyboardType='default'
                            autoCaptialize='none'
                            onChangeInput={inputValidaiton}
                            placeholder='Enter Customer Name'
                            errorMsg="Enter Valid Customer Name"
                            maxLength={20}
                        />
                        <Input
                            id='number'
                            label='Customer Number'
                            required
                            keyboardType='numeric'
                            autoCaptialize='none'
                            onChangeInput={inputValidaiton}
                            placeholder='Enter Customer Number'
                            errorMsg="Enter Valid Customer Number"
                            minLength={11}
                        />

                        <Input
                            id='Quantity'
                            label='Quantity'
                            required
                            keyboardType='numeric'
                            autoCaptialize='none'
                            onChangeInput={inputValidaiton}
                            placeholder='Enter Quantity'
                            errorMsg="Enter Valid Quatity"
                            minLength={1}
                        />
                        <View style={styles.buttonContainer}>
                            <View style={styles.btn1}>
                                <Button
                                    color='#282A35'
                                    title="Submit"
                                    onPress={submitCustomerHandler}
                                // onPress={props.viewDetails}
                                />
                            </View>
                        </View>
                    </View>
                </Card>

            </ScrollView>
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
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '85%',
        marginHorizontal: 30,
        marginVertical: 20
        // margin: 20
    },
    modalText: {
        // marginBottom: 15,
        textAlign: 'center',
        fontSize: 21,
        backgroundColor: Colors.green,
        color: 'white',
        padding: 8,
        borderRadius: 5,
        fontFamily: 'OpenSansBold'
    },
    modalContainer: {
        // flex: 1,
        // width: '80%',
        alignItems: 'center',
        padding: 15,
        // height: 500
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20
    },
    btn1: {
        width: '100%',
        padding: 5
    },
    loader:{
        justifyContent: 'center',
        alignItems: 'center'
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
        fontFamily: 'OpenSansRegular',
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
        fontFamily: 'OpenSansRegular'
    },
    text2: {
        // color: 'white',
        fontSize: 19,
        // padding: 5,
        textAlign: 'center',
        fontFamily: 'OpenSansRegular',
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
        headerTitle: 'Customer Order',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.green : 'white'
        },
        headerTitleStyle: {

        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.green,
        // headerLeft: () => {
        //     return(
        //         <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //             <Item
        //                 title='Menu'
        //                 iconName ={Platform.OS === 'android' ? 'menu' : 'menu'}
        //                 onPress ={()=>{
        //                     navData.navigation.toggleDrawer();
        //                 }}
        //             />
        //         </HeaderButtons>
        //     )
        // },
        // headerRight: () => {
        //     return (
        //         <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //             <Item
        //                 title='Add'
        //                 iconName={Platform.OS === 'android' ? 'plus-square' : 'plus-square'}
        //                 onPress={() => {
        //                     navData.navigation.navigate('AddNewProduct')
        //                 }}
        //             />
        //         </HeaderButtons>
        //     )
        // }
    }
}

//make this component available to the app
export default SellNowScreen;
