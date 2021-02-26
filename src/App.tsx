import React, { useEffect, useRef, useState } from 'react';
import { GlobalContextProvider } from '@app/context';
import theme, { navigationTheme } from '@app/style/theme';
import { Alert, AppState, BackHandler, LogBox, Text } from 'react-native';
import { ignoreWarningLists } from '@app/lib/util/ignoreWarningLists';
import { ThemeProvider } from '@app/style/typed-components';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from '@app/routes/DrawerStack';
import { getStoreData, setStoreData, clearStoreData } from '@app/lib';
import { userApis } from '@app/api/User';
import { SplashScreen } from '@app/screens';
import codePush from 'react-native-code-push';
import NetInfo from '@react-native-community/netinfo';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const global: { HermesInternal: null | {} };

LogBox.ignoreLogs(ignoreWarningLists);
//안드로이드 텍스트 크기설정
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [loading, setLoading] = useState(false);
  const [isSplash, setIsSplash] = useState(true);

  //앱상태 변화 state설정
  const _handleAppStateChange = async (nextAppState) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  //유저 토큰갱신
  const getTokenHandle = async () => {
    const user: any = await getStoreData('user');
    const password = await getStoreData('password');
    const isAutoLogin = await getStoreData('isAutoLogin');
    if (user !== null) {
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
        });
    }
  };

  //code push 설정
  const codePushSync = () => {
    codePush.sync({
      updateDialog: {
        //업데이트 다이얼로그 설정
        title: '새로운 업데이트가 존재합니다.',
        optionalUpdateMessage: '지금 업데이트하시겠습니까?',
        optionalIgnoreButtonLabel: '나중에',
        optionalInstallButtonLabel: '업데이트',
      },
      installMode: codePush.InstallMode.IMMEDIATE, //즉시 업데이트
    });
  };

  //앱 네트워크 상태체크 액션
  const unsubscribe = NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      Alert.alert('안내', '네트워크 연결이 일시적으로 원할하지 않습니다.데이터또는 wi-fi연결상태를 확인해주세요.');
    }
    console.log(state);
  });

  //앱상태
  useEffect(() => {
    if (appStateVisible === 'active') {
      getTokenHandle();
      codePushSync();
    }
  }, [appStateVisible]);

  //앱 네트워트상태 확인
  useEffect(() => {
    unsubscribe();
  }, []);

  //앱상태체크
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

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

  //스플래쉬 스크린
  useEffect(() => {
    if (!isSplash) {
      return;
    }
    const splashTimeOut = setTimeout(() => {
      setIsSplash(false);
    }, 5000);
    return () => clearTimeout(splashTimeOut);
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

// codepush 관련 옵션
const codePushOptions = {
  checkFrequency: [codePush.CheckFrequency.ON_APP_START, codePush.CheckFrequency.ON_APP_RESUME],
  installMode: codePush.InstallMode.IMMEDIATE,
};

export default App;
