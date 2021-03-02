import React from 'react';
import { BottomFixButton, CheckLabelButton, FullLabel, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';
import { HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';

type JoinTypeTypes = {
  state: HouseFireStateTypes;
  selectJoinType: (value: 'T' | 'S') => void;
  onClickNextButton: () => void;
  handlePreviousButton: () => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const InfoContainer = styled.View`
  padding: 25px 25px 0px 25px;
`;

const InfoBox = styled.View`
  flex-direction: row;
`;
const ButtonBox = styled.View`
  padding: 20px 25px;
`;
const ButtonItemBox = styled.View`
  margin-top: 10px;
`;

function JoinTypePresenter({ state, selectJoinType, onClickNextButton, handlePreviousButton }: JoinTypeTypes) {
  const dot = '\u2022';
  const INFO_TEXT = [
    '공동주택(아파트 등)의 단지나 동을 대표하여 가입하는 것을 말합니다.',
    '단체 가입 이외 세대별로 개인적으로 가입할 경우 선택합니다.',
  ];

  return (
    <>
      <Container>
        <FullLabel title="단체 가입과 세대 가입을 선택해 주세요." />
        <InfoContainer>
          {INFO_TEXT.map((item, index) => {
            return (
              <InfoBox key={index}>
                <Typhograph type="NOTO" size={11} color="BLACK2">
                  {dot}
                  {'  '}
                </Typhograph>
                <Typhograph type="NOTO" size={14} color="BLACK2">
                  {item}
                </Typhograph>
              </InfoBox>
            );
          })}
        </InfoContainer>

        <ButtonBox>
          {state.joinType.map((item, index) => {
            return (
              <ButtonItemBox key={index}>
                <CheckLabelButton
                  key={index}
                  iscenter
                  onPress={() => selectJoinType(item.value)}
                  title={item.title}
                  active={state.selectType === item.value}
                />
              </ButtonItemBox>
            );
          })}
        </ButtonBox>

        <BottomFixButton
          index={state.stepNumber}
          leftTitle="이전"
          rightTitle="다음"
          bottomRightPress={() => onClickNextButton()}
          bottomLeftPress={() => handlePreviousButton()}
          isKeybordView={state.isKeybordView}
        />
      </Container>
    </>
  );
}

export default JoinTypePresenter;
