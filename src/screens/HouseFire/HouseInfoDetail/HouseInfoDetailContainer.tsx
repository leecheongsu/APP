import { DefaultAlert } from '@app/components';
import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import HouseInfoDetailPresenter from './HouseInfoDetailPresenter';

export default function HouseInfoDetailContainer({
  state,
  onChangeState,
  inputState,
  handleSelectDong,
  handleSelectDetail,
  submitAddressDetail,
}) {
  //안드로이드 백버튼 핸들러
  useEffect(() => {
    const backAction = () => {
      onChangeState('isDetailModal', false);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);
  return (
    <HouseInfoDetailPresenter
      state={state}
      onChangeState={onChangeState}
      inputState={inputState}
      handleSelectDong={handleSelectDong}
      handleSelectDetail={handleSelectDetail}
      submitAddressDetail={submitAddressDetail}
    />
  );
}
