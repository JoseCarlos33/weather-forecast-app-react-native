import React, { useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../utils/theme';
import SearchCard from '../../components/SearchCard';
import { getWeatherForecast } from '../../services/api';
import CityCard from '../../components/CityCard';
import Search from '../../assets/Search.svg';
import Power from '../../assets/power.svg';
import { API_GOOGLE_PLACES_KEY } from '@env';

import {
  Title,
  InfoContent,
  Content,
  Description,
  HeaderContainer,
  OpenOrCloseButton,
  DefaultTitle,
  TitleContent,
  LoadContent,
  WelcomeText,
  LogoutButton
} from './styles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useCardData } from '../../hooks/dataContext';

export function teste(){
  const {handleUpdateCardData} = useCardData();
  
  handleUpdateCardData(3)
}
const Home: React.FC = () => {

  const [isSearching, setIsSearching] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstRefresh, setFirstRefresh] = useState(false);
  const [username, setUsername] = useState('');
  const [countNewResquest, setCountNewRequest] = useState(0);
  const [data, setData] = useState([]);

  const profileURL = "https://drf-weather-forecast-app.herokuapp.com/profile/"
  const searchRequestURL = "https://drf-weather-forecast-app.herokuapp.com/search/"
  const userCitiesURL = "https://drf-weather-forecast-app.herokuapp.com/user/cities/"

  const {navigate} = useNavigation();
  const {card, handleUpdateCardData} = useCardData();

  async function handleRequest(lat: number, long: number, name: string, country: string){
    const USER_TOKEN = await AsyncStorage.getItem('@WFA:user_token');
    const latFormatted = lat.toString()
    const longFormatted = long.toString()

    const dataFormatted = {
      "country": country,
      "city_name": name,
      "longitude": longFormatted,
      "latitude": latFormatted
    }

    const AuthStr = 'Token '.concat(USER_TOKEN!);
    axios.post(searchRequestURL, dataFormatted, { 
      headers: { Authorization: AuthStr } 
    })
      .then(response => {
        setCountNewRequest(countNewResquest+1)
        console.log(response.data)
      })
      .catch((error) => {
        console.log('error ' + error);
      });
  }

  useEffect(() => {
    async function getInfoAboutWeatherForecast() {
      const USER_TOKEN = await AsyncStorage.getItem('@WFA:user_token');
      
      setIsLoading(true);
      const AuthStr = 'Token '.concat(USER_TOKEN!);
      await axios.get(userCitiesURL, { 
        headers: { Authorization: AuthStr } 
      })
        .then(response => {
          response.data.map((item) => {
            let lat = Number(item.latitude);
            let long = Number(item.longitude);
            console.log(lat)
            const data = { 
              lat, 
              long, 
              name: item.city_name, 
              country: item.country
            }
            handleUpdateCardData(
              data
            )
            
          })
        })
        .catch((error) => {
          console.log('error ' + error);
        });

      setIsLoading(false);    
    }

    getInfoAboutWeatherForecast();
  }, []);

  useEffect(() => {
    setFirstRefresh(true);
    // AsyncStorage.clear();
  }, [])

  useEffect(() => {
    
    setData(card)
    console.log('DATA',data)
    
  },[card])

  useEffect(() => {
    async function getUserNameAndSearchedCities() {
      const USER_TOKEN = await AsyncStorage.getItem('@WFA:user_token');

      const AuthStr = 'Token '.concat(USER_TOKEN!);
      axios.get(profileURL, { headers: { Authorization: AuthStr } })
        .then(response => {
          setUsername(response.data.name.split(' ')[0])
        })
        .catch((error) => {
          console.log('error ' + error);
          navigate('LoginAndRegister')
        });
    }
    getUserNameAndSearchedCities()
  }, [])

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss;
          setIsSearching(false);
        }}
      >
        <Content>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
          <HeaderContainer />
          {
            isLoading ? (
              <LoadContent>
                <ActivityIndicator
                  size="large"
                  color={theme.color.blue}
                />
              </LoadContent>
            ) : (
              <>
                <WelcomeText>
                  Olá, {username}
                </WelcomeText>
                <LogoutButton
                  onPress={() => {
                    AsyncStorage.clear()
                    navigate('LoginAndRegister')
                  }}
                >
                  <Power/>
                </LogoutButton>
                <TitleContent>
                  {
                    !isSearching ? (
                      <>
                        <DefaultTitle>
                          Cidades
                        </DefaultTitle>
                        <OpenOrCloseButton
                          onPress={() => setIsSearching(true)}
                        >
                          <Search />
                        </OpenOrCloseButton>
                      </>
                    ) : (
                      <GooglePlacesAutocomplete
                        placeholder='Qual cidade deseja pesquisar?'
                        minLength={2}
                        autoFocus={true}
                        returnKeyType={'search'}
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                          const currentDailyTempKey = '@weatherForecastApp:tempDay';
                          setCoordinates([...coordinates, details.geometry.location]);
                          setIsSearching(false);
                          const name = data.terms[0].value;
                          const quantTerms = data.terms.length - 1;
                          const country = data.terms[quantTerms].value;
                          const lat = details.geometry.location.lat;
                          const long = details.geometry.location.lng;
                          handleRequest(lat, long, name, country)
                        }}
                        query={{
                          key: API_GOOGLE_PLACES_KEY,
                          language: 'pt-BR',
                        }}
                        renderRow={(rowData) => {
                          const title = rowData.structured_formatting.main_text;
                          const quantTerms = rowData.terms.length - 1;
                          const countryTitle = rowData.terms[quantTerms].value;
                          return (
                            <SearchCard
                              title={title}
                              subTitle={countryTitle}
                            />
                          );
                        }}
                        styles={{
                          container: {
                            flex: 1,
                          },
                          textInputContainer: {
                            flexDirection: 'row',
                          },
                          textInput: {
                            backgroundColor: theme.color.blue,
                            color: theme.color.white,
                            height: 44,
                            borderRadius: 5,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            fontSize: 18,
                            flex: 1,
                          },
                          poweredContainer: {
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            borderBottomRightRadius: 5,
                            borderBottomLeftRadius: 5,
                            borderColor: '#c8c7cc',
                            borderTopWidth: 0.5,
                          },
                          powered: {},
                          listView: {
                            marginTop: 20,
                          },
                          row: {
                            backgroundColor: '#fafafa',
                            flexDirection: 'row',
                            padding: 2,
                          },
                          separator: {
                            height: '2%',
                            backgroundColor: '#fafafa',
                          },
                          description: {},
                          loader: {
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            height: 20,
                          },
                        }}
                        enablePoweredByContainer={false}
                      />
                    )
                  }
                </TitleContent>
                {
                  !isSearching && data == '' &&
                  <InfoContent>
                    <Title> Parece que você ainda não{'\n'}adicionou uma cidade </Title>
                    <Description>
                      Tente adicionar uma cidade usando o botão{'\n'}de busca
                    </Description>
                  </InfoContent>

                }
                {
                  !isSearching && data !== [] &&
                  <FlatList
                    data={data}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => {
                      return (
                        <CityCard
                          city={item.name}
                          country={item.country}
                          description={item.description}
                          currentTemp={item.dailyTemp}
                          minTemp={item.minTemp}
                          maxTemp={item.maxTemp}
                          enableFavorite={true}
                        />
                      )

                    }}
                    contentContainerStyle={{ alignItems: 'center' }}
                  />
                }
              </>
            )
          }
        </Content>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Home;