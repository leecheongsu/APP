import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { screenWidth } from '@app/lib';
import {
  CheckList,
  GuaranteeSelect,
  ProductInfomation,
  StormFloodAddress,
  StormFloodInfo,
  StormFloodInput,
  StormFloodPay,
  StormFloodResult,
  StormFloodTerms,
} from '@app/screens';
import axios from 'axios';
import { BackHandler, Keyboard } from 'react-native';
import StormFloodPresenter from './StormFloodPresenter';
import StormFloodFinal from '@app/screens/StormFlood/StormFloodFinal';
import {
  wwTermsSb1,
  wwTermsSb2,
  wwTermsSb3,
  wwTermsSb4,
  wwTermsSb5,
  wwTermsSd1,
  wwTermsSd2,
  wwTermsSe1,
  wwTermsSe2,
  wwTermsSe3,
  wwTermsSe4,
  wwTermsSe5,
  wwTermsSf1,
  wwTermsSf2,
  wwTermsSf3,
  wwTermsSf4,
} from '@app/lib/html';
import { useInput } from '@app/hooks';
import { DefaultAlert } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import { useGlobalDispatch } from '@app/context';
export type StormFloodName =
  | 'isInfoModal'
  | 'infoTitle'
  | 'infoContents'
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
  | 'guaranteeSelect'
  | 'joinType'
  | 'stuffDivision'
  | 'possessionDivision'
  | 'selectSector'
  | 'selectBuildingPrice'
  | 'selectFacilityprice'
  | 'selectSelfPrice'
  | 'selectInventoryPrice'
  | 'selectInsuCompany'
  | 'termsPdf'
  | 'selectCard'
  | 'selectTerm'
  | 'insuCertificateModal'
  | 'basicSectorItems'
  | 'factorySectorItems'
  | 'basicBuildingPriceItems'
  | 'factoryBuildingPriceItems'
  | 'basicFacilityPriceItems'
  | 'factoryFacilityPriceItems'
  | 'inventoryPriceItems'
  | 'selfPriceItems'
  | 'resultPrice'
  | 'electronicSignModal'
  | 'signConfirmModal'
  | 'signData'
  | 'isSign'
  | 'isSignConfirm';

export type StormFloodStateTypes = {
  stepperTitle: string;
  isInfoModal: boolean;
  infoTitle: string;
  infoContents: string;
  isKeybordView: boolean;
  stepNumber: number;
  loading: boolean;
  stormFloodStep: any;
  lat: string;
  lng: string;
  selectAddress: any;
  termsModal: boolean;
  insuCertificateModal: boolean;
  termsHtml: any;
  termsName: any;
  termsPdf: boolean;
  addressCommon: any;
  addressData: any;
  addressErrorMessage: any;
  joinType: string;
  stuffDivision: string;
  possessionDivision: string;
  selectSector: string;
  selectBuildingPrice: any;
  selectFacilityprice: any;
  selectSelfPrice: any;
  selectInventoryPrice: any;
  selectInsuCompany: string;
  selectCard: string;
  selectTerm: string;
  basicSectorItems: Array<any>;
  factorySectorItems: Array<any>;
  basicBuildingPriceItems: Array<any>;
  factoryBuildingPriceItems: Array<any>;
  basicFacilityPriceItems: Array<any>;
  factoryFacilityPriceItems: Array<any>;
  inventoryPriceItems: Array<any>;
  selfPriceItems: Array<any>;
  resultPrice: any;
  electronicSignModal: boolean;
  signConfirmModal: boolean;
  signData: any;
  isSign: boolean;
  isSignConfirm: boolean;
  terms: {
    terms1: any;
    terms2: any;
    terms3: any;
    terms4: any;
    terms5: any;
    termsb1: any;
    termsb2: any;
    termsb3: any;
    termsb4: any;
    termsb5: any;
    termsd1: any;
    termsd2: any;
    termsd3: any;
    termse1: any;
    termse2: any;
    termse3: any;
    termse4: any;
    termse5: any;
    termsf1: any;
    termsf2: any;
    termsf3: any;
    termsf4: any;
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
          [action.name]: {
            ...state.terms[action.name],
            isChecked: action.value,
          },
        },
      };
  }
}
export type InputStateTypes = {
  buildName: any;
  bldFloor1: any;
  bldFloor2: any;
  hsArea: any;
};

