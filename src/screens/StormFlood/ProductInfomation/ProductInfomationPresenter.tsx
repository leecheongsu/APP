import React from 'react';
import { BottomFixButton, ConfirmModal, RightIconButton, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import { Image } from 'react-native';
import { insuImg } from '@app/assets';
import { TermsModal } from '@app/screens';
import { productInfoHtml } from '@app/lib/html';
type ProductInfomationTypes = {
  state: StormFloodStateTypes;
  nextButton: () => void;
  onChangeState: (name: StormFloodName, value: any) => void;
  onClickTermsModalOpen2: (name: any, html: any) => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const ContentsContainer = styled.ScrollView`
  padding: 20px 15px;
`;

const TextBox = styled.View``;

const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RowItem = styled.View`
  align-items: center;
  width: ${(props) => (props.width ? props.width : '0px')};
`;

const ButtonBox = styled.View`
  margin-top: 40px;
  padding-bottom: 150px;
`;

function ProductInfomationPresenter({
  state,
  nextButton,
  onClickTermsModalOpen2,
  onChangeState,
}: ProductInfomationTypes) {
  return (
    <>
      <Container>
        <ContentsContainer>
          <TextBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={22}>
              태풍, 홍수 걱정된다면?
            </Typhograph>
          </TextBox>
          <TextBox>
            <Typhograph type="NOTO" color="BLACK3" weight="MEDIUM" size={15} style={{ marginTop: 20 }}>
              <Typhograph type="NOTO" color="SKYBLUE">
                최대 92%까지{' '}
              </Typhograph>
              보험료 정부지원받고{'\n'}
              <Typhograph type="NOTO" color="SKYBLUE">
                "풍수해보험"{' '}
              </Typhograph>
              가입하세요.
            </Typhograph>
          </TextBox>

          <RowBox style={{ marginTop: 80 }}>
            <RowItem width="15%">
              <Typhograph type="ROBOTO" color="SKYBLUE" size={40} weight="BOLD" lineheight={1}>
                1.
              </Typhograph>
            </RowItem>
            <RowItem width="85%">
              <Typhograph type="NOTO" color="BLUE" lineheight={2} weight="BOLD" size={14}>
                자연재해 사고 보장{'\n'}
                <Typhograph type="NOTO" color="BLUE" lineheight={2} weight="MEDIUM" size={13}>
                  지진, 태풍, 홍수, 호우, 강풍 등으로 인한 사고를 실손 비용 보상
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>

          <RowBox style={{ marginTop: 20 }}>
            <RowItem width="100%">
              <Image source={insuImg.STORMFLOOD_MAIN3} />
              <Typhograph type="NOTO" color="BLUE" style={{ textAlign: 'center' }}>
                소상공인 상가
              </Typhograph>
            </RowItem>
          </RowBox>

          <RowBox style={{ marginTop: 40 }}>
            <RowItem width="15%">
              <Typhograph type="ROBOTO" color="SKYBLUE" size={40} weight="BOLD" lineheight={1}>
                2.
              </Typhograph>
            </RowItem>
            <RowItem width="85%">
              <Typhograph type="NOTO" color="BLUE" lineheight={2} weight="BOLD" size={14}>
                정부가 보험료의{' '}
                <Typhograph type="NOTO" color="SKYBLUE" weight="BOLD">
                  70% 이상을 지원
                </Typhograph>{' '}
                합니다.{'\n'}
                <Typhograph type="NOTO" color="BLUE" lineheight={2} weight="MEDIUM" size={13}>
                  가입자가 부담해야 할 보험료의 52.5% ~ 92%를 정부와 지자체가 지원해 드립니다.
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>

          <ButtonBox>
            <RightIconButton
              onPress={() => onClickTermsModalOpen2('productionInfo', productInfoHtml())}
              title="상품안내 및 보장내용 자세히보기"
            />
          </ButtonBox>
        </ContentsContainer>
        <TermsModal
          open={state?.termsModal}
          close={() => onChangeState('termsModal', false)}
          html={state?.termsHtml}
          onPress={() => onChangeState('termsModal', false)}
          buttonTitle="확인"
          isButton
        />
        <BottomFixButton
          index={state.stepNumber}
          leftTitle="이전"
          rightTitle="보험료 간편계산"
          bottomRightPress={() => nextButton()}
          bottomLeftPress={() => null}
          isKeybordView={state.isKeybordView}
        />
      </Container>
    </>
  );
}

export default ProductInfomationPresenter;
