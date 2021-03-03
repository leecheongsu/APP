import React, { useEffect, useState } from 'react';
import ElectronicSignPresenter from '@app/screens/StormFlood/ElectronicSign/ElectronicSignPresenter';
import { insuApis } from '@app/api/Insurance';
import { useGlobalState } from '@app/context';
import { Alert, Keyboard, Platform, StatusBar } from 'react-native';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';

type ElectronicSignContainerTypes = {
  state: StormFloodStateTypes;
  onChangeState: (name: StormFloodName, value: any) => void;
  open: boolean;
  close: () => void;
  url: any;
};

export default function ElectronicSignContainer({
  state,
  open,
  close,
  url,
  onChangeState,
}: ElectronicSignContainerTypes) {
  const globalState = useGlobalState();
  const [loading, setLoading] = useState(false);
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

  return (
    <ElectronicSignPresenter
      loading={loading}
      setLoading={setLoading}
      open={open}
      close={close}
      onMessage={onMessage}
      url={url}
      onNavigationStateChange={onNavigationStateChange}
      iosJs={iosJs}
      androidJs={androidJs}
    />
  );
}
