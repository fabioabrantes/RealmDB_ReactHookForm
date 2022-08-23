import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import { Routes } from './src/routes';

import { Load } from './src/components/Button/styles';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

import theme from './src/theme';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  if(!fontsLoaded){ 
    return (
      <ThemeProvider theme={theme}>
        <Load/>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="dark" translucent backgroundColor={theme.COLORS.BACKGROUND} />
      <Routes />
    </ThemeProvider>
  );
}
