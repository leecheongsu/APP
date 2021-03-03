import React from 'react';
import { BottomFixButton, ResultCard, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { priceDot, screenWidth } from '@app/lib';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import { TermsModal } from '@app/screens';
import theme from '@app/style/theme';
import { insuImg } from '@app/assets';

type StormFloodResultPresenterTypes = {
  state: StormFloodStateTypes;
  nextButton: () => void;
  handlePreviousButton: () => void;
  onChangeState: (name: StormFloodName, value: any) => void;
  onChangeActive: (company: any) => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const ContentsContainer = styled.View`
  padding: 20px 15px;
`;

const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;
const RowItem = styled.View`
  align-items: center;
`;

const TitleBox = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.INPUT_GRAY};
  padding: 7px 0px;
`;

const CardContainer = styled.View`
  padding: 30px 15px;
  background-color: ${theme.color.GRAY2};
`;

function StormFloodResultPresenter({
  state,
  nextButton,
  onChangeState,
  handlePreviousButton,
  onChangeActive,
}: StormFloodResultPresenterTypes) {
  return (
    <>
      <Container>
        <ContentsContainer>
          <TitleBox>
            <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
              총 보험가입금액
            </Typhograph>
          </TitleBox>
          {/* 건물 */}
          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                건물
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                {state?.selectBuildingPrice?.val_name}
                <Typhograph type="NOTO" color="GRAY">
                  원
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>
          {/* 시설 및 집기 */}
          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                시설 및 집기
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                {state?.selectFacilityprice?.val_name}
                <Typhograph type="NOTO" color="GRAY">
                  원
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>
          {/* 재고자산 */}
          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                재고자산
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                {state?.selectInventoryPrice?.val_name}
                <Typhograph type="NOTO" color="GRAY">
                  {state?.selectInventoryPrice?.val_name === '미가입' ? '' : '원'}
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>
          {/* 자기부담 */}
          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                자기부담
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                {state?.selectSelfPrice?.val_name}
                <Typhograph type="NOTO" color="GRAY">
                  원
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>
          <TitleBox style={{ marginTop: 10 }}>
            <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
              연 보험료
            </Typhograph>
          </TitleBox>
          {/* 총 보험료 */}
          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                총 보험료
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                {priceDot(state?.resultPrice?.tpymPrem)}
                <Typhograph type="NOTO" color="GRAY">
                  원
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>
          {/* 정부 부담 보험료 */}
          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                정부 부담 보험료
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                {priceDot(state?.resultPrice?.govtPrem)}
                <Typhograph type="NOTO" color="GRAY">
                  원
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>
          {/* 지자체 부담 보험료 */}
          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                지자체 부담 보험료
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                {priceDot(state?.resultPrice?.lgovtPrem)}
                <Typhograph type="NOTO" color="GRAY">
                  원
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>
          {/* 본인 부담 보험료 */}
          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                본인 부담 보험료
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="ROBOTO" color="SKYBLUE" size={16}>
                {priceDot(state?.resultPrice?.perPrem)}
                <Typhograph type="NOTO" color="GRAY">
                  원
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>
        </ContentsContainer>
        <CardContainer>
          <ResultCard
            isActive={state.selectInsuCompany === '현대해상'}
            name="현대해상"
            img={insuImg.LOGO_HYUNDAI}
            onClick={onChangeActive}
            price={priceDot(state?.resultPrice?.perPrem)}
          />
        </CardContainer>
        <TermsModal
          open={state?.termsModal}
          close={() => onChangeState('termsModal', false)}
          html={state?.termsHtml}
          onPress={() => null}
          isButton={false}
        />
        <BottomFixButton
          index={state.stepNumber}
          leftTitle="이전"
          rightTitle="다음"
          bottomRightPress={() => nextButton()}
          bottomLeftPress={() => handlePreviousButton()}
          isKeybordView={state.isKeybordView}
        />
      </Container>
    </>
  );
}

export default StormFloodResultPresenter;
