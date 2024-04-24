import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import axios from 'axios';
import { AppState } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  StyledConstainer,
  InnerConstainer,
  PageTitle,
  StyledFormArea,
  StyledTextInput,
  LeftIcon,
  TextLinkPasswordContent,
  TextLinkPassword,
  StyledButton,
  ButtonText,
  Colors,
  MessaheBox,
} from './../components/Styles';

const { white } = Colors;

const Login = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleLogin = async (values, setSubmitting) => {
    try {
        const response = await axios.post('https://6c19-197-14-233-154.ngrok-free.app/api/v1/signin', values);
        const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      navigation.navigate('AppState');
    } catch (error) {
      setMessage(error.response.data.error || 'Something went wrong');
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
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
                keyboardType="email-address"
              />
              <MyTextInput
                icon="lock"
                placeholder="Password"
                placeholderTextColor={white}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              <TextLinkPassword>
                <TextLinkPasswordContent>Mot de passe oublié ?</TextLinkPasswordContent>
              </TextLinkPassword>
              <MessaheBox type={messageType}>{message}</MessaheBox>
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
  );
};

export default Login;




// import { StatusBar } from 'expo-status-bar';
// import  { useState } from 'react';

// import React from 'react' ;
// import { View,ActivityIndicator} from 'react-native' ;
// import { Octicons } from '@expo/vector-icons';
// import {Formik} from 'formik';
// import { useNavigation } from '@react-navigation/native';


// import {
//     StyledConstainer,
//     InnerConstainer,
//     PageTitle,
//     StyledFormArea,
//     StyledTextInput,
//     LeftIcon,
//     TextLinkPasswordContent,
//     TextLinkPassword,
//     StyledButton,
//     ButtonText,
//     Colors,
//     MessaheBox,
// } from './../components/Styles' ;

// const{white} = Colors ;

// import axios from 'axios';


// const Login = () => {
//     const navigation = useNavigation();
//     const [message ,  setMessage] = useState() ;
//     const [messageType ,  setMessageType] = useState() ;

//     const handleLogin =(credentials,setSubmitting) => {
//         handleMessage(null) ;
//       const url ='http://localhost:3000/user/login'
//       axios.post(url,credentials)
//            .then(() => {(response) => {
//              const result = response.data ;
//              const {message,status,data} = result ;
            
//              if (status !== 'SUCCÈS') {
//                 handleMessage(message,status) ;
//              }else {
//                 navigation.navigate('AppStack' , {...data[0]});
//              }
//              setSubmitting(false) ;
//            }
//            })
//            .catch(error => {console.log(error.JSON())}) ;
//            setSubmitting(false) ;
//            handleMessage("An error occurred. chech your network ant try again") ;
//     }

//     const handleMessage = (message,type ='ÉCHOUÉ') => {
//         setMessage(message) ;
//         setMessageType(type) ;
//     }
//     return (
//       <StyledConstainer>
//         <StatusBar style="light" />
//           <InnerConstainer>
//               <PageTitle>Login</PageTitle>
//               <Formik 
//                   initialValues={{email:'', password:''}}
//                   onSubmit={(values ,{setSubmitting}) => {
//                     if (values.email == '' || values.password =='') {
//                         handleMessage('please fill all the lields') ;
//                         setSubmitting(false)
//                     }else {
//                         handleLogin(values,setSubmitting) ;
//                     }
//                   }}
//               >
//                   {({handleChange, handleBlur, handleSubmit, values , isSubmitting}) => (
//                       <StyledFormArea>
//                           <MyTextInput
                                
//                                 icon="mail"
//                                 placeholder="E-mail"
//                                 placeholderTextColor={white}
//                                 onChangeText={handleChange('email')}
//                                 onBlur={handleBlur('email')}
//                                 value={values.email}
//                                 keyboardType='email-address'
                                
//                           />
//                           <MyTextInput
                                
//                                 icon="lock"
//                                 placeholder="Pssword"
//                                 placeholderTextColor={white}
//                                 onChangeText={handleChange('password')}
//                                 onBlur={handleBlur('password')}
//                                 value={values.password}
//                                 secureTextEntry
                                
//                           />

//                           <TextLinkPassword>
//                             <TextLinkPasswordContent>Mot de passe oublié ?</TextLinkPasswordContent>
//                           </TextLinkPassword>
                          
//                           <MessaheBox type={messageType} >{message} </MessaheBox>

//                           {!isSubmitting && <StyledButton onPress={handleSubmit} >
//                               <ButtonText>Login</ButtonText>
//                           </StyledButton>}
                          
//                           {!isSubmitting && <StyledButton disabled={true} >
//                               <ActivityIndicator size='large' color={white} />
//                           </StyledButton>}
                          
//                       </StyledFormArea>
//                   )}
//               </Formik>
//           </InnerConstainer>
//       </StyledConstainer>
//     );
//   };
  
// const MyTextInput = ({ label, icon, ...props }) => {
//     return (
//         <View>
//             <LeftIcon>
//                 <Octicons name={icon} size={17} color={white} />
//             </LeftIcon>
            
//             <StyledTextInput {...props} />
//         </View>
//     )
// }




// export default Login ;