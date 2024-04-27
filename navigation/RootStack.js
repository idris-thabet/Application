
// import React from 'react'
// import AppStack from './AppStack';
// import AuthStack from './AuthStack';

// import Login from '../screens/Login';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();



// const RootStack = () => {
//     return (
//         <Stack.Navigator >
//           <Stack.Screen name="AuthStack" component={AuthStack}  options={{ headerShown: false }} />
//           <Stack.Screen name="AppStack" component={AppStack}  options={{ headerShown: false, gestureEnabled: false, animationEnabled: false }} />
//           {/* <Stack.Screen name="AppStackRH" component={AppStack}  options={{ headerShown: false, gestureEnabled: false, animationEnabled: false }} /> */}

//         </Stack.Navigator>
//       );
// }

// export default RootStack



import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import Logout from '../screens/Logout';

const Stack = createNativeStackNavigator();

const RootStack = () => {


  return (
      <Stack.Navigator>
          <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false , gestureEnabled: false, animationEnabled: false}} />
          <Stack.Screen name="AppStack" component={AppStack} options={{ headerShown: false , gestureEnabled: false, animationEnabled: false}} />
          <Stack.Screen name="Logout" component={Logout}  options={{ headerShown: false }} />

      </Stack.Navigator>
  );
};

export default RootStack;


