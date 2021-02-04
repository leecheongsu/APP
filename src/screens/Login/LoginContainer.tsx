import React, { useReducer } from 'react';
import LoginPresenter from '@app/screens/Login/LoginPresenter';
import { useInput } from '@app/hooks';
import Toast from 'react-native-simple-toast';
import { userApis } from '@app/api/User';
import { getStoreData, removeStoreData, setStoreData } from '@app/lib';
import { useNavigation } from '@react-navigation/native';
import { useGlobalDispatch, useGlobalState } from '@app/context';

export type LoginStateNames = 'isAutoLogin';
export type LoginStateTypes = {
  isAutoLogin: boolean;
};
type LoginStateActionTypes = { type: 'CHANGE'; name: LoginStateNames; value: any };

function reducer(state: LoginStateTypes, action: LoginStateActionTypes) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
  }
}

const initialState: LoginStateTypes = {
  isAutoLogin: true,
};

export default function LoginContainer() {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const inputState = {
    email: useInput(''),
    password: useInput(''),
  };
  const onChangeState = (name: LoginStateNames, value: any) => {
    dispatch({ type: 'CHANGE', name, value });
  };

  const handleAutoLoginButton = () => {
    onChangeState('isAutoLogin', !state.isAutoLogin);
  };

  const checkEmailAndPassword = () => {
    if (inputState.email.value === '') {
      Toast.show('이메일을 입력해주세요.');
      return false;
    } else if (!emailCheck.test(inputState.email.value)) {
      Toast.show('올바른 이메일 주소를 입력해주세요.');
      return false;
    } else if (inputState.password.value === '') {
      Toast.show('비밀번호를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

  const submitLogin = () => {
    const params = {
      id: inputState.email.value,
      pwd: inputState.password.value,
    };
    if (checkEmailAndPassword()) {
      userApis
        .postLogin(params)
        .then((res) => {
          if (res.status === 200) {
            if (state.isAutoLogin) {
              setStoreData('password', inputState.password.value);
            } else {
              removeStoreData('password');
            }
            setStoreData('user', res.data);
            setStoreData('isLogin', true);
            globalDispatch({ type: 'CHANGE', name: 'user', value: res.data });
            Toast.show(`환영합니다. ${res.data.name}님`);
            navigation.navigate('MAIN_STACK');
          }
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response.status === 401) {
            Toast.show('입력하신 아이디 또는 비밀번호가 일치하지 않습니다.');
          }
        });
    }
  };

  return (
    <LoginPresenter
      inputState={inputState}
      state={state}
      handleAutoLoginButton={handleAutoLoginButton}
      submitLogin={submitLogin}
    />
  );
}
