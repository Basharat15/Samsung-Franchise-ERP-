import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './DrawerNavigator';
import StartupScreen from '../screens/StartUpScreen'
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux'

const AppContainer = props => {
  const isAuth = useSelector(state => !!state.Auth.token)
  const didTryAutoLogin = useSelector(state => !!state.Auth.tryAutoLogin)
  return (
    <NavigationContainer>
      {isAuth && <DrawerNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
      {/* <AuthNavigator /> */}
    </NavigationContainer>
  )

}

export default AppContainer;