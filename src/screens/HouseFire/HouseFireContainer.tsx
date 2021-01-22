import { screenWidth } from '@app/lib';
import { HouseAddress, JoinType } from '@app/screens';
import React, { useEffect, useReducer, useRef } from 'react';
import { ColorName } from 'styled-components';
import HouseFirePresenter from './HouseFirePresenter';
import Toast from 'react-native-simple-toast';
import { useInput } from '@app/hooks';
import { Keyboard } from 'react-native';

export type HouseFireStateName =
  | 'stepperTitle'
  | 'stepNumber'
  | 'joinType'
  | 'selectType'
  | 'houseStep'
  | 'addressCommon'
  | 'addressErrorMessage'
  | 'addressData'
  | 'isKeybordView'
  | 'currentPage';
export type HouseFireStateTypes = {
  stepperTitle: string;
  stepNumber: number;
  isKeybordView: boolean;
  addressCommon: {};
  addressData: [];
  addressErrorMessage: '';
  joinType: Array<{ title: string; value: 'T' | 'S' }>;
  houseStep: {
    id: 'joinType' | 'address' | 'info' | 'evaluation' | 'priceConfirm';
    title: string;
    backgroundcolor: ColorName;
  }[];
  selectType: number;
};
export type HouseFireInputStateTypes = {
  searchInput: any;
};

type ActionTypes = { type: 'CHANGE'; name: HouseFireStateName; value: any };

function reducer(state: HouseFireStateTypes, action: ActionTypes) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
  }
}

const initialState: HouseFireStateTypes = {
  stepperTitle: '가입유형',
  isKeybordView: false,
  stepNumber: 1,
  joinType: [
    { title: '단체 가입 보험료 확인', value: 'T' },
    { title: '세대 가입 보험료 확인', value: 'S' },
  ],
  selectType: 0,
  houseStep: [
    {
      id: 'joinType',
      title: '가입유형',
      backgroundcolor: 'SKYBLUE',
    },
    {
      id: 'address',
      title: '주소찾기',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'info',
      title: '기본정보',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'evaluation',
      title: '평가정보',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'priceConfirm',
      title: '보험료 확인',
      backgroundcolor: 'SOFTGRAY',
    },
  ],
};

export default function HouseFireContainer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const scrollRef: any = useRef(null);

  const inputState = {
    searchInput: useInput(''),
  };

  const onChangeState = (name: HouseFireStateName, value: any) => {
    dispatch({ type: 'CHANGE', name, value });
  };

  //가입유형 다음 버튼
  const handleJoinTypeNextButton = () => {
    if (state.selectType === 0) {
      Toast.show('가입유형을 선택해 주세요.');
    } else {
      if (state.stepNumber !== state.houseStep.length) {
        scrollRef.current?.scrollTo({ x: screenWidth() * (state.stepNumber + 1), animated: true });
        onChangeState('stepNumber', state.stepNumber + 1);
      }
    }
  };

  // 스텝별 bottom next button 분기
  const handleNextButton = () => {
    Keyboard.dismiss();
    switch (state.stepNumber) {
      case 1: {
        handleJoinTypeNextButton();
        return null;
      }
      default:
        throw new Error('wrong name');
    }
  };

  // 스텝별 bottom 이전 button 분기
  const handlePreviousButton = () => {
    Keyboard.dismiss();
    scrollRef.current?.scrollTo({ x: screenWidth() * (state.stepNumber - 2), animated: true });
    onChangeState('stepNumber', state.stepNumber - 1);
  };

  //houseStep 스텝별 컴퍼넌트 셋팅
  const returnComponent = (id: 'joinType' | 'address' | 'info' | 'evaluation' | 'priceConfirm') => {
    switch (id) {
      case 'joinType':
        return <JoinType key={id} state={state} onChangeState={onChangeState} />;
      case 'address':
        return <HouseAddress key={id} state={state} inputState={inputState} onChangeState={onChangeState} />;
    }
  };

  const _keyboardDidShow = () => {
    onChangeState('isKeybordView', true);
  };

  const _keyboardDidHide = () => {
    onChangeState('isKeybordView', false);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  return (
    <HouseFirePresenter
      state={state}
      handleNextButton={handleNextButton}
      handlePreviousButton={handlePreviousButton}
      scrollRef={scrollRef}
      returnComponent={returnComponent}
    />
  );
}
