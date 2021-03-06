import React from 'react';
import { userApis } from '@app/api/User';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { handleApiError, setStoreData } from '@app/lib';
import BusinessInfoPresenter from '@app/screens/Profile/BusinessInfo/BusinessInfoPresenter';
import { ProfileInputTypes, ProfileStateName, ProfileStateTypes } from '@app/screens/Profile/ProfileContainer';
import Toast from 'react-native-simple-toast';

type BusinessInfoContainerTypes = {
  state: ProfileStateTypes;
  inputState: ProfileInputTypes;
  onChangeState: (name: ProfileStateName, value: any) => void;
};

export default function BusinessInfoContainer({ state, inputState, onChangeState }: BusinessInfoContainerTypes) {
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const checkInput = () => {
    if (inputState.companyName.value === '') {
      Toast.show('상호명을 입력해주세요.');
      return false;
    } else if (inputState.companyNumber.value === '') {
      Toast.show('사업자번호를 입력해주세요.');
      return false;
    } else if (inputState.companyNumber.value.length !== 10) {
      Toast.show('올바른 사업자번호를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

  const handleChangeButton = () => {
    if (checkInput()) {
      onChangeState('loading', true);
      const email = globalState?.user?.email;
      const params = {
        comname: inputState?.companyName?.value,
        businessnum: inputState?.companyNumber?.value,
        sosok: '',
      };
      const existData = {
        comname: globalState?.user?.companyName,
        businessnum: globalState?.user?.companyNumber,
        sosok: globalState?.user?.sosok,
      };
      const newUserInfo = {
        ...globalState?.user,
        comname: inputState?.companyName?.value,
        businessnum: inputState?.companyNumber?.value,
      };
      if (JSON.stringify(params) === JSON.stringify(existData)) {
        Toast.show('기본정보가 변경 되었습니다.');
      } else {
        userApis
          .putChangeBusinessInfo(email, params)
          .then((res) => {
            if (res.data === 'OK') {
              setStoreData('user', newUserInfo);
              globalDispatch({ type: 'CHANGE', name: 'user', value: newUserInfo });
              Toast.show('사업자정보가 수정되었습니다.');
            }
            onChangeState('loading', false);
          })
          .catch((e) => {
            handleApiError(e.response);
            onChangeState('loading', false);
          });
      }
    }
  };
  return <BusinessInfoPresenter state={state} inputState={inputState} handleChangeButton={handleChangeButton} />;
}
