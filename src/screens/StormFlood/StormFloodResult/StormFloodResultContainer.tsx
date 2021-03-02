import { useGlobalState } from '@app/context';
import { EmptyLayout } from '@app/layout';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import SimpleToast from 'react-native-simple-toast';
import StormFloodResultPresenter from './StormFloodResultPresenter';
export default function StormFloodResultContainer({
  state,
  onChangeState,
  handleNextButton,
  onClickTermsModalOpen,
  handlePreviousButton,
}) {
  const navigation = useNavigation();
  const globalState = useGlobalState();
  const nextButton = () => {
    if (state.selectInsuCompany === '') {
      SimpleToast.show('보험상품을 선택해주세요.');
      return null;
    } else if (!globalState.isLogin) {
      navigation.navigate('LOGIN', { isHome: false });
      return null;
    } else {
      handleNextButton();
      return null;
    }
  };
  const onChangeActive = (company) => {
    onChangeState('selectInsuCompany', company);
  };

  if (state.stepNumber === 6) {
    return (
      <StormFloodResultPresenter
        state={state}
        nextButton={nextButton}
        onChangeState={onChangeState}
        handlePreviousButton={handlePreviousButton}
        onClickTermsModalOpen={onClickTermsModalOpen}
        onChangeActive={onChangeActive}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
