import React, { useEffect, useRef } from 'react';
import BasicFormPresenter from '@app/screens/Join/BasicForm/BasicFormPresenter';
import Toast from 'react-native-simple-toast';
import { JoinStateName, JoinStateTypes } from '@app/screens/Join/JoinContainer';
import { InputTypes } from '@app/types';
import { useGlobalState } from '@app/context';

type BasicFormContainerTypes = {
  state: JoinStateTypes;
  onValueChange: (value: any) => void;
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
  handleNextButton: () => null | undefined;
  onChangeState: (name: JoinStateName, value: any) => void;
};

export default function BasicFormContainer({
  state,
  onValueChange,
  inputState,
  handleNextButton,
  onChangeState,
}: BasicFormContainerTypes) {
  const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const phoneCheck = /^\d{3}\d{3,4}\d{4}$/;
  const juminFront = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;
  const sexRef: any = useRef(null);
  const globalState = useGlobalState();

  //정보입력 체크
  const checkInput = () => {
    if (state.selectType === 'individual') {
      if (inputState.email.value === '') {
        Toast.show('이메일을 입력해주세요.');
        return false;
      } else if (!emailCheck.test(inputState.email.value)) {
        Toast.show('올바른 이메일 주소를 입력해주세요.');
      } else if (inputState.name.value === '') {
        Toast.show('이름을 입력하세요.');
        return false;
      } else if (inputState.phone.value === '') {
        Toast.show('휴대 전화번호를 입력해주세요.');
        return false;
      } else if (!phoneCheck.test(inputState.phone.value)) {
        Toast.show('올바른 휴대 전화번호를 입력해주세요.');
        return false;
      } else if (inputState.idNumber.value === '' || inputState.idNumber.value.length < 6) {
        Toast.show('주민등록번호 앞자리를 입력해주세요.');
        return false;
      } else if (!juminFront.test(inputState.idNumber.value) || Number(inputState.sexNumber.value) > 2) {
        Toast.show('올바른 주민등록번호를 입력해주세요.');
        return false;
      } else if (inputState.sexNumber.value === '') {
        Toast.show('주민등록번호 뒤 첫번째 자리를 입력해주세요.');
        return false;
      } else {
        return true;
      }
    } else {
      if (globalState.companyName == null) {
        if (inputState.companyName.value === '') {
          Toast.show('상호명을 입력해주세요.');
          return false;
        } else if (inputState.companyNumber.value === '') {
          Toast.show('사업자 번호를 입력해주세요.');
          return false;
        } else {
          inputState.companyName.value = globalState.companyName;
          inputState.companyNumber.value = globalState.companyNumber;
          return true;
        }
      } else {
        return true;
      }
    }
  };

  const nextButton = () => {
    if (checkInput()) {
      handleNextButton();
    }
  };

  const handleClickButton = (value) => {
    onChangeState('selectType', value);
  };

  useEffect(() => {
    if (state.selectType === 'individual' && inputState.idNumber.value.length === 6) {
      sexRef.current.focus();
    }
    globalState.companyName = null;
    globalState.companyNumber = null;
  }, [inputState.idNumber.value]);

  return (
    <BasicFormPresenter
      state={state}
      handleClickButton={handleClickButton}
      inputState={inputState}
      onValueChange={onValueChange}
      nextButton={nextButton}
      sexRef={sexRef}
    />
  );
}
