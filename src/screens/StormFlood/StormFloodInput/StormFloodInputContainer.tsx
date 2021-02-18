import { DefaultAlert } from '@app/components';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { useInput } from '@app/hooks';
import { EmptyLayout } from '@app/layout';
import React from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import StormFloodInputPresenter from './StormFloodInputPresenter';
export default function StormFloodInputContainer({
  state,
  onChangeState,
  handleNextButton,
  onClickTermsModalOpen,
  handlePreviousButton,
  termsChange,
  onClickTermsModalAgree,
  onClickAllCheck,
}) {
  const juminb = useInput('');
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const isTermsChecked =
    state?.terms?.termsb1?.isChecked === 1 &&
    state?.terms?.termsb2?.isChecked === 1 &&
    state?.terms?.termsb3?.isChecked === 1 &&
    state?.terms?.termsb4?.isChecked === 1 &&
    state?.terms?.termsb5?.isChecked === 1;
  //추천인 삭제 버튼
  const onDeleteRecommedUserButton = () => {
    globalDispatch({ type: 'CHANGE', name: 'recommendUser', value: undefined });
    Toast.show('추천인이 삭제되었습니다.');
  };
  //인풋값 체크
  const checkInput = () => {
    if (juminb.value === '') {
      Toast.show('주민등록번호 뒷자리를 입력해주세요.');
      return false;
    } else if (juminb.value.length !== 6) {
      Toast.show('올바른 주민등록번호 뒷자리를 입력해주세요.');
      return false;
    } else if (!isTermsChecked) {
      Toast.show('가입 설계를 위한 개인정보처리에 동의해주세요.');
      return false;
    } else {
      return true;
    }
  };

  const nextButton = () => {
    if (checkInput()) {
      if (globalState?.recommendUser === undefined) {
        DefaultAlert({
          title: '추천인을 선택하지않으셨습니다.',
          msg: '이대로 진행하시겠습니까?',
          okPress: handleNextButton,
        });
      } else {
        handleNextButton();
      }
    }
  };

  //신청버튼
  // const buttomNextButton = () => {
  //   if (checkInput()) {
  //     const newContractInsuInfo = {
  //       ...state?.contractInsuInfo,
  //       name: inputState.insuName.value,
  //       email: user?.email,
  //       mobile: user?.mobile,
  //       jumin: user?.jumina + '-' + user?.sex + inputState.juminb.value,
  //       juminb: inputState.juminb.value,
  //       pbohumjaBirth: inputState.issuJumina.value,
  //       insDate: state?.insFrom,
  //       owner: state?.owner,
  //       insloc: state?.selectAddress?.address,
  //       advisor_no: globalState?.recommendUser === undefined ? '' : globalState?.recommendUser?.seq,
  //     };
  //     onChangeState('contractInsuInfo', newContractInsuInfo);
  //     if (globalState.recommendUser === undefined) {
  //       DefaultAlert({
  //         title: '추천인을 선택하지않으셨습니다.',
  //         msg: '이대로 진행하시겠습니까?',
  //         okPress: handleNextButton,
  //       });
  //     } else {
  //       handleNextButton();
  //     }
  //   }
  // };

  if (state.stepNumber === 7) {
    return (
      <StormFloodInputPresenter
        state={state}
        nextButton={nextButton}
        onChangeState={onChangeState}
        handlePreviousButton={handlePreviousButton}
        onClickTermsModalOpen={onClickTermsModalOpen}
        juminb={juminb}
        onDeleteRecommedUserButton={onDeleteRecommedUserButton}
        termsChange={termsChange}
        onClickAllCheck={onClickAllCheck}
        onClickTermsModalAgree={onClickTermsModalAgree}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
