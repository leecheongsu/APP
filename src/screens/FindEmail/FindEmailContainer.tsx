import React, { useReducer, useRef } from 'react';
import { userApis } from '@app/api/User';
import { useInput } from '@app/hooks';
import { handleApiError, screenWidth } from '@app/lib';
import FindeEmailPresenter from './FindEmailPresenter';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export type FindEmailStateTypes = {
  currentPage: number;
  serviceType: any;
  selectService: string;
  userEmail: string;
  loading: boolean;
};

export type FindEmailStateNames = 'currentPage' | 'serviceType' | 'selectService' | 'userEmail' | 'loading';
type FindEmailActionTypes = { type: 'CHANGE'; name: FindEmailStateNames; value: any };

function reducer(state: FindEmailStateTypes, action: FindEmailActionTypes) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
  }
}
const initialState: FindEmailStateTypes = {
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

export default function FindeEmailContainer() {
  const scrollRef: any = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();
  const inputState = {
    name: useInput(''),
    phone: useInput(''),
    jumina: useInput(''),
    idNumber: useInput(''),
    sex: useInput(''),
  };
  const onChangeState = (name: FindEmailStateNames, value: any) => {
    dispatch({ type: 'CHANGE', name, value });
  };

  const onValueChange = (value) => {
    onChangeState('selectService', value);
  };

  const checkInput = () => {
    const phoneCheck = /^\d{3}\d{3,4}\d{4}$/;
    const juminFront = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;

    if (inputState.name.value === '') {
      Toast.show('이름을 입력하세요.');
      return false;
    } else if (inputState.phone.value === '') {
      Toast.show('휴대 전화번호를 입력해주세요.');
      return false;
    } else if (!phoneCheck.test(inputState.phone.value)) {
      Toast.show('올바른 휴대 전화번호를 입력해주세요.');
      return false;
    } else if (inputState.jumina.value === '' || inputState.jumina.value.length < 6) {
      Toast.show('주민등록번호 앞자리를 입력해주세요.');
      return false;
    } else if (!juminFront.test(inputState.jumina.value) || Number(inputState.sex.value) > 2) {
      Toast.show('올바른 주민등록번호를 입력해주세요.');
      return false;
    } else if (inputState.sex.value === '') {
      Toast.show('주민등록번호 뒤 첫번째 자리를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

  // 다음버튼
  function handleNextButton() {
    if (state.currentPage === 1) {
      const params = {
        name: inputState.name.value,
        teltype: state.selectService,
        mobile: inputState.phone.value,
        jumina: inputState.jumina.value,
        sex: inputState.sex.value,
      };
      if (checkInput()) {
        onChangeState('loading', true);
        userApis
          .getFindEmail(params)
          .then((res) => {
            if (res.status === 200) {
              onChangeState('loading', false);
              onChangeState('userEmail', res.data);
              onChangeState('currentPage', 2);
              scrollRef.current?.scrollTo({ x: screenWidth(), animated: true });
            } else {
              onChangeState('loading', false);
              Alert.alert('알림', '오류가 발생하였습니다.');
            }
          })
          .catch((e) => {
            onChangeState('loading', false);
            if (e.response.status === 404) {
              Alert.alert('알림', '등록된 사용자가 없습니다.');
            } else {
              handleApiError(e.response);
            }
          });
      }
    } else {
      navigation.navigate('LOGIN');
    }
  }

  //이전버튼
  function handlePreviousButton() {
    onChangeState('currentPage', 1);
    onChangeState('userEmail', '');
    scrollRef.current?.scrollTo({
      x: screenWidth() * -1,
      animated: true,
    });
  }
  return (
    <FindeEmailPresenter
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
