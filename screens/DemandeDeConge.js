import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import CongePicker from './CongePicker';
import { 
   StyledConstainer,
   InnerConstainer,
   StyledButtonConge,
   ButtonText,
   StyledTextInput
} from './../components/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DemandeDeConge = () => {
  const handleSubmit = async (values) => {
    try {
      console.log("Sending data:", values);
      // Retrieve the user's authentication token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      const response = await fetch('https://4944-102-152-223-232.ngrok-free.app/api/v1/vacationRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the authentication token in the headers
        },
        body: JSON.stringify(values),
      });
      
      if (response.ok) {
        Alert.alert('Demande de vacances envoyée avec succès :)');
      } else {
        const errorData = await response.json();
        if (errorData.message === 'You have already sent a vacation request') {
          Alert.alert('Vous avez déjà envoyé une demande de vacances');
        } else {
          console.error('Server error:', errorData);
          Alert.alert('Vérifiez les champs de saisie');
        }
      }
    } catch (error) {
      console.error('Error sending vacation request:', error);
      if (error instanceof SyntaxError && error.message.includes('Unexpected character: <')) {
        Alert.alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <StyledConstainer>
      <InnerConstainer>
        <Formik
          initialValues={{ start: '', end: '', type: '' }}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              {/* Your form inputs */}
              <MyTextInput
                placeholder="Date de début"
                onChangeText={handleChange('start')}
                onBlur={handleBlur('start')}
                value={values.start}
                placeholderTextColor={'gray'}
                style={{ color: 'white' }}
              />
              <MyTextInput
                placeholder="Date de fin"
                onChangeText={handleChange('end')}
                onBlur={handleBlur('end')}
                value={values.end}
                placeholderTextColor={'gray'}
                style={{ color: 'white' }}
              />
              <View style={{ alignItems:'center', margin:20 }}>
                <Text style={{ color:'white', fontSize:20 }}>Type de congé:</Text>
              </View>
              <CongePicker
                onSelect={(value) => handleChange('type')(value)}
              />
              <View style={{ alignItems:'center', marginVertical: 10 ,paddingTop:15}}>
                <StyledButtonConge onPress={handleSubmit}>
                  
                  <ButtonText>Envoyer</ButtonText>
                </StyledButtonConge>
              </View>
            </View>
          )}
        </Formik>
      </InnerConstainer>
    </StyledConstainer>
  );
};

const MyTextInput = ({ onChangeText, onBlur, value, ...props }) => {
  return (
    <View>
      <StyledTextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        {...props}
      />
    </View>
  );
};

export default DemandeDeConge;
