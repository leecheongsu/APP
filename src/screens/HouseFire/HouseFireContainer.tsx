import React, { useEffect, useReducer, useRef } from 'react';
import { floorPrice, screenWidth } from '@app/lib';
import {
  HouseAddress,
  HouseConfirm,
  HouseContractTerms,
  HouseEvaluation,
  HouseFinal,
  HousePay,
  HouseResult,
  HouseTermsUse,
  JoinType,
} from '@app/screens';
import { ColorName } from 'styled-components';
import HouseFirePresenter from './HouseFirePresenter';
import { useInput } from '@app/hooks';
import { Alert, BackHandler, Keyboard } from 'react-native';
import HouseInfo from '@app/screens/HouseFire/HouseInfo';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import HouseInputUser from '@app/screens/HouseFire/HouseInputUser';
import { useGlobalState } from '@app/context';
import moment from 'moment';
import {
  termsTermsa1,
  termsTermsa2,
  termsTermsa3,
  termsTermsa4,
  termsTermsa5,
  termsTermsb1,
  termsTermsb2,
  termsTermsb3,
  termsTermsc1,
  termsTermsc2,
  termsTermsc3,
  termsTermsc4,
  termsTermsc5,
  termsTermsf1,
  termsTermsSd,
} from '@app/lib/html';
import HousePayWay from '@app/screens/HouseFire/HousePayWay';
import { DefaultAlert } from '@app/components';

export type TermsNames =
  | string
  | 'TERMSA_1' // 개인(신용)정보 사전/수집이용에 관한 사항(필수)
  | 'TERMSA_2' // 개인(신용)정보의 조회에 관한사항(필수)
  | 'TERMSA_3' // 개인 (신용)정보의 제공에 관한 사항(필수)
  | 'TERMSA_4' // 민감정보 및 고유 식별정보의 처리에 관한 사항(필수)
  | 'TERMSA_5' // 보험가입동의(필수)
  | 'TERMSB_1' // 개인(신용)정보의 수집/이용에 관한 사항
  | 'TERMSB_2' // 개인(신용)정보의제공에 관한 사항
  | 'TERMSB_3' // 개인(신용)정보 조회에 대한 사항(선택)
  | 'TERMSC_1' // 전자 금융거래 이용약관 동의(필수)
  | 'TERMSC_2' // 개인(신용)정보의 수집이용조회및 제공동의(필수)
  | 'TERMSC_3' // 개인(신용)정보제공에 대한 사항(필수)
  | 'TERMSC_4' // 민감정보(필수)
  | 'TERMSC_5' // 전자금융 거래약관(필수)
  | 'TERMSD_1' //보험상품 가입시 확인사항
  | 'TERMSD_2' // 상품보장 내용 설명
  | 'TERMSD_3' // 보험약관 확인
  | 'TERMSE_1' // 기타 설명 (필수)
  | 'TERMSE_2' // 해지사고접수안내 (필수)
  | 'TERMSE_3' // 통신수단 해지 동의 (필수)
  | 'TERMSF_1' // 단체 보험 가입시 동의 사항 - 단체 보험규약서(필수)
  | 'TERMSG_1'; // 전자서명에 대한동의
export type TermsChildTypes = {
  title: string;
  name: TermsNames | string;
  isChecked: number;
  html: any;
};
export type TermsTypes = {
  TERMSA_1: TermsChildTypes;
  TERMSA_2: TermsChildTypes;
  TERMSA_3: TermsChildTypes;
  TERMSA_4: TermsChildTypes;
  TERMSA_5: TermsChildTypes;
  TERMSB_1: TermsChildTypes;
  TERMSB_2: TermsChildTypes;
  TERMSB_3: TermsChildTypes;
  TERMSC_1: TermsChildTypes;
  TERMSC_2: TermsChildTypes;
  TERMSC_3: TermsChildTypes;
  TERMSC_4: TermsChildTypes;
  TERMSC_5: TermsChildTypes;
  TERMSD_1: TermsChildTypes;
  TERMSD_2: TermsChildTypes;
  TERMSD_3: TermsChildTypes;
  TERMSE_1: TermsChildTypes;
  TERMSE_2: TermsChildTypes;
  TERMSE_3: TermsChildTypes;
  TERMSF_1: TermsChildTypes;
  TERMSG_1: TermsChildTypes;
};

