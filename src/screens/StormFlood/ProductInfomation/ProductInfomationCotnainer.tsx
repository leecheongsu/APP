import { EmptyLayout } from '@app/layout';
import React from 'react';
import ProductInfomationPresenter from './ProductInfomationPresenter';
export default function ProductInfomationContainer({ state, onChangeState, handleNextButton, onClickTermsModalOpen }) {
  const nextButton = () => {
    handleNextButton();
  };
  //terms모달 오픈
  const onClickTermsModalOpen2 = (name, html) => {
    onChangeState('termsName', name);
    onChangeState('termsModal', true);
    onChangeState('termsHtml', html);
  };
  if (state.stepNumber === 1) {
    return (
      <ProductInfomationPresenter
        state={state}
        nextButton={nextButton}
        onClickTermsModalOpen={onClickTermsModalOpen}
        onClickTermsModalOpen2={onClickTermsModalOpen2}
        onChangeState={onChangeState}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
