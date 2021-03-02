import { useGlobalDispatch, useGlobalState } from '@app/context';
import { EmptyLayout } from '@app/layout';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import SimpleToast from 'react-native-simple-toast';
import StormFloodTermsPresenter from './StormFloodTermsPresenter';
export default function StormFloodTermsContainer({
  state,
  onChangeState,
  handleNextButton,
  onClickTermsModalOpen,
  handlePreviousButton,
  termsChange,
  onClickAllCheck,
  onClickTermsModalAgree,
}) {
  const navigation = useNavigation();
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const checked =
    state?.terms?.termsd1?.isChecked === 1 &&
    state?.terms?.termsd2?.isChecked === 1 &&
    state?.terms?.termsd3?.isChecked === 1 &&
    state?.terms?.termse1?.isChecked === 1 &&
    state?.terms?.termse2?.isChecked === 1 &&
    state?.terms?.termse3?.isChecked === 1 &&
    state?.terms?.termse4?.isChecked === 1 &&
    state?.terms?.termse5?.isChecked === 1 &&
    state?.terms?.termsf1?.isChecked === 1 &&
    state?.terms?.termsf2?.isChecked === 1 &&
    state?.terms?.termsf3?.isChecked === 1 &&
    state?.terms?.termsf4?.isChecked === 1;

  const nextButton = () => {
    if (!checked) {
      SimpleToast.show('모든 약관에 동의해주세요.');
    } else {
      globalDispatch({ type: 'CHANGE', name: 'insuType', value: 'ww' });
      navigation.navigate('VERIFICATION');
    }
  };

  const buttonTermsPdf = (name) => {
    if (state?.terms?.[name]?.isChecked === 1) {
      termsChange(name, 0);
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
  if (state.stepNumber === 8) {
    return (
      <StormFloodTermsPresenter
        state={state}
        nextButton={nextButton}
        termsChange={termsChange}
        onChangeState={onChangeState}
        handlePreviousButton={handlePreviousButton}
        onClickTermsModalOpen={onClickTermsModalOpen}
        onClickAllCheck={onClickAllCheck}
        onClickTermsModalAgree={onClickTermsModalAgree}
        buttonTermsPdf={buttonTermsPdf}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
