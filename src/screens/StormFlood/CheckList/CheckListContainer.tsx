import { EmptyLayout } from '@app/layout';
import React from 'react';
import Presenter from './CheckListPresenter';
import Toast from 'react-native-simple-toast';

export default function CheckListContainer({
  state,
  onChangeState,
  handleNextButton,
  onClickTermsModalOpen,
  handlePreviousButton,
  termsChange,
}) {
  const checkterms = () => {
    if (state?.terms?.terms1 === false) {
      Toast.show('질문에 동의해주세요.');
      return false;
    } else if (state?.terms?.terms2 === false || state?.terms?.terms3 === false || state?.terms?.terms4 === false) {
      Toast.show('본 상품은 소상공인임이 확인("예")이 되어야 가입이 가능합니다.');
      return false;
    } else if (state?.terms?.terms5 === false) {
      Toast.show('알아두실 사항을 읽어주세요');
      return false;
    } else {
      return true;
    }
  };

  const nextButton = () => {
    console.log(checkterms());
    if (checkterms()) {
      handleNextButton();
    } else {
      return null;
    }
  };
  if (state.stepNumber === 2) {
    return (
      <Presenter
        state={state}
        onChangeState={onChangeState}
        nextButton={nextButton}
        onClickTermsModalOpen={onClickTermsModalOpen}
        handlePreviousButton={handlePreviousButton}
        termsChange={termsChange}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
