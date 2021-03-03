import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { useInput } from '@app/hooks';
import { useNavigation } from '@react-navigation/native';
import ProfilePresenter from '@app/screens/Profile/ProfilePresenter';
import { useGlobalState } from '@app/context';
import { BackHandler } from 'react-native';
import { InputTypes } from '@app/types';

export type ProfileStateName =
  | 'selectTab'
  | 'joinType'
  | 'serviceType'
  | 'selectService'
  | 'currentPage'
  | 'termsModal'
  | 'isAgreeIndividualTerms'
  | 'isAgreeUseTerms'
  | 'selectTermsModal'
  | 'individualStep'
  | 'loading'
  | 'termsHtml';
export type ProfileStateTypes = {
  selectTab: 'basic' | 'password' | 'business';
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
  loading: boolean;
};

export type ProfileInputTypes = {
  email: InputTypes;
  name: InputTypes;
  phone: InputTypes;
  idNumber: InputTypes;
  sexNumber: InputTypes;
  password: InputTypes;
  passwordConfirm: InputTypes;
  companyName: InputTypes;
  companyNumber: InputTypes;
};
type ActionTypes = { type: 'CHANGE'; name: ProfileStateName; value: any };

function reducer(state: ProfileStateTypes, action: ActionTypes) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
  }
}

const initialState: ProfileStateTypes = {
  selectTab: 'basic',
  selectService: 'SKT',
  currentPage: 'info',
  termsModal: false,
  isAgreeIndividualTerms: false,
  isAgreeUseTerms: false,
  selectTermsModal: 'individual',
  loading: false,
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

export default function ProfileContainer() {
  const scrollRef: any = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();
  const globalState = useGlobalState();
  const inputState = {
    email: useInput(globalState?.user?.email),
    name: useInput(globalState?.user?.name),
    phone: useInput(globalState?.user?.mobile),
    idNumber: useInput(globalState?.user?.jumina),
    sexNumber: useInput(globalState?.user?.sex),
    password: useInput(''),
    passwordConfirm: useInput(''),
    companyName: useInput(globalState?.user?.comname),
    companyNumber: useInput(globalState?.user?.businessnum),
  };
  const onChangeState = useCallback((name: ProfileStateName, value: any) => {
    dispatch({ type: 'CHANGE', name, value });
  }, []);

  const handleClickButton = (value) => {
    onChangeState('selectTab', value);
  };

  const onValueChange = (value) => {
    onChangeState('selectService', value);
  };

  //안드로이드 백버튼 핸들러
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);
  return (
    <ProfilePresenter
      handleClickButton={handleClickButton}
      state={state}
      scrollRef={scrollRef}
      onChangeState={onChangeState}
      inputState={inputState}
      onValueChange={onValueChange}
    />
  );
}
