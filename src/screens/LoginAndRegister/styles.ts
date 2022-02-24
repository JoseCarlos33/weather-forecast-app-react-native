import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {theme} from '../../utils/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextInput, Animated } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';

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
  margin-top: ${hp('8%')}px;
  font-family: ${theme.font.medium};
  font-size: ${RFValue(20)}px;
  text-align: center;
`;

export const TopBarContent = styled.View`
  margin-top: ${hp('3%')}px;
  width: ${wp('40%')}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

export const InputContent = styled(Animated.View)`
  align-items: flex-start;
  width: ${wp('80%')}px;
  margin-top: 21px;
`;

export const ContentLabel = styled.View`
  background-color: ${theme.color.white};
  position: absolute;
  top: -9px;
  left: 16px;
  padding: 2px;
`;

export const Input = styled(TextInput)`
  height: 54px;
  border-width: 1px;
  border-radius: 7px;
  border-color: ${theme.color.gray_medium};
  width: ${wp('80%')}px;
  padding-left: 17px;
  font-size: ${RFValue(15)}px;
  color: ${theme.color.blue};
`;

export const InputPassword = styled(TextInputMask)`
  height: 54px;
  border-width: 1px;
  border-radius: 7px;
  border-color: ${theme.color.gray_medium};
  width: ${wp('80%')}px;
  padding-left: 17px;
  font-size: ${RFValue(15)}px;
  color: ${theme.color.blue};
`;

export const InputLabel = styled.Text`
  font-family: ${theme.font.regular};
  font-size: ${RFValue(12)}px;
  text-align: center;
  color: ${theme.color.gray_medium};
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

