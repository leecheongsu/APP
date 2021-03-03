import { EmptyLayout } from '@app/layout';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import React from 'react';
import ProductInfomationPresenter from './ProductInfomationPresenter';

type ProductInfomationContainerTypes = {
  state: StormFloodStateTypes;
  handleNextButton: () => null | undefined;
  onChangeState: (name: StormFloodName, value: any) => void;
};
export default function ProductInfomationContainer({
  state,
  onChangeState,
  handleNextButton,
}: ProductInfomationContainerTypes) {
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
        onClickTermsModalOpen2={onClickTermsModalOpen2}
        onChangeState={onChangeState}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
