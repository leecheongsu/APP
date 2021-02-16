import { EmptyLayout } from '@app/layout';
import React from 'react';
import GuaranteeSelectPresenter from './GuaranteeSelectPresenter';
export default function GuaranteeSelectContainer({
  state,
  onChangeState,
  handleNextButton,
  onClickTermsModalOpen,
  handlePreviousButton,
}) {
  const nextButton = () => {
    handleNextButton();
  };
  if (state.stepNumber === 5) {
    return (
      <GuaranteeSelectPresenter
        state={state}
        nextButton={nextButton}
        onChangeState={onChangeState}
        handlePreviousButton={handlePreviousButton}
        onClickTermsModalOpen={onClickTermsModalOpen}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
