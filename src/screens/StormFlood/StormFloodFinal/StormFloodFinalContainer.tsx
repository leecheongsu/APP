import React from 'react';
import { EmptyLayout } from '@app/layout';
import StormFloodFinalPresenter from './StormFloodFinalPresenter';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import { userApis } from '@app/api/User';
import { getStoreData, handleApiError, setStoreData } from '@app/lib';

type StormFloodFinalContainerTypes = {
  state: StormFloodStateTypes;
  onChangeState: (name: StormFloodName, value: any) => void;
  handlePreviousButton: () => void;
};

export default function StormFloodFinalContainer({
  state,
  onChangeState,
  handlePreviousButton,
}: StormFloodFinalContainerTypes) {
  const navigation = useNavigation();
  const nextButton = async () => {
    const user: any = await getStoreData('user');
    const password = await getStoreData('password');
    const params = {
      id: user?.email,
      pwd: password,
    };
    userApis
      .postLogin(params)
      .then((res) => {
        if (res.status === 200) {
          setStoreData('user', res.data);
        }
        navigation.goBack();
      })
      .catch((e) => {
        handleApiError(e.response);
        navigation.goBack();
      });
  };

  const downloadfileButton = () => {
    Alert.alert('알림', '계약시 발송된 email을 확인해주세요.');
  };

  if (state.stepNumber === 10) {
    return (
      <StormFloodFinalPresenter
        state={state}
        nextButton={nextButton}
        onChangeState={onChangeState}
        handlePreviousButton={handlePreviousButton}
        downloadfileButton={downloadfileButton}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
