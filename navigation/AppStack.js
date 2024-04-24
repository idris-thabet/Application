import React from 'react';
import Home from './../screens/Home';
import GestionDesSoldes from './../screens/GestionDesSoldes';
import Settings from './../screens/Settings';
import DemandeDeConge from './../screens/DemandeDeConge';
import CustomDrawer from './../components/CustomDrawer';

import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
      drawerActiveBackgroundColor:'gray' ,
      drawerActiveTintColor:'white', 
      drawerInactiveTintColor:'white',
      headerTintColor :'white' ,
      drawerLabelStyle :{
        fontSize : 18},
      headerStyle :{backgroundColor:'black' ,}
        }}>
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Demande De Conge" component={DemandeDeConge} options={{ headerShown: true , }}  />
      <Drawer.Screen name="Gestion des soldes" component={GestionDesSoldes} options={{ headerShown: true }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: true }} />
      
    </Drawer.Navigator>
  );
};

export default AppStack;
