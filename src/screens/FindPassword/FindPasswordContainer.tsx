import React, { useReducer, useRef } from 'react';
import { userApis } from '@app/api/User';
import { useInput } from '@app/hooks';
import { handleApiError, screenWidth } from '@app/lib';
import FindPasswordPresenter from './FindPasswordPresenter';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';

export type FindPasswordStateTypes = {
  currentPage: number;
  serviceType: any;
  selectService: string;
  userEmail: string;
  loading: boolean;
};

export type FindPasswordStateNames = 'currentPage' | 'serviceType' | 'selectService' | 'userEmail' | 'loading';
type FindEmailActionTypes = { type: 'CHANGE'; name: FindPasswordStateNames; value: any };

function reducer(state: FindPasswordStateTypes, action: FindEmailActionTypes) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
  }
}
const initialState: FindPasswordStateTypes = {
  currentPage: 1,
  selectService: 'SKT',
  userEmail: '',
  loading: false,
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
};

export default function FindPasswordContainer() {
  const scrollRef: any = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();
  const inputState = {
    email: useInput(''),
    phone: useInput(''),
    password: useInput(''),
    passwordConfirm: useInput(''),
  };
  const onChangeState = (name: FindPasswordStateNames, value: any) => {
    dispatch({ type: 'CHANGE', name, value });
  };

  const onValueChange = (value) => {
    onChangeState('selectService', value);
  };

  const checkInput = () => {
    const phoneCheck = /^\d{3}\d{3,4}\d{4}$/;
    const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (inputState.email.value === '') {
      Toast.show('이메일을 입력해주세요.');
      return false;
    } else if (!emailCheck.test(inputState.email.value)) {
      Toast.show('올바른 이메일 주소를 입력해주세요.');
    } else if (inputState.phone.value === '') {
      Toast.show('휴대 전화번호를 입력해주세요.');
      return false;
    } else if (!phoneCheck.test(inputState.phone.value)) {
      Toast.show('올바른 휴대 전화번호를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

  //비밀번호 체크 로직
  const checkPassword = () => {
    const pattern1 = /[0-9]/;
    const pattern2 = /[a-zA-Z]/;
    const pattern3 = /[~!@\#$%<>^&*]/;
    const pw = inputState.password.value;
    if (pw === '') {
      Toast.show('비밀번호를 입력하세요.');
      return false;
    } else if (!pattern1.test(pw) || !pattern2.test(pw) || !pattern3.test(pw) || pw.length < 8 || pw.length > 50) {
      Toast.show('영문+숫자+특수기호 8자리 이상으로 구성하여야 합니다.');
      return false;
    } else if (pw !== inputState.passwordConfirm.value) {
      Toast.show('확인된 비밀번호가 틀립니다.');
      return false;
    } else {
      return true;
    }
  };

  // 다음버튼
  function handleNextButton() {
    if (state.currentPage === 1) {
      const email = inputState.email.value;
      const params = {
        email: inputState.email.value,
        teltype: state.selectService,
        mobile: inputState.phone.value,
      };
      if (checkInput()) {
        onChangeState('loading', true);
        userApis
          .getUserConfirmChangePassword(email, params)
          .then((res) => {
            if (res.status === 200) {
              onChangeState('userEmail', res.data);
              onChangeState('currentPage', 2);
              scrollRef.current?.scrollTo({ x: screenWidth(), animated: true });
              onChangeState('loading', false);
            } else {
              Toast.show('오류가 발생하였습니다.');
              onChangeState('loading', false);
            }
          })
          .catch((e) => {
            if (e.response.data?.message === 'no user') {
              Toast.show('등록된사용자가 없습니다.');
            } else if (e.response.status === 404) {
              Toast.show('입력하신 정보가 등록한 정보와 다릅니다.');
            } else {
              handleApiError(e.response);
            }
            onChangeState('loading', false);
          });
      }
    } else if (state.currentPage === 2) {
      if (checkPassword()) {
        onChangeState('loading', true);

        const email = inputState.email.value;
        const params = {
          teltype: state.selectService,
          mobile: inputState.phone.value,
          newPwd: inputState.password.value,
        };
        userApis
          .putChangeUserPassword(email, params)
          .then((res) => {
            onChangeState('currentPage', 3);
            scrollRef.current?.scrollTo({ x: screenWidth() * 2, animated: true });
            onChangeState('loading', false);
          })
          .catch((e) => {
            console.log(e.response);
            Toast.show('오류가 발생하였습니다.');
            onChangeState('loading', false);
          });
      }
    } else {
      navigation.navigate('LOGIN');
    }
  }

  //이전버튼
  function handlePreviousButton() {
    const number = state.currentPage === 2 ? screenWidth() * -1 : screenWidth() - 1;
    onChangeState('currentPage', state.currentPage - 1);
    onChangeState('userEmail', '');
    scrollRef.current?.scrollTo({
      x: number,
      animated: true,
    });
  }
  return (
    <FindPasswordPresenter
      state={state}
      onChangeState={onChangeState}
      handleNextButton={handleNextButton}
      handlePreviousButton={handlePreviousButton}
      scrollRef={scrollRef}
      inputState={inputState}
      onValueChange={onValueChange}
    />
  );
}
