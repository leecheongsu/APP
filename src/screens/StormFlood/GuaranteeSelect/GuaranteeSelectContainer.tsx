import React from 'react';
import { insuApis } from '@app/api/Insurance';
import { useGlobalDispatch } from '@app/context';
import { EmptyLayout } from '@app/layout';
import { handleApiError } from '@app/lib';
import { Alert } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import GuaranteeSelectPresenter from './GuaranteeSelectPresenter';
import { InputStateTypes, StormFloodStateTypes, StormFloodName } from '@app/screens/StormFlood/StormFloodContainer';

type GuaranteeSelectContainerTypes = {
  state: StormFloodStateTypes;
  handlePreviousButton: () => void;
  onChangeState: (name: StormFloodName, value: any) => void;
  openInfoModal: (title: any, contents: any) => void;
  handleNextButton: () => null | undefined;
  inputState: InputStateTypes;
};
export default function GuaranteeSelectContainer({
  state,
  onChangeState,
  handleNextButton,
  handlePreviousButton,
  openInfoModal,
  inputState,
}: GuaranteeSelectContainerTypes) {
  const globalDispatch = useGlobalDispatch();
  const sumPrice =
    (state.selectBuildingPrice?.key_name === undefined ? 0 : Number(state.selectBuildingPrice?.key_name)) +
    (state.selectFacilityprice?.key_name === undefined ? 0 : Number(state.selectFacilityprice?.key_name));
  //체크로직
  const checkInput = () => {
    if (inputState.buildName.value === '') {
      SimpleToast.show('상호명을 입력해주세요.');
      return false;
    } else if (inputState.bldFloor1.value === '') {
      SimpleToast.show('시작층을 입력해주세요.');
      return false;
    } else if (inputState.bldFloor2.value === '') {
      SimpleToast.show('끝 층을 입력해주세요.');
      return false;
    } else if (inputState.hsArea.value === '') {
      SimpleToast.show('면적을 입력해주세요.');
      return false;
    } else if (state.selectSector === '') {
      SimpleToast.show('업종을 선택해주세요.');
      return false;
    } else if (state?.possessionDivision !== '임차자' && state.selectBuildingPrice === '') {
      SimpleToast.show('건물 가격을 선택해주세요');
      return false;
    } else if (state.selectFacilityprice === '') {
      SimpleToast.show('시설(기계)및 집기 가격을 선택해주세요');
      return false;
    } else if (state.selectInventoryPrice === '') {
      SimpleToast.show('재고자산을 선택해주세요.');
      return false;
    } else if (state.selectSelfPrice === '') {
      SimpleToast.show('자기부담금을 선택해주세요.');
      return false;
    } else {
      return true;
    }
  };

  //다음버튼
  const nextButton = () => {
    if (checkInput()) {
      const data = {
        data: {
          ...state.selectAddress.ww_info,
          oagi6002vo: {
            ...state.selectAddress?.ww_info?.oagi6002vo,
            hsArea: inputState.hsArea.value,
            objCat: state.stuffDivision === '일반' ? '2' : '4',
            bldFloors1: inputState.bldFloor1.value,
            bldFloors2: inputState.bldFloor2.value,
            lobzCd: state.selectSector?.code,
            gitdTarifCat1: state.selectSelfPrice?.key_name,
            objTypCd1: state.selectBuildingPrice?.key_name === undefined ? 'N' : 'Y',
            objTypCd2: 'Y',
            objTypCd3: state.selectInventoryPrice.val_name === '미가입' ? 'N' : 'Y',
            elagOrgnInsdAmt1:
              state.selectBuildingPrice?.key_name === undefined ? '0' : state.selectBuildingPrice?.key_name,
            elagOrgnInsdAmt2: state.selectFacilityprice?.key_name,
            elagOrgnInsdAmt3: state.selectInventoryPrice?.key_name,
            objAddr2: `${state.selectAddress.ww_info.oagi6002vo.objAddr2} ${inputState.buildName.value}`,
          },
        },
      };
      globalDispatch({ type: 'CHANGE', name: 'postWwPremium', value: data });
      onChangeState('loading', true);
      insuApis
        .postWwPrePremium(data)
        .then((res) => {
          if (res.status === 200) {
            onChangeState('loading', false);
            onChangeState('resultPrice', res.data);
            handleNextButton();
          } else {
            onChangeState('loading', false);

            SimpleToast.show(`${res.status}`);
          }
        })
        .catch((e) => {
          onChangeState('loading', false);
          handleApiError(e.response);
        });
    }
  };

  //건물 셀렉트박스 핸들러
  const handleBuildingPriceSelect = (value) => {
    if (state.stuffDivision === '일반' && sumPrice > 100000000) {
      Alert.alert('알림', '일반 물건은 건물 금액과 시설(기계) 및 집기 금액의 합계 금액이 1억원을 넘을 수 없습니다.');
      onChangeState('selectBuildingPrice', '');
      return;
    } else if (state.stuffDivision === '공장' && sumPrice > 150000000) {
      Alert.alert(
        '알림',
        '공장  물건은 건물 금액과 시설(기계) 및 집기 금액의 합계 금액이 1억5천만원을 넘을 수 없습니다.'
      );
      onChangeState('selectBuildingPrice', '');
      return;
    } else {
      onChangeState('selectBuildingPrice', value);
    }
  };

  // 시설집기 셀렉트박스 핸들러
  const handleFacilityPriceSelect = (value) => {
    if (state.stuffDivision === '일반' && sumPrice > 100000000) {
      Alert.alert('알림', '일반 물건은 건물 금액과 시설(기계) 및 집기 금액의 합계 금액이 1억원을 넘을 수 없습니다.');
      onChangeState('selectFacilityprice', '');
      return;
    } else if (state.stuffDivision === '공장' && sumPrice > 150000000) {
      Alert.alert(
        '알림',
        '공장  물건은 건물 금액과 시설(기계) 및 집기 금액의 합계 금액이 1억5천만원을 넘을 수 없습니다.'
      );
      onChangeState('selectFacilityprice', '');
      return;
    } else {
      onChangeState('selectFacilityprice', value);
    }
  };

  //업종 셀렉트 박스 핸들러
  const handleSectorSelect = (value) => {
    onChangeState('selectSector', value);
  };

  //자기부담금 셀렉트 박스 핸들러
  const handleselfPriceSelect = (value) => {
    onChangeState('selectSelfPrice', value);
  };

  //재고자산 셀렉트 박스 핸들러
  const handleInventoryPriceSelect = (value) => {
    onChangeState('selectInventoryPrice', value);
  };

  if (state.stepNumber === 5) {
    return (
      <GuaranteeSelectPresenter
        state={state}
        nextButton={nextButton}
        onChangeState={onChangeState}
        handlePreviousButton={handlePreviousButton}
        openInfoModal={openInfoModal}
        handleSectorSelect={handleSectorSelect}
        handleBuildingPriceSelect={handleBuildingPriceSelect}
        handleFacilityPriceSelect={handleFacilityPriceSelect}
        handleselfPriceSelect={handleselfPriceSelect}
        handleInventoryPriceSelect={handleInventoryPriceSelect}
        inputState={inputState}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
