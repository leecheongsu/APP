import React from 'react';
import { EmptyLayout } from '@app/layout';
import HouseResultPresenter from './HouseResultPresenter';
import { HouseFireStateName, HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';

type HouseResultContainerTypes = {
  state: HouseFireStateTypes;
  handlePreviousButton: () => void;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  handleNextButton: () => void;
  resultBuildPrice: () => number;
  resultGajePrice: () => number;
};

export default function HouseResultContainer({
  state,
  onChangeState,
  handlePreviousButton,
  handleNextButton,
  resultBuildPrice,
  resultGajePrice,
}: HouseResultContainerTypes) {
  const onChangeActive = (company) => {
    onChangeState('selectInsuCompany', company);
  };

  if (state.stepNumber === 6) {
    return (
      <HouseResultPresenter
        state={state}
        handlePreviousButton={handlePreviousButton}
        handleNextButton={handleNextButton}
        resultBuildPrice={resultBuildPrice}
        resultGajePrice={resultGajePrice}
        onChangeActive={onChangeActive}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
