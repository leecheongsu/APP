import { EmptyLayout } from '@app/layout';
import React from 'react';
import ProductInfomationPresenter from './ProductInfomationPresenter';
export default function ProductInfomationContainer({ state, onChangeState, handleNextButton, onClickTermsModalOpen }) {
  const nextButton = () => {
    handleNextButton();
  };
  if (state.stepNumber === 1) {
    return (
      <ProductInfomationPresenter
        state={state}
        nextButton={nextButton}
        onClickTermsModalOpen={onClickTermsModalOpen}
        onChangeState={onChangeState}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
