import React, { useEffect } from 'react';
import HouseContractTermsPresenter from './HouseContractTermsPresenter';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { EmptyLayout } from '@app/layout';
import { HouseFireStateName, HouseFireStateTypes, TermsNames } from '@app/screens/HouseFire/HouseFireContainer';

type HouseContractTermsContainerTypes = {
  state: HouseFireStateTypes;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  handlePreviousButton: () => void;
  handleNextButton: () => void;
  onChangeTermsState: (name: TermsNames, value: any) => void;
  onClickTermsModalAgree: () => void;
  onClickTermsModalOpen: (name: any, html: any) => void;
  onClickAllCheck: (list: any, isActive: any) => void;
};

export default function HouseContractTermsContainer({
  state,
  onChangeState,
  handlePreviousButton,
  handleNextButton,
  onChangeTermsState,
  onClickTermsModalAgree,
  onClickTermsModalOpen,
  onClickAllCheck,
}: HouseContractTermsContainerTypes) {
  const navigation = useNavigation();
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();

  const submitNextButton = () => {
    const isChecked =
      state.terms.TERMSD_1.isChecked === 1 &&
      state.terms.TERMSD_2.isChecked === 1 &&
      state.terms.TERMSD_3.isChecked === 1 &&
      state.terms.TERMSC_1.isChecked === 1 &&
      state.terms.TERMSC_2.isChecked === 1 &&
      state.terms.TERMSC_3.isChecked === 1 &&
      state.terms.TERMSC_4.isChecked === 1 &&
      state.terms.TERMSC_5.isChecked === 1 &&
      state.terms.TERMSA_5.isChecked === 1 &&
      state.terms.TERMSE_1.isChecked === 1 &&
      state.terms.TERMSE_2.isChecked === 1 &&
      state.terms.TERMSE_3.isChecked === 1 &&
      state.terms.TERMSF_1.isChecked === 1;
    if (!isChecked) {
      Toast.show('필수동의사항에 동의해주세요.');
    } else if (state.terms.TERMSG_1.isChecked === 0) {
      Toast.show('전자서명에 대체에 동의해주세요');
    } else {
      if (globalState.isIdentityverification) {
        handleNextButton();
      } else {
        globalDispatch({ type: 'CHANGE', name: 'insuType', value: 'home' });
        navigation.navigate('VERIFICATION');
      }
    }
  };

  const buttonTermsPdf = (name) => {
    if (state?.terms?.[name]?.isChecked === 1) {
      onChangeTermsState(name, 0);
    } else {
      onChangeState('termsName', name);
      onChangeState('termsPdf', true);
    }
  };

  useEffect(() => {
    if (globalState?.isIdentityverification) {
      handleNextButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState?.isIdentityverification]);

  if (state.stepNumber === 10) {
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
        buttonTermsPdf={buttonTermsPdf}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
