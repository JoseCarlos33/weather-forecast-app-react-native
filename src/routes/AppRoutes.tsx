import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import LoginAndRegister from '../screens/LoginAndRegister';


const StackRoutes = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
  <StackRoutes.Navigator
    screenOptions={{headerShown: false}}  
  >
    <StackRoutes.Screen name="LoginAndRegister" component={LoginAndRegister} />
    <StackRoutes.Screen name="Home" component={Home} />
  </StackRoutes.Navigator>
)

export default AppRoutes;