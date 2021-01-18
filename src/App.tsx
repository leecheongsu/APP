import React from 'react';
import { GlobalContextProvider } from '@app/context';
import theme from '@app/style/theme';
import { LogBox, Text } from 'react-native';
import { ignoreWarningLists } from '@app/lib/util/ignoreWarningLists';
import { ThemeProvider } from 'styled-components';
import RootStack from '@app/routes/RootStack';
import { NavigationContainer } from '@react-navigation/native';

declare const global: { HermesInternal: null | {} };

LogBox.ignoreLogs(ignoreWarningLists);
const App = () => {
  return (
    <React.Fragment>
      <GlobalContextProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </ThemeProvider>
      </GlobalContextProvider>
    </React.Fragment>
  );
};

export default App;
