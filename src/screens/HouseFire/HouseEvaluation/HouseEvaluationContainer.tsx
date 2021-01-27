import React from 'react';
import HouseEvaluationPresenter from './HouseEvaluationPresenter';

export default function HouseEvaluationContainer({
  state,
  inputState,
  onChangeState,
  handlePreviousButton,
  handleNextButton,
}) {
  return (
    <HouseEvaluationPresenter
      state={state}
      handlePreviousButton={handlePreviousButton}
      handleNextButton={handleNextButton}
    />
  );
}
