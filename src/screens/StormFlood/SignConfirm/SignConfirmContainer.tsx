import React, { useEffect, useState } from 'react';
import SignConfirmPresenter from '@app/screens/StormFlood/SignConfirm/SignConfirmPresenter';
import { Keyboard, StatusBar } from 'react-native';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';

type SignConfirmContainerTypes = {
  state: StormFloodStateTypes;
  onChangeState: (name: StormFloodName, value: any) => void;
  open: boolean;
  close: () => void;
  url: any;
  onClick: () => void;
};

export default function SignConfirmContainer({ state, open, close, onClick }: SignConfirmContainerTypes) {
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
    <SignConfirmPresenter
      state={state}
      open={open}
      loading={loading}
      setLoading={setLoading}
      onMessage={onMessage}
      runFirst={runFirst}
      onNavigationStateChange={onNavigationStateChange}
      onClick={onClick}
      close={close}
    />
  );
}
