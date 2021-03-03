import React from 'react';
import { userApis } from '@app/api/User';
import { handleApiError, setStoreData } from '@app/lib';
import { individualTerms, useTermsHtml } from '@app/lib/html';
import { ProfileInputTypes, ProfileStateTypes, ProfileStateName } from '@app/screens/Profile/ProfileContainer';
import Toast from 'react-native-simple-toast';
import PasswordInfoPresenter from '@app/screens/Profile/PasswordInfo/PasswordInfoPresenter';

type PasswordInfoContainerTypes = {
  state: ProfileStateTypes;
  inputState: ProfileInputTypes;
  onChangeState: (name: ProfileStateName, value: any) => void;
};

export default function PasswordInfoContainer({ state, inputState, onChangeState }: PasswordInfoContainerTypes) {
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
    } else {
      return true;
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

  const handleChangeButton = () => {
    if (checkPassword()) {
      onChangeState('loading', true);
      const email = inputState.email.value;
      const params = {
        teltype: state.selectService,
        mobile: inputState.phone.value,
        newPwd: inputState.password.value,
      };
      userApis
        .putChangeUserPassword(email, params)
        .then((res) => {
          if (res.status === 200) {
            Toast.show('비밀번호가 변경되었습니다.');
            setStoreData('password', inputState.password);
            onChangeState('loading', false);
          }
          onChangeState('loading', false);
        })
        .catch((e) => {
          handleApiError(e.response);
          onChangeState('loading', false);
        });
    }
  };
  return (
    <PasswordInfoPresenter
      state={state}
      onChangeState={onChangeState}
      inputState={inputState}
      handleIndividualButtonClick={handleIndividualButtonClick}
      handleUseTermsButtonClick={handleUseTermsButtonClick}
      handleClickInModal={handleClickInModal}
      handleChangeButton={handleChangeButton}
    />
  );
}
