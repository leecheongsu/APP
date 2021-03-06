import React from 'react';
import { BottomFixButton, CloseButton, FocusAwareStatusBar } from '@app/components';
import { screenHeight, screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';

type TermsModalPresenterTypes = {
  open: boolean;
  close: () => void;
  html: any;
  onPress: () => void;
  isButton: boolean;
  buttonTitle: string;
};

const styles = StyleSheet.create({
  iphonePadding: {
    ...ifIphoneX({
      height: 40,
    }),
  },
  iphoneTop: {
    ...ifIphoneX({
      top: 50,
    }),
  },
});

const ContentsBox = styled.View`
  width: ${screenWidth()}px;
  height: 100%;
`;
const CloseButtonBox = styled.View`
  border-bottom-width: 0px;
  align-items: flex-end;
  position: absolute;
  top: ${screenHeight() / 28}px;
  right: 0px;
  z-index: 999;
`;
const BackButtonBox = styled.View``;
const PaddingBox = styled.View`
  height: ${screenHeight() / 50}px;
  background-color: ${theme.color.WHITE};
`;

function TermsModalPresenter({ open, close, html, onPress, isButton, buttonTitle }: TermsModalPresenterTypes) {
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Modal isVisible={open} style={{ padding: 0, margin: 0 }} onBackButtonPress={() => close()}>
        <CloseButtonBox style={styles.iphoneTop}>
          <BackButtonBox>
            <CloseButton onPress={() => close()} />
          </BackButtonBox>
        </CloseButtonBox>
        <ContentsBox>
          <PaddingBox style={styles.iphonePadding} />
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
export default TermsModalPresenter;