type ActionTypes =
  | { type: 'CHANGE'; name: StormFloodName; value: any }
  | { type: 'TERMS_CHANGE'; name: any; value: any };

const initialState = {
  stepperTitle: '가입유형',
  isInfoModal: false,
  infoTitle: '',
  infoContents: '',
  isKeybordView: false,
  stepNumber: 0,
  loading: false,
  lat: '',
  lng: '',
  selectAddress: {},
  termsModal: false,
  termsName: '',
  termsHtml: '',
  termsPdf: false,
  addressCommon: {},
  addressData: [],
  addressErrorMessage: '',
  joinType: '개인',
  stuffDivision: '일반',
  possessionDivision: '임차자',
  selectSector: '',
  selectBuildingPrice: '',
  selectFacilityprice: '',
  selectSelfPrice: '',
  selectInventoryPrice: '',
  selectInsuCompany: '',
  selectCard: '',
  selectTerm: '0',
  insuCertificateModal: false,
  basicSectorItems: [],
  factorySectorItems: [],
  basicBuildingPriceItems: [],
  factoryBuildingPriceItems: [],
  basicFacilityPriceItems: [],
  factoryFacilityPriceItems: [],
  inventoryPriceItems: [],
  selfPriceItems: [],
  resultPrice: undefined,
  electronicSignModal: false,
  signConfirmModal: false,
  signData: undefined,
  isSign: false,
  isSignConfirm: false,
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
    {
      id: 'stormFloodResult',
      title: '보험료 확인',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'stormFloodInput',
      title: '고객정보 입력 및 동의',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'stormFloodTerms',
      title: '청약확인',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'stormFloodPay',
      title: '신용카드 간편결제',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'stormFloodFinal',
      title: '계약 완료',
      backgroundcolor: 'SOFTGRAY',
    },
  ],
  terms: {
    terms1: {
      isChecked: 0,
    },
    terms2: {
      isChecked: 0,
    },
    terms3: {
      isChecked: 0,
    },
    terms4: {
      isChecked: 0,
    },
    terms5: {
      isChecked: 0,
    },
    termsb1: {
      name: 'termsb1',
      title: '소비자 권익에 관한사항',
      isChecked: 0,
      html: wwTermsSb1(),
    },
    termsb2: {
      name: 'termsb2',
      title: '개인(신용)정보의 수집/이용에 관한 사항',
      isChecked: 0,
      html: wwTermsSb2(),
    },
    termsb3: {
      name: 'termsb3',
      title: '개인(신용)정보의 조회에 관한 사항',
      isChecked: 0,
      html: wwTermsSb3(),
    },
    termsb4: {
      name: 'termsb4',
      title: '개인(신용)정보의 제공에 관한 사항',
      isChecked: 0,
      html: wwTermsSb4(),
    },
    termsb5: {
      name: 'termsb5',
      title: '민감정보 및 고유식별정보의 처리에 관한 사항',
      isChecked: 0,
      html: wwTermsSb5(),
    },
    termsc1: {
      name: 'termsc1',
      title: '전자금융거래 이용약관',
      isChecked: 0,
      html: wwTermsSb1(),
    },
    termsc2: {
      name: 'termsc2',
      title: '웹사이트(현대해상) 이용약관',
      isChecked: 0,
      html: wwTermsSb1(),
    },
    termsc3: {
      name: 'termsc3',
      title: '예금자 보호안내',
      isChecked: 0,
      html: wwTermsSb1(),
    },
    termsc4: {
      name: 'termsc4',
      title: '온라인 보험계약 고객센터 이용 동의',
      isChecked: 0,
      html: wwTermsSb1(),
    },
    termsd1: {
      name: 'termsd1',
      title: '보험상품 가입시 확인사항',
      isChecked: 0,
      html: wwTermsSd1(),
    },
    termsd2: {
      name: 'termsd2',
      title: '상품 보장 내용설명',
      isChecked: 0,
      html: wwTermsSd2(),
    },
    termsd3: {
      name: 'termsd3',
      title: '보장약관 확인',
      isChecked: 0,
      html: wwTermsSb1(),
    },
    termse1: {
      name: 'termse1',
      title: '소비자 권익에 관항 사항',
      isChecked: 0,
      html: wwTermsSe1(),
    },
    termse2: {
      name: 'termse2',
      title: '개인(신용)정보의 수집/이용에 관한 사항',
      isChecked: 0,
      html: wwTermsSe2(),
    },
    termse3: {
      name: 'termse3',
      title: '개인(신용)정보의 조회에 관한 사항',
      isChecked: 0,
      html: wwTermsSe3(),
    },
    termse4: {
      name: 'termse4',
      title: '개인(신용)정보의 제공에 관한 사항',
      isChecked: 0,
      html: wwTermsSe4(),
    },
    termse5: {
      name: 'termse5',
      title: '민감정보 및 고유식별정보의 처리에 관한 사항',
      isChecked: 0,
      html: wwTermsSe5(),
    },
    termsf1: {
      name: 'termsf1',
      title: '전자금융거래 이용약관',
      isChecked: 0,
      html: wwTermsSf1(),
    },
    termsf2: {
      name: 'termsf2',
      title: '웹사이트(현대해상) 이용약관',
      isChecked: 0,
      html: wwTermsSf2(),
    },
    termsf3: {
      name: 'termsf3',
      title: '예금자 보호안내',
      isChecked: 0,
      html: wwTermsSf3(),
    },
    termsf4: {
      name: 'termsf4',
      title: '온라인 보험계약 고객센터 이용 동의',
      isChecked: 0,
      html: wwTermsSf4(),
    },
  },
};

