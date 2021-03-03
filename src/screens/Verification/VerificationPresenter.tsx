import React from 'react';
import { FocusAwareStatusBar, Loading, OverayLoading } from '@app/components';
import WebView from 'react-native-webview';

type VerificationPresenterTypes = {
  loading: boolean;
  html: any;
  onMessage: (e: any) => void;
  handleLoading: (e: any) => void;
};

function VerificationPresenter({ loading, html, onMessage, handleLoading }: VerificationPresenterTypes) {
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <OverayLoading visible={loading} />
      <WebView
        style={{ height: 100 }}
        source={{
          html,
        }}
        onMessage={onMessage}
        originWhitelist={'["*"]'}
        renderLoading={() => <Loading />}
        onNavigationStateChange={(e) => handleLoading(e)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        scrollEnabled={false}
      />
    </>
  );
}

export default VerificationPresenter;
