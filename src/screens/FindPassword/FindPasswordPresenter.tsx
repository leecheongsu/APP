import React from 'react';
import styled from '@app/style/typed-components';
import {
  BottomFixButton,
  DefaultInput,
  FocusAwareStatusBar,
  FullLabel,
  OverayLoading,
  ServiceSelect,
  Typhograph,
} from '@app/components';
import { ScrollView } from 'react-native-gesture-handler';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import { insuIcon } from '@app/assets';
const Container = styled.View``;
const ContentsContainer = styled.View`
  width: ${screenWidth()}px;
`;
const ContentsBox = styled.View`
  padding: 10px 20px;
`;
const InputContainer = styled.View`
  justify-content: center;
  margin-top: 10px;
`;
const LabelBox = styled.View`
  margin: 10px 0px;
`;
const InputBox = styled.View``;
const InputBox2 = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const SelectBox = styled.View`
  border-width: 1px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border-color: ${theme.color.BORDER_GRAY};
`;

const InfoBox = styled.View`
  padding: 200px 0px;
  align-items: center;
`;
const CheckIcon = styled.Image`
  width: 66px;
  height: 66px;
`;
const InfoTextBox = styled.View`
  margin-top: 10px;
`;

function ResultContainer() {
  return (
    <ContentsContainer>
      <FullLabel title={`새로운 비밀번호로${'\n'} 변경되었습니다.`} />
      <InfoBox>
        <CheckIcon source={insuIcon.BTN_ON} />
        <InfoTextBox>
          <Typhograph type="NOTO" color="BLACK3">
            확인을 누르시면 로그인 페이지로 이동합니다.
          </Typhograph>
        </InfoTextBox>
      </InfoBox>
    </ContentsContainer>
  );
}

function ConfirmConatiner({ state, inputState }) {
  return (
    <ContentsContainer>
      <FullLabel title={`새로운 비밀번호를${'\n'} 입력하여 주세요.`} />
      <ContentsBox>
        <InputContainer>
          <LabelBox>
            <Typhograph type="NOTO">비밀번호</Typhograph>
          </LabelBox>
          <InputBox>
            <DefaultInput
              {...inputState?.password}
              secureTextEntry={true}
              placeholder="비밀번호를 입력하세요. (영문+숫자+특수기호 8자리 이상)"
            />
          </InputBox>
        </InputContainer>

        <InputContainer>
          <LabelBox>
            <Typhograph type="NOTO">비밀번호 확인</Typhograph>
          </LabelBox>
          <InputBox>
            <DefaultInput
              {...inputState?.passwordConfirm}
              secureTextEntry={true}
              placeholder="비밀번호를 입력하세요. (영문+숫자+특수기호 8자리 이상)"
            />
          </InputBox>
        </InputContainer>
      </ContentsBox>
    </ContentsContainer>
  );
}

function InputConatiner({ inputState, state, onValueChange }) {
  return (
    <>
      <ContentsContainer>
        <FullLabel title={`회원가입시 입력한 고객님의${'\n'} 정보(이메일, 휴대폰)을 입력하여 주세요.`} />
        <ContentsBox>
          <InputContainer>
            <LabelBox>
              <Typhograph type="NOTO">이메일</Typhograph>
            </LabelBox>
            <InputBox style={{ marginTop: 0 }}>
              <DefaultInput {...inputState?.email} placeholder="이메일을 입력하세요.(예 : abc@gmail.com)" />
            </InputBox>
          </InputContainer>

          <InputContainer>
            <LabelBox>
              <Typhograph type="NOTO" weight="MEDIUM">
                휴대전화
              </Typhograph>
            </LabelBox>
            <InputBox2>
              <SelectBox style={{ width: '40%', marginRight: '2%' }}>
                <ServiceSelect
                  value={state.selectService}
                  items={state.serviceType}
                  right={15}
                  onValueChange={onValueChange}
                />
              </SelectBox>
              <InputBox style={{ width: '58%' }}>
                <DefaultInput {...inputState.phone} keyboardType="phone-pad" maxLength={11} />
              </InputBox>
            </InputBox2>
          </InputContainer>
        </ContentsBox>
      </ContentsContainer>
    </>
  );
}

function FindPasswordPresenter({
  state,
  onChangeState,
  handleNextButton,
  handlePreviousButton,
  scrollRef,
  inputState,
  onValueChange,
}) {
  return (
    <>
      <OverayLoading visible={state?.loading} />
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Container>
        <ScrollView
          onScroll={() => null}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          scrollEventThrottle={100}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ref={scrollRef}>
          <InputConatiner inputState={inputState} state={state} onValueChange={onValueChange} />
          <ConfirmConatiner state={state} inputState={inputState} />
          <ResultContainer />
        </ScrollView>
      </Container>
      <BottomFixButton
        index={state.currentPage}
        leftTitle="이전"
        rightTitle="확인"
        bottomRightPress={handleNextButton}
        bottomLeftPress={handlePreviousButton}
        isKeybordView={state.isKeybordView}
      />
    </>
  );
}

export default FindPasswordPresenter;
