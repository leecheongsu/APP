import React, { useEffect, useState } from 'react';
import { FocusAwareStatusBar, FullLabel, Loading, MyInsuCard, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { Alert, BackHandler, Image, PermissionsAndroid, Platform } from 'react-native';
import { insuIcon } from '@app/assets';
import theme from '@app/style/theme';
import { userApis } from '@app/api/User';
import { handleApiError } from '@app/lib';
import RNFetchBlob from 'rn-fetch-blob';
import { useNavigation } from '@react-navigation/native';
import { PROD_URL } from '@env';
const Container = styled.ScrollView``;
const CountBox = styled.View`
  padding: 30px 15px;
`;
const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RowItem = styled.View``;

const CardBox = styled.View`
  padding: 0px 15px 100px;
  background-color: ${theme.color.GRAY2};
`;

const EmptyBox = styled.View`
  align-items: center;
  justify-content: center;
  height: 200px;
`;

export default function MyInsu() {
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
      fileCache: false,
      appendExt: 'pdf',
      path: `${dirs.DownloadDir}/보험증권.pdf`,
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
          RNFetchBlob.ios.previewDocument(res.path());
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
      fileCache: false,
      appendExt: 'pdf',
      path: `${dirs.DownloadDir}/보험약관.pdf`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: '보험약권.pdf',
        mime: 'application/pdf',
        path: `${dirs.DownloadDir}/보험약관.pdf`,
      },
    })
      .fetch('GET', `${PROD_URL}/files/ins_terms.pdf`, {})
      .then((res) => {
        setLoading(false);
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(res.path(), res.data, 'base64');
          RNFetchBlob.ios.previewDocument(res.path());
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

  //안드로이드 백버튼 핸들러
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    getMyInsu();
  }, []);
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      {loading ? (
        <Loading height={500} />
      ) : (
        <Container>
          <FullLabel title={`내 보험 에서는 내가 가입한 보험 정보를${'\n'}확인하실 수 있습니다.`} />
          <CountBox>
            <RowBox>
              <RowItem>
                <RowBox>
                  <RowItem>
                    <Image source={insuIcon.MY_LIST} />
                  </RowItem>
                  <RowItem style={{ marginLeft: 10 }}>
                    <Typhograph type="NOTO" color="BLUE" weight="BOLD">
                      총 보험 계약수
                    </Typhograph>
                  </RowItem>
                </RowBox>
              </RowItem>
              <RowItem>
                <Typhograph type="ROBOTO" color="SKYBLUE">
                  {data?.length}{' '}
                  <Typhograph type="ROBOTO" color="BLACK2">
                    건
                  </Typhograph>
                </Typhograph>
              </RowItem>
            </RowBox>
          </CountBox>
          {data?.length === 0 ? (
            <EmptyBox>
              <Typhograph type="NOTO" color="GRAY" style={{ textAlign: 'center' }}>
                계약한 보험이 없습니다.
              </Typhograph>
            </EmptyBox>
          ) : (
            <CardBox>
              {data?.map((item) => {
                return <MyInsuCard item={item} downloadfileButton={downloadfileButton} loading={loading} />;
              })}
            </CardBox>
          )}
        </Container>
      )}
    </>
  );
}
