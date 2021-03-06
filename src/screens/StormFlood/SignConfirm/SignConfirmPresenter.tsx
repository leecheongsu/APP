import React from 'react';
import { BottomFixButton, FocusAwareStatusBar, Loading, OverayLoading, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import { Platform, View } from 'react-native';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';
import { StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';

type SignConfirmPresenterTypes = {
  state: StormFloodStateTypes;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  close: () => void;
  onMessage: (e: any) => void;
  onNavigationStateChange: (navState: any) => void;
  runFirst: any;
  onClick: () => void;
};

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

function SignConfirmPresenter({
  state,
  open,
  loading,
  setLoading,
  onMessage,
  runFirst,
  onNavigationStateChange,
  onClick,
  close,
}: SignConfirmPresenterTypes) {
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

export default SignConfirmPresenter;
