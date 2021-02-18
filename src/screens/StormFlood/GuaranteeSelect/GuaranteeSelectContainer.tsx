import { EmptyLayout } from '@app/layout';
import React from 'react';
import { Alert } from 'react-native';
import GuaranteeSelectPresenter from './GuaranteeSelectPresenter';
export default function GuaranteeSelectContainer({
  state,
  onChangeState,
  handleNextButton,
  onClickTermsModalOpen,
  handlePreviousButton,
  openInfoModal,
}) {
  const sumPrice =
    (state.selectBuildingPrice === '' ? 0 : state.selectBuildingPrice) +
    (state.selectFacilityprice === '' ? 0 : state.selectFacilityprice);

  const nextButton = () => {
    handleNextButton();
  };

  const handleSectorSelect = (value) => {
    onChangeState('selectSector', value);
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

  const handleselfPriceSelect = (value) => {
    onChangeState('selectSelfPrice', value);
  };
  const handleInventoryPriceSelect = (value) => {
    onChangeState('selectInventoryPrice', value);
  };

  const sectorItems = [
    { label: '휴게음식점', value: '휴게음식점' },
    { label: '일반음식점', value: '일반음식점' },
    { label: '세탁소', value: '세탁소' },
    { label: '의원', value: '의원' },
    { label: '수리점', value: '수리점' },
    { label: '여관/여인숙/유스호스텔', value: '여관/여인숙/유스호스텔' },
    { label: '시장', value: '시장' },
    { label: '일반판매시설', value: '일반판매시설' },
    { label: '소형판매시설', value: '소형판매시설' },
    { label: '목욕장', value: '목욕장' },
    { label: '컴퓨터게임장', value: '컴퓨터게임장' },
    { label: '유흥주점', value: '유흥주점' },
    { label: '창고시설', value: '창고시설' },
    { label: '화장장', value: '화장장' },
  ];

  const basicBuildingPriceItems = [
    { label: '3천만원', value: 30000000 },
    { label: '4천만원', value: 40000000 },
    { label: '5천만원', value: 50000000 },
    { label: '6천만원', value: 60000000 },
    { label: '7천만원', value: 70000000 },
    { label: '8천만원', value: 80000000 },
    { label: '9천만원', value: 90000000 },
    { label: '1억원', value: 100000000 },
  ];

  const factoryBuildingPriceItems = [
    { label: '3천만원', value: 30000000 },
    { label: '4천만원', value: 40000000 },
    { label: '5천만원', value: 50000000 },
    { label: '6천만원', value: 60000000 },
    { label: '7천만원', value: 70000000 },
    { label: '8천만원', value: 80000000 },
    { label: '9천만원', value: 90000000 },
    { label: '1억원', value: 100000000 },
    { label: '1억1천만원', value: 110000000 },
    { label: '1억2천만원', value: 120000000 },
    { label: '1억3천만원', value: 130000000 },
    { label: '1억4천만원', value: 140000000 },
    { label: '1억5천만원', value: 150000000 },
  ];

  const basicFacilityPriceItems = [
    { label: '3천만원', value: 30000000 },
    { label: '4천만원', value: 40000000 },
    { label: '5천만원', value: 50000000 },
    { label: '6천만원', value: 60000000 },
    { label: '7천만원', value: 70000000 },
    { label: '8천만원', value: 80000000 },
    { label: '9천만원', value: 90000000 },
    { label: '1억원', value: 100000000 },
  ];

  const factoryFacilityPriceItems = [
    { label: '3천만원', value: 30000000 },
    { label: '4천만원', value: 40000000 },
    { label: '5천만원', value: 50000000 },
    { label: '6천만원', value: 60000000 },
    { label: '7천만원', value: 70000000 },
    { label: '8천만원', value: 80000000 },
    { label: '9천만원', value: 90000000 },
    { label: '1억원', value: 100000000 },
  ];

  const inventoryPriceItems = [
    { label: '미가입', value: '미가입' },
    { label: '1천만원', value: 10000000 },
    { label: '2천만원', value: 20000000 },
    { label: '3천만원', value: 30000000 },
    { label: '5천만원', value: 50000000 },
  ];

  const selfPriceItems = [
    { label: '20만원', value: 200000 },
    { label: '30만원', value: 300000 },
    { label: '40만원', value: 400000 },
    { label: '50만원', value: 500000 },
  ];

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
        sectorItems={sectorItems}
        basicBuildingPriceItems={basicBuildingPriceItems}
        factoryBuildingPriceItems={factoryBuildingPriceItems}
        basicFacilityPriceItems={basicFacilityPriceItems}
        factoryFacilityPriceItems={factoryFacilityPriceItems}
        handleBuildingPriceSelect={handleBuildingPriceSelect}
        handleFacilityPriceSelect={handleFacilityPriceSelect}
        selfPriceItems={selfPriceItems}
        handleselfPriceSelect={handleselfPriceSelect}
        inventoryPriceItems={inventoryPriceItems}
        handleInventoryPriceSelect={handleInventoryPriceSelect}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
