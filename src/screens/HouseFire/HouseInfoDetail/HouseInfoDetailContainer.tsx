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
