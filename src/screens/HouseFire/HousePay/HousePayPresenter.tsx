import { BottomFixButton, Typhograph } from '@app/components';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React from 'react';
import { BootpayWebView } from 'react-native-bootpay';
const Container = styled.View`
  width: ${screenWidth()}px;
  padding-bottom: 65px;
`;
const ContentsContainer = styled.ScrollView`
  padding: 20px;
`;
const TitleBox = styled.View`
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;

const InfoBox = styled.View`
  margin-top: 10px;
`;
const RowBox = styled.View`
  margin-top: 5px;
  flex-direction: row;
  justify-content: space-between;
`;
const RowItem = styled.View``;
const SelectButtonBox = styled.View`
  margin-top: 20px;
`;
const SelectButtonBoxItem = styled.View`
  margin-top: 10px;
`;
function HousePayPresenter({
  state,
  submitNextButton,
  handlePreviousButton,
  onChangeTermsState,
  onChangeState,
  onClickTermsModalAgree,
  onClickTermsModalOpen,
  onClickAllCheck,
  insuPrice,
  selectInsu,
  onPress,
  onCancel,
  onError,
  onReady,
  onConfirm,
  onDone,
  onClose,
  bootpay,
}) {
  return (
    <Container>
      <ContentsContainer>
        <TitleBox>
          <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
            결제
          </Typhograph>
        </TitleBox>
        <InfoBox>
          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                상품번호
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="NOTO" color="BLACK2">
                F20200631203
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
              <Typhograph type="ROBOTO" color="SKYBLUE" weight="BOLD" size={18}>
                {insuPrice}{' '}
                <Typhograph type="NOTO" color="BLACK2">
                  원
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>
        </InfoBox>
      </ContentsContainer>
      <BootpayWebView
        ref={bootpay}
        ios_application_id={'59a4d328396fa607b9e75de6'}
        android_application_id={'59a4d326396fa607cbe75de5'}
        onCancel={onCancel}
        onError={onError}
        onReady={onReady}
        onConfirm={onConfirm}
        onDone={onDone}
        onClose={onClose}
        allowFileAccess={true}
        scalesPageToFit={true}
        originWhitelist={['*']}
      />
      <BottomFixButton
        index={state.stepNumber}
        leftTitle="이전"
        rightTitle="결제"
        bottomRightPress={submitNextButton}
        bottomLeftPress={handlePreviousButton}
        isKeybordView={state.isKeybordView}
      />
    </Container>
  );
}

export default HousePayPresenter;
