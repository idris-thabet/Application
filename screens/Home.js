import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CalendarComponent from '../components/CalendarComponent';
import Icon from 'react-native-vector-icons/Ionicons';



import {
  StyledConstainer,
  InnerConstainer,
  StyledConstainerUser,
  ImageConstainerUser,
  StyledNotificationConstainerUser,
  StyledCalendar,
  StyledNote,
  StyledTextConstainerUser,
  StyledIconDrawer
} from './../components/Styles';




const Home = () => {
  const navigation = useNavigation();
  const avatarUrl = `https://avatar.iran.liara.run/public/boy`;



  return (
    <StyledConstainer>
      <InnerConstainer>
        <StyledConstainerUser>
          <StyledIconDrawer onPress={() => navigation.openDrawer()}>
            <Icon name="menu-outline" size={40} color="white" />
          </StyledIconDrawer>
          <StyledNotificationConstainerUser>
            <Icon name="notifications-outline" size={30} color="white" />
          </StyledNotificationConstainerUser>
          <ImageConstainerUser source={{ uri: avatarUrl }} />
          <StyledTextConstainerUser>User Name</StyledTextConstainerUser>

        </StyledConstainerUser>



        <StyledCalendar>
          <CalendarComponent />
        </StyledCalendar>
        {/* <StyledNote>
          <Text style={{ fontSize: 50 }}>Note</Text>
        </StyledNote> */}
      </InnerConstainer>
    </StyledConstainer>
  );
};

export default Home;
