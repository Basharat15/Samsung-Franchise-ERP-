

import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Pressable, Modal, ActivityIndicator, Alert } from 'react-native';
import HeaderButton from '../components/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../components/Input'
import * as ProductAction from '../store/actions/Supplyproduct'
import * as AmountAction from '../store/actions/TotalBudget'
import * as ProductionAction from '../store/actions/PurchesProduct'

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

const SupplyChainEdit = props => {
    const [alert, setalert] = useState(false);
    const [Alert, SetIsAlert] = useState(false)
    const [Isloading, Setisloading] = useState(false);
    const [Error, SetError] = useState();
    const dispatch = useDispatch();

    const prodId = props.route.params ? props.route.params.productId : null;
    const prodQty = props.route.params ? props.route.params.oldQty : null;
    const editProduct = useSelector(state =>
        state.supplyItem.userProducts.find(prod => prod.id === prodId));






    //validation

    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            title: editProduct ? editProduct.title : '',
            image: editProduct ? editProduct.imageUrl : '',
            ram: editProduct ? editProduct.ram : '',
            price: '',
            supName: '',
            supNum: '',
            Quantity: editProduct ? editProduct.quantity : '',
        },
        inputValidities: {
            title: editProduct ? true : false,
            image: editProduct ? true : false,
            ram: editProduct ? true : false,
            price: editProduct ? true : false,
            Quantity: editProduct ? true : false,
            supName: false,
            supNum: false,
        },
        FormValiditity: {
            fromIsValid: editProduct ? true : false,
        }
    })

    //fetching amount


    const AmountFetch = useCallback(async () => {
        SetError(null)
        try {
            await dispatch(AmountAction.fetchAmount());
        } catch (err) {
            SetError(err.message)
        }
    }, [dispatch])

    useEffect(() => {
        AmountFetch();
    }, [dispatch, AmountFetch])

    const Changetext = useCallback((inputIdentifier, inputValue, inputValiditiy) => {
        DispatchstateFrom({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            IsValid: inputValiditiy,
            input: inputIdentifier,
        });

    }, [DispatchstateFrom]);


    //fetching amount



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

        if (bug < 20000) {
            SetIsAlert(true)
            return
        }

        Setisloading(true)
        SetError(null)
        try {

            if (editProduct) {
                await dispatch(ProductAction.UpdateProduct(
                    prodId,
                    stateFrom.inputValues.title,
                    stateFrom.inputValues.image,
                    stateFrom.inputValues.ram,
                    +stateFrom.inputValues.Quantity + +stateFrom.inputValues.UpdateQuantity,
                    stateFrom.inputValues.price))

                await dispatch(AmountAction.TotalAmount(
                    (stateFrom.inputValues.price * stateFrom.inputValues.UpdateQuantity) * -1
                ))

                await dispatch(ProductionAction.Purchesitem(
                    prodId,
                    stateFrom.inputValues.title,
                    stateFrom.inputValues.price * stateFrom.inputValues.UpdateQuantity,
                    stateFrom.inputValues.Quantity,
                    stateFrom.inputValues.supName,
                    stateFrom.inputValues.supNum
                ))
            }
            else {
                await dispatch(ProductAction.CreateProduct(
                    stateFrom.inputValues.title,
                    stateFrom.inputValues.image,
                    stateFrom.inputValues.ram,
                    stateFrom.inputValues.price,
                    stateFrom.inputValues.Quantity))

                await dispatch(AmountAction.TotalAmount(
                    (stateFrom.inputValues.price * stateFrom.inputValues.Quantity) * -1
                )
                )

                await dispatch(ProductionAction.newPurchaseItem(
                    stateFrom.inputValues.title,
                    stateFrom.inputValues.price * stateFrom.inputValues.Quantity,
                    stateFrom.inputValues.Quantity,
                    stateFrom.inputValues.supName,
                    stateFrom.inputValues.supNum
                ))

            }



            props.navigation.goBack();
        } catch (err) {
            SetError(err.message)
        }
        Setisloading(false)

    }, [stateFrom, prodId, dispatch]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                            title='card'
                            iconName={Platform.OS === 'android' ? 'check-circle' : 'check-circle'}
                            onPress={SubmitFunction}

                        />
                    </HeaderButtons>
                )
            }
        })
    }, [SubmitFunction])

    useEffect(() => {
        if (Error) {
            setalert(true)
        }
    }, [Error])

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
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id='title'
                    label="Title"
                    errorMsg='Please Enter Product Title!'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='Please Enter Title'
                    initialValue={editProduct ? editProduct.title : ''}
                    inputValidity={!!editProduct}
                    onChangeInput={Changetext}
                    required
                />

                <Input
                    id='image'
                    label="ImageUrl"
                    errorMsg='Please Enter URL!'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    placeholder='Please Enter URL'
                    multiline
                    numberOfLines={3}
                    initialValue={editProduct ? editProduct.imageUrl : ''}
                    inputValidity={!!editProduct}
                    onChangeInput={Changetext}
                    required
                />
                <Input
                    id='supName'
                    label="Supplier Name"
                    errorMsg='please enter Supplier Name!'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='please Enter Supplier Name'
                    required
                    // initialValue={editProduct ? editProduct.supName : ''}
                    // inputValidity={!!editProduct}
                    onChangeInput={Changetext}
                    maxLength={20}
                />
                <Input
                    id='supNum'
                    label="Supplier Number"
                    errorMsg='please enter Supplier Number!'
                    keyboardType='decimal-pad'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='please Enter Supplier Number'
                    // initialValue={editProduct ? editProduct.supNum : ''}
                    // inputValidity={!!editProduct}
                    required
                    onChangeInput={Changetext}
                    maxLength={11}
                />

                <Input
                    id='price'
                    label="Price"
                    errorMsg='Please Enter Price!'
                    keyboardType='decimal-pad'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='Please Enter Price'
                    initialValue={editProduct ? editProduct.price : ''}
                    inputValidity={!!editProduct}
                    onChangeInput={Changetext}
                    // editable={false}
                    required
                />


                <Input
                    id='ram'
                    label="Ram"
                    errorMsg='Please Enter Ram!'
                    autoCapitalize='sentences'
                    keyboardType='decimal-pad'
                    returnKeyType='next'
                    placeholder='Please Enter Ram'
                    initialValue={editProduct ? editProduct.ram : ''}
                    inputValidity={!!editProduct}
                    onChangeInput={Changetext}
                    required
                />

                <Input
                    id='Quantity'
                    label="Quantity"
                    errorMsg='Please Enter Quantity!'
                    keyboardType='decimal-pad'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder={editProduct ? prodQty.toString() : 'Please Enter Your Quantity'}
                    initialValue={editProduct ? editProduct.quantity : ''}
                    // editable={false}
                    inputValidity={!!editProduct}
                    onChangeInput={Changetext}
                    required
                //min={5}
                />



                {
                    editProduct ? <Input
                        id='UpdateQuantity'
                        label="Update Quantity"
                        // errorMsg='Please Update Your Quantity!'
                        keyboardType='decimal-pad'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                        placeholder='Please Update Quantity'
                        // initialValue={editProduct ? editProduct.quantity : ''}
                        // inputValidity={!!editProduct}
                        onChangeInput={Changetext}
                    //min={5}
                    /> : null
                }

            </View>

            {/* Modal for network error */}

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
                            {Error ? <Text style={styles.text1}>An error occured</Text> : <Text style={styles.text1}>Warning</Text>}
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ? <Text style={styles.text2}>Something went wrong</Text> : <Text style={styles.text2}>Please Check Your Form Enteries</Text>}
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Colors.green }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text0}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* modal for low budget */}
            <Modal visible={Alert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    SetIsAlert(false)
                }}
            >
                <View style={styles.center_View}>
                    <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                            <Text style={styles.text0}>Low Budget</Text>
                        </View>
                        <View style={styles.warning_Message}>
                            <Text style={styles.textt}>Please contact with Accounting and Finanace.</Text>
                        </View>
                        <Pressable
                            onPress={() => {
                                SetIsAlert(false)
                            }}
                            android_ripple={{ color: Colors.green }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text0}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export const ScreenOptions = navdata => {
    const routeParams = navdata.route.params ? navdata.route.params : {}
    return {
        headerTitle: routeParams.productId ? 'Update Product' : 'Order Product',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.green : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.green,

    }

}

const styles = StyleSheet.create({
    form: {
        margin: 20,
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
    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text0: {
        color: 'white',
        fontSize: 19,
        fontFamily: 'OpenSansRegular',
    },
    textt: {
                color: 'white',
                fontSize: 19,
                fontFamily: 'OpenSansRegular',
            }

})
export default SupplyChainEdit;