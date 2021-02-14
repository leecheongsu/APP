import React from 'react';
import { BottomFixButton, RightIconButton, Typhograph } from '@app/components';
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
  onClickTermsModalOpen: (name: any, html: any) => void;
  onChangeState: (name: StormFloodName, value: any) => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const ContentsContainer = styled.View`
  padding: 20px 15px;
`;

const TextBox = styled.View`
  margin-top: 20px;
`;

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
`;

function ProductInfomationPresenter({
  state,
  nextButton,
  onClickTermsModalOpen,
  onChangeState,
}: ProductInfomationTypes) {
  return (
    <>
      <Container>
        <ContentsContainer>
          <TextBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={20}>
              태풍, 홍수 걱정된다면?{'\n'}
              “풍수해 보험” 에 가입하세요.
            </Typhograph>
          </TextBox>
          <TextBox>
            <Typhograph type="NOTO" color="BLACK3" weight="MEDIUM" size={15}>
              올해부터는 최대{' '}
              <Typhograph type="NOTO" color="SKYBLUE">
                92%까지
              </Typhograph>{' '}
              지원해주는{'\n'}
              정부지원금으로 부담없이 지켜 드립니다.
            </Typhograph>
            <Typhograph type="NOTO" size={12} color="BLACK3">
              (태풍, 홍수, 호우, 강풍, 대설, 지진, 풍랑, 해일)
            </Typhograph>
          </TextBox>

          <RowBox style={{ marginTop: 40 }}>
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
            <RowItem width="33%">
              <Image source={insuImg.STORMFLOOD_MAIN1} />
              <Typhograph type="NOTO" color="BLUE" style={{ textAlign: 'center' }}>
                주택의{'\n'} 파손또는 침수
              </Typhograph>
            </RowItem>
            <RowItem width="33%">
              <Image source={insuImg.STORMFLOOD_MAIN2} />
              <Typhograph type="NOTO" color="BLUE" style={{ textAlign: 'center' }}>
                온실의{'\n'} 파손 및 유실
              </Typhograph>
            </RowItem>
            <RowItem width="33%">
              <Image source={insuImg.STORMFLOOD_MAIN3} />
              <Typhograph type="NOTO" color="BLUE" style={{ textAlign: 'center' }}>
                소상공인{'\n'}상가·공장
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
                  지진, 태풍, 홍수, 호우, 강풍 등으로 인한 사고를 실손 비용 보상
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>

          <ButtonBox>
            <RightIconButton
              onPress={() => onClickTermsModalOpen('productionInfo', productInfoHtml())}
              title="상품안내 및 보장내용 자세히보기"
            />
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
          index={state.stepNumber}
          leftTitle="이전"
          rightTitle="다음"
          bottomRightPress={() => nextButton()}
          bottomLeftPress={() => null}
          isKeybordView={state.isKeybordView}
        />
      </Container>
    </>
  );
}

export default ProductInfomationPresenter;
