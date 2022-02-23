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
  TopBarSwitchBar
} from './styles';

interface ContentProps {
  width: number;
  x: number;
}

function LoginAndRegister() {
  const [signInOption, setSignInOption] = useState(true)
  const [loginContentInfo, setLoginContentInfo] = useState<ContentProps>({} as ContentProps);
  const [registerContentInfo, setRegisterContentInfo] = useState<ContentProps>({} as ContentProps);

  const moveRefButton = useRef(new Animated.Value(380)).current
  const moveRefSwitchBottomBar = useRef(new Animated.Value(0)).current
  const widthRefSwitchBottomBar = useRef(new Animated.Value(0)).current

  const translateXButton = {
    transform: [
      {
        translateY: moveRefButton
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

  useEffect(() => {
    if (signInOption) {
      Animated.parallel([
        Animated.timing(
          moveRefButton,
          {
            toValue: 380,
            duration: 500,
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
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(
          moveRefButton,
          {
            toValue: 520,
            duration: 500,
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
            <TitleButtonTopBar >
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
            <TitleButtonTopBar>
              Cadastro
            </TitleButtonTopBar>
          </ButtonTopBar>
        </View>
        <TopBarSwitchBar style={translateXSwitchBottomBar} />
      </TopBarContent>
      <ButtonContentAnimated style={translateXButton}>
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
