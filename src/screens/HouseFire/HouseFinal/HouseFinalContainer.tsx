import React from 'react';
import HouseFinalPresenter from './HouseFinalPresenter';
import Toast from 'react-native-simple-toast';
import { priceDot } from '@app/lib';
import { useNavigation } from '@react-navigation/native';
import { EmptyLayout } from '@app/layout';

export default function HouseFinalContainer({
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
  const navigation = useNavigation();
  const insuPrice = priceDot(resultBuildPrice() + resultGajePrice());
  const selectInsu = state?.selectAddress?.premiums?.filter((item) => {
    return item.aply_yn === 'Y';
  });
  const submitNextButton = () => {
    navigation.goBack();
  };

  if (state.stepNumber === 11) {
    return (
      <HouseFinalPresenter
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
