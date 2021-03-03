import React, { useState } from 'react';
import SecessionPresenter from '@app/screens/Profile/Secession/SecessionPresenter';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { userApis } from '@app/api/User';
import SimpleToast from 'react-native-simple-toast';
import { clearStoreData, handleApiError } from '@app/lib';
import { useNavigation } from '@react-navigation/native';

export default function SecessionContainer() {
  const navigation = useNavigation();
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const [isAgree, setIsAgree] = useState(false);

  const handleClickButton = () => {
    setIsAgree(!isAgree);
  };

  const handleSubmitButton = () => {
    if (isAgree) {
      const email = globalState.user?.email;
      userApis
        .putSecession(email)
        .then((res) => {
          if (res.status === 200) {
            SimpleToast.show('탈퇴처리가 완료되었습니다.');
            globalDispatch({ type: 'RESET' });
            clearStoreData();
            navigation.navigate('MAIN_STACK');
          }
        })
        .catch((e) => {
          handleApiError(e.response);
        });
    } else {
      SimpleToast.show('동의후 탈퇴 가능합니다.');
    }
  };
  return (
    <SecessionPresenter
      isAgree={isAgree}
      handleClickButton={handleClickButton}
      handleSubmitButton={handleSubmitButton}
    />
  );
}
