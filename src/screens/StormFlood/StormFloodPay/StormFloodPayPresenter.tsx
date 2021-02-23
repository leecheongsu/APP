import React, { useEffect, useRef } from 'react';
import { BottomFixButton, CheckLabelButton, DefaultInput, OverayLoading, Select, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { priceDot, screenWidth } from '@app/lib';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import { TermsModal } from '@app/screens';
import theme from '@app/style/theme';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ElectronicSign from '@app/screens/StormFlood/ElectronicSign';
import { useGlobalState } from '@app/context';
import SignConfirm from '@app/screens/StormFlood/SignConfirm';
import SimpleToast from 'react-native-simple-toast';
type StormFloodPayPresenterTypes = {
  state: StormFloodStateTypes;
  nextButton: () => void;
  onClickTermsModalOpen: (name: any, html: any) => void;
  handlePreviousButton: () => void;
  onChangeState: (name: StormFloodName, value: any) => void;
  selectCard: (name: any) => void;
  inputState: {
    card1: any;
    card2: any;
    card3: any;
    card4: any;
    cardYear: any;
    cardMonth: any;
    birthDay: any;
    pw: any;
  };
  postDenial: () => void;
  selectTerm: (name) => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const ContentsContainer = styled.View``;

const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RowItem = styled.View`
  align-items: center;
`;

const ResultBox = styled.View`
  padding: 20px 15px;
  background-color: ${theme.color.GRAY2};
`;

const TitleBox = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.INPUT_GRAY};
  padding: 7px 0px;
`;

const ButtonBox = styled.View`
  margin-top: 15px;
`;

const CardPayBox = styled.View`
  padding: 20px 15px 100px 15px;
`;

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

function StormFloodPayPresenter({
  state,
  nextButton,
  onChangeState,
  onClickTermsModalOpen,
  handlePreviousButton,
  inputState,
  selectCard,
  postDenial,
  selectTerm,
}: StormFloodPayPresenterTypes) {
  const globalState = useGlobalState();
  const card2Ref: any = useRef(null);
  const card3Ref: any = useRef(null);
  const card4Ref: any = useRef(null);
  const yyRef: any = useRef(null);
  const selectItem = [
    { label: '현대', value: '현대' },
    { label: '신한', value: '신한' },
    { label: '삼성', value: '삼성' },
    { label: 'KB국민', value: 'KB국민' },
  ];
  const selectItem2 = [
    { label: '일시불', value: '일시불' },
    { label: '1개월', value: '1개월' },
    { label: '2개월', value: '2개월' },
    { label: '3개월', value: '3개월' },
    { label: '4개월', value: '4개월' },
    { label: '5개월', value: '5개월' },
    { label: '6개월', value: '6개월' },
    { label: '7개월', value: '7개월' },
    { label: '8개월', value: '8개월' },
    { label: '9개월', value: '9개월' },
    { label: '10개월', value: '10개월' },
    { label: '11개월', value: '11개월' },
    { label: '12개월', value: '12개월' },
  ];
  //카드인풋 자동 다음칸이동
  useEffect(() => {
    const inputCardLength =
      inputState.card1.value + inputState.card2.value + inputState.card3.value + inputState.card4.value;
    if (inputState.card1.value.length === 4 && inputCardLength.length === 4) {
      card2Ref.current.focus();
    } else if (inputState.card2.value.length === 4 && inputCardLength.length === 8) {
      card3Ref.current.focus();
    } else if (inputState.card3.value.length === 4 && inputCardLength.length === 12) {
      card4Ref.current.focus();
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState.card1.value, inputState.card2.value, inputState.card3.value]);

  //카드 유효기간 다음칸 자동이동
  useEffect(() => {
    const inputTermLength = inputState.cardMonth.value + inputState.cardYear.value;
    if (inputState.cardMonth.value.length === 2 && inputTermLength.length === 2) {
      yyRef.current.focus();
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState.cardMonth.value]);
  return (
    <>
      <Container>
        <OverayLoading visible={false} />
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === 'ios' ? -200 : -10}>
          <ContentsContainer>
            <ResultBox>
              <TitleBox>
                <RowBox>
                  <RowItem>
                    <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                      결제 정보
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <Typhograph type="ROBOTO" weight="BOLD" color="SKYBLUE" size={16}>
                      {priceDot(state?.resultPrice?.perPrem)}
                      <Typhograph type="NOTO" color="GRAY">
                        원
                      </Typhograph>
                    </Typhograph>
                  </RowItem>
                </RowBox>
              </TitleBox>
              <ButtonBox>
                <CheckLabelButton
                  active={state?.isSign}
                  iscenter
                  onPress={() => onChangeState('electronicSignModal', true)}
                  title="전자서명 하기"
                />
              </ButtonBox>
              <ButtonBox>
                <CheckLabelButton
                  active={state?.isSignConfirm}
                  iscenter
                  onPress={() => postDenial()}
                  title="전자서명 확인하기"
                />
              </ButtonBox>
            </ResultBox>
            <CardPayBox>
              <TitleBox>
                <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                  신용카드 결제 정보
                </Typhograph>
              </TitleBox>
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

              <SelectBox>
                <LabelBox>
                  <Typhograph type="NOTO" color="BLACK2">
                    할부개월수
                  </Typhograph>
                </LabelBox>
                <Select
                  items={selectItem2}
                  label="할부개월수를 선택해주세요."
                  value={state.selectTerm}
                  onValueChange={selectTerm}
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
                    <DefaultInput {...inputState.card2} propsRef={card2Ref} keyboardType="numeric" maxLength={4} />
                  </InputItem>
                  <InputItem>
                    <DefaultInput {...inputState.card3} propsRef={card3Ref} keyboardType="numeric" maxLength={4} />
                  </InputItem>
                  <InputItem>
                    <DefaultInput {...inputState.card4} propsRef={card4Ref} keyboardType="numeric" maxLength={4} />
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
                    <DefaultInput {...inputState.cardMonth} placeholder="MM" keyboardType="numeric" maxLength={2} />
                  </InputItem>
                  <InputItem>
                    <DefaultInput
                      propsRef={yyRef}
                      {...inputState.cardYear}
                      placeholder="YY"
                      keyboardType="numeric"
                      maxLength={2}
                    />
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
            </CardPayBox>
          </ContentsContainer>
        </KeyboardAwareScrollView>

        <ElectronicSign
          url={globalState?.electronicSignPreData?.localurltmp}
          open={state.electronicSignModal}
          close={() => onChangeState('electronicSignModal', false)}
          onClick={() => onChangeState('isSign', true)}
        />

        <SignConfirm
          url={globalState?.electronicSignPreData?.localurltmp}
          open={state.signConfirmModal}
          close={() => onChangeState('signConfirmModal', false)}
          state={state}
          onClick={() => onChangeState('isSignConfirm', true)}
        />
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

export default StormFloodPayPresenter;
