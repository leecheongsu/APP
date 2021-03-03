import React, { useEffect, useRef, useState } from 'react';
import { userApis } from '@app/api/User';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { handleApiError, setStoreData } from '@app/lib';
import { ProfileInputTypes, ProfileStateName, ProfileStateTypes } from '@app/screens/Profile/ProfileContainer';
import UserInfoPresenter from '@app/screens/Profile/UserInfo/UserInfoPresenter';
import Toast from 'react-native-simple-toast';

type UserInfoContainerTypes = {
  state: ProfileStateTypes;
  inputState: ProfileInputTypes;
  onChangeState: (name: ProfileStateName, value: any) => void;
  onValueChange: (value: any) => void;
};

export default function UserInfoContainer({ state, inputState, onChangeState, onValueChange }: UserInfoContainerTypes) {
  const sexRef: any = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const phoneCheck = /^\d{3}\d{3,4}\d{4}$/;
  const juminFront = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;
  const checkInput = () => {
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
  };

  const handleChangeButton = () => {
    if (checkInput()) {
      const params = {
        name: inputState.name.value,
        teltype: state.selectService,
        mobile: inputState.phone.value,
        jumina: inputState.idNumber.value,
        sex: inputState.sexNumber.value,
      };
      const existData = {
        name: globalState.user?.name,
        teltype: globalState.user?.teltype,
        mobile: globalState.user?.mobile,
        jumina: globalState.user?.jumina,
        sex: globalState.user?.sex,
      };
      const newUserInfo = {
        ...globalState?.user,
        name: inputState.name.value,
        teltype: state.selectService,
        mobile: inputState.phone.value,
        jumina: inputState.idNumber.value,
        sex: inputState.sexNumber.value,
      };
      if (JSON.stringify(params) === JSON.stringify(existData)) {
        Toast.show('기본정보가 변경 되었습니다.');
      } else {
        userApis
          .putChangeUserInfo(globalState?.user?.email, params)
          .then((res) => {
            if (res.data === 'OK') {
              setStoreData('user', newUserInfo);
              globalDispatch({ type: 'CHANGE', name: 'user', value: newUserInfo });
              Toast.show('기본정보가 변경되었습니다.');
            }
          })
          .catch((e) => {
            handleApiError(e.response);
            onChangeState('loading', false);
          });
      }
    }
  };

  useEffect(() => {
    onChangeState('selectService', globalState.user?.teltype);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserInfoPresenter
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      state={state}
      inputState={inputState}
      handleChangeButton={handleChangeButton}
      onValueChange={onValueChange}
      sexRef={sexRef}
    />
  );
}
