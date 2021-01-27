import React from 'react';
import JoinTypePresenter from './JoinTypePresenter';

export default function JoinTypeCotainer({ state, onChangeState, handleNextButton }) {
  //가입유형 단체or세대가입 버튼 클릭시 타입 셋팅
  const selectJoinType = (value: 'T' | 'S') => {
    onChangeState('selectType', value);
  };
  return <JoinTypePresenter state={state} selectJoinType={selectJoinType} handleNextButton={handleNextButton} />;
}
