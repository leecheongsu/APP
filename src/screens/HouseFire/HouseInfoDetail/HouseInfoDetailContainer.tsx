import React from 'react';
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
