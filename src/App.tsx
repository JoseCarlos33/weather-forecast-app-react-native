import React from 'react';
import {Routes} from './routes';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './utils/theme';

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </>
  );
};

export default App;