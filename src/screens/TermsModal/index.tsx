import React from 'react';
import { BackButton, BottomFixButton, CustomButton, FocusAwareStatusBar, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import WebView from 'react-native-webview';
import Modal from 'react-native-modal';
import { screenHeight, screenWidth } from '@app/lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '@app/style/theme';
import { Platform } from 'react-native';
const ContentsBox = styled.View`
  width: ${screenWidth()}px;
  height: 100%;
`;
const Header = styled.View`
  padding: ${Platform.OS === 'ios' ? '50px 10px 0px 10px' : '10px 10px 10px 10px'};
  background-color: ${theme.color.WHITE};
  border-bottom-width: 0px;
`;
const BackButtonBox = styled.View``;

export default function TermsModal({ open, close, html, onPress }) {
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Modal isVisible={open} style={{ padding: 0, margin: 0 }}>
        <ContentsBox>
          <Header>
            <BackButtonBox>
              <BackButton onPress={() => close()} />
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
        <BottomFixButton index={1} rightTitle="동의" bottomRightPress={() => onPress()} bottomLeftPress={() => null} />
      </Modal>
    </>
  );
}
