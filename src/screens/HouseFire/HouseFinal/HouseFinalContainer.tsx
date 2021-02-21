import React from 'react';
import HouseFinalPresenter from './HouseFinalPresenter';
import { handleApiError, priceDot } from '@app/lib';
import { useNavigation } from '@react-navigation/native';
import { EmptyLayout } from '@app/layout';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

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
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: '보험 가입 증명원.pdf',
        mime: 'application/pdf',
        path: `${dirs.DownloadDir}/보험 가입 증명원.pdf`,
      },
    })
      .fetch('GET', 'https://insrb.com/download/MRHI1810_terms.pdf', {})
      .then((res) => {
        onChangeState('loading', false);
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(res.path(), res.data, 'base64');
          RNFetchBlob.ios.previewDocument(res.path());
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
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: '보험증권.pdf',
        mime: 'application/pdf',
        path: `${dirs.DownloadDir}/보험증권.pdf`,
      },
    })
      .fetch('GET', 'https://insrb.com/download/MRHI1810_terms.pdf', {})
      .then((res) => {
        onChangeState('loading', false);
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(res.path(), res.data, 'base64');
          RNFetchBlob.ios.previewDocument(res.path());
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
              title: 'Storage Permission Required',
              message: 'Application needs access to your storage to download File',
            });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Start downloading
              downloadFile1();
              console.log('파일다운로드 권한 허용');
            } else {
              // If permission denied then show alert
              Alert.alert('Error', 'Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
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
              title: 'Storage Permission Required',
              message: 'Application needs access to your storage to download File',
            });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Start downloading
              downloadFile2();
              console.log('파일다운로드 권한 허용');
            } else {
              // If permission denied then show alert
              Alert.alert('Error', 'Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
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

  if (state.stepNumber === 12) {
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
