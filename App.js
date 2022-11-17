import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font'
import SupplyReducer from './store/reducers/Supplyproduct'
import SellProduct from './store/reducers/Sell'
import PurchaseProduct from './store/reducers/PurchesProduct'
import AuthReducer from './store/reducers/auth'
import TotalAmount from './store/reducers/TotalBudget'
import AppContainer from './Navigation/AppContainer';
import ReduxThunk from 'redux-thunk'
// import { NavigationContainer } from '@react-navigation/native';
// import { DrawerNavigator } from './Navigation/DrawerNavigator';
// import * as Notifications from 'expo-notifications'
// import HomeScreen from '././screens/HomeScreen'

// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     return {
//       shouldShowAlert: true,
//       shouldPlaySound: true
//     }
//   }
// })

const rootReducer = combineReducers({
  supplyItem: SupplyReducer,
  Auth: AuthReducer,
  Sellitem: SellProduct,
  PurchaseItem: PurchaseProduct,
  Amount: TotalAmount
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  const [loaded] = useFonts({
    RobotoBold: require('./assets/font/RobotoBold.ttf'),
    RobotoLight: require('./assets/font/RobotoLight.ttf'),
    RobotoRegular: require('./assets/font/RobotoRegular.ttf'),
    Bold: require('./assets/font/Bold.ttf'),
    Regular: require('./assets/font/Regular.ttf'),
    OpenSansBold: require('./assets/font/OpenSans-Bold.ttf'),
    OpenSansRegular: require('./assets/font/OpenSans-Regular.ttf')
  })
  if (!loaded) {
    return null
  }
  return (
    <Provider store={store}>
      {/* <HomeScreen /> */}
      <AppContainer />
      {/* <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer> */}
    </Provider>
  );
}