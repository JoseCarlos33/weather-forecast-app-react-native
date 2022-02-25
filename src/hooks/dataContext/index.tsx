import React, { createContext, useContext, useEffect, useState } from 'react';
import {API_WEATHER_FORECAST_KEY} from '@env';

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
  card: cardProps;
  handleUpdateCardData(item: BasicInfoProps): void;
}

const CardContext = createContext<WeatherForecastContextData>(
  {} as WeatherForecastContextData,
);

const CardProvider: React.FC = ({ children }) => {
  const [card, setCard] = useState<cardProps[]>([]);

  async function handleUpdateCardData(item: BasicInfoProps) {
    await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${item.lat}&lon=${item.long}&lang=pt_br&appid=${API_WEATHER_FORECAST_KEY}&units=metric`)
    .then(data => data.json())
    .then(async (results) => {
      console.log('')
      const data = {
        name: item.name,
        country: item.country,
        lat: item.lat,
        long: item.long,
        dailyTemp: results.daily[0].temp.day,
        minTemp: results.daily[0].temp.min,
        maxTemp: results.daily[1].temp.max,
        description: results.daily[0].weather[0].description,
      };
      
      const found = card.includes(data);
      console.log(found)

      if(!found){
        let newList = card
        newList.push(data)
        setCard(newList)
      }
      
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  return (
    <CardContext.Provider
      value={{
        card,
        handleUpdateCardData,
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
