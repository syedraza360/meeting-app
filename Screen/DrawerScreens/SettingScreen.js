import React from 'react';
import { View, Text, SafeAreaView, StyleSheet,Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SettingsScreen = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={stylesSidebar.profileHeader}>
          <View style={stylesSidebar.profileHeaderPicCircle}>
            <Text style={{ fontSize: 25, color: '#307ecc' }}>
              {'About React'.charAt(0)}
            </Text>
          </View>
          <Text style={stylesSidebar.profileHeaderText}>
            AboutReact
          </Text>
        </View>
        <View style={stylesSidebar.profileHeaderLine} />

        <View>
          <TouchableHighlight onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              { cancelable: false },
            );
          }}>
            <Text style={{ color: '#d8d8d8' }}>
              Logout
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#307ecc',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#307ecc',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});