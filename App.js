

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation/RootStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
