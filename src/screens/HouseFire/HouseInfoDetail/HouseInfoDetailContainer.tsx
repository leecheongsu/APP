import { HouseFireStateName, HouseFireStateTypes, HouseInputState } from '@app/screens/HouseFire/HouseFireContainer';
import React from 'react';
import HouseInfoDetailPresenter from './HouseInfoDetailPresenter';

type HouseInfoDetailContainerTypes = {
  state: HouseFireStateTypes;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  inputState: HouseInputState;
  handleSelectDong: (value: any) => void;
  handleSelectDetail: (value: any) => void;
  submitAddressDetail: () => void;
};

export default function HouseInfoDetailContainer({
  state,
  onChangeState,
  inputState,
  handleSelectDong,
  handleSelectDetail,
  submitAddressDetail,
}: HouseInfoDetailContainerTypes) {
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
