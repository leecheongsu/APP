import React from 'react';
import { BottomFixButton, CheckLabelButton, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';
import { TermsModal } from '@app/screens';
import { HouseFireStateName, HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';
import theme from '@app/style/theme';

type HousePayWayPresenterTypes = {
  state: HouseFireStateTypes;
  nextButton: () => void;
  handlePreviousButton: () => void;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  price: any;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;
const ContentsContainer = styled.View`
  padding: 10px 15px;
`;

const TitleBox = styled.View`
  padding: 10px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;

const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const RowItem = styled.View`
  align-items: center;
`;

const ButtonBox = styled.View`
  margin-top: 20px;
`;

const ButtonItem = styled.View`
  margin-top: 10px;
`;

function HousePayWayPresenter({
  state,
  nextButton,
  onChangeState,
  handlePreviousButton,
  price,
}: HousePayWayPresenterTypes) {
  return (
    <>
      <Container>
        <ContentsContainer>
          <TitleBox>
            <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
              결제방법
            </Typhograph>
          </TitleBox>

          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                상품번호
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="NOTO" color="BLACK2">
                {state?.selectAddress?.quote_no}
              </Typhograph>
            </RowItem>
          </RowBox>

          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                보험료
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="ROBOTO" color="SKYBLUE" weight="BOLD" size={16}>
                {price}
                <Typhograph type="NOTO" color="BLACK2">
                  원
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>

          <ButtonBox>
            <ButtonItem>
              <CheckLabelButton
                active={state?.payway === 'card'}
                onPress={() => onChangeState('payway', 'card')}
                title="신용카드"
                iscenter
              />
            </ButtonItem>
            <ButtonItem>
              <CheckLabelButton
                active={state?.payway === 'bank'}
                onPress={() => onChangeState('payway', 'bank')}
                title="간편이체"
                iscenter
              />
            </ButtonItem>
          </ButtonBox>
        </ContentsContainer>
        <TermsModal
          open={state?.termsModal}
          close={() => onChangeState('termsModal', false)}
          html={state?.termsHtml}
          onPress={() => null}
          isButton={false}
        />
        <BottomFixButton
          index={1}
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

export default HousePayWayPresenter;
