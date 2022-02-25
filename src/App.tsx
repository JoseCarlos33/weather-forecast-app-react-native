import React from 'react';
import {Routes} from './routes';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './utils/theme';
import {CardProvider} from './hooks/dataContext';

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CardProvider>
          <Routes />
        </CardProvider>
      </ThemeProvider>
    </>
  );
};

export default App;