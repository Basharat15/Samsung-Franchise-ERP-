//import liraries
import React, { useEffect, useState, useCallback } from 'react';
import { Text, FlatList, StyleSheet, View, ActivityIndicator, Button, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as PurchesAction from '../store/actions/PurchesProduct'
import Color from '../constants/Colors'
import PurchaseItems from '../components/PurchaseItem'
import { Ionicons } from '@expo/vector-icons';
// import { TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

const PurchaseDetailScreen = (props) => {
    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Error, SetError] = useState()
    const PurchaseItem = useSelector(state => state.PurchaseItem.purches)
    const [search, setSearch] = useState('')
    const [filteredDataSource, setFilteredDataSource] = useState(PurchaseItem)

    const PurchesProduct = useCallback(async () => {
        SetError(null)
        try {
            SetIsloading(true)
            await dispatch(PurchesAction.fetchData());
            SetIsloading(false)
        } catch (err) {
            SetError(err.message)
        }
    }, [dispatch])

    useEffect(() => {
        PurchesProduct();
    }, [dispatch, PurchesProduct])

    if (Error) {
        return (
            <View style={styles.Centered}>
                <Text style={styles.text}>{Error}</Text>
                <View style={styles.btnContainer}>
                    <Button
                        color={Color.green}
                        title="Try Again"
                        onPress={PurchaseItem}
                    />
                </View>
            </View>
        )
    }

    if (Isloading) {
        return (
            <View style={styles.Centered}>
                <ActivityIndicator
                    size='large'
                    color={Color.green}
                />
            </View>
        )
    }
    // if(!Isloading && Sellitem.length===0){
    //     return(
    //     <View style={styles.Centered}>
    //         <Text style={styles.text2}>No Orders Found. Maybe do some orders</Text>
    //     </View>
    //     )
    // }

    const searchFilterFunction = text => {
        if (text) {
            const newData = PurchaseItem.filter(
                function (item) {
                    const itemData = item.supName ? item.supName.toUpperCase() : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1

                })
            setFilteredDataSource(newData)
            setSearch(text)
        }
        else {
            setFilteredDataSource(PurchaseItem)
            // setInputText(inputText)
            setSearch(text)
        }

        // setFilteredDataSource(PurchaseItem)
        // console.log(text)
    }

    // const answer = ()=> {

    // }


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.searchContainer}>
                <TextInput
                    onChangeText={text => searchFilterFunction(text)}
                    value={search}
                    placeholder='Search Here...'
                    style={styles.searchBar}
                />
                <Ionicons onPress={() => { }} name="search" size={26} color="white" style={styles.searchBarIcon} />
            </View>
            <FlatList
                keyExtractor={item => item.id}
                // data={searchFilterFunction ?  filteredDataSource : PurchaseItem}
                data={search ? filteredDataSource : PurchaseItem}
                renderItem={itemData => {
                    return (
                        <PurchaseItems
                            title={itemData.item.title}
                            price={itemData.item.price}
                            Quantity={itemData.item.Quantity}
                            supName={itemData.item.supName}
                            supNum={itemData.item.supNum}
                            date={itemData.item.readableDate}
                        />
                    )
                }}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
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
    text: {
        color: 'red',
        fontSize: 20,
        fontFamily: 'OpenSansBold'
    },
    text2: {
        color: 'red',
        fontSize: 16,
        fontFamily: 'OpenSansBold'
    },
    btnContainer: {
        width: 120,
        marginVertical: 10
    },
});



export const ScreenOptions = navData => {
    return {
        headerTitle: 'Purchasing Details',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.green : 'white'
        },
        headerTitleStyle: {

        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.green,
        // headerLeft: () => {
        //     return (
        //         <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //             <Item
        //                 title='Menu'
        //                 iconName={Platform.OS === 'android' ? 'menu' : 'menu'}
        //                 onPress={() => {
        //                     navData.navigation.toggleDrawer();
        //                 }}
        //             />
        //         </HeaderButtons>
        //     )
        // },
    }
}

//make this component available to the app
export default PurchaseDetailScreen;
