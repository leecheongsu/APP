import React, { useEffect, useReducer, useRef } from 'react';
import { floorPrice, screenWidth } from '@app/lib';
import { HouseAddress, HouseEvaluation, HouseResult, JoinType } from '@app/screens';
import { ColorName } from 'styled-components';
import HouseFirePresenter from './HouseFirePresenter';
import { useInput } from '@app/hooks';
import { Keyboard } from 'react-native';
import HouseInfo from '@app/screens/HouseFire/HouseInfo';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

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
  | 'lng'; //로드뷰를 표시하기위한 lag

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
  addressErrorMessage: '';
  joinType: Array<{ title: string; value: 'T' | 'S' }>;
  houseStep: {
    id: 'joinType' | 'address' | 'info' | 'evaluation' | 'priceConfirm';
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
  dancheJoin: 'Y' | 'N';
};
export type HouseFireInputStateTypes = {
  searchInput: any;
};

type ActionTypes = { type: 'CHANGE'; name: HouseFireStateName; value: any };

function reducer(state: HouseFireStateTypes, action: ActionTypes) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
  }
}

const initialState: HouseFireStateTypes = {
  stepperTitle: '가입유형',
  isKeybordView: false,
  stepNumber: 1,
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
  ],
};

export default function HouseFireContainer() {
  const navigation: any = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const scrollRef: any = useRef(null);

  const inputState = {
    searchInput: useInput(''),
  };

  const onChangeState = (name: HouseFireStateName, value: any) => {
    dispatch({ type: 'CHANGE', name, value });
  };

  //가입유형 다음 버튼
  const handleJoinTypeNextButton = () => {
    if (state.selectType === 0) {
      Toast.show('가입유형을 선택해 주세요.');
    } else {
      if (state.stepNumber !== state.houseStep.length) {
        scrollRef.current?.scrollTo({ x: screenWidth() * state.stepNumber, animated: true });
        onChangeState('stepNumber', state.stepNumber + 1);
      }
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
      case 3: {
        handleJoinTypeNextButton();
        return null;
      }
      case 5: {
        if (state.selectInsuCompany === '') {
          Toast.show('보험상품을 선택해주세요.');
        } else {
          handleJoinTypeNextButton();
        }

        return null;
      }
      default:
        handleJoinTypeNextButton();
        return null;
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

  //houseStep 스텝별 컴퍼넌트 셋팅
  const returnComponent = (id: 'joinType' | 'address' | 'info' | 'evaluation' | 'priceConfirm') => {
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
    }
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

  const _keyboardDidShow = () => {
    onChangeState('isKeybordView', true);
  };

  const _keyboardDidHide = () => {
    onChangeState('isKeybordView', false);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
