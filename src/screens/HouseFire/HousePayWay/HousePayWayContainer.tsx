import { insuApis } from '@app/api/Insurance';
import { EmptyLayout } from '@app/layout';
import { handleApiError, priceDot } from '@app/lib';
import { HouseFireStateName, HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';
import React, { useEffect } from 'react';
import SimpleToast from 'react-native-simple-toast';
import HousePayWayPresenter from './HousePayWayPresenter';

type HousePayWayContainerTypes = {
  state: HouseFireStateTypes;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  handlePreviousButton: () => void;
  handleNextButton: () => void;
  resultBuildPrice: () => number;
  resultGajePrice: () => number;
};

export default function HousePayWayContainer({
  state,
  onChangeState,
  handleNextButton,
  handlePreviousButton,
  resultBuildPrice,
  resultGajePrice,
}: HousePayWayContainerTypes) {
  const price = priceDot(resultBuildPrice() + resultGajePrice());

  //다음버튼
  const nextButton = () => {
    if (state?.payway === '') {
      SimpleToast.show('결제방법을 선택해주세요.');
    } else if (state?.payway !== null) {
      SimpleToast.show('해당 상품은 보험사와 결제조건 조율중이니 인슈로보 고객센터로 문의바랍니다.');
    } else {
      handleNextButton();
    }
  };

  //가상계좌 정보 얻어오는 api
  const getVbankInfo = () => {
    insuApis
      .getVbankParams()
      .then((res) => {
        if (res.status === 200) {
          onChangeState('vbankInfo', res.data);
        }
      })
      .catch((e) => {
        handleApiError(e.response);
      });
  };

  //가상계좌면 가상계좌 페이지로 이동
  useEffect(() => {
    if (state?.payway === 'bank' && state?.vbankInfo === undefined) {
      getVbankInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.payway]);

  if (state.stepNumber === 11) {
    return (
      <HousePayWayPresenter
        state={state}
        nextButton={nextButton}
        onChangeState={onChangeState}
        handlePreviousButton={handlePreviousButton}
        price={price}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
