import { insuApis } from '@app/api/Insurance';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { EmptyLayout } from '@app/layout';
import { handleApiError } from '@app/lib';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { Value } from 'react-native-reanimated';
import SimpleToast from 'react-native-simple-toast';
import GuaranteeSelectPresenter from './GuaranteeSelectPresenter';
export default function GuaranteeSelectContainer({
  state,
  onChangeState,
  handleNextButton,
  onClickTermsModalOpen,
  handlePreviousButton,
  openInfoModal,
  inputState,
}) {
  const globalDispatch = useGlobalDispatch();
  const sumPrice =
    (state.selectBuildingPrice === '' ? 0 : state.selectBuildingPrice) +
    (state.selectFacilityprice === '' ? 0 : state.selectFacilityprice);
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
    } else if (state.selectBuildingPrice === '') {
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
            objTypCd1: 'Y',
            objTypCd2: 'Y',
            objTypCd3: state.selectInventoryPrice.val_name === '미가입' ? 'N' : 'Y',
            elagOrgnInsdAmt1: state.selectBuildingPrice?.key_name,
            elagOrgnInsdAmt2: state.selectFacilityprice?.key_name,
            elagOrgnInsdAmt3: state.selectInventoryPrice?.key_name,
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

  const handleSectorSelect = (value) => {
    onChangeState('selectSector', value);
  };

  const handleselfPriceSelect = (value) => {
    onChangeState('selectSelfPrice', value);
  };
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
        onClickTermsModalOpen={onClickTermsModalOpen}
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
