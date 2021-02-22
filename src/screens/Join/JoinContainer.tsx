import React, { useReducer, useRef } from 'react';
import { userApis } from '@app/api/User';
import { useInput } from '@app/hooks';
import JoinPresenter from './JoinPresenter';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import { handleApiError, screenWidth } from '@app/lib';
import { Keyboard } from 'react-native';
import { BasicForm, BusinessForm, PasswordForm } from '@app/screens';

export type JoinStateName =
  | 'selectType'
  | 'joinType'
  | 'serviceType'
  | 'selectService'
  | 'currentPage'
  | 'termsModal'
  | 'isAgreeIndividualTerms'
  | 'isAgreeUseTerms'
  | 'stepNumber'
  | 'selectTermsModal'
  | 'individualStep'
  | 'termsHtml';
export type JoinStateTypes = {
  selectType: string;
  stepNumber: number;
  joinType: Array<{ id: 'individual' | 'buisness' }>;
  serviceType: Array<any>;
  selectService: any;
  currentPage: 'info' | 'password';
  termsModal: boolean;
  termsHtml: any;
  isAgreeIndividualTerms: boolean;
  isAgreeUseTerms: boolean;
  selectTermsModal: string;
  individualStep: any;
};
type ActionTypes = { type: 'CHANGE'; name: JoinStateName; value: any };

function reducer(state: JoinStateTypes, action: ActionTypes) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
  }
}

const initialState: JoinStateTypes = {
  selectType: 'individual',
  selectService: 'SKT',
  stepNumber: 1,
  currentPage: 'info',
  termsModal: false,
  isAgreeIndividualTerms: false,
  isAgreeUseTerms: false,
  selectTermsModal: 'individual',
  termsHtml: '',
  serviceType: [
    {
      label: 'SKT',
      value: 'SKT',
    },
    {
      label: 'KT',
      value: 'KT',
    },
    {
      label: 'LGU+',
      value: 'LGU+',
    },
    {
      label: 'SKT알뜰폰',
      value: 'SKT알뜰폰',
    },
    {
      label: 'KT알뜰폰',
      value: 'KT알뜰폰',
    },
    {
      label: 'LGU+알뜰폰',
      value: 'LGU+알뜰폰',
    },
  ],
  individualStep: [{ id: 'step1' }, { id: 'step2' }, { id: 'step3' }, { id: 'step4' }],
  joinType: [
    {
      id: 'individual',
    },
    {
      id: 'buisness',
    },
  ],
};

export default function JoinContainer() {
  const scrollRef: any = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();
  const inputState = {
    email: useInput(''),
    name: useInput(''),
    phone: useInput(''),
    idNumber: useInput(''),
    sexNumber: useInput(''),
    password: useInput(''),
    passwordConfirm: useInput(''),
    companyName: useInput(''),
    companyNumber: useInput(''),
  };
  const onChangeState = (name: JoinStateName, value: any) => {
    dispatch({ type: 'CHANGE', name, value });
  };

  const handleClickButton = (value) => {
    onChangeState('selectType', value);
  };

  const onValueChange = (value) => {
    onChangeState('selectService', value);
  };

  const handlePostJoin = () => {
    if (state.selectType === 'individual') {
      const params = {
        email: inputState.email.value,
        name: inputState.name.value,
        teltype: state.selectService,
        mobile: inputState.phone.value,
        pwd: inputState.password.value,
        jumina: inputState.idNumber.value,
        sex: Number(inputState.sexNumber.value),
        utype: 'u',
      };
      userApis
        .postJoin(params)
        .then((res) => {
          if (res.data === 'OK') {
            Toast.show('정상적으로 가입완료 되었습니다.');
            navigation.goBack();
            navigation.navigate('JOIN_SUCCESS');
          }
        })
        .catch((e) => {
          handleApiError(e.response);
          if (e.response.status === 409) {
            Toast.show('가입된 이메일주소가 있습니다.');
          } else {
            Toast.show('오류가 발생하였습니다.');
          }
        });
    } else {
      const params = {
        email: inputState.email.value,
        name: inputState.name.value,
        teltype: state.selectService,
        mobile: inputState.phone.value,
        pwd: inputState.password.value,
        jumina: inputState.idNumber.value,
        sex: Number(inputState.sexNumber.value),
        utype: 'u',
        sosok: '',
        comname: inputState.companyName.value,
        businessnum: inputState.companyNumber.value,
      };
      userApis
        .postBusinessJoin(params)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            Toast.show('정상적으로 가입완료 되었습니다.');
            navigation.navigate('JOIN_SUCCESS');
          }
        })
        .catch((e) => {
          handleApiError(e.response);
          if (e.response.status === 409) {
            Toast.show('가입된 이메일주소가 있습니다.');
          } else {
            Toast.show('오류가 발생하였습니다.');
          }
        });
    }
  };

  //가입유형 다음 버튼
  const handleJoinTypeNextButton = () => {
    if (state.stepNumber !== state.individualStep.length) {
      scrollRef.current?.scrollTo({ x: screenWidth() * state.stepNumber, animated: true });
      onChangeState('stepNumber', state.stepNumber + 1);
    }
  };

  // 스텝별 bottom 이전 button 분기
  const handlePreviousButton = () => {
    Keyboard.dismiss();
    scrollRef.current?.scrollTo({ x: screenWidth() * (state.stepNumber - 2), animated: true });
    onChangeState('stepNumber', state.stepNumber - 1);
  };

  // 스텝별 bottom next button 분기
  const handleNextButton = () => {
    Keyboard.dismiss();
    switch (state.stepNumber) {
      case 1: {
        handleJoinTypeNextButton();
        return null;
      }
      case 2: {
        handleJoinTypeNextButton();
        return null;
      }
      case 3: {
        handleJoinTypeNextButton();
        return null;
      }
    }
  };

  const returnComponent = (id: 'step1' | 'step2' | 'step3' | 'step4') => {
    switch (id) {
      case 'step1':
        return (
          <BasicForm
            key={id}
            state={state}
            inputState={inputState}
            onChangeState={onChangeState}
            handleNextButton={handleNextButton}
            onValueChange={onValueChange}
          />
        );
      case 'step2':
        if (state?.selectType === 'individual') {
          return (
            <PasswordForm
              key={id}
              state={state}
              inputState={inputState}
              onChangeState={onChangeState}
              handleNextButton={handleNextButton}
              handlePreviousButton={handlePreviousButton}
              handlePostJoin={handlePostJoin}
            />
          );
        } else {
          return (
            <BusinessForm
              key={id}
              state={state}
              inputState={inputState}
              onChangeState={onChangeState}
              handleNextButton={handleNextButton}
              handlePreviousButton={handlePreviousButton}
            />
          );
        }
      case 'step3':
        return (
          <PasswordForm
            key={id}
            state={state}
            inputState={inputState}
            onChangeState={onChangeState}
            handleNextButton={handleNextButton}
            handlePreviousButton={handlePreviousButton}
            handlePostJoin={handlePostJoin}
          />
        );
    }
  };

  return (
    <JoinPresenter
      handleClickButton={handleClickButton}
      state={state}
      scrollRef={scrollRef}
      onChangeState={onChangeState}
      inputState={inputState}
      onValueChange={onValueChange}
      handlePostJoin={handlePostJoin}
      returnComponent={returnComponent}
    />
  );
}
