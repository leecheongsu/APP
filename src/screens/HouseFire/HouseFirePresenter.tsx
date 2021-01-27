import React from 'react';
import styled from '@app/style/typed-components';
import { FocusAwareStatusBar, Typhograph, RoundStepper } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import { HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';
import { ScrollView } from 'react-native-gesture-handler';

type HouseFirePresenterTypes = {
  state: HouseFireStateTypes;
  scrollRef: React.MutableRefObject<null>;
  returnComponent: (id: 'joinType' | 'address' | 'info' | 'evaluation' | 'priceConfirm') => JSX.Element | undefined;
};

const Container = styled.View``;
const StepTitle = styled.View`
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
`;

const SteperBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 115px 20px 115px;
`;

function HouseFirePresenter({ state, scrollRef, returnComponent }: HouseFirePresenterTypes) {
  const navigation: any = useNavigation();

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <ScrollView
        onScroll={() => null}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        scrollEventThrottle={100}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ref={scrollRef}>
        {state.houseStep.map((item, index) => {
          return returnComponent(item.id);
        })}
      </ScrollView>
    </>
  );
}
export default HouseFirePresenter;
