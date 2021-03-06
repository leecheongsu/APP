import React from 'react';
import { FocusAwareStatusBar, InfoModal } from '@app/components';
import { HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';
import { ScrollView } from 'react-native-gesture-handler';

type HouseFirePresenterTypes = {
  state: HouseFireStateTypes;
  scrollRef: React.MutableRefObject<null>;
  onChangeState: (name, value) => void;
  returnComponent: (
    id:
      | 'productInfo'
      | 'joinType'
      | 'address'
      | 'info'
      | 'evaluation'
      | 'priceConfirm'
      | 'InputUser'
      | 'HouseTermsUse'
      | 'HouseConfirm'
      | 'HouseContractTerms'
      | 'HousePayWay'
      | 'HousePay'
      | 'HouseFinal'
  ) => any;
};

function HouseFirePresenter({ state, scrollRef, returnComponent, onChangeState }: HouseFirePresenterTypes) {
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <ScrollView
        onScroll={() => null}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        scrollEventThrottle={200}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ref={scrollRef}>
        {state.houseStep.map((item) => {
          return returnComponent(item.id);
        })}
      </ScrollView>
      <InfoModal
        open={state.isInfoModal}
        title={state.infoTitle}
        contents={state.infoContents}
        onClose={() => onChangeState('isInfoModal', false)}
      />
    </>
  );
}
export default HouseFirePresenter;
