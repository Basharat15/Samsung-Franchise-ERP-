//import liraries
import React, { useEffect, useCallback, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Button, ActivityIndicator, TouchableOpacity } from 'react-native'
import Card from '../components/Card'
import Color from '../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import * as SellAction from '../store/actions/Sell'
import * as PurchesAction from '../store/actions/PurchesProduct'
// import * as Progress from 'expo-progress';
// import { ProgressBar, Colors } from 'react-native-paper'

import  moment from 'moment'

// create a component
const Revenue = props => {

    
    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Error, SetError] = useState()



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

    
   let date =  moment().format('MMMM');
   let mint = moment().format('mm');
//    console.log(mint)
//    console.log(date)


   const arrOfObject = useSelector(state => state.Sellitem.Sell)
//     let array = arrOfObject.map(a => a.price);
//    let dateArray = arrOfObject.map(a => a.Date);
//    const yearArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

//    let title = arrOfObject.map(a => a.title);
//    console.log('date', dateArray)
//  var array, dateArray, JuneRevenue;
 
// // if (date === yearArray[5]){
//     //  dateArray = arrOfObject.map(a => a.Date);
    
//     var array, JuneRevenue;
//     array = arrOfObject.map(a => a.price);
//     if(date === yearArray[6])
//      for (let i = 0; i < array.length; i++ ) {
//         JuneRevenue += array[i];
//     }

// // }

// if(date === 'June') {
//     const arrOfObject = useSelector(state => state.Sellitem.Sell)
//     let juneArray = arrOfObject.map(a => a.price);
//    let juneDateArray = arrOfObject.map(a => a.Date);
// }

let JuneRevenue
if(date === 'June') {
    const arrOfObject = useSelector(state => state.Sellitem.Sell)
    let juneArray = arrOfObject.map(a => a.price);
   let juneDateArray = arrOfObject.map(a => a.Date);
   for (let i = 0; i < juneArray.length; i++ ) {
            JuneRevenue += juneArray[i];
}
}




//    let JanRevenue = 0;
//    if(mint === '11'){
//     for (let j = 0; j < array.length; j++) {
//         JanRevenue += array[j];
//     }
// }

// let FebRevenue = 0;
// if(date === 'February'){  
//     for (let i = 0; i < array.length; i++) {
//         FebRevenue += array[i];
//     }
// }
    

//     let MarchRevenue = 0;
//     if(date === 'March'){
//         for (let i = 0; i < array.length; i++ ) {
//             MarchRevenue += array[i];
//         }
//     }
   

//     let AprilRevenue = 0;
//     if(date === 'April'){
//         for (let i = 0; i < array.length; i++) {
//             AprilRevenue += array[i];
//         }
//     }
    

//     let MayRevenue = 0;
//     if(date === 'May'){
//         for (let i = 0; i < array.length; i++) {
//             MayRevenue += array[i];
//         }
//     }

    
    // let JuneRevenue = 0;
    // if(dateArray === 'June'){
        
    //     for (let i = 0; i < array.length; i++ ) {
    //         JuneRevenue += array[i];
    // }
    // }
    

//     let JulyRevenue = 0;
//     if(date==="July"){
//     for (let i = 0; i < array.length; i++) {
//         JulyRevenue += array[i];
//     }
// }

//     let AugRevenue = 0;
//     if(date === 'August'){
//         for (let i = 0; i < array.length; i++) {
//             AugRevenue += array[i];
//         }
//     }
    
   
//     let SepRevenue = 0;
//     if(date === 'September'){
//         for (let i = 0; i < array.length; i++) {
//             SepRevenue += array[i];
//         }
//     }
    

//     let OctRevenue = 0;
//     if(date === 'October'){
//         for (let i = 0; i < array.length; i++ ) {
//             OctRevenue += array[i];
//         }
//     }
    

//     let NovRevenue = 0;
//     if(date === 'November'){
//         for (let i = 0; i < array.length; i++ ) {
//             NovRevenue += array[i];
//         }
//     }
   
// if(date === 'December'){
//     let DecRevenue = 0;
//     for (let i = 0; i < array.length; i++ ) {
//         DecRevenue += array[i];
//     }
// }
    





    if (Error) {
        return (
            <View style={styles.Centered}>
                <Text style={styles.text}>{Error}</Text>
                <View style={styles.btnContainer2}>
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


    return (
        //   <ProgressBar style={{marginTop: 200,height:'10%',width:'80%'}} progress={JulyRevenue} color='blue' />
        <View style={styles.container}> 
        <Button title='testing' onPress={()=>{console.log('date', dateArray)}} />
             <Card style={styles.summary}>
             <Text style={styles.summaryText}>February:<Text style={styles.amount}>$</Text></Text>
             </Card>  
            <Card style={styles.summary}>
            <Text style={styles.summaryText}>March:<Text style={styles.amount}>$</Text></Text>
            </Card>
            <Card style={styles.summary}>
            <Text style={styles.summaryText}>April:<Text style={styles.amount}>$</Text></Text>
            </Card>
            <Card style={styles.summary}>
            <Text style={styles.summaryText}>May:<Text style={styles.amount}>$</Text></Text>
            </Card>
            <Card style={styles.summary}>
            <Text style={styles.summaryText}>June:<Text style={styles.amount}>{JuneRevenue}$</Text></Text>
            </Card>
            <Card style={styles.summary}>
            {/* <Text style={styles.summaryText}>July:<Text style={styles.amount}>{JulyRevenue}$</Text></Text> */}
             </Card> 
             </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        height: 60,
        padding: 15,
        justifyContent: 'space-around',
        width: '60%',
        marginVertical: 25,

    },
    summaryText: {
        fontFamily: 'OpenSansBold',
        fontSize: 14,
        color: Color.green
    },
    amount: {
        fontFamily: 'OpenSansRegular',
        fontSize: 14,
        color: '#888'
    },
});

//make this component available to the app
export default Revenue;
