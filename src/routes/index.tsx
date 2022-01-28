import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import AppRoutes from './AppRoutes';

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}