import React, { useState } from 'react';
import {
  BackButton,
  BottomFixButton,
  CloseButton,
  FocusAwareStatusBar,
  Loading,
  OverayLoading,
  Typhograph,
} from '@app/components';
import styled from '@app/style/typed-components';
import WebView from 'react-native-webview';
import Modal from 'react-native-modal';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import { Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const ContentsBox = styled.View`
  width: ${screenWidth()}px;
  height: 100%;
`;
const Header = styled.View`
  padding: ${Platform.OS === 'ios' ? '50px 0px 0px 0px' : '10px 0px 10px 10px'};
  background-color: ${theme.color.WHITE};
  border-bottom-width: 0px;
  align-items: center;
`;
const BackButtonBox = styled.View``;
const TitleBox = styled.View``;
export default function SignConfirm({ open, close, url, state, onClick }) {
  const onMessage = (e) => {
    if (e.nativeEvent.data === 'ok') {
      //   alert('본인인증에 성공하였습니다.');
      close();
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
  const [loading, setLoading] = useState(false);
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Modal isVisible={open} style={{ padding: 0, margin: 0 }}>
        <ContentsBox>
          <OverayLoading visible={loading} />
          <Header>
            <Typhograph type="NOTO">전자서명 확인하기</Typhograph>
          </Header>
          <View style={{ backgroundColor: 'white', height: 1000, padding: 20 }}>
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
