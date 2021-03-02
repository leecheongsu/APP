import React from 'react';
import HouseFinalPresenter from './HouseFinalPresenter';
import { handleApiError, priceDot } from '@app/lib';
import { useNavigation } from '@react-navigation/native';
import { EmptyLayout } from '@app/layout';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { PROD_URL } from '@env';

export default function HouseFinalContainer({
  state,
  onChangeState,
  handlePreviousButton,
  handleNextButton,
  onChangeTermsState,
  onClickTermsModalAgree,
  onClickTermsModalOpen,
  onClickAllCheck,
  resultBuildPrice,
  resultGajePrice,
}) {
  const navigation = useNavigation();
  const insuPrice = priceDot(resultBuildPrice() + resultGajePrice());
  const selectInsu = state?.selectAddress?.premiums?.filter((item) => {
    return item.aply_yn === 'Y';
  });

  const downloadFile1 = () => {
    onChangeState('loading', true);
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'pdf',
      path: `${dirs.DocumentDir}/보험증권.pdf`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: '보험증권.pdf',
        mime: 'application/pdf',
        path: `${dirs.DownloadDir}/보험증권.pdf`,
      },
    })
      .fetch('GET', `${PROD_URL}/files/ins_condition.pdf`, {})
      .then((res) => {
        onChangeState('loading', false);
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(res.path(), res.data, 'base64');
          RNFetchBlob.ios.openDocument(res.path());
        }
      })
      .catch((e) => {
        onChangeState('loading', false);
        handleApiError(e.response);
      });
  };

  const downloadFile2 = () => {
    onChangeState('loading', true);
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'pdf',
      path: `${dirs.DocumentDir}/보험약관.pdf`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: '보험약관.pdf',
        mime: 'application/pdf',
        path: `${dirs.DownloadDir}/보험약관.pdf`,
      },
    })
      .fetch('GET', `${PROD_URL}/files/ins_terms.pdf`, {})
      .then((res) => {
        onChangeState('loading', false);
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(res.path(), res.data, 'base64');
          RNFetchBlob.ios.openDocument(res.path());
        }
      })
      .catch((e) => {
        onChangeState('loading', false);
        handleApiError(e.response);
      });
  };

  const downloadfileButton = async (name) => {
    switch (name) {
      case '보험증권': {
        if (Platform.OS === 'ios') {
          downloadFile1();
        } else {
          try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
              title: '저장 권한',
              message: '파일을 다운로드하려면 애플리케이션이 스토리지에 액세스해야합니다.',
            });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              downloadFile1();
            } else {
              Alert.alert('에러', '파일접근권한이 없습니다.');
            }
          } catch (err) {
            console.log('++++' + err);
          }
        }
        return null;
      }
      case '보험약관': {
        if (Platform.OS === 'ios') {
          downloadFile2();
        } else {
          try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
              title: '저장 권한',
              message: '파일을 다운로드하려면 애플리케이션이 스토리지에 액세스해야합니다.',
            });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              downloadFile2();
            } else {
              Alert.alert('에러', '파일접근권한이 없습니다.');
            }
          } catch (err) {
            console.log('++++' + err);
          }
        }
        return null;
      }
    }
  };

  const submitNextButton = () => {
    navigation.goBack();
  };

  if (state.stepNumber === 13) {
    return (
      <HouseFinalPresenter
        state={state}
        submitNextButton={submitNextButton}
        handlePreviousButton={handlePreviousButton}
        onChangeTermsState={onChangeTermsState}
        onChangeState={onChangeState}
        onClickTermsModalAgree={onClickTermsModalAgree}
        onClickTermsModalOpen={onClickTermsModalOpen}
        onClickAllCheck={onClickAllCheck}
        insuPrice={insuPrice}
        selectInsu={selectInsu}
        downloadfileButton={downloadfileButton}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
