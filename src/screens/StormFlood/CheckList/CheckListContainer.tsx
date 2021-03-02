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
  onClickTermsModalAgree,
}) {
  const checkterms = () => {
    if (state?.terms?.terms1?.isChecked === 0) {
      Toast.show('질문에 동의해주세요.');
      return false;
    } else if (
      state?.terms?.terms2?.isChecked === 0 ||
      state?.terms?.terms3?.isChecked === 0 ||
      state?.terms?.terms4?.isChecked === 0
    ) {
      Toast.show('본 상품은 소상공인임이 확인("예")이 되어야 가입이 가능합니다.');
      return false;
    } else if (state?.terms?.terms5?.isChecked === 0) {
      Toast.show('알아두실 사항을 읽어주세요');
      return false;
    } else {
      return true;
    }
  };

  const nextButton = () => {
    if (checkterms()) {
      handleNextButton();
    } else {
      return null;
    }
  };

  //terms모달 오픈
  const onClickTermsModalOpen2 = (name, html) => {
    onChangeState('termsName', name);
    onChangeState('termsModal', true);
    onChangeState('termsHtml', html);
  };
  if (state.stepNumber === 2) {
    return (
      <Presenter
        state={state}
        onChangeState={onChangeState}
        nextButton={nextButton}
        onClickTermsModalOpen2={onClickTermsModalOpen2}
        handlePreviousButton={handlePreviousButton}
        termsChange={termsChange}
        onClickTermsModalAgree={onClickTermsModalAgree}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
