import React from 'react';
import {Platform} from 'react-native'
import {HeaderButton} from 'react-navigation-header-buttons'
import {Ionicons,Feather} from '@expo/vector-icons'
import Colors from '../constants/Colors'

const CustomButton = props =>{
    return(
        <HeaderButton
        {...props}
        IconComponent={Feather}
        iconSize={23}
        color={Platform.OS==='android'?'white':Colors.green} 
        style = {{marginRight: 4, marginTop: 1}}
        />
    )
}
export default CustomButton;