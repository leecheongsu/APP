import React, { useEffect, useRef, useState } from 'react';
import styled from '@app/style/typed-components';
import {
  BottomFixButton,
  DefaultInput,
  FocusAwareStatusBar,
  FullLabel,
  ServiceSelect,
  Typhograph,
} from '@app/components';
import { ScrollView } from 'react-native-gesture-handler';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import { Keyboard, TextInputProps } from 'react-native';
const Container = styled.View``;
const ContentsContainer = styled.View`
  width: ${screenWidth()}px;
`;
const ContentsBox = styled.View`
  padding: 10px 20px;
`;
const InputContainer = styled.View`
  justify-content: center;
`;
const LabelBox = styled.View`
  margin: 10px 0px;
`;
const InputBox = styled.View``;
const InputBox2 = styled.View`
  margin-top: 10px;
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

const Input = styled.TextInput<{ isFocus: boolean } & TextInputProps>`
  height: 50px;
  min-width: 0px;
  border-color: ${(props: any) => (props.isFocus ? theme.color.GRAY : theme.color.INPUT_GRAY)};
  border-width: ${(props: any) => (props.isFocus ? '1px' : '1px')};
  border-radius: 10px;
  padding: 0px 10px 0px 10px;
`;

function ConfirmConatiner() {
  return (
    <ContentsContainer>
      <FullLabel title={`인슈로보에 등록하신${'\n'} 본인의 이메일은 아래와 같습니다.`} />
    </ContentsContainer>
  );
}

function InputConatiner({ inputState, state, onValueChange }) {
  const sexRef: any = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    if (inputState.idNumber.value.length === 6) {
      sexRef.current.focus();
    }
  }, [inputState.idNumber.value]);
  return (
    <>
      <ContentsContainer>
        <FullLabel title={`회원가입시 입력한 고객님의${'\n'} 정보(이름, 휴대폰, 생년월일)을 입력하여 주세요.`} />
        <ContentsBox>
          <InputContainer>
            <LabelBox>
              <Typhograph type="NOTO">이름</Typhograph>
            </LabelBox>
            <InputBox>
              <DefaultInput {...inputState?.name} placeholder="이름을 입력하세요(예:홍길동)" />
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
                <DefaultInput {...inputState.phone} keyboardType="phone-pad" />
              </InputBox>
            </InputBox2>
          </InputContainer>

          <InputContainer>
            <LabelBox>
              <Typhograph type="NOTO" weight="MEDIUM">
                주민등록번호
              </Typhograph>
            </LabelBox>
            <InputBox2>
              <InputBox style={{ width: '50%' }}>
                <DefaultInput
                  {...inputState.idNumber}
                  keyboardType="numeric"
                  maxLength={6}
                  placeholder="생년월일 6자리"
                />
              </InputBox>
              <Typhograph type="NOTO" style={{ marginLeft: 10, marginRight: 10 }} lineheight={20}>
                -
              </Typhograph>
              <InputBox style={{ width: 30 }}>
                <Input
                  {...inputState.sex}
                  blurOnSubmit={false}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => {
                    setIsFocus(false);
                  }}
                  ref={sexRef}
                  style={{ alignSelf: 'stretch', fontSize: 13 }}
                  maxLength={1}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  keyboardType="numeric"
                  isFocus={isFocus}
                  autoCompleteType="off"
                  numberOfLines={1}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                />
              </InputBox>
              <Typhograph type="NOTO" color="GRAY3">
                ● ● ● ● ● ●
              </Typhograph>
            </InputBox2>
          </InputContainer>
        </ContentsBox>
      </ContentsContainer>
    </>
  );
}

function FindEmailPresenter({
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
          <ConfirmConatiner />
        </ScrollView>
      </Container>
      <BottomFixButton
        index={state.currentPage}
        leftTitle="이전"
        rightTitle="다음"
        bottomRightPress={handleNextButton}
        bottomLeftPress={handlePreviousButton}
        isKeybordView={state.isKeybordView}
      />
    </>
  );
}

export default FindEmailPresenter;
