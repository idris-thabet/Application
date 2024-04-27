import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDrawer from '../components/CustomDrawer';
import Home from '../screens/Home';
import GestionDesSoldes from '../screens/GestionDesSoldes';
import Settings from '../screens/Settings';
import DemandeDeConge from '../screens/DemandeDeConge';
import Traitement from '../screens/Traitement';
import ShowResponse from '../screens/ShowResponse';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const getUserRole = async () => {
      try {
        // Retrieve user role from AsyncStorage
        const role = await AsyncStorage.getItem('userRole');
        setUserRole(role); // Update userRole state with retrieved role

        // Retrieve user token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        console.log('User Token:', token); // Log the user token to the console
        console.log('User Role:', role); // Log the user role to the console
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    getUserRole(); // Trigger getUserRole when component mounts
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: 'gray',
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'white',
        headerTintColor: 'white',
        drawerLabelStyle: {
          fontSize: 18
        },
        headerStyle: {
          backgroundColor: 'black'
        }
      }}
    >
      <Drawer.Screen name="Accueil" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Demande De Conge" component={DemandeDeConge} options={{ headerShown: true }} />
      {/* Conditionally render Traitement screen if user is admin */}
      {userRole === 'admin' && (
        <Drawer.Screen name="Traitement" component={Traitement} options={{ headerShown: true }} />
      )}
      
      <Drawer.Screen name="Afficher la réponse" component={ShowResponse} options={{ headerShown: true }} />
      <Drawer.Screen name="Gestion des soldes" component={GestionDesSoldes} options={{ headerShown: true }} />
      <Drawer.Screen name="Paramètre" component={Settings} options={{ headerShown: true }} />
    </Drawer.Navigator>
  );
  
};

export default AppStack;




