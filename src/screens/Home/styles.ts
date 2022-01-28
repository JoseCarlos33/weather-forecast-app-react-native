import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {theme} from '../../utils/theme';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Content = styled.View`
  flex: 1;
  background-color: ${theme.color.background};
`;

export const Title = styled.Text`
  margin-top: 90px;
  font-family: ${theme.font.medium};
  font-size: ${RFValue(20)}px;
  text-align: center;
`;

export const InfoContent = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Description = styled.Text`
  margin-top: 16px;
  font-size: ${RFValue(16)}px;
  font-family: ${theme.font.regular};
  text-align: center;
`;

export const HeaderContainer = styled.View`
  height: ${hp('13%')}px;
  width: ${wp('100%')}px;
  background-color: ${theme.color.blue};
`;

export const TitleContent = styled.View`
  width: ${wp('100%')}px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 10px 20px;
  margin-top: -${hp('7%')}px;
`;

export const DefaultTitle = styled.Text`
  font-family: ${theme.font.medium};
  font-size: ${RFValue(20)}px;
  color: ${theme.color.white};
`;

export const OpenOrCloseButton = styled.TouchableOpacity`
  height: ${hp('5%')}px;
  width: ${wp('10%')}px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

export const LoadContent = styled.View`
  align-self: center;
  margin-top: ${hp('30%')}px;
  justify-content: center;
  align-items: center;
`;
