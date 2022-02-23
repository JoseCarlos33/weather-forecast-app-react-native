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
import {API_GOOGLE_PLACES_KEY} from '@env';

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
  Icon
} from './styles';


const Home: React.FC = () => {

  const [isSearching, setIsSearching] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstRefresh, setFirstRefresh] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const currentDailyTempKey = '@weatherForecastApp:tempDay';

    async function getInfoAboutWeatherForecast() {
      setIsLoading(true);
      setTimeout(async () => {
        const weatherForecastData = await AsyncStorage.getItem(currentDailyTempKey);
        const formattedData = weatherForecastData ? JSON.parse(weatherForecastData) : [];
        setData(formattedData);
        setIsLoading(false);
      }, 2000);
    }

    getInfoAboutWeatherForecast();
  }, [coordinates, firstRefresh]);

  useEffect(() => {
    setFirstRefresh(true);
    // AsyncStorage.clear();
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
                          <Search/>
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
                          getWeatherForecast(lat, long, name, country);
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
                    renderItem={({item}) => {
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
                    contentContainerStyle={{alignItems: 'center'}}
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