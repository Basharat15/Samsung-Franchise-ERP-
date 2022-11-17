//import liraries
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, Modal, Pressable, StyleSheet, Alert, ActivityIndicator, Button, TextInput } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import ProductItem from '../components/ProductItem';
import Input from '../components/Input';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as ProductAction from '../store/actions/Supplyproduct';

// import { Platform } from 'react-native-web';



// create a component

const Marketing = (props) => {

    const dispatch = useDispatch()
    const LoadedProduct = useCallback(async () => {
        // console.log('product')
        // Setisloading(true)
        SetError(null)
        try {
            SetIsrefreshing(true)
            await dispatch(ProductAction.fetchMarketingData());
        }
        catch (err) {
            SetError(err.message)
        }
        SetIsrefreshing(false)


    }, [dispatch, SetError, Setisloading])

    useEffect(() => {
        Setisloading(true)
        LoadedProduct();
        Setisloading(false)
    }, [dispatch, LoadedProduct])

    useEffect(() => {
        const unsubcribe = props.navigation.addListener(
            'willFocus',
            LoadedProduct
        );
        return () => {
            unsubcribe();
        };
    }, [LoadedProduct])

    const [modalVisible, setModalVisible] = useState(false);
    const [Alert, SetIsAlert] = useState(false)
    const [itemSelected, setItemSelected] = useState('');
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [Isloading, Setisloading] = useState(false);
    const [Error, SetError] = useState(false)
    const MOBILES = useSelector(state => state.supplyItem.availableProducts)
    const [search, setSearch] = useState('')
    const [filteredDataSource, setFilteredDataSource] = useState(MOBILES)
    // const [dataFromState, setDataFromState] = useState(MOBILES)




    const renderItems = ({ item }) => (
        // <Item title={item.title} uri = {item.uri} />
        <ProductItem
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            quantity={item.quantity}

            sellNow={() => {

                if (item.quantity === 0) {
                    SetIsAlert(true)
                } else {
                    props.navigation.navigate('SellNowScreen', {
                        productTitle: item.title,
                        productPrice: item.price,
                        productQuantity: item.quantity,
                        productUrl: item.imageUrl,
                        productRam: item.ram,
                        pid: item.id,
                        purchasePrice: item.purchasePrice
                    })
                }
            }


            }
            viewDetails={() => {
                setItemSelected(item)
                setModalVisible(true)
                console.log('purchase price on Marketing screen', item.purchasePrice)
            }}
        />

    );

    const searchFilterFunction = text => {
        if (text) {
            const newData = MOBILES.filter(
                function (item) {
                    const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1

                })
            setFilteredDataSource(newData)
            setSearch(text)
        }
        else {
            setFilteredDataSource(MOBILES)
            // setInputText(inputText)
            setSearch(text)
        }

        // setFilteredDataSource(PurchaseItem)
        // console.log(text)
    }

    if (Isloading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.green}
                />
            </View>
        )
    }

    return (

        <View style={styles.container}>

            <View style={styles.centeredView1}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible)
                    }}
                >
                    <View style={styles.centeredView2}>
                        <View style={styles.modalView}>
                            {/* <Text style={styles.modalText}>Mobile Specifications</Text> */}
                            <View style={styles.useInfo}>
                                <Text style={styles.useInfoText}>Mobiile Phone Information</Text>
                            </View>
                            <Input
                                id='title'
                                label='Title'
                                // email
                                required
                                // keyboardType='email-address'
                                autoCaptialize='none'
                                onChangeInput={() => { }}
                                placeholder={itemSelected.title}
                                editable={false}
                                initialValue=''
                                errorMsg="Please Enter Valid Title"
                            />

                            <Input
                                id='price'
                                label='Price'
                                // email
                                required
                                // keyboardType='email-address'
                                autoCaptialize='none'
                                onChangeInput={() => { }}
                                placeholder={itemSelected.price}
                                editable={false}
                            // inputValidity={!!itemSelected}
                            // initialValue=''
                            // errorMsg="Please Enter Valid Title"
                            />

                            <Input
                                id='ram'
                                label='Ram'
                                // email
                                // required
                                // keyboardType='email-address'
                                autoCaptialize='none'
                                onChangeInput={() => { }}
                                placeholder={itemSelected.ram}
                                editable={false}
                                initialValue=''
                                errorMsg="Please Enter Valid Title"
                            />

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() =>
                                    setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}> Close Model </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {/* //no quantity alert */}
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
                                <Text style={styles.text0}>Out Of Stock</Text>
                            </View>
                            <View style={styles.warning_Message}>
                                <Text style={styles.text}>Please contact with Supply Chain.</Text>
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
            </View>


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

                <Text style={styles.text1}>Available Products</Text>

            </View>

            {/* <Text style={styles.text}>Sales and Marketing Screen</Text> */}
            <FlatList
                keyExtractor={item => item.id}
                // key={'#'}
                onRefresh={LoadedProduct}
                refreshing={Isrefreshing}
                numColumns={2}
                data={search ? filteredDataSource : MOBILES}
                renderItem={renderItems}

            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: -1,

        // alignItems: 'flex-start'
        // backgroundColor: 'gray'
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
    text: {
        fontSize: 20,
        textAlign: 'center'
    },
    image: {
        width: 50,
        height: 100
    },
    centeredView1: {
        flex: 1,
    },
    centeredView2: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#00000099'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginTop: 3
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#282A35'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        height: 45,
        fontSize: 21,
        backgroundColor: Colors.green,
        color: 'white',
        // padding: 10,
        width: '100%',
        borderRadius: 2,
        fontFamily: 'OpenSansBold'
    },
    centered: {
        flex: 1,
        textAlign: 'center',
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
    reset: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Colors.green,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    text0: {
        color: 'white',
        fontSize: 19,
        fontFamily: 'OpenSansRegular',
        fontWeight: 'bold'
    },
    useInfo: {
        alignItems: 'center',
        marginBottom: 25,
        backgroundColor: Colors.green,
        height: 45,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 3
    },
    useInfoText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'OpenSansRegular',
    },
});

export const ScreenOptions = navData => {
    return {
        headerTitle: 'Marketing and Sales',
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
    }
}

//make this component available to the app
export default Marketing;
