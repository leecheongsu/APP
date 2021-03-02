import { EmptyLayout } from '@app/layout';
import { floorPrice } from '@app/lib';
import React, { useState } from 'react';
import HouseResultPresenter from './HouseResultPresenter';

export default function HouseResultContainer({
  state,
  inputState,
  onChangeState,
  handlePreviousButton,
  handleNextButton,
  resultBuildPrice,
  resultGajePrice,
}) {
  const [isActive, setIsActive] = useState(false);

  const onChangeActive = (company) => {
    onChangeState('selectInsuCompany', company);
  };

  if (state.stepNumber === 6) {
    return (
      <HouseResultPresenter
        state={state}
        inputState={inputState}
        onChangeState={onChangeState}
        handlePreviousButton={handlePreviousButton}
        handleNextButton={handleNextButton}
        resultBuildPrice={resultBuildPrice}
        resultGajePrice={resultGajePrice}
        isActive={isActive}
        onChangeActive={onChangeActive}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
