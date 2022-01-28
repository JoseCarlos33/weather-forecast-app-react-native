import React from 'react';
import Heart from '../../assets/heart.svg';
import {
  Container,
  SubTitle,
  Title,
  ButtonContainer,
  Description,
  FooterContent,
  InfoBox,
  MinAndMaxText,
  TopContent,
  CurrentTempText,
  FavoriteButton,
} from './styles';

interface SearchCardProps {
  city: string;
  country: string;
  description: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  enableFavorite?: boolean;
}

const CityCard: React.FC<SearchCardProps> = ({
  city,
  country,
  description,
  currentTemp,
  minTemp,
  maxTemp,
  enableFavorite,
}: SearchCardProps) => {
  const currentFormattedTemp = Math.round(currentTemp);
  const currentFormattedMax = Math.round(maxTemp);
  const currentFormattedMin = Math.round(minTemp);
  
  return (
    <ButtonContainer>
      <Container>
        <TopContent>
          <InfoBox>
            <Title>{city}</Title>
            <SubTitle>{country}</SubTitle>
          </InfoBox>
          <CurrentTempText>{currentFormattedTemp}°</CurrentTempText>
        </TopContent>
        <FooterContent>
          <InfoBox>
            <Description>{description}</Description>
            <MinAndMaxText>{currentFormattedMin}° - {currentFormattedMax}°</MinAndMaxText>
          </InfoBox>
          {
            enableFavorite &&
            <FavoriteButton>
              <Heart/>
            </FavoriteButton>
          }
        </FooterContent>
      </Container>
    </ButtonContainer>
  );
}

export default CityCard;