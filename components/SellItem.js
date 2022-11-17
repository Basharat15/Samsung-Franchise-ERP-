import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ScrollView } from 'react-native';
import Color from '../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../components/Card'
import Colors from '../constants/Colors';

const SellItem = props => {
    const [ShowDetail, SetShowDetail] = useState(false)
    const Sellitem = useSelector(state => state.Sellitem.Sell)

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.pprice}><Text style={styles.innerText}>Price:</Text> ${props.price}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button
                title={ShowDetail ? ' Hide Details ' : 'Show Details'}
                
                color = {Colors.green}
                onPress={() => {
                    SetShowDetail(prevState => !prevState)
                }}
            />

            {ShowDetail && (
                <View style={styles.detailItem}>
                    <View style={styles.Carditem}>
                        <View style={styles.itemData}>
                            <Text style={styles.qauntity}>Quantity: </Text>
                            <Text style={styles.title}> {props.title} ( {props.Quantity} )</Text>
                        </View>
                        <View style={styles.itemData}>
                        <Text style={styles.customer}>Price: </Text>
                            <Text style={styles.Amount}> Rs. {Math.round(props.price.toFixed(2) * 100) / 100}  </Text>
                        </View>
                    </View>

                   {props.name && props.number ?  <View style={styles.Carditem}>
                        <View style={styles.itemData}>
                        <Text style={styles.customer}>Name: </Text>
                            <Text style={styles.title}> {props.name}</Text>
                        </View>
                        <View style={styles.itemData}>
                        <Text style={styles.customer}>Number: </Text>
                            <Text style={styles.Amount}>{props.number}  </Text>
                        </View>
                    </View> : null
                    }
                     {/* {props.supName && props.supNum ?  <View style={styles.Carditem}>
                        <View style={styles.itemData}>
                        <Text style={styles.customer}>Supplier: </Text>
                            <Text style={styles.title}> {props.name}</Text>
                        </View>
                        <View style={styles.itemData}>
                        <Text style={styles.customer}>Number: </Text>
                            <Text style={styles.Amount}>{props.number}  </Text>
                        </View>
                    </View> : null
                    } */}
                </View>

            )}
        </Card>
    )
};
const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: Colors.green,
        paddingVertical: 8,
        paddingHorizontal: 7,
        borderRadius: 4
    },
    Amount: {
        fontFamily: 'OpenSansBold',
        fontSize: 16,
        color: '#fff'
    },
    pprice:{
        color: 'white',
        fontSize: 16,
        fontFamily: 'OpenSansRegular',
    },
    date: {
        fontFamily: 'OpenSansRegular',
        fontSize: 16,
        color: 'white'
    },
    innerText: {
        color: 'white',
        fontFamily: 'OpenSansRegular',
    },
    detailItem: {
        width: '100%',
        marginTop: 18
    },
    Carditem: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 11,
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#888',
        margin: 15
    },
    itemData: {
        flexDirection: 'row',
        marginBottom: 3
    },
    qauntity: {
        fontFamily: 'OpenSansBold',
        fontSize: 15,
        color: Color.green
    },
    customer: {
        fontFamily: 'OpenSansBold',
        fontSize: 15,
        color: Color.green
    },
    Amount: {
        fontFamily: 'OpenSansRegular',
        fontSize: 15,
        color: '#888',

    },
    title: {
        fontFamily: 'OpenSansRegular',
        fontSize: 15,
        color: '#282A35'
    }

});
export default SellItem;
