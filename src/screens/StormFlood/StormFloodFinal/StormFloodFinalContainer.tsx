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
