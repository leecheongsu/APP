import { insuApis } from '@app/api/Insurance';
import { EmptyLayout } from '@app/layout';
import { handleApiError, priceDot } from '@app/lib';
import React, { useEffect } from 'react';
import SimpleToast from 'react-native-simple-toast';
import HousePayWayPresenter from './HousePayWayPresenter';
export default function HousePayWayContainer({
  state,
  onChangeState,
  handleNextButton,
  onClickTermsModalOpen,
  handlePreviousButton,
  resultBuildPrice,
  resultGajePrice,
}) {
  const nextButton = () => {
    if (state?.payway === '') {
      SimpleToast.show('결제방법을 선택해주세요.');
    } else {
      handleNextButton();
    }
  };

  const price = priceDot(resultBuildPrice() + resultGajePrice());
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
        onClickTermsModalOpen={onClickTermsModalOpen}
        price={price}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
