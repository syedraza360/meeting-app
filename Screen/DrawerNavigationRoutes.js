import React from 'react';
 

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image} from 'react-native';


// Import Screens
import Appointment from './DrawerScreens/Appointment';
import SettingsScreen from './DrawerScreens/SettingScreen';
import AddAppointment from './DrawerScreens/AddAppointment';

const Tab = createBottomTabNavigator(); 


function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false,tabBarShowLabel:false }}>
      <Tab.Screen 
      name="Appointment" 
      component={Appointment} 
      options={{
        gestureEnabled: false,
        headerShown: false,
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Ionicons name='briefcase-outline' size={24} color="blue" />
          ) : (
            <Ionicons name='briefcase-outline' size={24} color="grey" />
          ),
      }}
      />
      <Tab.Screen 
      name="AddAppointment" 
      component={AddAppointment} 
      options={{
        tabBarIcon: () => (<Image
          style={{height:60,width:55,marginBottom:20}}
          source={require("../Image/add-icons.png")}
        />)
    }}
      />

      <Tab.Screen name="Profile" component={SettingsScreen} 
      options={{
        gestureEnabled: false,
        headerShown: false,
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Image
              style={{height:24,width:24}}
              source={require("../Image/account-active.png")}
            />
          ) : (
            <Image
            style={{height:24,width:24}}
              source={require("../Image/account-inactive.png")}
            />
          ),
      }}
      />
    </Tab.Navigator>
  );
}

// const homeScreenStack = ({navigation}) => {
//   return (
//     <Stack.Navigator initialRouteName="HomeScreen">
//       <Stack.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           title: 'Home', //Set Header Title
//           headerLeft: () => (
//             <NavigationDrawerHeader navigationProps={navigation} />
//           ),
//           headerStyle: {
//             backgroundColor: '#307ecc', //Set Header color
//           },
//           headerTintColor: '#fff', //Set Header text color
//           headerTitleStyle: {
//             fontWeight: 'bold', //Set Header text style
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
 
// const settingScreenStack = ({navigation}) => {
//   return (
//     <Stack.Navigator
//       initialRouteName="SettingsScreen"
//       screenOptions={{
//         headerLeft: () => (
//           <NavigationDrawerHeader navigationProps={navigation} />
//         ),
//         headerStyle: {
//           backgroundColor: '#307ecc', //Set Header color
//         },
//         headerTintColor: '#fff', //Set Header text color
//         headerTitleStyle: {
//           fontWeight: 'bold', //Set Header text style
//         },
//       }}>
//       <Stack.Screen
//         name="SettingsScreen"
//         component={SettingsScreen}
//         options={{
//           title: 'Settings', //Set Header Title
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
 
// const DrawerNavigatorRoutes = (props) => {
//   return (
//     <Drawer.Navigator
//       drawerContentOptions={{
//         activeTintColor: '#cee1f2',
//         color: '#cee1f2',
//         itemStyle: {marginVertical: 5, color: 'white'},
//         labelStyle: {
//           color: '#d8d8d8',
//         },
//       }}
//       screenOptions={{headerShown: false}}
//       drawerContent={CustomSidebarMenu}>
//       <Drawer.Screen
//         name="homeScreenStack"
//         options={{drawerLabel: 'Home Screen'}}
//         component={homeScreenStack}
//       />
//       <Drawer.Screen
//         name="settingScreenStack"
//         options={{drawerLabel: 'Setting Screen'}}
//         component={settingScreenStack}
//       />
//     </Drawer.Navigator>
//   );
// };
 
export default MyTabs;