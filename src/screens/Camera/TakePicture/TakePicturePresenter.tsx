import React, { useState } from 'react';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import { View, Button } from 'react-native';
import styled from 'styled-components';
import CameraRoll from '@react-native-community/cameraroll';
import { Platform } from 'react-native';
import theme from '@app/style/theme';
import { screenHeight, screenWidth } from '@app/lib';
import { CameraStateName, CameraStateTypes } from '@screens/Camera/CameraContainer';
import { OverayLoading } from '@app/components';
import { insuApis } from '@app/api/Insurance';
import { useGlobalDispatch } from '@app/context';

type TakePicturePresenterTypes = {
  state: CameraStateTypes;
  onChangeState: (name: CameraStateName, value: any) => void;
  handleNextButton: () => void;
};

const Container = styled.View`
  background-color: ${theme.color.GRAY2};
  width: ${screenWidth()}px;
  height: ${screenHeight()}px;
`;

const check = async () => {
  try {
    const ios_camera = await request(PERMISSIONS.IOS.CAMERA);
    const ios_album = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    const andr_camera = await request(PERMISSIONS.ANDROID.CAMERA);

    if (Platform.OS === 'ios') {
      if (ios_camera === RESULTS.GRANTED || ios_album === RESULTS.GRANTED) {
        console.log('ios-ok');
      } else {
        console.log('ios-fail');
      }
    } else {
      if (andr_camera === RESULTS.GRANTED) {
        console.log('android-ok');
      } else {
        console.log('android-fail');
      }
    }
  } catch (error) {
    console.log('Privacy error');
  }
};

function TakePicturePresenter({ state, handleNextButton, onChangeState }: TakePicturePresenterTypes) {
  check();
  const Touchable = styled.TouchableOpacity``;
  const cameraRef = React.useRef(null); // useRef로 camera를 위한 ref를 하나 만들어주고
  const [loading, setLoading] = useState(false);
  const globalDispatch = useGlobalDispatch();
  const [image, setImage] = useState('');

  function postUploadBusiness(data) {
    //이미지만들기
    const formData = new FormData();
    formData.append('data', data);

    //순번
    insuApis
      .getUploadNumber()
      .then((r) => {
        console.log(r.data);

        insuApis
          .postUploadImage(formData, r.data)
          .then((res) => {
            console.log(res.status);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const takePhoto = async () => {
    console.log('cameraRef', cameraRef);
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      console.log('😻 data', data);
      state.originData = data;
      if (data) {
        const result = await CameraRoll.save(data.uri);
        console.log('🐤result', result);
        CameraRoll.getPhotos({
          first: 1,
          assetType: 'Photos',
        })
          .then((r) => {
            postUploadBusiness(r.edges[0].node.image.uri);
          })
          .catch((err) => {
            //Error Loading Images
            console.log(err);
          });
        state.imageUri = data.uri;
        handleNextButton();
      }
    }
  };
  return (
    <>
      <OverayLoading visible={loading} />
      <Container>
        <RNCamera
          style={{ width: '100%', height: '80%' }}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          ref={cameraRef}
        />
        <View>
          <Touchable onPress={takePhoto}>
            <Button title={'take'} onPress={takePhoto} />
          </Touchable>
        </View>
      </Container>
    </>
  );
}

export default TakePicturePresenter;
