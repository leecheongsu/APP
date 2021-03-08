import React from 'react';
import { ConfirmModal, FocusAwareStatusBar, InfoModal } from '@app/components';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import { ScrollView } from 'react-native-gesture-handler';

type StormFloodPresenterTypes = {
  state: StormFloodStateTypes;
  scrollRef: any;
  returnComponent: (
    id:
      | 'productInfomation'
      | 'checkList'
      | 'stormFloodAddress'
      | 'info'
      | 'guaranteeSelect'
      | 'stormFloodResult'
      | 'stormFloodInput'
      | 'stormFloodTerms'
      | 'stormFloodPay'
      | 'stormFloodFinal'
  ) => React.ReactNode;
  onChangeState: (name: StormFloodName, value: any) => void;
};

function StormFloodPresenter({ state, scrollRef, returnComponent, onChangeState }: StormFloodPresenterTypes) {
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
        {state.stormFloodStep.map((item) => {
          return returnComponent(item.id);
        })}
      </ScrollView>
      <ConfirmModal />
      <InfoModal
        open={state.isInfoModal}
        title={state.infoTitle}
        contents={state.infoContents}
        onClose={() => onChangeState('isInfoModal', false)}
      />
    </>
  );
}

export default StormFloodPresenter;
