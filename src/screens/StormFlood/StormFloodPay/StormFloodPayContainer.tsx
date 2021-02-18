import { useInput } from '@app/hooks';
import { EmptyLayout } from '@app/layout';
import React from 'react';
import { Alert } from 'react-native';
import StormFloodPayPresenter from './StormFloodPayPresenter';
export default function StormFloodPayContainer({
  state,
  onChangeState,
  handleNextButton,
  onClickTermsModalOpen,
  handlePreviousButton,
}) {
  const inputState = {
    card1: useInput(''),
    card2: useInput(''),
    card3: useInput(''),
    card4: useInput(''),
    cardYear: useInput(''),
    cardMonth: useInput(''),
    birthDay: useInput(''),
    pw: useInput(''),
  };
  const checkInput = () => {
    const cardNumber =
      inputState.card1.value + inputState.card2.value + inputState.card3.value + inputState.card4.value;
    const cardYearAndMonth = inputState.cardYear.value + inputState.cardMonth.value;
    if (state.selectCard === '') {
      Alert.alert('알림', '카드사를 선택해주세요.');
      return false;
    } else if (cardNumber.length !== 16) {
      Alert.alert('알림', '카드번호를 입력해주세요.');
      return false;
    } else if (cardYearAndMonth.length !== 4) {
      Alert.alert('알림', '카드유효기간을 입력해주세요.');
      return false;
    } else if (inputState.birthDay.value === '') {
      Alert.alert('알림', '생년월일/사업자번호를 입력해주세요.');
      return false;
    } else if (inputState.pw.value.length !== 2) {
      Alert.alert('알림', '카드비밀번호 앞2자리를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

  const selectCard = (name) => {
    onChangeState('selectCard', name);
  };

  const nextButton = () => {
    handleNextButton();
  };
  if (state.stepNumber === 9) {
    return (
      <StormFloodPayPresenter
        state={state}
        nextButton={nextButton}
        onChangeState={onChangeState}
        handlePreviousButton={handlePreviousButton}
        onClickTermsModalOpen={onClickTermsModalOpen}
        inputState={inputState}
        selectCard={selectCard}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
