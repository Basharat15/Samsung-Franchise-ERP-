
import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, Pressable, ScrollView, Button, ActivityIndicator, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/Colors';
import SupplyProductitem from '../components/SupplyProductitem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Input from '../components/Input'
import Card from '../components/Card'
import { Ionicons } from '@expo/vector-icons';
import * as ProductAction from '../store/actions/Supplyproduct';

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

const SupplyChain = props => {
    const [Isalert, setIsalert] = useState(false);
    const [Alert, SetAlert] = useState(false)
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [alert, setalert] = useState(false);
    const [Isloading, Setisloading] = useState(false);
    const [Error, SetError] = useState();
    const [itemSelected, SetitemSelected] = useState('')
    const dispatch = useDispatch();

    const userproducts = useSelector(state => state.supplyItem.userProducts)
    // const availableProducts = useSelector(state => state.products.availableProducts)
    const availableProduct = useSelector(state => state.supplyItem.availableProducts)
    const [search, setSearch] = useState('')
    const [filteredDataSource, setFilteredDataSource] = useState(userproducts)
    //array of object is becoming only array
    let array = availableProduct.map(product => product)
    const orderItemSelected = array.find(product => product.title === itemSelected.title)
    // const TotalAmount = useSelector(state => state.Sellitem.TotalAmount)

    const LoadedProduct = useCallback(async () => {
        // console.log('product')
        SetIsrefreshing(true)
        SetError(null)
        try {
            await dispatch(ProductAction.fetchData());
        } catch (err) {
            SetError(err.message)
        }
        SetIsrefreshing(false)

    }, [dispatch])

    useEffect(() => {
        Setisloading(true)
        LoadedProduct().then(() => {
            Setisloading(false)
        });
    }, [dispatch, LoadedProduct])

    useEffect(() => {
        const unsubcribe = props.navigation.addListener(
            'focus',
            LoadedProduct
        );
        return () => {
            unsubcribe();
        };
    }, [LoadedProduct])


    const renderItems = ({ item }) => (
        <SupplyProductitem
            image={item.imageUrl}
            title={item.title}
            price={item.price}
            Quantity={item.quantity}
            AddToCart={() => {
                SetitemSelected(item)
                // console.log(array)
                setIsalert(true)
               
                // console.log(item)
            }}
            EditProduct={() => {
                props.navigation.navigate('AddNewProduct', {
                    productId: item.id,
                    oldQty: item.quantity
                    // productTitle: item.title
                })
            }}
        />
    )


    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            title: itemSelected.title,
            price: itemSelected.price,
            retailPrice: '',
            Quantity: '',
        },
        inputValidities: {
            title: true,
            price: true,
            retailPrice: false,
            Quantity: false,
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

    const searchFilterFunction = text => {
        if (text) {
            const newData = userproducts.filter(
                function (item) {
                    const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1

                })
            setFilteredDataSource(newData)
            setSearch(text)
        }
        else {
            setFilteredDataSource(userproducts)
            // setInputText(inputText)
            setSearch(text)
        }

        // setFilteredDataSource(PurchaseItem)
        // console.log(text)
    }

    const SubmitFunction = useCallback(async () => {

        if (!stateFrom.fromIsValid) {
            setalert(true)
            // setIsalert(false)
            return;
        }
        Setisloading(true)
        SetError(null)
        try {
            // await dispatch(Productaction.TotalDeduction(
            //     stateFrom.inputValues.price * stateFrom.inputValues.Quantity,
            // ))
            await dispatch(ProductAction.PurchesProduct(
                itemSelected.id,
                stateFrom.inputValues.title,
                stateFrom.inputValues.price,
                itemSelected.imageUrl,
                itemSelected.ram,
                itemSelected.quantity - stateFrom.inputValues.Quantity,
            ))

            if (orderItemSelected) {
                await dispatch(ProductAction.UpdateMarketingProduct(
                    orderItemSelected.id,
                    stateFrom.inputValues.title,
                    itemSelected.imageUrl,
                    itemSelected.ram,
                    stateFrom.inputValues.retailPrice,
                    +orderItemSelected.quantity + +stateFrom.inputValues.Quantity,
                    stateFrom.inputValues.price
                ))
            } else {
                await dispatch(ProductAction.MarketingProduct(
                    stateFrom.inputValues.title,
                    itemSelected.imageUrl,
                    itemSelected.ram,
                    stateFrom.inputValues.retailPrice,
                    stateFrom.inputValues.Quantity,
                    stateFrom.inputValues.price
                ))
            }


            // await dispatch(ProductionAction.Purchesitem(
            //     itemSelected.id,
            //     stateFrom.inputValues.title,
            //     stateFrom.inputValues.price * stateFrom.inputValues.Quantity,
            //     stateFrom.inputValues.Quantity,
            // ))

            

            // console.log(orderItemSelected)

        }
        catch (err) {
            SetError(err.message)
        }
        Setisloading(false)
        setIsalert(false)
    }, [stateFrom, dispatch]);
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

    if (!Isloading && userproducts.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.text2}>No Product Found. Maybe Start Adding Some</Text>
            </View>
        )
    }

    if (Error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errtext}>{Error}</Text>
                <View style={styles.btnContainer2}>
                    <Button
                        color={Colors.green}
                        title="Try Again"
                        onPress={LoadedProduct}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Modal visible={Isalert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setIsalert(false)
                }}
            >
                <View style={styles.centerView}>
                    <ScrollView>
                        <Card style={styles.AuthContainer}>
                            <ScrollView>
                                <View style={styles.useInfo}>
                                    <Text style={styles.useInfoText}>Add to Marketing Products</Text>
                                </View>

                                <Input
                                    id='title'
                                    label="Title"
                                    errorMsg='please enter some title!'
                                    keyboardType='default'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='please Enter title'
                                    initialValue={itemSelected.title}
                                    inputValidity={!!itemSelected}
                                    editable={false}
                                    required
                                    onChangeInput={Changetext}
                                    maxLength={20}
                                />
                                <Input
                                    id='price'
                                    label="Price"
                                    errorMsg='please enter some Price!'
                                    keyboardType='decimal-pad'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='please Enter price'
                                    initialValue={itemSelected.price}
                                    editable={false}
                                    onChangeInput={Changetext}
                                    inputValidity={!!itemSelected}
                                    required
                                    min={0.1}
                                />
                                <Input
                                    id='retailPrice'
                                    label="Retail Price"
                                    errorMsg='please enter retail Price!'
                                    keyboardType='decimal-pad'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='Please Enter Retail Price'
                                    initialValue=''
                                    onChangeInput={Changetext}
                                    inputValidity={!!itemSelected}
                                    required
                                    min={0.1}
                                />
                            
                                <Input
                                    id='Quantity'
                                    label="Quantity"
                                    errorMsg='Please enter Quantity between 1 to 50'
                                    keyboardType='decimal-pad'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='Please Enter Quantity'
                                    initialValue=''
                                    onChangeInput={Changetext}
                                // required
                                // minLength={50}
                                />
                                <View style={styles.btnContainer}>
                                    <Button
                                        title='Submit'
                                        color='#282A35'
                                        onPress={SubmitFunction}
                                    />
                                </View>
                            </ScrollView>
                        </Card>
                    </ScrollView>
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
                            {Error ? <Text style={styles.text}>An Error Occured</Text> : <Text style={styles.text}>Warning</Text>}
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ? <Text style={styles.text}>Something Went Wrong</Text> : <Text style={styles.text}>Please Check Your Form Enteries</Text>}
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Colors.green }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal visible={Alert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    SetAlert(false)
                }}
            >
                <View style={styles.center_View}>
                    <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                            <Text style={styles.text}>'Account Balance Low'</Text>
                        </View>
                        <View style={styles.warning_Message}>
                            <Text style={styles.text}>'Please Check Your Account Balance'</Text>
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Colors.green }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={styles.searchContainer}>
                <TextInput
                    onChangeText={text => searchFilterFunction(text)}
                    value={search}
                    placeholder='Search Here...'
                    style={styles.searchBar}
                />
                <Ionicons onPress={() => { }} name="search" size={26} color="white" style={styles.searchBarIcon} />
            </View>

            <View style={styles.containerText}>
                <Text style={styles.text1}>Warehouse Products</Text>
            </View>
            <FlatList
                // onRefresh={LoadedProduct}
                // refreshing={Isrefreshing}
                data={search ? filteredDataSource : userproducts}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={renderItems}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    containerText: {
        alignItems: 'center',
        marginVertical: 10,
    },
    searchContainer: {
        flexDirection: 'row'
    },
    searchBar: {
        width: '90%',
        marginHorizontal: 20,
        borderWidth: 1.2,
        borderRadius: 4,
        borderColor: 'silver',
        marginTop: 14,
        paddingVertical: 3,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        borderWidth: 0.8,
        borderColor: Colors.green,
        fontSize: 15,
        fontFamily: 'OpenSansRegular'
    },
    searchBarIcon: {
        marginLeft: -60.1,
        marginTop: 15,
        backgroundColor: Colors.green,
        height: 34,
        width: 39.5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 3
    },
    text1: {
        alignItems: 'center',
        fontSize: 20,
        fontFamily: 'OpenSansBold',
        color: Colors.green
    },
    centerView: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    AuthContainer: {
        width: 350,
        height: 505,
        padding: 20,
        marginTop: 170,
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignItems: 'center'
        
    },
    useInfo: {
        alignItems: 'center',
        marginBottom: 25,
        backgroundColor: Colors.green,
        height: 45,
        justifyContent: 'center',
        borderRadius: 3
    },
    useInfoText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'OpenSansRegular',
    },
    btnContainer: {
        flex: 1,
        // width: 250,
        // alignItems: 'center',
        marginHorizontal: 70,
        marginTop: 35
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
    text: {
        color: 'white',
        fontSize: 20,
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
    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text2: {
        color: 'red',
        fontSize: 16,
        fontFamily: 'OpenSansBold'
    },
    btnContainer2: {
        width: 120,
        marginVertical: 10
    },
    errtext: {
        color: 'red',
        fontSize: 20,
        fontFamily: 'OpenSansBold'
    }
})



export const ScreenOptions = navData => {
    return {
        headerTitle: 'Supply and Chain',
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
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Add'
                        iconName={Platform.OS === 'android' ? 'plus-square' : 'plus-square'}
                        onPress={() => {
                            navData.navigation.navigate('AddNewProduct')
                        }}
                    />
                </HeaderButtons>
            )
        }
    }
}

//make this component available to the app
export default SupplyChain;
