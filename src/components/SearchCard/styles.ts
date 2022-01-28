import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { theme } from '../../utils/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View } from 'react-native';

export const Container = styled(View).attrs({
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 1 },
  shadowRadius: 2,
  shadowOpacity: 0.35,
  elevation: 6,
})`
  height: ${hp('15%')}px;
  width: ${wp('88%')}px;
  border-radius: 5px;
  background-color: ${theme.color.blue};
  background-color: ${theme.color.white};
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${theme.font.regular};
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${theme.font.regular};
`;

export const AddText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${theme.font.medium};
  color: ${theme.color.dark_blue};
  letter-spacing: 1.25px;
  text-transform: uppercase;
  position: absolute;
  bottom: 16px;
  left: 16px;
`;