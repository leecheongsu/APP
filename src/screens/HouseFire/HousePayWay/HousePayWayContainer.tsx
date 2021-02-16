import { EmptyLayout } from '@app/layout';
import { priceDot } from '@app/lib';
import React from 'react';
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
    handleNextButton();
  };
  const price = priceDot(resultBuildPrice() + resultGajePrice());
  if (state.stepNumber === 10) {
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
