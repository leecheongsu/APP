import { EmptyLayout } from '@app/layout';
import React from 'react';
import Presenter from './Presenter';
export default function Container({
  state,
  onChangeState,
  handleNextButton,
  onClickTermsModalOpen,
  handlePreviousButton,
}) {
  const nextButton = () => {
    handleNextButton();
  };
  if (state.stepNumber === 1) {
    return (
      <Presenter
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
