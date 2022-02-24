import React, { useRef, useEffect, useState } from 'react';
import Footer from '../../assets/main-footer.svg';
import { Animated, Easing, View, Alert} from 'react-native';

import {
  Container,
  FooterContent,
  Title,
  SubmitButton,
  TitleButton,
  ButtonContentAnimated,
  ButtonTopBar,
  TitleButtonTopBar,
  TopBarContent,
  TopBarSwitchBar,
  InputContent,
  Input,
  InputLabel,
  ContentLabel,
  InputPassword
} from './styles';
import { theme } from '../../utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const axios = require('axios');

interface ContentProps {
  width: number;
  x: number;
}

function LoginAndRegister() {
  const [signInOption, setSignInOption] = useState(true)
  const [loginContentInfo, setLoginContentInfo] = useState<ContentProps>({} as ContentProps);
  const [registerContentInfo, setRegisterContentInfo] = useState<ContentProps>({} as ContentProps);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const moveRefButton = useRef(new Animated.Value(380)).current
  const moveRefPassword = useRef(new Animated.Value(300)).current
  const moveRefEmail = useRef(new Animated.Value(300)).current
  const moveYRefConfirmPassword = useRef(new Animated.Value(445)).current
  const moveXRefConfirmPassword = useRef(new Animated.Value(100)).current
  const opacityRefConfirmPassword = useRef(new Animated.Value(0)).current
  const moveRefName = useRef(new Animated.Value(100)).current
  const opacityRefName = useRef(new Animated.Value(0)).current
  const moveRefCity = useRef(new Animated.Value(-100)).current
  const moveYRefCity = useRef(new Animated.Value(295)).current
  const opacityRefCity = useRef(new Animated.Value(0)).current
  const moveRefSwitchBottomBar = useRef(new Animated.Value(0)).current
  const widthRefSwitchBottomBar = useRef(new Animated.Value(0)).current

  const registerURL = 'https://drf-weather-forecast-app.herokuapp.com/register/'
  const loginURL = 'https://drf-weather-forecast-app.herokuapp.com/login/'

  const {navigate} = useNavigation()

  const translateYButton = {
    transform: [
      {
        translateY: moveRefButton
      }
    ]
  };

  const translateYPasswordInput = {
    transform: [
      {
        translateY: moveRefPassword
      }
    ]
  };

  const animatedConfirmPasswordInput = {
    opacity: opacityRefConfirmPassword,
    transform: [
      {
        translateY: moveYRefConfirmPassword
      },
      {
        translateX: moveXRefConfirmPassword
      }
    ]
  };

  const translateXSwitchBottomBar = {
    width: signInOption ? loginContentInfo.width : registerContentInfo.width,
    transform: [
      {
        translateX: moveRefSwitchBottomBar
      },
    ]
  };

  const animatedName = {
    opacity: opacityRefName,
    transform: [
      {
        translateX: moveRefName
      },
    ]
  };

  const animatedEmail = {
    transform: [
      {
        translateY: moveRefEmail
      },
    ]
  };

  const animatedCity = {
    opacity: opacityRefCity,
    transform: [
      {
        translateY: moveYRefCity
      },
      {
        translateX: moveRefCity
      },
    ]
  };

  async function handleSubmitRegister() {
    if (!signInOption) {
      let data = {
        "name": name,
        "email": email,
        "current_city": city,
        "password": password
      }

      let res = await axios.post(registerURL, data);

      let response = res.data;
      console.log(response);
      setName('');
      setEmail('');
      setCity('');
      setPassword('');
      setConfirmPassword('');

      setSignInOption(true)
    }else{
      try {
        let loginData = {
          "email": email,
          "password": password
        }
        const response = await axios.post(loginURL, loginData);
        AsyncStorage.setItem('@WFA:user_token',response.data.token)
        setEmail('');
        setPassword('');
        navigate('Home');
       } catch (error) {
        Alert.alert('Email ou senha incorreta');
       }
     
    }
  }

  useEffect(() => {
    if (signInOption) {
      Animated.parallel([
        Animated.timing(
          moveRefButton,
          {
            toValue: 320,
            duration: 450,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          moveRefPassword,
          {
            toValue: 220,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          moveRefEmail,
          {
            toValue: 145,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          moveRefSwitchBottomBar,
          {
            toValue: loginContentInfo.x,
            duration: 250,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          opacityRefName,
          {
            toValue: 0,
            duration: 100,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          moveRefName,
          {
            toValue: 100,
            duration: 100,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          moveXRefConfirmPassword,
          {
            toValue: 100,
            duration: 100,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          opacityRefConfirmPassword,
          {
            toValue: 0,
            duration: 100,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          opacityRefCity,
          {
            toValue: 0,
            duration: 100,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          moveRefCity,
          {
            toValue: -100,
            duration: 100,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(
          moveRefButton,
          {
            toValue: 550,
            duration: 350,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          moveRefEmail,
          {
            toValue: 220,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          moveRefPassword,
          {
            toValue: 370,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          moveRefSwitchBottomBar,
          {
            toValue: registerContentInfo.x,
            duration: 250,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
      ]).start()

      Animated.sequence([
        Animated.parallel([
          Animated.timing(
            opacityRefName,
            {
              toValue: 1,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true
            }
          ),
          Animated.timing(
            moveRefName,
            {
              toValue: 0,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true
            }
          ),
        ]),
        Animated.parallel([
          Animated.timing(
            opacityRefCity,
            {
              toValue: 1,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true
            }
          ),
          Animated.timing(
            moveRefCity,
            {
              toValue: 0,
              duration: 340,
              easing: Easing.ease,
              useNativeDriver: true
            }
          ),
        ]),
        Animated.parallel([
          Animated.timing(
            opacityRefConfirmPassword,
            {
              toValue: 1,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true
            }
          ),
          Animated.timing(
            moveXRefConfirmPassword,
            {
              toValue: 0,
              duration: 340,
              easing: Easing.ease,
              useNativeDriver: true
            }
          ),
        ])
      ]).start()
    }
  }, [signInOption])

  return (
    <Container>
      <FooterContent>
        <Footer />
      </FooterContent>
      <Title>
        Seja Bem-Vindo(a)!
      </Title>
      <TopBarContent>
        <View onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
          const formattedData = {
            width: width,
            x: x
          }
          setLoginContentInfo(formattedData)
        }} >
          <ButtonTopBar onPress={() => setSignInOption(true)}>
            <TitleButtonTopBar
              style={{ color: signInOption ? theme.color.blue : theme.color.gray_medium }}
            >
              Login
            </TitleButtonTopBar>
          </ButtonTopBar>
        </View>

        <View onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
          const formattedData = {
            width: width,
            x: x
          }
          setRegisterContentInfo(formattedData)
        }}>
          <ButtonTopBar onPress={() => setSignInOption(false)}>
            <TitleButtonTopBar
              style={{ color: signInOption ? theme.color.gray_medium : theme.color.blue }}
            >
              Cadastro
            </TitleButtonTopBar>
          </ButtonTopBar>
        </View>
        <TopBarSwitchBar style={translateXSwitchBottomBar} />
      </TopBarContent>

      <InputContent style={[animatedEmail, { position: 'absolute' }]}>
        <Input
          onChangeText={setEmail}
          value={email}
          placeholder="Digite aqui o seu email"
          autoCapitalize={"none"}
          style={{
            borderColor: email !== '' ? theme.color.dark_blue : theme.color.gray_medium
          }}
        />
        <ContentLabel>
          <InputLabel
            style={{
              color: email !== '' ? theme.color.dark_blue : theme.color.gray_medium
            }}
          >Email</InputLabel>
        </ContentLabel>
      </InputContent>
      {
        !signInOption &&
        <>
          <InputContent style={animatedName}>
            <Input
              onChangeText={setName}
              autoCapitalize={"words"}
              value={name}
              placeholder="Digite aqui o seu nome"
              style={{
                borderColor: name !== '' ? theme.color.dark_blue : theme.color.gray_medium
              }}
            />
            <ContentLabel>
              <InputLabel
                style={{
                  color: name !== '' ? theme.color.dark_blue : theme.color.gray_medium
                }}
              >Nome</InputLabel>
            </ContentLabel>
          </InputContent>
          <InputContent style={[animatedCity, { position: 'absolute' }]}>
            <Input
              onChangeText={setCity}
              value={city}
              placeholder="Digite aqui o sua cidade"
              style={{
                borderColor: city !== '' ? theme.color.dark_blue : theme.color.gray_medium
              }}
            />
            <ContentLabel>
              <InputLabel
                style={{
                  color: city !== '' ? theme.color.dark_blue : theme.color.gray_medium
                }}
              >Cidade</InputLabel>
            </ContentLabel>
          </InputContent>
        </>
      }
      <InputContent style={[translateYPasswordInput, { position: 'absolute' }]}>
        <Input
          onChangeText={setPassword}
          autoCapitalize={"none"}
          value={password}
          placeholder="Digite aqui a sua senha"
          style={{
            borderColor: password !== '' ? theme.color.dark_blue : theme.color.gray_medium
          }}
          secureTextEntry={true}
        />
        <ContentLabel>
          <InputLabel
            style={{
              color: password !== '' ? theme.color.dark_blue : theme.color.gray_medium
            }}
          >Senha</InputLabel>
        </ContentLabel>
      </InputContent>

      {
        !signInOption &&
        <InputContent style={[animatedConfirmPasswordInput, { position: 'absolute' }]}>
          <Input
            onChangeText={setConfirmPassword}
            autoCapitalize={"none"}
            value={confirmPassword}
            placeholder="Digite novamente sua senha"
            style={{
              borderColor: confirmPassword !== '' ? theme.color.dark_blue : theme.color.gray_medium
            }}
            secureTextEntry={true}
          />
          <ContentLabel>
            <InputLabel
              style={{
                color: confirmPassword !== '' ? theme.color.dark_blue : theme.color.gray_medium
              }}
            >Confirmar senha</InputLabel>
          </ContentLabel>
        </InputContent>
      }


      <ButtonContentAnimated style={translateYButton}>
        <SubmitButton onPress={handleSubmitRegister} >
          <TitleButton>
            {signInOption ? "Entrar" : "Cadastrar"}
          </TitleButton>
        </SubmitButton>
      </ButtonContentAnimated>
    </Container>
  )

}

export default LoginAndRegister;
