import React, { createContext, useContext, useEffect, useState } from 'react';


interface cardProps {
  name: string;
  country: string;
  lat: number;
  long: number;
  dailyTemp: string | number;
  minTemp: string | number;
  maxTemp: string | number;
  description: string;
}

interface BasicInfoProps{
  lat: number;
  long: number;
  name: string;
  country: string;
}


interface WeatherForecastContextData {
  setLength(num: number): void;
  card: cardProps;
  handleUpdateCardData(item: BasicInfoProps): void;
}

const CardContext = createContext<WeatherForecastContextData>(
  {} as WeatherForecastContextData,
);

const CardProvider: React.FC = ({ children }) => {
  let card = []

  

  return (
    <CardContext.Provider
      value={{
        card
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

function useCardData(): WeatherForecastContextData {
  const context = useContext(CardContext);

  return context;
}

export { CardProvider, useCardData };
