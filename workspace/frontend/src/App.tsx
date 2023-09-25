import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppRouter from './router/AppRouter.tsx';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#80C0C0',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