export default function StormFloodContainer() {
  const navigation = useNavigation();
  const globalDispatch = useGlobalDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const scrollRef: any = useRef(null);
  const GEO_CORDING_URL = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${state.selectAddress.address}`;
  const GEO_CORDING_ID = 'inselh2wtl';
  const GEO_CORDING_KEY = 'OPjA2JmsSCweRxKFpHX1qyfzDGrxgSSI9yL6Duta';
  const inputState = {
    buildName: useInput(''),
    bldFloor1: useInput(''),
    bldFloor2: useInput(''),
    hsArea: useInput(''),
  };

  const onChangeState = useCallback((name, value) => {
    dispatch({ type: 'CHANGE', name, value });
  }, []);

  const termsChange = useCallback((name, value) => {
    dispatch({ type: 'TERMS_CHANGE', name, value });
  }, []);

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
      case 6: {
        handleJoinTypeNextButton();
        return null;
      }
      case 7: {
        handleJoinTypeNextButton();
        return null;
      }
      case 8: {
        handleJoinTypeNextButton();
        return null;
      }
      case 9: {
        handleJoinTypeNextButton();
        return null;
      }
      case 10: {
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

  // terms모달 승인
  const onClickTermsModalAgree = () => {
    termsChange(state.termsName, 1);
    onChangeState('termsModal', false);
    onChangeState('termsPdf', false);
    onChangeState('termsName', '');
  };

  //terms모달 오픈
  const onClickTermsModalOpen = (name, html) => {
    if (state.terms[name]?.isChecked !== undefined && state.terms[name]?.isChecked === 0) {
      onChangeState('termsName', name);
      onChangeState('termsModal', true);
      onChangeState('termsHtml', html);
    } else {
      termsChange(name, 0);
    }
  };

  //infomodal open
  const openInfoModal = (title, contents) => {
    onChangeState('infoTitle', title);
    onChangeState('infoContents', contents);
    onChangeState('isInfoModal', true);
  };

  //terms 모두동의
  const onClickAllCheck = (list, isActive) => {
    if (isActive) {
      list?.map((item) => {
        termsChange(item, 0);
      });
    } else {
      list?.map((item) => {
        termsChange(item, 1);
      });
    }
  };

  const returnComponent = (
    id:
      | 'productInfomation' //상품안내
      | 'checkList' //소상공인 체크리스틀
      | 'stormFloodAddress' //주소찾기
      | 'info' //건물기본정보
      | 'guaranteeSelect' //담보선택
      | 'stormFloodResult' //보험료확인
      | 'stormFloodInput' //고객정보 입력및 동의
      | 'stormFloodTerms' // 청약확인
      | 'stormFloodPay' //신용카드 간편결제
      | 'stormFloodFinal' //계약완료
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
            onClickTermsModalAgree={onClickTermsModalAgree}
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
            openInfoModal={openInfoModal}
            inputState={inputState}
          />
        );
      case 'stormFloodResult':
        return (
          <StormFloodResult
            key={id}
            state={state}
            onClickTermsModalOpen={onClickTermsModalOpen}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
          />
        );
      case 'stormFloodInput':
        return (
          <StormFloodInput
            key={id}
            state={state}
            onClickTermsModalOpen={onClickTermsModalOpen}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
            termsChange={termsChange}
            onClickAllCheck={onClickAllCheck}
            onClickTermsModalAgree={onClickTermsModalAgree}
            inputState={inputState}
          />
        );
      case 'stormFloodTerms':
        return (
          <StormFloodTerms
            key={id}
            state={state}
            onClickTermsModalOpen={onClickTermsModalOpen}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
            termsChange={termsChange}
            onClickAllCheck={onClickAllCheck}
            onClickTermsModalAgree={onClickTermsModalAgree}
          />
        );
      case 'stormFloodPay':
        return (
          <StormFloodPay
            key={id}
            state={state}
            onClickTermsModalOpen={onClickTermsModalOpen}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
          />
        );
      case 'stormFloodFinal':
        return (
          <StormFloodFinal
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
        url: GEO_CORDING_URL,
        method: 'GET',
        headers: {
          'X-NCP-APIGW-API-KEY-ID': GEO_CORDING_ID,
          'X-NCP-APIGW-API-KEY': GEO_CORDING_KEY,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectAddress]);

  //네비게이션 헤더 셋팅
  const setPageHeader = () => {
    switch (state?.stepNumber) {
      case 1:
        globalDispatch({ type: 'CHANGE', name: 'stormFloodTitle', value: '풍수해Ⅵ' });
        return;
      case 2:
        globalDispatch({ type: 'CHANGE', name: 'stormFloodTitle', value: '소상공인 체크리스트' });
        return;
      case 3:
        globalDispatch({ type: 'CHANGE', name: 'stormFloodTitle', value: '주소찾기' });
        return;
      case 4:
        globalDispatch({ type: 'CHANGE', name: 'stormFloodTitle', value: '건물 기본정보' });
        return;
      case 5:
        globalDispatch({ type: 'CHANGE', name: 'stormFloodTitle', value: '담보 선택' });
        return;
      case 6:
        globalDispatch({ type: 'CHANGE', name: 'stormFloodTitle', value: '보험료 확인' });
        return;
      case 7:
        globalDispatch({ type: 'CHANGE', name: 'stormFloodTitle', value: '고객정보 입력 및 동의	' });
        return;
      case 8:
        globalDispatch({ type: 'CHANGE', name: 'stormFloodTitle', value: '청약확인' });
        return;
      case 9:
        globalDispatch({ type: 'CHANGE', name: 'stormFloodTitle', value: '신용카드 간편결제' });
        return;
      case 10:
        globalDispatch({ type: 'CHANGE', name: 'stormFloodTitle', value: '계약 완료' });
        return;
    }
  };

  //안드로이드 백버튼 핸들러
  useEffect(() => {
    setPageHeader();
    const backAction = () => {
      DefaultAlert({ title: '알림', msg: '메인페이지로 돌아 가시겠습니까?', okPress: () => navigation.goBack() });
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.stepNumber]);

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
