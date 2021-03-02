import React, { useEffect, useState } from 'react';
import { FocusAwareStatusBar, Loading, OverayLoading } from '@app/components';
import styled from '@app/style/typed-components';
import WebView from 'react-native-webview';
import Modal from 'react-native-modal';
import { handleApiError, screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import { Alert, Keyboard, Platform, StatusBar } from 'react-native';
import { useGlobalState } from '@app/context';
import { insuApis } from '@app/api/Insurance';
const ContentsBox = styled.View`
  width: ${screenWidth()}px;
  height: 100%;
`;
const Header = styled.View`
  padding: ${Platform.OS === 'ios' ? '50px 0px 0px 0px' : '10px 0px 10px 10px'};
  background-color: ${theme.color.WHITE};
  border-bottom-width: 0px;
  align-items: flex-end;
`;

export default function ElectronicSign({ state, open, close, url, onClick, onChangeState }) {
  const globalState = useGlobalState();

  const postDenial = () => {
    const data = {
      user_id: globalState.user.email,
      quote_no: state?.selectAddress?.quote_no,
      reg_no: globalState.jumina + globalState.juminb,
    };
    insuApis
      .postDenial(data)
      .then((res) => {
        if (res.status === 200) {
          onChangeState('isSign', true);
        } else {
          onChangeState('isSign', false);
        }
      })
      .catch((e) => {
        onChangeState('isSign', false);
      });
  };

  const onMessage = (e) => {
    if (e.nativeEvent?.data === 'close') {
      if (e.nativeEvent?.title === '휴대폰 직접서명') {
        postDenial();
        close();
      } else {
        close();
        Platform.OS === 'android' && Alert.alert('알림', '이미 전자서명을 완료하였습니다. 전자서명을 확인하여주세요.');
      }
    }
  };

  const androidJs = `
    window.addEventListener("beforeunload", function (event) {
      event.preventDefault();
      window.ReactNativeWebView.postMessage("close");
    });
    document.querySelector(".blue").style.display = "none";
  `;

  const iosJs = `
      function btnClick(e){ window.ReactNativeWebView.postMessage("close"); }
      document.querySelector(".btnWrap a").addEventListener("click",btnClick);
      document.querySelector(".btnWrap span").addEventListener("click",btnClick);
      document.querySelector(".btnClose").addEventListener("click",btnClick);
      document.querySelector(".blue").style.display = "none";
      // window.addEventListener("beforeunload", function (event) {
      //   event.preventDefault();
      //   window.ReactNativeWebView.postMessage(event);
      // });
      window.ReactNativeWebView.postMessage("");
  `;

  const onNavigationStateChange = (navState) => {
    if (navState.canGoBack && navState.title === '휴대폰 직접서명' && Platform.OS === 'ios') {
      close();
      postDenial();
    }
  };

  //웹뷰에서 키보드 입력하면 status바 없어지는거 방지
  const _keyboardDidShow = () => {
    StatusBar.setBarStyle('dark-content');
  };

  const _keyboardDidHide = () => {
    StatusBar.setBarStyle('dark-content');
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [loading, setLoading] = useState(false);
  return (
    <>
      <OverayLoading visible={loading} />
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Modal isVisible={open} style={{ padding: 0, margin: 0 }} onBackButtonPress={() => close()}>
        <ContentsBox>
          <Header>
            {/* <BackButtonBox>
              <CloseButton onPress={() => close()} />
            </BackButtonBox> */}
          </Header>
          <WebView
            source={{
              uri: url,
            }}
            onMessage={onMessage}
            onNavigationStateChange={onNavigationStateChange}
            originWhitelist={'["*"]'}
            renderLoading={() => <Loading />}
            injectedJavaScript={Platform.OS === 'ios' ? iosJs : androidJs}
            javaScriptEnabled={true}
            onLoadStart={(e) => setLoading(e.nativeEvent.loading)}
            onLoadEnd={(e) => setLoading(e.nativeEvent.loading)}
            javaScriptEnabledAndroid={true}
            domStorageEnabled={true}
            scalesPageToFit={true}
            scrollEnabled={false}
          />
        </ContentsBox>
      </Modal>
    </>
  );
}
