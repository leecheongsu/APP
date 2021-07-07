import React from 'react';
import { FocusAwareStatusBar } from '@app/components';
import { ScrollView } from 'react-native-gesture-handler';
import { CameraStateTypes } from './CameraContainer';

type CameraPresenterTypes = {
  state: CameraStateTypes;
  scrollRef: React.MutableRefObject<null>;
  returnComponent: (id: 'take' | 'confirm') => any;
};

function CameraPresenter({state, scrollRef, returnComponent} : CameraPresenterTypes) {
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'}/>
      <ScrollView
        onScroll={() => null}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        scrollEventThrottle={200}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ref={scrollRef}>
        {state.cameraStep.map((item) => {
          return returnComponent(item.id);
        })}
      </ScrollView>
    </>
  );
}

export default CameraPresenter;
