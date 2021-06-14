import React from 'react';
import { useGlobalState } from '@app/context';
import { EmptyLayout } from '@app/layout';
import { useNavigation } from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';
import StormFloodResultPresenter from './StormFloodResultPresenter';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';

type StormFloodResultContainerTypes = {
  state: StormFloodStateTypes;
  onChangeState: (name: StormFloodName, value: any) => void;
  handleNextButton: () => null | undefined;
  handlePreviousButton: () => void;
};
export default function StormFloodResultContainer({
  state,
  onChangeState,
  handleNextButton,
  handlePreviousButton,
}: StormFloodResultContainerTypes) {
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
        onChangeActive={onChangeActive}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
