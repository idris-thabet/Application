
import React from 'react'
import AppStack from './AppStack';
import AuthSatck from './AuthSatck';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();



const RootStack = () => {
    return (
        <Stack.Navigator >
          <Stack.Screen name="AuthSatck" component={AuthSatck}  options={{ headerShown: false }} />
          <Stack.Screen name="AppStack" component={AppStack}  options={{ headerShown: false }} />
        </Stack.Navigator>
      );
}

export default RootStack