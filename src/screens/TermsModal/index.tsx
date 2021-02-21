import React, { useEffect } from 'react';
import { BackButton, BottomFixButton, CloseButton, FocusAwareStatusBar } from '@app/components';
import styled from '@app/style/typed-components';
import WebView from 'react-native-webview';
import Modal from 'react-native-modal';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import { BackHandler, Platform } from 'react-native';
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
const BackButtonBox = styled.View``;

export default function TermsModal({ open, close, html, onPress, isButton = true, buttonTitle = '동의' }) {
  //안드로이드 백버튼 핸들러
  useEffect(() => {
    const backAction = () => {
      close();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Modal isVisible={open} style={{ padding: 0, margin: 0 }}>
        <ContentsBox>
          <Header>
            <BackButtonBox>
              <CloseButton onPress={() => close()} />
            </BackButtonBox>
          </Header>
          <WebView
            source={{
              html,
              baseUrl: 'web/',
            }}
            originWhitelist={'["*"]'}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={true}
          />
        </ContentsBox>
        {isButton && (
          <BottomFixButton
            index={1}
            rightTitle={buttonTitle}
            bottomRightPress={() => onPress()}
            bottomLeftPress={() => null}
          />
        )}
      </Modal>
    </>
  );
}
