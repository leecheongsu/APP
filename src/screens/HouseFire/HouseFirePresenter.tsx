import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, View, Animated, Dimensions, KeyboardAvoidingView } from 'react-native';
import { MainLayout } from '@app/layout';
import styled from '@app/style/typed-components';
import { FocusAwareStatusBar, Typhograph, RoundStepper, BottomFixButton, SearchInput } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import { HouseFireStateName, HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';
import { ScrollView } from 'react-native-gesture-handler';

type HouseFirePresenterTypes = {
  state: HouseFireStateTypes;
  handleNextButton: () => void;
  handlePreviousButton: () => void;
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

function HouseFirePresenter({
  state,
  handleNextButton,
  scrollRef,
  handlePreviousButton,
  returnComponent,
}: HouseFirePresenterTypes) {
  const navigation: any = useNavigation();

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Container>
        <StepTitle>
          <Typhograph type="NOTO" weight="BOLD" size={16} color="BLUE">
            {state.houseStep[state.stepNumber - 1].title}
          </Typhograph>
        </StepTitle>
        <SteperBox>
          {state.houseStep.map((item, index) => {
            return (
              <RoundStepper
                key={index}
                backgroundcolor={state.stepNumber === index + 1 ? 'SKYBLUE' : 'ROUND_STEPPER'}
                color="WHITE"
                title={index + 1}
              />
            );
          })}
        </SteperBox>
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
      </Container>
      <BottomFixButton
        index={state.stepNumber}
        leftTitle="이전"
        rightTitle="다음"
        bottomRightPress={handleNextButton}
        bottomLeftPress={handlePreviousButton}
        isKeybordView={state.isKeybordView}
      />
    </>
  );
}
export default HouseFirePresenter;
