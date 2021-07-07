import React from 'react';
import TakePicturePresenter from '@screens/Camera/TakePicture/TakePicturePresenter';
import { CameraStateName, CameraStateTypes } from '@screens/Camera/CameraContainer';
import {EmptyLayout} from "@app/layout";
import CameraRoll from "@react-native-community/cameraroll";
import styled from "styled-components";

export type TakePictureStateTypes = {
  state: CameraStateTypes;
  onChangeState: (name: CameraStateName, value: any) => void;
  handleNextButton: () => void;
};

export default function TakePictureContainer({ state, onChangeState, handleNextButton }: TakePictureStateTypes) {
  if (state.stepNumber === 1) {
    return <TakePicturePresenter state={state} onChangeState={onChangeState} handleNextButton={handleNextButton}/>;
  } else {
    return <EmptyLayout />;
  }
}
