import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { theme } from '../../utils/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity, View } from 'react-native';

export const Container = styled(View).attrs({
  shadowColor: 'black',
  shadowOffset: { height: 1, width: 1 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 3,
})`
  height: ${hp('18%')}px;
  width: ${wp('89%')}px;
  border-radius: 5px;
  background-color: ${theme.color.blue};
  background-color: ${theme.color.white};
  margin-top: 12px;
  padding: 16px;
`;

export const ButtonContainer = styled(TouchableOpacity).attrs({
  overflow: 'hidden',
})`
  
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${theme.font.regular};
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${theme.font.regular};
`;

export const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${theme.font.medium};
  color: ${theme.color.orange};
  letter-spacing: 0.25px;
  text-transform: capitalize;
`;

export const InfoBox = styled.View``;

export const MinAndMaxText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${theme.font.regular};
  color: ${theme.color.black};
  letter-spacing: 0.4px;
  margin-top: 5px;
`;

export const CurrentTempText = styled.Text`
  font-size: ${RFValue(34)}px;
  font-family: ${theme.font.regular};
  color: ${theme.color.orange};
  letter-spacing: 0.25px;
  margin-top: 5px;
`;

export const FooterContent = styled.View`
  margin-top: 27px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const TopContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const FavoriteButton = styled.TouchableOpacity`
  margin-top: 12px;
  margin-right: 12px;
`;
