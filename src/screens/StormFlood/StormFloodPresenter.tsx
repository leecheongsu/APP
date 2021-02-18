import { FocusAwareStatusBar, InfoModal } from '@app/components';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

function StormFloodPresenter({ state, scrollRef, returnComponent, onChangeState }) {
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
