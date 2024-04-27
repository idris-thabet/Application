import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


const CustomDrawer = (props) => {
  const navigation = useNavigation(); 
  const handleLogout = () => {
    navigation.navigate('Logout');
  };
  return (
    <View style={{ flex: 1, backgroundColor: "black", paddingTop: 50 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: "black", padding: 10, marginTop: 30 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>


      <View style={{ marginBottom: 20, padding: 25 }}>
        <TouchableOpacity onPress={handleLogout} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="exit-outline" size={20} color="white" />
            <Text style={{ color: 'white', fontSize: 16, marginLeft: 16 }}>Déconnexion</Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }} >
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            <Icon name="help-circle-outline" size={20} color="white" />
            <Text style={{ color: 'white', fontSize: 16, marginLeft: 16, textDecorationLine: 'underline' }} >Help </Text>
          </View>

        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawer;




