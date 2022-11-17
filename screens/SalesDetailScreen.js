//import liraries
import React, { useEffect, useState, useCallback } from 'react';
import { Text, FlatList, StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as SellAction from '../store/actions/Sell'
import Color from '../constants/Colors'
import SellItem from '../components/SellItem';

const SaleDetailScreen = (props) => {
    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Error, SetError] = useState()

    const Sellitem = useSelector(state=>state.Sellitem.Sell)

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
    }, [dispatch,Sellproduct])

    if (Error) {
        return (
            <View style={styles.Centered}>
                <Text style={styles.text}>{Error}</Text>
                <View style={styles.btnContainer}>
                    <Button
                        color={Color.green}
                        title="Try Again"
                        onPress={Orderproduct}
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
    return (
        <FlatList
        keyExtractor={item => item.id}
        data={Sellitem}
        renderItem={itemData => {
            return (
                <SellItem
                  title={itemData.item.title}
                  price={itemData.item.price}
                  name={itemData.item.name}
                  number={itemData.item.number}
                  Quantity={itemData.item.Quantity}
                  date={itemData.item.readableDate}
                />
            )
        }}
    />
    );
};



const styles = StyleSheet.create({
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
    text2:{
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
        headerTitle: 'Sales Details',
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

export default SaleDetailScreen;

