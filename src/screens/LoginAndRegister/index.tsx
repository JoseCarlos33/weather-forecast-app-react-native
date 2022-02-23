import React, { useRef, useEffect, useState } from 'react';
import Footer from '../../assets/main-footer.svg';
import { Animated, Easing, View } from 'react-native';

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
  ContentLabel
} from './styles';
import { theme } from '../../utils/theme';

interface ContentProps {
  width: number;
  x: number;
}

function LoginAndRegister() {
  const [signInOption, setSignInOption] = useState(true)
  const [loginContentInfo, setLoginContentInfo] = useState<ContentProps>({} as ContentProps);
  const [registerContentInfo, setRegisterContentInfo] = useState<ContentProps>({} as ContentProps);
  const [email, setEmail] = useState();

  const moveRefButton = useRef(new Animated.Value(380)).current
  const moveRefPassword = useRef(new Animated.Value(300)).current
  const moveYRefConfirmPassword = useRef(new Animated.Value(445)).current
  const moveXRefConfirmPassword = useRef(new Animated.Value(100)).current
  const opacityRefConfirmPassword = useRef(new Animated.Value(0)).current
  const moveRefName = useRef(new Animated.Value(100)).current
  const opacityRefName = useRef(new Animated.Value(0)).current
  const moveRefCity = useRef(new Animated.Value(-100)).current
  const opacityRefCity = useRef(new Animated.Value(0)).current
  const moveRefSwitchBottomBar = useRef(new Animated.Value(0)).current
  const widthRefSwitchBottomBar = useRef(new Animated.Value(0)).current

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

  const animatedCity = {
    opacity: opacityRefCity,
    transform: [
      {
        translateX: moveRefCity
      },
    ]
  };

  useEffect(() => {
    if (signInOption) {
      Animated.parallel([
        Animated.timing(
          moveRefButton,
          {
            toValue: 320,
            duration: 500,
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
            duration: 500,
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
              duration: 300,
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
              duration: 300,
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
              duration: 300,
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

      <InputContent>
        <Input
          onChangeText={setEmail}
          value={email}
          placeholder="Digite aqui o seu email"
        />
        <ContentLabel>
          <InputLabel>Email</InputLabel>
        </ContentLabel>
      </InputContent>
      {
        !signInOption &&
        <>
          <InputContent style={animatedName}>
            <Input
              onChangeText={setEmail}
              value={email}
              placeholder="Digite aqui o seu nome"
            />
            <ContentLabel>
              <InputLabel>Nome</InputLabel>
            </ContentLabel>
          </InputContent>
          <InputContent style={animatedCity}>
            <Input
              onChangeText={setEmail}
              value={email}
              placeholder="Digite aqui o sua cidade"
            />
            <ContentLabel>
              <InputLabel>Cidade</InputLabel>
            </ContentLabel>
          </InputContent>
        </>
      }
      <InputContent style={[translateYPasswordInput, { position: 'absolute' }]}>
        <Input
          onChangeText={setEmail}
          value={email}
          placeholder="Digite aqui o sua senha"
        />
        <ContentLabel>
          <InputLabel>Senha</InputLabel>
        </ContentLabel>
      </InputContent>

      {
        !signInOption &&
        <InputContent style={[animatedConfirmPasswordInput, {position: 'absolute'}]}>
          <Input
            onChangeText={setEmail}
            value={email}
            placeholder="Digite novamente sua senha"

          />
          <ContentLabel>
            <InputLabel>Confirmar senha</InputLabel>
          </ContentLabel>
        </InputContent>
      }


      <ButtonContentAnimated style={translateYButton}>
        <SubmitButton>
          <TitleButton>
            {signInOption ? "Entrar" : "Cadastrar"}
          </TitleButton>
        </SubmitButton>
      </ButtonContentAnimated>
    </Container>
  )

}

export default LoginAndRegister;
