import React, {useEffect, useState} from 'react';
import ImageConfirmPresenter from '@screens/Camera/ImageConfirm/ImageConfirmPresenter';
import { CameraStateName, CameraStateTypes } from '@screens/Camera/CameraContainer';
import { EmptyLayout } from '@app/layout';
import CameraRoll from '@react-native-community/cameraroll';
import { insuApis } from '@app/api/Insurance';
import ImgToBase64 from 'react-native-image-base64';
import {Platform} from "react-native";
import {useGlobalDispatch} from "@app/context";
import {useNavigation} from "@react-navigation/core";

export type ImageConfirmStateTypes = {
  state: CameraStateTypes;
  onChangeState: (name: CameraStateName, value: any) => void;
  handlePreviousButton: () => void;
};

export default function ImageConfirmContainer({ state, onChangeState, handlePreviousButton }: ImageConfirmStateTypes) {
  const navigation = useNavigation();

  const getPhotos = async () => {
    CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    })
      .then((r) => {
        onChangeState('imageUri', String(r.edges[0].node.image.uri));
      })
      .catch((err) => {
        //Error Loading Images
        console.log(err);
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const bottomRightPress = () => {
      navigation.goBack();
    };

  if (state.stepNumber === 2) {
    return (
      <ImageConfirmPresenter
        state={state}
        onChangeState={onChangeState}
        bottomLeftPress={handlePreviousButton}
        bottomRightPress={bottomRightPress}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
