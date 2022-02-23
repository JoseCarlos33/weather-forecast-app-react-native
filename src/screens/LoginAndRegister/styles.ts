import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {theme} from '../../utils/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextInput, Animated } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.color.white};
  align-items: center;
`;

export const FooterContent = styled.View`
  position: absolute;
  bottom: 0;
`;

export const Title = styled.Text`
  margin-top: ${hp('9%')};
  font-family: ${theme.font.medium};
  font-size: ${RFValue(20)}px;
  text-align: center;
`;

export const TopBarContent = styled.View`
  margin-top: ${hp('5%')};
  width: ${wp('50%')};
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const TopBarSwitchBar = styled(Animated.View)`
  height: 1px;
  width: 44%;
  background-color: ${theme.color.blue};
  position: absolute;
  bottom: 0px;
  left: 0px;
`;

export const ButtonTopBar = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
`;

export const TitleButtonTopBar = styled.Text`
  font-family: ${theme.font.medium};
  font-size: ${RFValue(16)}px;
  padding-bottom: 4px;
`;

export const InputContent = styled.View`
  border-bottom-width: 1px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const Input = styled(TextInput)`
  
`;

export const SubmitButton = styled(RectButton)`
  background-color: ${theme.color.blue};
  border-radius: 7px;
  height: 54px;
  width: ${wp('80%')}px;
  justify-content: center;
`;

export const TitleButton = styled.Text`
  font-family: ${theme.font.medium};
  font-size: ${RFValue(20)}px;
  text-align: center;
  color: ${theme.color.white};
`;

export const ButtonContentAnimated = styled(Animated.View)`
  position: absolute;
`;

