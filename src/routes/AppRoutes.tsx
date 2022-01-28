import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';


const StackRoutes = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
  <StackRoutes.Navigator
    screenOptions={{headerShown: false}}  
  >
    <StackRoutes.Screen name="Home" component={Home} />
    {/* <StackRoutes.Screen name="ForecastWeek" component={ForecastWeek} /> */}
  </StackRoutes.Navigator>
)

export default AppRoutes;