export type HouseFireStateName =
  | 'stepperTitle' //step 타이틀 네임
  | 'stepNumber' // step숫자
  | 'joinType' //가입타임 T=단체 S=세대
  | 'selectType' //선택한 가입타입 세대 | 단체
  | 'houseStep' //주택화재 가입 스텝
  | 'addressCommon' // 주소검색후 나온 주소의 common데이터
  | 'addressErrorMessage' //주소검색후 서버로부터 받는 에러메세지
  | 'addressData' // 주소검색후 나온 주소의 datas
  | 'isKeybordView' //키보드가 올라와있는상태인지 체크
  | 'selectAddress' //최종적으로 주소를 선택한뒤 서버에서부터 받아온 datas (세대or단체)
  | 'isDetailModal' // 세대별 가입시에 주소를 선택하면 동호를 선택할수있는 모달페이지 flag
  | 'sedeAddress' //세대가입일때 주소선택시 받아오는 데이터
  | 'loading'
  | 'resultDongList' //세대별가입일때 주소의 동 리스트
  | 'resultDong' //세대별가입일때 선택한 주소의 동
  | 'resultDetailList' //세대별가입일때 주소의 호 리스트
  | 'resultDetail' //세대별가입일때 선택한 주소의 호
  | 'infoTitle' //안내모달 타이틀
  | 'infoContents' // 안내모달 컨텐츠
  | 'isInfoModal' // 안내모달 flag
  | 'dancheJoin' //단체보험의 가입유무
  | 'selectInsuCompany' // 선택한 보험사
  | 'lat' //로드뷰를 표시하기위한 lat
  | 'owner' //보험목적물 소유구분
  | 'contractInsuInfo' //계약정보
  | 'insFrom' // 보험시작일
  | 'termsModal'
  | 'terms' // 이용약관
  | 'termsName' //선택한 이용약관
  | 'termsHtml' // 이용약관 html
  | 'lng' //로드뷰를 표시하기위한 lag
  | 'payway'
  | 'termsPdf'
  | 'selectCard'
  | 'vbankInfo'
  | 'insuCertificateModal'
  | 'vbankResult';

export type HouseFireStateTypes = {
  stepperTitle: string;
  stepNumber: number;
  isKeybordView: boolean;
  addressCommon: {};
  addressData: [];
  selectAddress: any;
  sedeAddress: any;
  loading: boolean;
  isDetailModal: boolean;
  addressErrorMessage: any;
  joinType: Array<{ title: string; value: 'T' | 'S' }>;
  houseStep: {
    id:
      | 'joinType'
      | 'address'
      | 'info'
      | 'evaluation'
      | 'priceConfirm'
      | 'InputUser'
      | 'HouseTermsUse'
      | 'HouseConfirm'
      | 'HouseContractTerms'
      | 'HousePayWay'
      | 'HousePay'
      | 'HouseFinal';
    title: string;
    backgroundcolor: ColorName;
  }[];
  selectType: any;
  selectInsuCompany: string;
  lat: string;
  lng: string;
  resultDongList: Array<any>;
  resultDong: any;
  resultDetailList: Array<any>;
  resultDetail: any;
  isInfoModal: boolean;
  infoTitle: string;
  infoContents: any;
  contractInsuInfo: any;
  owner: 'o' | 'r';
  insFrom: any;
  dancheJoin: 'Y' | 'N';
  payway: 'card' | 'bank' | '';
  termsModal: boolean;
  insuCertificateModal: boolean;
  terms: TermsTypes;
  termsName: TermsNames | string;
  termsHtml: any;
  termsPdf: boolean;
  selectCard: any;
  vbankInfo: any;
  vbankResult: any;
};
export type HouseFireInputStateTypes = {
  searchInput: any;
};

type ActionTypes =
  | { type: 'CHANGE'; name: HouseFireStateName; value: any }
  | { type: 'TERMS_CHANGE'; name: TermsNames; value: any };

