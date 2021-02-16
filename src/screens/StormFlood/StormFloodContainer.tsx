import { screenWidth } from '@app/lib';
import { CheckList, GuaranteeSelect, ProductInfomation, StormFloodAddress } from '@app/screens';
import StormFloodInfo from '@app/screens/StormFlood/StormFloodInfo';
import axios from 'axios';
import React, { useEffect, useReducer, useRef } from 'react';
import { Keyboard } from 'react-native';
import StormFloodPresenter from './StormFloodPresenter';

export type StormFloodName =
  | 'stepperTitle'
  | 'isKeybordView'
  | 'stepNumber'
  | 'loading'
  | 'stormFlood'
  | 'lat'
  | 'lng'
  | 'selectAddress'
  | 'termsModal'
  | 'termsHtml'
  | 'termsName'
  | 'addressCommon'
  | 'addressData'
  | 'addressErrorMessage'
  | 'stormFloodStep'
  | 'guaranteeSelect';

export type StormFloodStateTypes = {
  stepperTitle: string;
  isKeybordView: boolean;
  stepNumber: number;
  loading: boolean;
  stormFloodStep: any;
  lat: string;
  lng: string;
  selectAddress: any;
  termsModal: boolean;
  termsHtml: any;
  termsName: any;
  addressCommon: any;
  addressData: any;
  addressErrorMessage: any;
  terms: {
    terms1: boolean;
    terms2: boolean;
    terms3: boolean;
    terms4: boolean;
    terms5: boolean;
  };
};

function reducer(state: StormFloodStateTypes, action: ActionTypes) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'TERMS_CHANGE':
      return {
        ...state,
        terms: {
          ...state.terms,
          [action.name]: action.value,
        },
      };
  }
}

type ActionTypes =
  | { type: 'CHANGE'; name: StormFloodName; value: any }
  | { type: 'TERMS_CHANGE'; name: any; value: any };

const initialState = {
  stepperTitle: '가입유형',
  isKeybordView: false,
  stepNumber: 0,
  loading: false,
  lat: '',
  lng: '',
  selectAddress: {},
  termsModal: false,
  termsName: '',
  termsHtml: '',
  addressCommon: {},
  addressData: [],
  addressErrorMessage: '',
  stormFloodStep: [
    {
      id: 'productInfomation',
      title: '상품안내',
      backgroundcolor: 'SKYBLUE',
    },
    {
      id: 'checkList',
      title: '소상공인체크리스트',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'stormFloodAddress',
      title: '주소찾기',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'info',
      title: '기본정보',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'guaranteeSelect',
      title: '담보선택',
      backgroundcolor: 'SOFTGRAY',
    },
  ],
  terms: {
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
    terms5: false,
  },
};

export default function StormFloodContainer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const scrollRef: any = useRef(null);

  const onChangeState = (name: StormFloodName, value: any) => {
    dispatch({ type: 'CHANGE', name, value });
  };

  const termsChange = (name: 'terms1' | 'terms2' | 'terms3' | 'terms4' | 'terms5', value: any) => {
    dispatch({ type: 'TERMS_CHANGE', name, value });
  };

  //가입유형 다음 버튼
  const handleJoinTypeNextButton = () => {
    if (state.stepNumber !== state.stormFloodStep.length) {
      scrollRef.current?.scrollTo({ x: screenWidth() * state.stepNumber, animated: true });
      onChangeState('stepNumber', state.stepNumber + 1);
    }
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
      case 4: {
        handleJoinTypeNextButton();
        return null;
      }
      case 5: {
        handleJoinTypeNextButton();
        return null;
      }
    }
  };

  // 스텝별 bottom 이전 button 분기
  const handlePreviousButton = () => {
    Keyboard.dismiss();
    scrollRef.current?.scrollTo({ x: screenWidth() * (state.stepNumber - 2), animated: true });
    onChangeState('stepNumber', state.stepNumber - 1);
  };

  //terms모달 승인
  //   const onClickTermsModalAgree = () => {
  //     onChangeTermsState(state.termsName, 1);
  //     onChangeState('termsModal', false);
  //     onChangeState('termsName', '');
  //   };

  //terms모달 오픈
  const onClickTermsModalOpen = (name, html) => {
    onChangeState('termsName', name);
    onChangeState('termsModal', true);
    onChangeState('termsHtml', html);
  };

  //terms 모두동의
  //   const onClickAllCheck = (list) => {
  //     list?.map((item) => {
  //       onChangeTermsState(item, 1);
  //     });
  //   };

  const returnComponent = (
    id: 'productInfomation' | 'checkList' | 'stormFloodAddress' | 'info' | 'guaranteeSelect'
  ) => {
    switch (id) {
      case 'productInfomation':
        return (
          <ProductInfomation
            key={id}
            state={state}
            onChangeState={onChangeState}
            handleNextButton={handleNextButton}
            onClickTermsModalOpen={onClickTermsModalOpen}
          />
        );
      case 'checkList':
        return (
          <CheckList
            key={id}
            state={state}
            onChangeState={onChangeState}
            handleNextButton={handleNextButton}
            onClickTermsModalOpen={onClickTermsModalOpen}
            handlePreviousButton={handlePreviousButton}
            termsChange={termsChange}
          />
        );
      case 'stormFloodAddress':
        return (
          <StormFloodAddress
            key={id}
            state={state}
            onChangeState={onChangeState}
            handleNextButton={handleNextButton}
            onClickTermsModalOpen={onClickTermsModalOpen}
            handlePreviousButton={handlePreviousButton}
            termsChange={termsChange}
            handleJoinTypeNextButton={handleJoinTypeNextButton}
          />
        );
      case 'info':
        return (
          <StormFloodInfo
            key={id}
            state={state}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
          />
        );
      case 'guaranteeSelect':
        return (
          <GuaranteeSelect
            key={id}
            state={state}
            onClickTermsModalOpen={onClickTermsModalOpen}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
          />
        );
    }
  };

  const _keyboardDidShow = () => {
    onChangeState('isKeybordView', true);
  };

  const _keyboardDidHide = () => {
    onChangeState('isKeybordView', false);
  };

  //geoCoding 셋팅
  useEffect(() => {
    if (state.selectAddress.address !== undefined && state.selectAddress.address !== '') {
      onChangeState('loading', true);
      axios({
        url: `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${state.selectAddress.address}`,
        method: 'GET',
        headers: {
          'X-NCP-APIGW-API-KEY-ID': 'inselh2wtl',
          'X-NCP-APIGW-API-KEY': 'OPjA2JmsSCweRxKFpHX1qyfzDGrxgSSI9yL6Duta',
        },
      })
        .then((res) => {
          onChangeState('lat', res.data.addresses[0].y);
          onChangeState('lng', res.data.addresses[0].x);
          onChangeState('loading', false);
        })
        .catch((e) => {
          e.response;
          onChangeState('loading', false);
        });
    }
  }, [state.selectAddress]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    state.stepNumber === 0 && onChangeState('stepNumber', 1);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StormFloodPresenter
      state={state}
      scrollRef={scrollRef}
      returnComponent={returnComponent}
      onChangeState={onChangeState}
    />
  );
}
