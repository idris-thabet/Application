import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const Logout = ({ navigation }) => {
  useEffect(() => {
    const logout = async () => {
      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userRole');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'AuthStack' }],
          })
        );
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    logout();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Logout;
