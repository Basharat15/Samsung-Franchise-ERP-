
//samsungcard
import React from 'react';
import { View, StyleSheet } from 'react-native'

const Card = props => {
    return (
        <View style={{...styles.screen,...props.style }}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    screen: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    }
});

export default Card;