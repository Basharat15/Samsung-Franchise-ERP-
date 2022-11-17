import * as  React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from '../constants/Colors';
import PurchaseitemDetail,{ScreenOptions as PurchaseDetail} from '../screens/PurchaseDetailScreen'

const DefaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.green: 'white'
  },
  headerTintColor: Platform.OS === 'android'? 'white':Colors.green
}

const Stack = createStackNavigator()

const PurchaseStack = () => {
    return (
      <Stack.Navigator screenOptions={DefaultNavOption} >
        <Stack.Screen
          name="Purchase Detail Screen"
          component={PurchaseitemDetail}
          options={PurchaseDetail}
        />
       
      </Stack.Navigator>
    )
  }
  
  export default PurchaseStack;