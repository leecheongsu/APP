import React from 'react';
import { FocusAwareStatusBar } from '@app/components';
import styled from '@app/style/typed-components';
import { JoinStateName, JoinStateTypes } from '@app/screens/Join/JoinContainer';
import { ScrollView } from 'react-native-gesture-handler';

type JoinPresenterTypes = {
  state: JoinStateTypes;
  handleClickButton: (name) => void;
  scrollRef: any;
  onChangeState: (name: JoinStateName, value: any) => void;
  inputState: {
    email: any;
  };
  onValueChange: (name: any) => void;
  handlePostJoin: () => void;
  returnComponent: (id: 'step1' | 'step2' | 'step3' | 'step4') => React.ReactNode | undefined;
};

const Container = styled.View`
  flex: 1;
`;

function JoinPresenter({ state, scrollRef, returnComponent }: JoinPresenterTypes) {
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Container>
        <ScrollView
          onScroll={() => null}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          scrollEventThrottle={200}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ref={scrollRef}>
          {state.individualStep.map((item) => {
            return returnComponent(item.id);
          })}
        </ScrollView>
      </Container>
    </>
  );
}
export default JoinPresenter;
