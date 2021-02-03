import React, { useReducer, useRef } from 'react';
import { userApis } from '@app/api/User';
import { useInput } from '@app/hooks';
import JoinPresenter from './JoinPresenter';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import { setStoreData } from '@app/lib';

export type JoinStateName =
  | 'selectType'
  | 'joinType'
  | 'serviceType'
  | 'selectService'
  | 'currentPage'
  | 'termsModal'
  | 'isAgreeIndividualTerms'
  | 'isAgreeUseTerms'
  | 'selectTermsModal'
  | 'individualStep'
  | 'termsHtml';
export type JoinStateTypes = {
  selectType: string;
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
  individualStep: [{ id: 'info' }, { id: 'password' }, { id: 'success' }],
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
  const navigation: any = useNavigation();
  const inputState = {
    email: useInput(''),
    name: useInput(''),
    phone: useInput(''),
    idNumber: useInput(''),
    sexNumber: useInput(''),
    password: useInput(''),
    passwordConfirm: useInput(''),
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
          navigation.navigate('JOIN_SUCCESS');
        }
      })
      .catch((e) => {
        console.log(e.response);
        if (e.response.status === 409) {
          Toast.show('가입된 이메일주소가 있습니다.');
        } else {
          Toast.show('오류가 발생하였습니다.');
        }
      });
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
    />
  );
}
