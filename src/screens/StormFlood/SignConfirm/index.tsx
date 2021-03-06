import React, { useEffect, useState } from 'react';
import { BottomFixButton, FocusAwareStatusBar, Loading, OverayLoading, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import WebView from 'react-native-webview';
import Modal from 'react-native-modal';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import { Keyboard, Platform, StatusBar, View } from 'react-native';
const ContentsBox = styled.View`
  width: ${screenWidth()}px;
  height: 100%;
  background-color: ${theme.color.WHITE};
`;
const Header = styled.View`
  padding: ${Platform.OS === 'ios' ? '50px 0px 0px 0px' : '10px 0px 10px 10px'};
  background-color: ${theme.color.WHITE};
  border-bottom-width: 0px;
  align-items: center;
`;

export default function SignConfirm({ open, close, url, state, onClick }) {
  const [loading, setLoading] = useState(false);
  const onMessage = (e) => {
    if (e.nativeEvent.data === 'ok') {
      close();
      onClick();
    } else {
    }
  };
  const runFirst = `
      function btnClick(e){ window.ReactNativeWebView.postMessage("ok"); }
      document.querySelector(".btnClose").addEventListener("click",btnClick);
      document.querySelector(".blue").style.display = "none";
      document.querySelector(".btnWrap span").addEventListener("click",btnClick);
`;
  const onNavigationStateChange = (navState) => {
    if (navState.navigationType === 'backforward') {
      close();
      onClick();
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

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Modal isVisible={open} style={{ padding: 0, margin: 0 }} onBackButtonPress={() => close()}>
        <ContentsBox>
          <OverayLoading visible={loading} />
          <Header>
            <Typhograph type="NOTO">전자서명 확인하기</Typhograph>
          </Header>
          <View style={{ backgroundColor: 'white', height: 360, padding: 20 }}>
            <WebView
              source={{
                uri: state?.signData,
              }}
              style={{
                height: 500,
              }}
              onNavigationStateChange={onNavigationStateChange}
              onMessage={onMessage}
              originWhitelist={'["*"]'}
              renderLoading={() => <Loading />}
              injectedJavaScript={runFirst}
              javaScriptEnabled={true}
              onLoadStart={(e) => setLoading(e.nativeEvent.loading)}
              onLoadEnd={(e) => setLoading(e.nativeEvent.loading)}
              javaScriptEnabledAndroid={true}
              domStorageEnabled={true}
              scalesPageToFit={true}
              scrollEnabled={false}
            />
          </View>

          <BottomFixButton
            index={1}
            rightTitle={'확인'}
            bottomRightPress={() => {
              onClick();
              close();
            }}
            bottomLeftPress={() => null}
          />
        </ContentsBox>
      </Modal>
    </>
  );
}
