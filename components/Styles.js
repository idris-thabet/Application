import styled from 'styled-components' ;
import {View,Image,Text,TextInput,TouchableOpacity,StatusBar} from 'react-native' ;
import Constants from 'expo-constants';


const getStatusBarHeight = () => {
    return Constants.statusBarHeight;
  }
  const statusBarHeight = getStatusBarHeight();


//color 
export const Colors = {
    primary: '#000000' ,
    secondary : '#2C2C2C' ,
    terliary:'#707070' ,
    green: '#32BD36' ,
    textGrayOne :'#E0E0E0' ,
    white:'#E0E0E0',
    red : '#FF0000'
}

const {primary,secondary,terliary,green,textGrayOne,white ,red} = Colors ; 

export const StyledConstainer = styled.View`
    flex : 1 ;
    padding: 25px ; 
    padding-top: ${statusBarHeight + 10}px;
    background-color: ${primary}; 
`;
export const InnerConstainer = styled.View`
    flex: 1 ;
    width: 100%  ;
    align-items: center;  
`;


export const PageTitle = styled.Text`
    margin-top: 108px;
    font-size: 25px;
    text-align: center;
    font-weight: bold; 
    color: ${textGrayOne} ;
    padding: 10px;
    
`;


export const StyledFormArea = styled.View`
    top: 56px;
    margin-bottom:45px;
    align-items: center;
    
   
    
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary} ;
    text-align: center;
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 14px;
    height: 64px;
    width: 327px;
    margin-bottom: 32px;
    color: ${textGrayOne};
    
    
`;


export const LeftIcon = styled.View`
    left: 12px;
    top: 25px;
    position: absolute;
    z-index: 1;
`;
/* export const RightIcon = styled.TouchableOpacity`
    left: 12px;
    top: 25px;
    position: absolute;
    z-index: 1;
`;
 */
export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${green};
    justify-content: center;
    border-radius: 50px;
    height: 64px;
    width: 240px;
    align-items: center;
    top: 56px;
`;

export const ButtonText =styled.Text`
    color: ${white} ;
    font-size: 24px;
    font-weight: bold; 
    
    

`;

export const TextLinkPassword = styled.TouchableOpacity`
    
`;

export const TextLinkPasswordContent = styled.Text`
    font-size: 12px;
    color: ${white};
    text-decoration: underline  ${white} ;
    right: 100px;
    bottom: 18px;
`;

//

export const StyledConstainerUser = styled.View`
    align-items: center;
    width:100%;
    height: 150px;
    background-color: ${secondary};
    border-radius: 10px;
    
`;

export const StyledTextConstainerUser = styled.Text`
    font-size: 30;
    color: ${white};
    top: 30;
    
`;

export const StyledNotificationConstainerUser = styled.TouchableOpacity`
    position: absolute;
    z-index: 1;
    top: 20;
    right: 20;
    
`;

export const StyledIconDrawer = styled.TouchableOpacity`  
    position: absolute;
    z-index: 1;
    left: 10;
    top: 10;
    
    
`;

// export const StyledDrawerHome = styled.View`
//     align-items: center;
//     width:100%;
//     height: 20%;
//     background-color: ${white};
//     border-radius: 20px;
// `;

export const ImageConstainerUser = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    top: 16px;
    border: 3px;
    border-color: aliceblue;
    
`;

export const StyledCalendar =styled.View`
  
    margin-top: 5%;
    width: 100%;
    height: auto;
    background-color: ${terliary};
    border-radius: 10px;
`;

export const StyledNote =styled.View`
    align-items: center;
    margin-top: 5%;
    width: 100%;
    height: 35%;
    background-color: ${terliary};
    border-radius: 10px 10px 0px 0px;
`;

export const MessaheBox =styled.Text`
    
    text-align: center;
    color: ${(props) => (props.type == 'SUCCÈS' ? 'blue' :red)};
`;


