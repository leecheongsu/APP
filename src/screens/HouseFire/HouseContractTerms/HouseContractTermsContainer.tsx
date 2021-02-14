import React, { useEffect } from 'react';
import HouseContractTermsPresenter from './HouseContractTermsPresenter';
import Toast from 'react-native-simple-toast';
import { priceDot } from '@app/lib';
import { useNavigation } from '@react-navigation/native';
import { useGlobalState } from '@app/context';
import { EmptyLayout } from '@app/layout';

export default function HouseContractTermsContainer({
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
  const globalState = useGlobalState();
  const selectInsu = state?.selectAddress?.premiums?.filter((item) => {
    return item.aply_yn === 'Y';
  });

  const submitNextButton = () => {
    const isChecked =
      state.terms.TERMSC_1.isChecked === 1 &&
      state.terms.TERMSC_2.isChecked === 1 &&
      state.terms.TERMSC_3.isChecked === 1 &&
      state.terms.TERMSC_4.isChecked === 1 &&
      state.terms.TERMSC_5.isChecked === 1 &&
      state.terms.TERMSA_5.isChecked === 1 &&
      state.terms.TERMSE_1.isChecked === 1 &&
      state.terms.TERMSE_2.isChecked === 1 &&
      state.terms.TERMSE_3.isChecked === 1;
    if (!isChecked) {
      Toast.show('필수동의사항에 동의해주세요.');
    } else if (state?.selectType === 'T' && state.terms.TERMSF_1.isChecked === 0) {
      Toast.show('필수동의사항에 동의해주세요.');
    } else if (state.terms.TERMSG_1.isChecked === 0) {
      Toast.show('전자서명에 대체에 동의해주세요');
    } else {
      if (globalState.isIdentityverification) {
        handleNextButton();
      } else {
        navigation.navigate('VERIFICATION');
      }
    }
  };

  useEffect(() => {
    if (globalState?.isIdentityverification) {
      handleNextButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState?.isIdentityverification]);

  if (state.stepNumber === 9) {
    return (
      <HouseContractTermsPresenter
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
