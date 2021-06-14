import React from 'react';
import { BottomFixButton, CheckLabelButton, FullLabel, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';
import { HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';

type JoinTypeTypes = {
  state: HouseFireStateTypes;
  selectJoinType: (value: 'T' | 'S' | 'T2') => void;
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
    '★단독주택 : 건물 소유주가 1인.\n                    주택, 다가구 주택, 다중 주택',
    '★공동주택 : 건물 소유주가 다수.\n                    다세대 주택, 연립주택, 아파트(15층 이하)',
      '※ 아파트 관리사무소인 경우에는 단독주택을 선택하세요,',
  ];

  return (
    <>
      <Container>
        <FullLabel title="가입하고자 하는 주택유형을 선택해 주세요." />
        {/*<InfoContainer>*/}
        {/*  {INFO_TEXT.map((item, index) => {*/}
        {/*    return (*/}
        {/*      <InfoBox key={index}>*/}
        {/*        <Typhograph type="NOTO" size={11} color="BLACK2">*/}
        {/*          {dot}*/}
        {/*          {'  '}*/}
        {/*        </Typhograph>*/}
        {/*        <Typhograph type="NOTO" size={14} color="BLACK2">*/}
        {/*          {item}*/}
        {/*        </Typhograph>*/}
        {/*      </InfoBox>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</InfoContainer>*/}
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
