import React, { useEffect, useReducer, useRef } from 'react';
import { errorToast, screenWidth, sortArray } from '@app/lib';
import { HouseAddress, HouseEvaluation, JoinType } from '@app/screens';
import { ColorName } from 'styled-components';
import HouseFirePresenter from './HouseFirePresenter';
import { useInput } from '@app/hooks';
import { Keyboard } from 'react-native';
import { insuApis } from '@app/api/Insurance';
import HouseInfo from '@app/screens/HouseFire/HouseInfo';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

export type HouseFireStateName =
  | 'stepperTitle'
  | 'stepNumber'
  | 'joinType'
  | 'selectType'
  | 'houseStep'
  | 'addressCommon'
  | 'addressErrorMessage'
  | 'addressData'
  | 'isKeybordView'
  | 'selectAddress'
  | 'isDetailModal'
  | 'sedeAddress'
  | 'loading'
  | 'resultDongList'
  | 'resultDong'
  | 'resultDetailList'
  | 'resultDetail'
  | 'lat'
  | 'lng'
  | 'currentPage';

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
  lat: string;
  lng: string;
  resultDongList: Array<any>;
  resultDong: any;
  resultDetailList: Array<any>;
  resultDetail: any;
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
  isDetailModal: false,
  resultDongList: [],
  resultDong: '',
  resultDetailList: [],
  resultDetail: {},
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
      default:
        throw new Error('wrong name');
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
    }
  };

  //주소검색후 선택시 도는 로직
  const SelectAddress = (item) => {
    onChangeState('resultDong', '');
    onChangeState('resultDetail', '');
    onChangeState('resultDongList', []);
    onChangeState('resultDetailList', []);
    const params = {
      sigungucd: item.admCd?.slice(0, 5),
      bjdongcd: item.admCd?.slice(5),
      bun: Number(item?.lnbrMnnm),
      ji: Number(item?.lnbrSlno),
    };
    if (state.selectType === 'T') {
      onChangeState('loading', true);
      insuApis
        .getDancheInfo(params)
        .then((res) => {
          onChangeState('selectAddress', res);
          onChangeState('loading', false);
          handleJoinTypeNextButton();
        })
        .catch((e) => {
          errorToast(e, 'getDancheInfo');
          onChangeState('loading', false);
        });
    } else {
      onChangeState('loading', true);
      onChangeState('sedeAddress', item);
      insuApis
        .getSedeCover(params)
        .then((res) => {
          console.log(res, '123123123');
          const newCover: any = [];
          res?.map((i: any) => {
            if (i.hhldCnt > 0) {
              const newItem = {
                label: i.dongNm === '' ? i.bldNm : i.dongNm,
                value: i,
              };
              return newCover.push(newItem);
            }
          });
          onChangeState('resultDongList', sortArray(newCover, 'label'));
          onChangeState('loading', false);
          onChangeState('isDetailModal', true);
        })
        .catch((e) => {
          errorToast(e, 'getSedeCover');
          onChangeState('resultDongList', []);
          onChangeState('loading', false);
        });
    }
  };

  //주소찾기 상세정보 동 셀렉트박스
  const handleSelectDong = (value) => {
    onChangeState('loading', true);
    onChangeState('resultDong', value);
    onChangeState('resultDetailList', []);
    if (value !== undefined && value !== '') {
      const params = {
        sigungucd: state.sedeAddress.admCd?.slice(0, 5),
        bjdongcd: state.sedeAddress.admCd?.slice(5),
        bun: Number(state.sedeAddress?.lnbrMnnm),
        ji: Number(state.sedeAddress?.lnbrSlno),
        dongnm: value.dongNm,
      };

      insuApis
        .getSedeDetail(params)
        .then((res) => {
          const newDetail: any = [];
          res?.map((item) => {
            if (item.hoNm !== '' && item.hoNm !== undefined) {
              const newItem = {
                label: String(item.hoNm),
                value: item,
              };
              return newDetail.push(newItem);
            }
          });
          onChangeState('resultDetailList', sortArray(newDetail, 'label'));
          onChangeState('loading', false);
        })
        .catch((e) => {
          errorToast(e, 'getSedeDetail');
          onChangeState('resultDetailList', []);
          onChangeState('loading', false);
        });
    } else {
      onChangeState('resultDetailList', []);
      onChangeState('loading', false);
    }
  };

  //주소 찾기 상세정보 호수 셀렉트
  const handleSelectDetail = (value: any) => {
    onChangeState('resultDetail', value);
  };

  //주소찾기 상세정보 최종 제출
  const submitAddressDetail = () => {
    onChangeState('loading', true);
    if (state.resultDong === '') {
      Toast.show('동을 선택해주세요.');
    } else if (state.resultDetail === '') {
      Toast.show('호를 선택해주세요');
    } else {
      const data = {
        cover: state.resultDong,
        detail: state.resultDetail,
      };
      insuApis
        .getSedeInfo(data)
        .then((res) => {
          onChangeState('selectAddress', res);
          handleJoinTypeNextButton();
          onChangeState('isDetailModal', false);
          onChangeState('loading', false);
        })
        .catch((e) => {
          errorToast(e, 'getSedeInfo');
          onChangeState('isDetailModal', false);
          onChangeState('loading', false);
        });
    }
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
            SelectAddress={SelectAddress}
            handleSelectDong={handleSelectDong}
            handleSelectDetail={handleSelectDetail}
            submitAddressDetail={submitAddressDetail}
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

  return <HouseFirePresenter state={state} scrollRef={scrollRef} returnComponent={returnComponent} />;
}
