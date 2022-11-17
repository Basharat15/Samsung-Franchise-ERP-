import * as  React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from '../constants/Colors'
import SellItemDetail,{ScreenOptions as SellDetail} from '../screens/SalesDetailScreen'

const DefaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.green : 'white'
  },
  headerTintColor: Platform.OS === 'android'? 'white':Colors.green
}

const Stack = createStackNavigator()

const SellStack = () => {
    return (
      <Stack.Navigator screenOptions={DefaultNavOption} >
        <Stack.Screen
          name="Sell Detail Screen"
          component={SellItemDetail}
          options={SellDetail}
        />
       
      </Stack.Navigator>
    )
  }
  
  export default SellStack;