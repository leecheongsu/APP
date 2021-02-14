import React from 'react';
import HouseConfirmPresenter from './HouseConfirmPresenter';
import Toast from 'react-native-simple-toast';
import { priceDot } from '@app/lib';
import { EmptyLayout } from '@app/layout';

export default function HouseTermsUseContainer({
  state,
  onChangeState,
  handlePreviousButton,
  handleNextButton,
  onChangeTermsState,
  onClickTermsModalAgree,
  onClickTermsModalOpen,
  onClickAllCheck,
  resultBuildPrice,
  resultGajePrice,
}) {
  const insuPrice = priceDot(resultBuildPrice() + resultGajePrice());
  const selectInsu = state?.selectAddress?.premiums?.filter((item) => {
    return item.aply_yn === 'Y';
  });
  const submitNextButton = () => {
    const isChecked =
      state.terms.TERMSA_1.isChecked === 1 &&
      state.terms.TERMSA_2.isChecked === 1 &&
      state.terms.TERMSA_3.isChecked === 1 &&
      state.terms.TERMSA_4.isChecked === 1;
    if (!isChecked) {
      Toast.show('필수동의사항에 동의해주세요.');
    } else {
      handleNextButton();
    }
  };

  if (state.stepNumber === 8) {
    return (
      <HouseConfirmPresenter
        state={state}
        submitNextButton={submitNextButton}
        handlePreviousButton={handlePreviousButton}
        onChangeTermsState={onChangeTermsState}
        onChangeState={onChangeState}
        onClickTermsModalAgree={onClickTermsModalAgree}
        onClickTermsModalOpen={onClickTermsModalOpen}
        onClickAllCheck={onClickAllCheck}
        insuPrice={insuPrice}
        selectInsu={selectInsu}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
