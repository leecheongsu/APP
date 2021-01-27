import React from 'react';
import { BottomFixButton, Typhograph, InsuCard, CheckLabelButton } from '@app/components';
import { priceDot, screenWidth } from '@app/lib';
import styled from '@app/style/typed-components';
import theme from '@app/style/theme';

const Container = styled.View`
  width: ${screenWidth()}px;
  padding-bottom: 65px;
`;
const ContentsContainer = styled.ScrollView``;
const CardBox = styled.View`
  padding: 20px;
  background-color: ${theme.color.GRAY2};
`;
const SubTextBox = styled.View`
  margin-top: 15px;
`;
const SectionTwoContainer = styled.View``;
const SectionTwoTitleBox = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
  margin: 0px 20px;
`;
const SelectButtonBox = styled.View`
  padding: 20px 20px;
  flex-direction: row;
  justify-content: space-between;
`;
const ButtonBox = styled.View`
  width: 49.5%;
`;

function HouseEvaluationPresenter({ state, handleNextButton, handlePreviousButton }) {
  console.log(state);
  const price = state?.selectAddress?.const_price !== undefined && priceDot(state?.selectAddress?.const_price);

  const subText =
    '건물 보험가입금액은 한국감정원 신축단가표와 건축물대장의 연면적, 건물구조를 반영하여 평가한 금액입니다.';
  return (
    <Container>
      <ContentsContainer>
        <CardBox>
          <InsuCard leftText="건물 평가 보험가액" leftSubText="(보험가입금액)" rightText={price} />
          <SubTextBox>
            <Typhograph type="NOTO" color="BLACK2" weight="LIGHT" size={10} lineheight={3}>
              {subText}
            </Typhograph>
          </SubTextBox>
        </CardBox>
        <SectionTwoContainer>
          <SectionTwoTitleBox>
            <Typhograph type="NOTO">담보를 선택해주세요.</Typhograph>
          </SectionTwoTitleBox>
          <SelectButtonBox>
            <ButtonBox>
              <CheckLabelButton iscenter title="단체보험 가입" active onPress={() => console.log(1)} />
            </ButtonBox>
            <ButtonBox>
              <CheckLabelButton iscenter title="단체보험 미가입" active={false} onPress={() => console.log(1)} />
            </ButtonBox>
          </SelectButtonBox>
        </SectionTwoContainer>
      </ContentsContainer>
      <BottomFixButton
        index={state.stepNumber}
        leftTitle="이전"
        rightTitle="다음"
        bottomRightPress={handleNextButton}
        bottomLeftPress={handlePreviousButton}
        isKeybordView={state.isKeybordView}
      />
    </Container>
  );
}

export default HouseEvaluationPresenter;
