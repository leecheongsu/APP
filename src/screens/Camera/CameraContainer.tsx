import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { BackHandler, Keyboard } from 'react-native';
import CameraPresenter from '@screens/Camera/CameraPresenter';
import { screenWidth } from '@app/lib';
import { useGlobalDispatch } from '@app/context';
import { ImageConfirm, TakePicture } from '@app/screens';

export type CameraStateTypes = {
  loading: boolean;
  stepperTitle: string;
  stepNumber: number;
  cameraStep: any;
  imageUri: any;
  originData: any;
  companyName: any;
  companyNumber: any;
};

export type CameraStateName =
  | 'loading'
  | 'stepperTitle'
  | 'stepNumber'
  | 'cameraStep'
  | 'imageUri'
  | 'originData'
  | 'companyName'
  | 'companyNumber';

const initialState: CameraStateTypes = {
  loading: false,
  stepperTitle: '카메라',
  stepNumber: 1,
  imageUri: '',
  originData: '',
  cameraStep: [
    {
      id: 'take',
      title: '카메라',
      backgroundcolor: 'SKYBLUE',
    },
    {
      id: 'confirm',
      title: '사진 확인',
      backgroundcolor: 'SKYBLUE',
    },
  ],
  companyName: null,
  companyNumber: null,
};

type ActionTypes = {
  type: 'CHANGE';
  name: CameraStateName;
  value: any;
};

function reducer(state: CameraStateTypes, action: ActionTypes) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
  }
}

export default function CameraContainer() {
  const globalDispatch = useGlobalDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const scrollRef: any = useRef(null);

  const onChangeState = useCallback((name: CameraStateName, value: any) => {
    dispatch({ type: 'CHANGE', name, value });
  }, []);

  const NextButton = () => {
    if (state.stepNumber !== state.cameraStep.length) {
      scrollRef.current?.scrollTo({ x: screenWidth() * state.stepNumber, animated: true });
      onChangeState('stepNumber', state.stepNumber + 1);
    }
  };

  const handleNextButton = () => {
    Keyboard.dismiss();
    switch (state.stepNumber) {
      case 1: {
        NextButton();
        return null;
      }
      case 2: {
        NextButton();
        return null;
      }
    }
  };

  const handlePreviousButton = () => {
    Keyboard.dismiss();
    scrollRef.current?.scrollTo({ x: screenWidth() * (state.stepNumber - 2), animated: true });
    onChangeState('stepNumber', state.stepNumber - 1);
  };

  const returnComponent = (id: 'take' | 'confirm') => {
    switch (id) {
      case 'take':
        return <TakePicture key={id} state={state} onChangeState={onChangeState} handleNextButton={handleNextButton} />;
      case 'confirm':
        return (
          <ImageConfirm
            key={id}
            state={state}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
          />
        );
    }
  };

  const setPageHeader = () => {
    switch (state?.stepNumber) {
      case 1:
        globalDispatch({ type: 'CHANGE', name: 'cameraTitle', value: '카메라' });
        return;
      case 2:
        globalDispatch({ type: 'CHANGE', name: 'cameraTitle', value: '확인' });
        return;
    }
  };

  //안드로이드 백버튼 핸들러
  useEffect(() => {
    setPageHeader();
    const backAction = () => {
      globalDispatch({ type: 'CHANGE', name: 'isMainModal', value: true });
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.stepNumber]);

  return <CameraPresenter state={state} scrollRef={scrollRef} returnComponent={returnComponent} />;
}
