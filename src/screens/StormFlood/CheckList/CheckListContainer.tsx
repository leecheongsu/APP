import { EmptyLayout } from '@app/layout';
import React from 'react';
import Presenter from './CheckListPresenter';
export default function CheckListContainer({
  state,
  onChangeState,
  handleNextButton,
  onClickTermsModalOpen,
  handlePreviousButton,
}) {
  const nextButton = () => {
    handleNextButton();
  };
  if (state.stepNumber === 2) {
    return (
      <Presenter
        state={state}
        onChangeState={onChangeState}
        nextButton={nextButton}
        onClickTermsModalOpen={onClickTermsModalOpen}
        handlePreviousButton={handlePreviousButton}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
