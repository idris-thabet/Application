import React from 'react';
import Home from '../screens/Home';
import Login from '../screens/Login';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();



const AuthStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="login" component={Login} options={{ headerShown: false }}  />
      {/* <Stack.Screen name="AppStack" component={AppStack}  options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
}

export default AuthStack;
