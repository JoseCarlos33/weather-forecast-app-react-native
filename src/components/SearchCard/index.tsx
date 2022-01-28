import React from 'react';
import {
  Container,
  AddText,
  SubTitle,
  Title
} from './styles';

interface SearchCardProps {
  title: string;
  subTitle: string;
}

const SearchCard: React.FC<SearchCardProps> = ({
  title,
  subTitle,
}: SearchCardProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      <AddText>Adicionar</AddText>
    </Container>
  );
}

export default SearchCard;