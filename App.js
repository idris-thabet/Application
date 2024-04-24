import 'react-native-gesture-handler';
import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from './navigation/AppStack'
import AuthStack from './navigation/AuthSatck';
import RootStack from './navigation/RootStack';

const Drawer = createDrawerNavigator();


export default function App() {
  return (<> 
    <NavigationContainer>
      <RootStack />
      {/* <AppStack/> */}
      {/* <AuthStack/> */}
    </NavigationContainer>
    
    </>
  );
}