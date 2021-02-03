import React from 'react';
import { CustomButton, FocusAwareStatusBar, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import theme from '@app/style/theme';
import { JoinStateName, JoinStateTypes } from '@app/screens/Join/JoinContainer';
import { JoinBusiness, JoinIndividual } from '@app/screens';
import { screenWidth } from '@app/lib';

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
};

const Container = styled.View`
  background-color: ${theme.color.MENU_BACKGROUD_COLOR};
  flex: 1;
`;

const ButtonBox = styled.View`
  flex-direction: row;
  background-color: ${theme.color.MENU_BACKGROUD_COLOR};
  padding: 15px;
`;

const ButtonItem = styled.View`
  margin-right: 10px;
`;

function JoinPresenter({
  handleClickButton,
  state,
  scrollRef,
  returnComponent,
  onChangeState,
  inputState,
  onValueChange,
  handlePostJoin,
}: JoinPresenterTypes) {
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Container>
        <ButtonBox>
          <ButtonItem>
            <CustomButton
              onPress={() => handleClickButton('individual')}
              radius={30}
              background={state.selectType === 'individual' ? 'SKYBLUE' : 'WHITE'}
              width={130}>
              <Typhograph type="NOTO" color={state.selectType === 'individual' ? 'WHITE' : 'BLUE'} weight="MEDIUM">
                개인회원
              </Typhograph>
            </CustomButton>
          </ButtonItem>
          <ButtonItem>
            <CustomButton
              onPress={() => handleClickButton('buisness')}
              radius={30}
              background={state.selectType === 'buisness' ? 'SKYBLUE' : 'WHITE'}
              width={130}>
              <Typhograph type="NOTO" color={state.selectType === 'buisness' ? 'WHITE' : 'BLUE'} weight="MEDIUM">
                개인사업자
              </Typhograph>
            </CustomButton>
          </ButtonItem>
        </ButtonBox>
        {state.selectType === 'individual' ? (
          <JoinIndividual
            state={state}
            onChangeState={onChangeState}
            inputState={inputState}
            onValueChange={onValueChange}
            handlePostJoin={handlePostJoin}
          />
        ) : (
          <JoinBusiness state={state} onChangeState={onChangeState} />
        )}
      </Container>
    </>
  );
}
export default JoinPresenter;
