import { useGlobalDispatch, useGlobalState } from '@app/context';
import React, { useState } from 'react';
import HouseInputUserPresenter from './HouseInputUserPresenter';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { useInput } from '@app/hooks';
import { DefaultAlert } from '@app/components';
import { EmptyLayout } from '@app/layout';

export default function HouseInputUserContainer({ state, onChangeState, handlePreviousButton, handleNextButton }) {
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const user = globalState?.user;
  const [isCheck, setIsCheck] = useState(false);
  const inputState = {
    insuName: useInput(''),
    insuPhone: useInput(''),
    issuJumina: useInput(''),
    juminb: useInput(''),
  };
  const handleClickEqualButton = () => {
    setIsCheck(!isCheck);
    if (!isCheck) {
      inputState?.insuName.setValue(user?.name);
      inputState?.insuPhone.setValue(user?.mobile);
      inputState?.issuJumina.setValue(user?.jumina);
    } else {
      inputState?.insuName.setValue('');
      inputState?.insuPhone.setValue('');
      inputState?.issuJumina.setValue('');
    }
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const selectItem = [
    { label: '자가', value: 'o' },
    { label: '임차', value: 'r' },
  ];
  //데이트피커 보여지는함수
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  //데이트피커 닫는 함수
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //날짜선택 버튼
  const handleConfirm = (date) => {
    const selectDate = moment(date).format('YYYY-MM-DD');
    onChangeState('insFrom', selectDate);
    hideDatePicker();
  };

  //보험목적물 소유구분 변경
  const onValueChange = (value) => {
    onChangeState('owner', value);
  };

  //추천인 삭제 버튼
  const onDeleteRecommedUserButton = () => {
    globalDispatch({ type: 'CHANGE', name: 'recommendUser', value: undefined });
    Toast.show('추천인이 삭제되었습니다.');
  };

  //인풋값 체크
  const checkInput = () => {
    if (inputState.juminb.value === '') {
      Toast.show('주민등록번호 뒷자리를 입력해주세요.');
      return false;
    } else if (inputState.juminb.value.length !== 6) {
      Toast.show('올바른 주민등록번호 뒷자리를 입력해주세요.');
      return false;
    } else if (inputState.insuName.value === '') {
      Toast.show('성명/상호명을 입력해주세요.');
      return false;
    } else if (inputState.issuJumina.value === '') {
      Toast.show('생년월일/사업자등록번호를 입력해주세요.');
      return false;
    } else if (inputState.insuPhone.value === '') {
      Toast.show('연락처를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

  //신청버튼
  const buttomNextButton = () => {
    if (checkInput()) {
      const newContractInsuInfo = {
        ...state?.contractInsuInfo,
        name: inputState.insuName.value,
        email: user?.email,
        mobile: user?.mobile,
        jumin: user?.jumina + '-' + user?.sex + inputState.juminb.value,
        juminb: inputState.juminb.value,
        pbohumjaBirth: inputState.issuJumina.value,
        insDate: state?.insFrom,
        owner: state?.owner,
        insloc: state?.selectAddress?.address,
        advisor_no: globalState?.recommendUser === undefined ? '' : globalState?.recommendUser?.seq,
      };
      onChangeState('contractInsuInfo', newContractInsuInfo);
      if (globalState.recommendUser === undefined) {
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

  if (state.stepNumber === 7) {
    return (
      <HouseInputUserPresenter
        state={state}
        inputState={inputState}
        handleNextButton={handleNextButton}
        handlePreviousButton={handlePreviousButton}
        onChangeState={onChangeState}
        handleClickEqualButton={handleClickEqualButton}
        user={user}
        isCheck={isCheck}
        showDatePicker={showDatePicker}
        hideDatePicker={hideDatePicker}
        handleConfirm={handleConfirm}
        onValueChange={onValueChange}
        selectItem={selectItem}
        isDatePickerVisible={isDatePickerVisible}
        onDeleteRecommedUserButton={onDeleteRecommedUserButton}
        buttomNextButton={buttomNextButton}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
