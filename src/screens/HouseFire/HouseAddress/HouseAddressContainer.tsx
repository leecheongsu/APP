import {
  HouseFireInputStateTypes,
  HouseFireStateName,
  HouseFireStateTypes,
} from '@app/screens/HouseFire/HouseFireContainer';
import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';
import HouseAddressPresenter from './HouseAddressPresenter';
import { insuApis } from '@app/api/Insurance';
import { useAsync } from '@app/hooks';
import { errorToast, sortArray } from '@app/lib';
import Toast from 'react-native-simple-toast';

type HouseAddressContainerTypes = {
  state: HouseFireStateTypes;
  inputState: HouseFireInputStateTypes;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  handleJoinTypeNextButton: () => void;
};

export default function HouseAddressContainer({
  state,
  inputState,
  onChangeState,
  handleJoinTypeNextButton,
}: HouseAddressContainerTypes) {
  const [getAddress, getAddressDispatch] = useAsync(
    () => insuApis.getAddress({ search: inputState.searchInput.value }),
    [],
    true
  );

  //주소 선택시 도는 로직
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
          onChangeState('selectAddress', res.data);
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
          const newCover: any = [];
          res?.data?.map((i: any) => {
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
          res?.data?.map((item) => {
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
    if (state.resultDong === '') {
      Toast.show('동을 선택해주세요.');
    } else if (state.resultDetail === '') {
      Toast.show('호를 선택해주세요');
    } else {
      onChangeState('loading', true);
      const data = {
        cover: state.resultDong,
        detail: state.resultDetail,
      };
      insuApis
        .getSedeInfo(data)
        .then((res) => {
          onChangeState('selectAddress', res.data);
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

  //주소검색
  const submitSearchAddress = () => {
    Keyboard.dismiss();
    onChangeState('addressErrorMessage', '');
    getAddressDispatch();
  };

  useEffect(() => {
    if (getAddress.data?.data?.results !== undefined) {
      const result = getAddress.data?.data?.results;
      onChangeState('addressCommon', result.common);
      onChangeState('addressData', result.juso);

      if (result.common.errorMessage !== '정상') {
        onChangeState('addressErrorMessage', result.common.errorMessage);
      } else if (result.common.totalCount === '0') {
        onChangeState('addressErrorMessage', '검색 결과가 없습니다.');
      } else {
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAddress]);

  return (
    <HouseAddressPresenter
      state={state}
      inputState={inputState}
      submitSearchAddress={submitSearchAddress}
      loading={getAddress.loading || state.loading}
      onChangeState={onChangeState}
      SelectAddress={SelectAddress}
      handleSelectDong={handleSelectDong}
      handleSelectDetail={handleSelectDetail}
      submitAddressDetail={submitAddressDetail}
    />
  );
}
