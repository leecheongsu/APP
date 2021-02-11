import React from 'react';
import { GlobalContextProvider } from '@app/context';
import theme, { navigationTheme } from '@app/style/theme';
import { LogBox, Text } from 'react-native';
import { ignoreWarningLists } from '@app/lib/util/ignoreWarningLists';
import { ThemeProvider } from '@app/style/typed-components';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from '@app/routes/DrawerStack';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const global: { HermesInternal: null | {} };

LogBox.ignoreLogs(ignoreWarningLists);

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const App = () => {
  return (
    <React.Fragment>
      <GlobalContextProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer theme={navigationTheme}>
            <DrawerStack />
          </NavigationContainer>
        </ThemeProvider>
      </GlobalContextProvider>
    </React.Fragment>
  );
};

export default App;
