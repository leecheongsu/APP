import React from 'react';
import HouseTermsUsePresenter from './HouseTermsUsePresenter';

export default function HouseTermsUseContainer({ state, onChangeState, handlePreviousButton, handleNextButton }) {
  return (
    <HouseTermsUsePresenter
      state={state}
      handleNextButton={handleNextButton}
      handlePreviousButton={handlePreviousButton}
    />
  );
}
