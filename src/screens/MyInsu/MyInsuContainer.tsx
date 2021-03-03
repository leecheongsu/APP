import React, { useEffect, useState } from 'react';
import MyInsuPresenter from '@app/screens/MyInsu/MyInsuPresenter';
import { Alert, BackHandler, PermissionsAndroid, Platform } from 'react-native';
import { PROD_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import { handleApiError } from '@app/lib';
import { userApis } from '@app/api/User';

export default function MyInsuContainer() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getMyInsu = () => {
    setLoading(true);
    userApis
      .getMyInsu()
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
        setLoading(false);
      })
      .catch((e) => {
        handleApiError(e.response);
        setLoading(false);
      });
  };

  const downloadFile1 = () => {
    setLoading(true);
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
        setLoading(false);
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(res.path(), res.data, 'base64');
          RNFetchBlob.ios.openDocument(res.path());
        }
      })
      .catch((e) => {
        setLoading(false);
        handleApiError(e.response);
      });
  };

  const downloadFile2 = () => {
    setLoading(true);
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
        setLoading(false);
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(res.path(), res.data, 'base64');
          RNFetchBlob.ios.openDocument(res.path());
        }
      })
      .catch((e) => {
        setLoading(false);
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

  //안드로이드 백버튼 핸들러
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    getMyInsu();
  }, []);

  return <MyInsuPresenter loading={loading} data={data} downloadfileButton={downloadfileButton} />;
}
