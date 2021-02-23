import React, { useEffect, useRef, useState } from 'react';
import { GlobalContextProvider } from '@app/context';
import theme, { navigationTheme } from '@app/style/theme';
import { Alert, AppState, BackHandler, LogBox, Text, ToastAndroid } from 'react-native';
import { ignoreWarningLists } from '@app/lib/util/ignoreWarningLists';
import { ThemeProvider } from '@app/style/typed-components';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from '@app/routes/DrawerStack';
import { getStoreData, handleApiError, setStoreData, clearStoreData } from '@app/lib';
import { userApis } from '@app/api/User';
import { OverayLoading } from '@app/components';
import { SplashScreen } from '@app/screens';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const global: { HermesInternal: null | {} };

LogBox.ignoreLogs(ignoreWarningLists);

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [loading, setLoading] = useState(false);
  const [isSplash, setIsSplash] = useState(true);
  const _handleAppStateChange = async (nextAppState) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  const getTokenHandle = async () => {
    const user: any = await getStoreData('user');
    const password = await getStoreData('password');
    const isAutoLogin = await getStoreData('isAutoLogin');
    if (user !== null) {
      setLoading(true);
      const params = {
        id: user?.email,
        pwd: password,
      };
      userApis
        .postLogin(params)
        .then((res) => {
          if (res.status === 200) {
            setStoreData('user', res.data);
            setStoreData('isLogin', true);
          }
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          clearStoreData();
          handleApiError(e.response);
        });
    }
  };

  //앱상태
  useEffect(() => {
    if (appStateVisible === 'active') {
      getTokenHandle();
    }
  }, [appStateVisible]);

  //안드로이드 백버튼 핸들러
  useEffect(() => {
    const backAction = () => {
      Alert.alert('알림', '앱을 종료하시겠습니까?', [
        {
          text: '취소',
          onPress: () => null,
          style: 'cancel',
        },
        { text: '확인', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    if (isSplash) {
      setTimeout(() => {
        setIsSplash(false);
      }, 1500);
    }
  }, [isSplash]);

  return (
    <React.Fragment>
      <GlobalContextProvider>
        <ThemeProvider theme={theme}>
          {isSplash ? (
            <SplashScreen />
          ) : (
            <>
              <NavigationContainer theme={navigationTheme}>
                <DrawerStack />
              </NavigationContainer>
            </>
          )}
        </ThemeProvider>
      </GlobalContextProvider>
    </React.Fragment>
  );
};

export default App;
