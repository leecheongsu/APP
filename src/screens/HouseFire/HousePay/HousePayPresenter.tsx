import React from 'react';
import { BottomFixButton, DefaultInput, Select, Typhograph } from '@app/components';
import { screenWidth } from '@app/lib';
import { HouseFireStateName, HouseFireStateTypes, TermsNames } from '@app/screens/HouseFire/HouseFireContainer';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform } from 'react-native';

type HousePayPresenterTypes = {
  state: HouseFireStateTypes;
  onClickTermsModalOpen: (name: any, html: any) => void;
  handlePreviousButton: () => void;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  insuPrice: number;
  submitNextButton: () => void;
  onChangeTermsState: (name: TermsNames, value: any) => void;
  onClickTermsModalAgree: () => void;
  onClickAllCheck: (list: any, isActive: any) => void;
  selectInsu: any;
  selectCard: (name) => any;
  inputState: any;
};
const Container = styled.View`
  width: ${screenWidth()}px;
`;
const ContentsContainer = styled.ScrollView`
  padding: 20px;
`;
const TitleBox = styled.View`
  padding-bottom: 10px;
  background-color: ${theme.color.GRAY2};
`;

const TitleBox2 = styled.View`
  padding: 10px 0px;
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

const SelectBox = styled.View``;

const LabelBox = styled.View`
  padding: 10px 0px;
`;
const InputBox = styled.View``;
const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const InputItem = styled.View`
  width: 24%;
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
  selectCard,
  inputState,
}: HousePayPresenterTypes) {
  const selectItem = [
    { label: '삼성', value: '삼성' },
    { label: 'KB국민', value: 'KB국민' },
    { label: '현대', value: '현대' },
    { label: '비씨', value: '비씨' },
    { label: '신한', value: '신한' },
    { label: 'NH농협', value: 'NH농협' },
    { label: '롯데', value: '롯데' },
  ];
  return (
    <Container>
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={Platform.OS === 'ios' ? 30 : -10}>
        {state?.payway === 'card' ? (
          <>
            <TitleBox>
              <RowBox style={{ padding: 15 }}>
                <RowItem>
                  <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
                    총 결제 보험료
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="ROBOTO" color="SKYBLUE" weight="BOLD" size={17}>
                    {insuPrice}
                    <Typhograph type="NOTO" color="BLACK2">
                      원
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>
            </TitleBox>

            <ContentsContainer>
              <TitleBox2>
                <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                  신용카드 결제 정보
                </Typhograph>
              </TitleBox2>

              <SelectBox>
                <LabelBox>
                  <Typhograph type="NOTO" color="BLACK2">
                    카드사
                  </Typhograph>
                </LabelBox>
                <Select
                  items={selectItem}
                  label="카드사를 선택해주세요."
                  value={state.selectCard}
                  onValueChange={selectCard}
                  borderColor="BORDER_GRAY"
                />
              </SelectBox>

              <InputBox>
                <LabelBox>
                  <Typhograph type="NOTO" color="BLACK2">
                    카드번호
                  </Typhograph>
                </LabelBox>
                <InputContainer>
                  <InputItem>
                    <DefaultInput {...inputState.card1} keyboardType="numeric" maxLength={4} />
                  </InputItem>
                  <InputItem>
                    <DefaultInput {...inputState.card2} keyboardType="numeric" maxLength={4} />
                  </InputItem>
                  <InputItem>
                    <DefaultInput {...inputState.card3} keyboardType="numeric" maxLength={4} />
                  </InputItem>
                  <InputItem>
                    <DefaultInput {...inputState.card4} keyboardType="numeric" maxLength={4} />
                  </InputItem>
                </InputContainer>
              </InputBox>

              <InputBox>
                <LabelBox>
                  <Typhograph type="NOTO" color="BLACK2">
                    카드유효기간
                  </Typhograph>
                </LabelBox>
                <InputContainer style={{ justifyContent: 'flex-start' }}>
                  <InputItem style={{ marginRight: 5 }}>
                    <DefaultInput {...inputState.cardYear} placeholder="YY" keyboardType="numeric" maxLength={2} />
                  </InputItem>
                  <InputItem>
                    <DefaultInput {...inputState.cardMonth} placeholder="MM" keyboardType="numeric" maxLength={2} />
                  </InputItem>
                </InputContainer>
              </InputBox>

              <InputBox>
                <LabelBox>
                  <Typhograph type="NOTO" color="BLACK2">
                    생년월일(6자리 예:990101) / 사업자번호
                  </Typhograph>
                </LabelBox>
                <InputContainer style={{ justifyContent: 'flex-start' }}>
                  <InputItem style={{ width: '100%' }}>
                    <DefaultInput {...inputState.birthDay} placeholder="YYMMDD" keyboardType="numeric" maxLength={6} />
                  </InputItem>
                </InputContainer>
              </InputBox>

              <InputBox>
                <LabelBox>
                  <Typhograph type="NOTO" color="BLACK2">
                    카드비밀번호 앞 2자리
                  </Typhograph>
                </LabelBox>
                <InputContainer style={{ justifyContent: 'flex-start' }}>
                  <InputItem style={{ marginRight: 5 }}>
                    <DefaultInput {...inputState.pw} keyboardType="numeric" maxLength={2} />
                  </InputItem>
                  <InputItem>
                    <Typhograph type="NOTO" color="GRAY">
                      ● ●
                    </Typhograph>
                  </InputItem>
                </InputContainer>
              </InputBox>
            </ContentsContainer>
          </>
        ) : (
          <ContentsContainer>
            <Typhograph type="NOTO">가상계좌</Typhograph>
          </ContentsContainer>
        )}
      </KeyboardAwareScrollView>
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
