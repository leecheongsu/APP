import React from 'react';
import { FocusAwareStatusBar, Loading, OverayLoading } from '@app/components';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { Platform } from 'react-native';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';

type ElectronicSignPresenterTypes = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  close: () => void;
  onMessage: (e: any) => void;
  url: any;
  onNavigationStateChange: (navState: any) => void;
  iosJs: any;
  androidJs: any;
};

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

function ElectronicSignPresenter({
  loading,
  setLoading,
  open,
  close,
  onMessage,
  url,
  onNavigationStateChange,
  iosJs,
  androidJs,
}: ElectronicSignPresenterTypes) {
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

export default ElectronicSignPresenter;
