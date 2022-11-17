import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const INPUT_VALIDAITON = 'INPUT_VALIDATION'
const ON_BLUR = 'ON_BLUR'

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_VALIDAITON:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }

        case ON_BLUR:
            return {
                ...state,
                focus: true
            }

        default: return state;
    }
}

const LoginInput = props => {

    const [intialState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.inputValidity,
        focus: false
    })

    const inputValidaiton = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }

        dispatch({
            type: INPUT_VALIDAITON,
            value: text,
            isValid: isValid
        })
    }

    const { onChangeInput, id } = props

    useEffect(() => {
        // if(intialState.focus){
        onChangeInput(id, intialState.value, intialState.isValid);
        // }
    }, [id, intialState, onChangeInput])

    const lostFocusHandler = () => {
        dispatch({ type: ON_BLUR })
    }


    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={{...styles.input,...props.style}}
                value={intialState.value}
                onChangeText={inputValidaiton}
                onBlur={lostFocusHandler}
                placeholder={props.placeholder}
            />
            
            {!intialState.isValid && intialState.focus && 
                <View style={styles.errorContainer}> 
                <Text style={styles.errorMsg}>{props.errorMsg}</Text>
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
        paddingVertical: 6,
        marginVertical: 6
    },
    label: {
        fontFamily: 'RobotoBold',
        fontSize: 18,
        marginBottom: 4
    },
    input: {
        paddingHorizontal: 4,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        fontSize: 15,
        fontFamily: 'OpenSansRegular'
    },
    errorContainer: {
        marginVertical: 6
    },
    errorMsg: {
        color: Colors.green,
        fontFamily: 'OpenSansBold',
        fontSize: 14,
        marginLeft: -20
    }
})

export default LoginInput;