import React from 'react';
import { EmptyLayout } from '@app/layout';
import StormFloodFinalPresenter from './StormFloodFinalPresenter';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { handleApiError } from '@app/lib';
import RNFetchBlob from 'rn-fetch-blob';
import { useNavigation } from '@react-navigation/native';

export default function StormFloodFinalContainer({
  state,
  onChangeState,
  handleNextButton,
  onClickTermsModalOpen,
  handlePreviousButton,
}) {
  const navigation = useNavigation();
  const nextButton = () => {
    navigation.goBack();
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
        onClickTermsModalOpen={onClickTermsModalOpen}
        downloadfileButton={downloadfileButton}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
