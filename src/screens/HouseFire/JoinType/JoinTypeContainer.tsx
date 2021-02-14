import React from 'react';
import { EmptyLayout } from '@app/layout';
import JoinTypePresenter from './JoinTypePresenter';
import Toast from 'react-native-simple-toast';

export default function JoinTypeCotainer({ state, onChangeState, handleNextButton }) {
  //가입유형 단체or세대가입 버튼 클릭시 타입 셋팅
  const selectJoinType = (value: 'T' | 'S') => {
    onChangeState('selectType', value);
  };

  const onClickNextButton = () => {
    if (state.selectType === 0) {
      Toast.show('가입유형을 선택해 주세요.');
    } else {
      handleNextButton();
    }
  };

  if (state.stepNumber === 1) {
    return <JoinTypePresenter state={state} selectJoinType={selectJoinType} onClickNextButton={onClickNextButton} />;
  } else {
    return <EmptyLayout />;
  }
}
