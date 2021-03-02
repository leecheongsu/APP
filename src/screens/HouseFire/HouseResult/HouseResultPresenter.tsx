import React from 'react';

import { priceDot, screenWidth, sliceTenThousand } from '@app/lib';
import styled from '@app/style/typed-components';
import { BottomFixButton, ResultCard, Typhograph } from '@app/components';
import theme from '@app/style/theme';
import { insuImg } from '@app/assets';
import { HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';

type HouseResultPresenterTypes = {
  state: HouseFireStateTypes;
  handlePreviousButton: () => void;
  handleNextButton: () => void;
  resultBuildPrice: () => number;
  resultGajePrice: () => number;
  onChangeActive: (company: any) => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
  padding-bottom: 65px;
`;
const ContentsContainer = styled.ScrollView``;
const ResultBox = styled.View`
  padding: 30px 20px;
`;

const ResultRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
const ResultRowItem = styled.View`
  width: 50%;
`;
const CardBox = styled.View`
  background-color: ${theme.color.GRAY2};
  padding: 20px;
`;
const CardTitleBox = styled.View`
  padding-bottom: 15px;
`;

function HouseResultPresenter({
  state,
  handlePreviousButton,
  handleNextButton,
  resultBuildPrice,
  resultGajePrice,
  onChangeActive,
}: HouseResultPresenterTypes) {
  return (
    <Container>
      <ContentsContainer>
        <ResultBox>
          <ResultRow>
            <ResultRowItem>
              <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
                총 보험가입금액
              </Typhograph>
            </ResultRowItem>
            <ResultRowItem>
              <Typhograph
                style={{ marginTop: 10, textAlign: 'right' }}
                type="ROBOTO"
                color="SKYBLUE"
                weight="BOLD"
                size={18}>
                {state.selectType === 'T'
                  ? priceDot(sliceTenThousand(state?.selectAddress?.amt_ins))
                  : state?.selectAddress?.already_group_ins === 'Y'
                  ? priceDot(1000)
                  : priceDot(sliceTenThousand(state?.selectAddress?.amt_ins))}
                <Typhograph type="NOTO" size={14} color="BLACK3">
                  만원
                </Typhograph>
              </Typhograph>
            </ResultRowItem>
          </ResultRow>

          <ResultRow>
            <ResultRowItem>
              <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
                연보험료
              </Typhograph>
            </ResultRowItem>
            <ResultRowItem>
              <Typhograph
                style={{ marginTop: 10, textAlign: 'right' }}
                type="ROBOTO"
                color="SKYBLUE"
                weight="BOLD"
                size={18}>
                {priceDot(resultBuildPrice() + resultGajePrice())}
                <Typhograph type="NOTO" size={14} color="BLACK3">
                  원
                </Typhograph>
              </Typhograph>
            </ResultRowItem>
          </ResultRow>
        </ResultBox>
        <CardBox>
          <CardTitleBox>
            <Typhograph type="NOTO" color="GRAY" size={13}>
              인슈로보의 맞춤형 보험상품을 만나보세요.
            </Typhograph>
          </CardTitleBox>
          <ResultCard
            isActive={state.selectInsuCompany === '메리츠화재'}
            name="메리츠화재"
            img={insuImg.LOGO_MERITZ}
            onClick={onChangeActive}
            price={priceDot(resultBuildPrice() + resultGajePrice())}
          />
        </CardBox>
      </ContentsContainer>
      <BottomFixButton
        index={state.stepNumber}
        leftTitle="이전"
        rightTitle="신청"
        bottomRightPress={handleNextButton}
        bottomLeftPress={handlePreviousButton}
        isKeybordView={state.isKeybordView}
      />
    </Container>
  );
}

export default HouseResultPresenter;
