import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_WEATHER_FORECAST_KEY} from '@env';

const API_KEY = API_WEATHER_FORECAST_KEY;

export async function getWeatherForecast(lat: number, long: number, name: string, country: string){
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&lang=pt_br&appid=${API_KEY}&units=metric`)
    .then(data => data.json())
    .then(async (results) => {
      const currentDailyTempKey = '@weatherForecastApp:tempDay';
      const weatherForecastData = await AsyncStorage.getItem(currentDailyTempKey);
      const previusData = weatherForecastData ? JSON.parse(weatherForecastData) : '';
      
      const data = {
        name: name,
        country: country,
        lat: lat,
        long: long,
        dailyTemp: results.daily[0].temp.day,
        minTemp: results.daily[0].temp.min,
        maxTemp: results.daily[1].temp.max,
        description: results.daily[0].weather[0].description,
      };

      const listData = [...previusData, data];

      const dataFormatted = JSON.stringify(listData);

      await AsyncStorage.setItem(currentDailyTempKey,dataFormatted);
    })
    .catch(err => {
      console.log(err.message);
    })
};

