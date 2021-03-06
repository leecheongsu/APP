import React from 'react';
import PasswordFormPresenter from '@app/screens/Join/PasswordForm/PasswordFormPresenter';
import { individualTerms, useTermsHtml } from '@app/lib/html';
import Toast from 'react-native-simple-toast';
import { JoinStateName, JoinStateTypes } from '@app/screens/Join/JoinContainer';
import { InputTypes } from '@app/types';

type PasswordFormContainerTypes = {
  state: JoinStateTypes;
  onChangeState: (name: JoinStateName, value: any) => void;
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
  handlePreviousButton: () => void;
  handlePostJoin: () => void;
};

export default function PasswordFormContainer({
  state,
  onChangeState,
  inputState,
  handlePreviousButton,
  handlePostJoin,
}: PasswordFormContainerTypes) {
  //비밀번호 체크 로직
  const checkPassword = () => {
    const pattern1 = /[0-9]/;
    const pattern2 = /[a-zA-Z]/;
    const pattern3 = /[~!@\#$%<>^&*]/;
    const pw = inputState.password.value;
    if (pw === '') {
      Toast.show('비밀번호를 입력하세요.');
      return false;
    } else if (!pattern1.test(pw) || !pattern2.test(pw) || !pattern3.test(pw) || pw.length < 8 || pw.length > 50) {
      Toast.show('영문+숫자+특수기호 8자리 이상으로 구성하여야 합니다.');
      return false;
    } else if (pw !== inputState.passwordConfirm.value) {
      Toast.show('확인된 비밀번호가 틀립니다.');
      return false;
    } else if (!state.isAgreeIndividualTerms) {
      Toast.show('개인정보 처리방침에 동의해주세요.');
    } else if (!state.isAgreeUseTerms) {
      Toast.show('이용약관에 동의해주세요.');
    } else {
      return true;
    }
  };

  //모달안의 확인버튼 핸들러
  const handleClickInModal = () => {
    onChangeState('termsModal', false);
    switch (state.selectTermsModal) {
      case 'individual':
        return onChangeState('isAgreeIndividualTerms', true);
      case 'useTerms':
        return onChangeState('isAgreeUseTerms', true);
    }
  };

  //개인정보 처리방침 버튼
  const handleIndividualButtonClick = () => {
    if (state.isAgreeIndividualTerms) {
      onChangeState('isAgreeIndividualTerms', false);
    } else {
      onChangeState('termsModal', true);
      onChangeState('selectTermsModal', 'individual');
      onChangeState('termsHtml', individualTerms());
    }
  };

  //이용약관 버튼
  const handleUseTermsButtonClick = () => {
    if (state.isAgreeUseTerms) {
      onChangeState('isAgreeUseTerms', false);
    } else {
      onChangeState('termsModal', true);
      onChangeState('selectTermsModal', 'useTerms');
      // eslint-disable-next-line react-hooks/rules-of-hooks
      onChangeState('termsHtml', useTermsHtml());
    }
  };

  const nextButton = () => {
    if (checkPassword()) {
      handlePostJoin();
    }
  };

  return (
    <PasswordFormPresenter
      state={state}
      onChangeState={onChangeState}
      inputState={inputState}
      handleIndividualButtonClick={handleIndividualButtonClick}
      handleUseTermsButtonClick={handleUseTermsButtonClick}
      handleClickInModal={handleClickInModal}
      nextButton={nextButton}
      handlePreviousButton={handlePreviousButton}
    />
  );
}
