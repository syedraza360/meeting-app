
import 'react-native-gesture-handler';

import React from 'react';
 
import {NavigationContainer,DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
 
// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import ClientLogin from './Screen/ClientLogin';
 
const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'rgb(255, 45, 85)',
    background:'white'
  },
};
 
const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="ClientLogin"
        component={ClientLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
 
const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;