function reducer(state: HouseFireStateTypes, action: ActionTypes) {
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

const terms = {
  TERMSA_1: {
    name: 'TERMSA_1',
    title: '개인 (신용)정보의 사전 수집/이용에 관한 사항',
    isChecked: 0,
    html: termsTermsa1(),
  },
  TERMSA_2: {
    name: 'TERMSA_2',
    title: '개인 (신용)정보의 조회에 관한사항',
    isChecked: 0,
    html: termsTermsa2(),
  },
  TERMSA_3: {
    name: 'TERMSA_3',
    title: '개인 (신용)정보의 제공에 관한사항',
    isChecked: 0,
    html: termsTermsa3(),
  },
  TERMSA_4: {
    name: 'TERMSA_4',
    title: '민감정보 및 고유식별정보의 처리에 관한 사항',
    isChecked: 0,
    html: termsTermsa4(),
  },
  TERMSA_5: {
    name: 'TERMSA_5',
    title: '보험가입동의',
    isChecked: 0,
    html: termsTermsa5(),
  },
  TERMSB_1: {
    name: 'TERMSB_1',
    title: '개인 (신용)정보의 수집/이용에 관한 사항',
    isChecked: 0,
    html: termsTermsb1(),
  },
  TERMSB_2: {
    name: 'TERMSB_2',
    title: '개인 (신용)정보의 제공에 관한 사항',
    isChecked: 0,
    html: termsTermsb2(),
  },
  TERMSB_3: {
    name: 'TERMSB_3',
    title: '개인 (신용)정보 조회에 대한 사항',
    isChecked: 0,
    html: termsTermsb3(),
  },
  TERMSC_1: {
    name: 'TERMSC_1',
    title: '개인(신용)정보의 수집/이용에 관한 사항',
    isChecked: 0,
    html: termsTermsc1(),
  },
  TERMSC_2: {
    name: 'TERMSC_2',
    title: '개인(신용)정보의 조회에 관한 사항',
    isChecked: 0,
    html: termsTermsc2(),
  },
  TERMSC_3: {
    name: 'TERMSC_3',
    title: '개인(신용)정보 제공에 대한 사항',
    isChecked: 0,
    html: termsTermsc3(),
  },
  TERMSC_4: {
    name: 'TERMSC_4',
    title: '민감정보 및 고유식별정보의 처리에 관한 사항',
    isChecked: 0,
    html: termsTermsc4(),
  },
  TERMSC_5: {
    name: 'TERMSC_5',
    title: '전자금융거래 이용약관 동의',
    isChecked: 0,
    html: termsTermsc5(),
  },
  TERMSD_1: {
    name: 'TERMSD_1',
    title: '보험상품 가입시 확인사항',
    isChecked: 0,
    html: termsTermsa1(),
  },
  TERMSD_2: {
    name: 'TERMSD_2',
    title: '상품보장 내용 설명',
    isChecked: 0,
    html: termsTermsa1(),
  },
  TERMSD_3: {
    name: 'TERMSD_3',
    title: '보험약관 확인',
    isChecked: 0,
    html: termsTermsa1(),
  },
  TERMSE_1: {
    name: 'TERMSE_1',
    title: '기타설명',
    isChecked: 0,
    html: termsTermsSd(),
  },
  TERMSE_2: {
    name: 'TERMSE_2',
    title: '해지 사고 접수 안내',
    isChecked: 0,
    html: termsTermsSd(),
  },
  TERMSE_3: {
    name: 'TERMSE_3',
    title: '통지수단 해지 동의',
    isChecked: 0,
    html: termsTermsSd(),
  },
  TERMSF_1: {
    name: 'TERMSF_1',
    title: '단체보험규약서',
    isChecked: 0,
    html: termsTermsf1(),
  },
  TERMSG_1: {
    name: 'TERMSG_1',
    title: '자필서명을 전자서명 [휴대본본인인증]으로 대체함에 동의하십니까?',
    isChecked: 0,
    html: termsTermsa1(),
  },
};

const initialState: HouseFireStateTypes = {
  stepperTitle: '가입유형',
  isKeybordView: false,
  stepNumber: 0,
  loading: false,
  addressCommon: {},
  addressData: [],
  addressErrorMessage: '',
  selectAddress: {},
  sedeAddress: {},
  joinType: [
    { title: '단체 가입 보험료 확인', value: 'T' },
    { title: '세대 가입 보험료 확인', value: 'S' },
  ],
  lat: '',
  lng: '',
  selectType: 0,
  selectInsuCompany: '',
  isDetailModal: false,
  resultDongList: [],
  resultDong: '',
  resultDetailList: [],
  resultDetail: {},
  isInfoModal: false,
  infoTitle: '',
  infoContents: '',
  dancheJoin: 'N',
  owner: 'o',
  contractInsuInfo: {},
  terms,
  termsModal: false,
  termsName: '',
  termsHtml: '',
  termsPdf: false,
  payway: '',
  selectCard: '',
  vbankInfo: undefined,
  insuCertificateModal: false,
  insFrom: moment(new Date()).format('YYYY-MM-DD'),
  vbankResult: undefined,
  houseStep: [
    {
      id: 'joinType',
      title: '가입유형',
      backgroundcolor: 'SKYBLUE',
    },
    {
      id: 'address',
      title: '주소찾기',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'info',
      title: '기본정보',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'evaluation',
      title: '평가정보',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'priceConfirm',
      title: '보험료 확인',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'InputUser',
      title: '보험계약자 정보',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'HouseTermsUse',
      title: '이용약관',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'HouseConfirm',
      title: '이용약관',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'HouseContractTerms',
      title: '청약 확인약관 동의',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'HousePayWay',
      title: '결제방법 선택',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'HousePay',
      title: '결제',
      backgroundcolor: 'SOFTGRAY',
    },
    {
      id: 'HouseFinal',
      title: '결제완료',
      backgroundcolor: 'SOFTGRAY',
    },
  ],
};

export default function HouseFireContainer() {
  const navigation: any = useNavigation();
  const globalState = useGlobalState();
  const [state, dispatch] = useReducer(reducer, initialState);
  const scrollRef: any = useRef(null);
  const GEO_CORDING_URL = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${state.selectAddress.address}`;
  const GEO_CORDING_ID = 'inselh2wtl';
  const GEO_CORDING_KEY = 'OPjA2JmsSCweRxKFpHX1qyfzDGrxgSSI9yL6Duta';
  const inputState = {
    searchInput: useInput(''),
  };

  const onChangeState = (name: HouseFireStateName, value: any) => {
    dispatch({ type: 'CHANGE', name, value });
  };

  const onChangeTermsState = (name: TermsNames, value: any) => {
    dispatch({ type: 'TERMS_CHANGE', name, value });
  };

  //가입유형 다음 버튼
  const handleJoinTypeNextButton = () => {
    if (state.stepNumber !== state.houseStep.length) {
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
        if (state.selectInsuCompany === '') {
          Toast.show('보험상품을 선택해주세요.');
          return null;
        } else if (!globalState.isLogin) {
          navigation.navigate('LOGIN', { isHome: false });
          return null;
        } else {
          handleJoinTypeNextButton();
          return null;
        }
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
      case 11: {
        handleJoinTypeNextButton();
        return null;
      }
      case 12: {
        navigation.navigate('MAIN_STACK');
        return null;
      }
      // default:
      //   handleJoinTypeNextButton();
      //   return null;
    }
  };

  // 스텝별 bottom 이전 button 분기
  const handlePreviousButton = () => {
    Keyboard.dismiss();
    scrollRef.current?.scrollTo({ x: screenWidth() * (state.stepNumber - 2), animated: true });
    onChangeState('stepNumber', state.stepNumber - 1);
    if (state.stepNumber === 3) {
      onChangeState('selectAddress', {});
      onChangeState('lat', '');
      onChangeState('lng', '');
    } else if (state.stepNumber === 5) {
      onChangeState('selectInsuCompany', '');
    }
  };

  //건물 보험료
  const resultBuildPrice = () => {
    let result = 0;
    const newBuildList: any = [];
    state?.selectAddress?.premiums?.map((item) => {
      if (item.item_id === 'BFRE' || item.item_id === 'BDRG' || item.item_id === 'BGLS' || item.item_id === 'BCMP') {
        newBuildList.push(item);
      }
    });
    newBuildList.map((item: any) => {
      if (item.aply_yn === 'Y' && item.already_group_ins === state?.selectAddress.already_group_ins) {
        result = result + item.premium;
      }
    });
    return floorPrice(result);
  };
  //가재도구 보험료
  const resultGajePrice = () => {
    let result = 0;
    const newBuildList: any = [];
    state?.selectAddress?.premiums?.map((item) => {
      if (item.item_id === 'KFRE' || item.item_id === 'KLCK' || item.item_id === 'KDRG' || item.item_id === 'KSTL') {
        newBuildList.push(item);
      }
    });
    newBuildList.map((item: any) => {
      if (item.aply_yn === 'Y' && item.already_group_ins === state?.selectAddress.already_group_ins) {
        result = result + item.premium;
      }
    });
    return floorPrice(result);
  };

  //terms모달 승인
  const onClickTermsModalAgree = () => {
    onChangeTermsState(state.termsName, 1);
    onChangeState('termsModal', false);
    onChangeState('termsName', '');
    onChangeState('termsPdf', false);
  };

  //terms모달 오픈
  const onClickTermsModalOpen = (name, html) => {
    if (state.terms[name]?.isChecked !== undefined && state.terms[name]?.isChecked === 0) {
      onChangeState('termsName', name);
      onChangeState('termsModal', true);
      onChangeState('termsHtml', html);
    } else {
      onChangeTermsState(name, 0);
    }
  };

  //terms 모두동의
  const onClickAllCheck = (list, isActive) => {
    if (isActive) {
      list?.map((item) => {
        onChangeTermsState(item, 0);
      });
    } else {
      list?.map((item) => {
        onChangeTermsState(item, 1);
      });
    }
  };

  //houseStep 스텝별 컴퍼넌트 셋팅
  const returnComponent = (
    id:
      | 'joinType'
      | 'address'
      | 'info'
      | 'evaluation'
      | 'priceConfirm'
      | 'InputUser'
      | 'HouseTermsUse'
      | 'HouseConfirm'
      | 'HouseContractTerms'
      | 'HousePay'
      | 'HouseFinal'
      | 'HousePayWay'
  ) => {
    switch (id) {
      case 'joinType':
        return <JoinType key={id} state={state} onChangeState={onChangeState} handleNextButton={handleNextButton} />;
      case 'address':
        return (
          <HouseAddress
            key={id}
            state={state}
            inputState={inputState}
            onChangeState={onChangeState}
            handleJoinTypeNextButton={handleJoinTypeNextButton}
          />
        );
      case 'info':
        return (
          <HouseInfo
            key={id}
            state={state}
            inputState={inputState}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
          />
        );
      case 'evaluation':
        return (
          <HouseEvaluation
            state={state}
            inputState={inputState}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
            resultBuildPrice={resultBuildPrice}
            resultGajePrice={resultGajePrice}
          />
        );
      case 'priceConfirm':
        return (
          <HouseResult
            state={state}
            inputState={inputState}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
            resultBuildPrice={resultBuildPrice}
            resultGajePrice={resultGajePrice}
          />
        );
      case 'InputUser':
        return (
          <HouseInputUser
            state={state}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
          />
        );
      case 'HouseTermsUse':
        return (
          <HouseTermsUse
            state={state}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
            onChangeTermsState={onChangeTermsState}
            onClickTermsModalAgree={onClickTermsModalAgree}
            onClickTermsModalOpen={onClickTermsModalOpen}
            onClickAllCheck={onClickAllCheck}
          />
        );
      case 'HouseConfirm':
        return (
          <HouseConfirm
            state={state}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
            onChangeTermsState={onChangeTermsState}
            onClickTermsModalAgree={onClickTermsModalAgree}
            onClickTermsModalOpen={onClickTermsModalOpen}
            onClickAllCheck={onClickAllCheck}
            resultBuildPrice={resultBuildPrice}
            resultGajePrice={resultGajePrice}
          />
        );
      case 'HouseContractTerms':
        return (
          <HouseContractTerms
            state={state}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
            onChangeTermsState={onChangeTermsState}
            onClickTermsModalAgree={onClickTermsModalAgree}
            onClickTermsModalOpen={onClickTermsModalOpen}
            onClickAllCheck={onClickAllCheck}
            resultBuildPrice={resultBuildPrice}
            resultGajePrice={resultGajePrice}
          />
        );
      case 'HousePayWay':
        return (
          <HousePayWay
            state={state}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
            onClickTermsModalOpen={onClickTermsModalOpen}
            resultBuildPrice={resultBuildPrice}
            resultGajePrice={resultGajePrice}
          />
        );
      case 'HousePay':
        return (
          <HousePay
            state={state}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
            onChangeTermsState={onChangeTermsState}
            onClickTermsModalAgree={onClickTermsModalAgree}
            onClickTermsModalOpen={onClickTermsModalOpen}
            onClickAllCheck={onClickAllCheck}
            resultBuildPrice={resultBuildPrice}
            resultGajePrice={resultGajePrice}
          />
        );
      case 'HouseFinal':
        return (
          <HouseFinal
            state={state}
            onChangeState={onChangeState}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handleNextButton}
            onChangeTermsState={onChangeTermsState}
            onClickTermsModalAgree={onClickTermsModalAgree}
            onClickTermsModalOpen={onClickTermsModalOpen}
            onClickAllCheck={onClickAllCheck}
            resultBuildPrice={resultBuildPrice}
            resultGajePrice={resultGajePrice}
          />
        );
    }
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

  const _keyboardDidShow = () => {
    onChangeState('isKeybordView', true);
  };

  const _keyboardDidHide = () => {
    onChangeState('isKeybordView', false);
  };

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

  //안드로이드 백버튼 핸들러
  useEffect(() => {
    const backAction = () => {
      DefaultAlert({ title: '알림', msg: '메인페이지로 돌아 가시겠습니까?', okPress: () => navigation.goBack() });
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <HouseFirePresenter
      state={state}
      scrollRef={scrollRef}
      returnComponent={returnComponent}
      onChangeState={onChangeState}
    />
  );
}
