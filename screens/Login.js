import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';
import { Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStack from '../navigation/AppStack';




import { StyledConstainer, 
          InnerConstainer, 
          PageTitle, 
          StyledFormArea, 
          StyledTextInput, 
          StyledButton, 
          ButtonText, 
          Colors, 
          MessaheBox,
          LeftIcon
        } from './../components/Styles';

const { white } = Colors;

const Login = () => {

 
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
  
    const handleLogin = async (values, setSubmitting) => {
      try {
        const response = await axios.post('https://4944-102-152-223-232.ngrok-free.app/api/v1/signin', values);
        const { token, status } = response.data;
  
        if (token) {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('userRole', status === 'SUCCÈS_ADMIN' ? 'admin' : 'user');
  
          if (status === 'SUCCÈS_ADMIN') {
            navigation.navigate('AppStack'); // Navigate to admin screen
          } else {
            navigation.navigate('AppStack'); // Navigate to regular user screen
          }
        } else {
          setMessage('Invalid credentials');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        setMessage('Error logging in');
        setMessageType('error');
      }
      setSubmitting(false);
    };

  return (
    <StyledConstainer>
      <StatusBar style="light" />
      <InnerConstainer>
        <PageTitle>Login</PageTitle>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            if (values.email === '' || values.password === '') {
              setMessage('Please fill all the fields');
              setMessageType('error');
              setSubmitting(false);
            } else {
              handleLogin(values, setSubmitting);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
            <StyledFormArea>
              <MyTextInput
                    
                icon="mail"
                placeholder="E-mail"
                placeholderTextColor={white}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType='email-address'
                    
              />
              <MyTextInput
                
                icon="lock"
                placeholder="Pssword"
                placeholderTextColor={white}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
                    
              />
              <MessaheBox >{message}</MessaheBox>
              {!isSubmitting && (
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>
              )}
              {isSubmitting && (
                <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={white} />
                </StyledButton>
              )}
            </StyledFormArea>
          )}
        </Formik>
      </InnerConstainer>
    </StyledConstainer>
  );
};

const MyTextInput = ({ label, icon, ...props }) => {
  return (
      <View>
          <LeftIcon>
              <Octicons name={icon} size={17} color={white} />
          </LeftIcon>
          
          <StyledTextInput {...props} />
      </View>
  )
}

export default Login;