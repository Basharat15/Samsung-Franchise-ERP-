import * as  React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import Colors from '../constants/Colors'

const Stack = createStackNavigator()

const DefaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.green : 'white'
  },
  headerTintColor: Platform.OS === 'android'? 'white':Colors.green
}

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={DefaultNavOption}>
      <Stack.Screen
      initialParams={HomeScreen}
        name="Home screen"
        component={HomeScreen}
        // options={MarketingScreen}
      />
    </Stack.Navigator>
  )
}

export default HomeStack;