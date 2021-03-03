import React from 'react';
import BusinessFormPresenter from '@app/screens/Join/BusinessForm/BusinessFormPresenter';
import SimpleToast from 'react-native-simple-toast';
import { JoinStateTypes } from '@app/screens/Join/JoinContainer';
import { InputTypes } from '@app/types';

type BusinessFormContaierTypes = {
  state: JoinStateTypes;
  inputState: {
    email: InputTypes;
    name: InputTypes;
    phone: InputTypes;
    idNumber: InputTypes;
    sexNumber: InputTypes;
    password: InputTypes;
    passwordConfirm: InputTypes;
    companyName: InputTypes;
    companyNumber: InputTypes;
  };
  handleNextButton: () => void;
  handlePreviousButton: () => void;
};

export default function BusinessFormContaier({
  state,
  inputState,
  handleNextButton,
  handlePreviousButton,
}: BusinessFormContaierTypes) {
  const checkInput = () => {
    if (inputState.companyName.value === '') {
      SimpleToast.show('상호명을 입력해주세요.');
      return false;
    } else if (inputState.companyNumber.value === '') {
      SimpleToast.show('사업자번호를 입력해주세요.');
      return false;
    } else if (inputState.companyNumber.value.length !== 10) {
      SimpleToast.show('올바른 사업자번호를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

  const nextButton = () => {
    if (checkInput()) {
      handleNextButton();
    }
  };
  return (
    <BusinessFormPresenter
      state={state}
      inputState={inputState}
      nextButton={nextButton}
      handlePreviousButton={handlePreviousButton}
    />
  );
}
