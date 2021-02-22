import React, { useEffect, useRef, useState } from 'react';
import { BottomFixButton, CustomButton, DefaultInput, ServiceSelect, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, TextInputProps } from 'react-native';
import theme from '@app/style/theme';
import Toast from 'react-native-simple-toast';

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const ContentsContainer = styled.View`
  padding: 20px 15px;
`;
const ButtonBox = styled.View`
  flex-direction: row;
  background-color: ${theme.color.MENU_BACKGROUD_COLOR};
  padding: 15px;
`;

const ButtonItem = styled.View`
  margin-right: 10px;
`;
const EmailInputBox = styled.View``;
const NameInputBox = styled.View``;
const JuminInputBox = styled.View``;

const SelectBox = styled.View`
  border-width: 1px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  height: 51px;
  border-color: ${theme.color.BORDER_GRAY};
`;
const LabelBox = styled.View`
  margin-top: 10px;
`;
const InputBox = styled.View`
  margin-top: 5px;
`;

const RowBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Input = styled.TextInput<{ isFocus: boolean } & TextInputProps>`
  height: 50px;
  min-width: 0px;
  border-color: ${(props: any) => (props.isFocus ? theme.color.GRAY : theme.color.INPUT_GRAY)};
  border-width: ${(props: any) => (props.isFocus ? '1px' : '1px')};
  border-radius: 10px;
  padding: 0px 10px 0px 10px;
`;

const NumberBox = styled.View`
  width: 58%;
`;

export default function BasicForm({ state, handleNextButton, onChangeState, inputState, onValueChange }) {
  const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const phoneCheck = /^\d{3}\d{3,4}\d{4}$/;
  const juminFront = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;
  const sexRef: any = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  //정보입력 체크
  const checkInput = () => {
    if (inputState.email.value === '') {
      Toast.show('이메일을 입력해주세요.');
      return false;
    } else if (!emailCheck.test(inputState.email.value)) {
      Toast.show('올바른 이메일 주소를 입력해주세요.');
    } else if (inputState.name.value === '') {
      Toast.show('이름을 입력하세요.');
      return false;
    } else if (inputState.phone.value === '') {
      Toast.show('휴대 전화번호를 입력해주세요.');
      return false;
    } else if (!phoneCheck.test(inputState.phone.value)) {
      Toast.show('올바른 휴대 전화번호를 입력해주세요.');
      return false;
    } else if (inputState.idNumber.value === '' || inputState.idNumber.value.length < 6) {
      Toast.show('주민등록번호 앞자리를 입력해주세요.');
      return false;
    } else if (!juminFront.test(inputState.idNumber.value) || inputState.sexNumber.value > 2) {
      Toast.show('올바른 주민등록번호를 입력해주세요.');
      return false;
    } else if (inputState.sexNumber.value === '') {
      Toast.show('주민등록번호 뒤 첫번째 자리를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

  const nextButton = () => {
    if (checkInput()) {
      handleNextButton();
    }
  };

  const handleClickButton = (value) => {
    onChangeState('selectType', value);
  };

  useEffect(() => {
    if (inputState.idNumber.value.length === 6) {
      sexRef.current.focus();
    }
  }, [inputState.idNumber.value]);

  return (
    <>
      <Container>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === 'ios' ? 30 : -10}
          enableResetScrollToCoords={false}>
          <ButtonBox>
            <ButtonItem>
              <CustomButton
                onPress={() => handleClickButton('individual')}
                radius={30}
                background={state.selectType === 'individual' ? 'SKYBLUE' : 'WHITE'}
                width={130}>
                <Typhograph type="NOTO" color={state.selectType === 'individual' ? 'WHITE' : 'BLUE'} weight="MEDIUM">
                  개인회원
                </Typhograph>
              </CustomButton>
            </ButtonItem>
            <ButtonItem>
              <CustomButton
                onPress={() => handleClickButton('buisness')}
                radius={30}
                background={state.selectType === 'buisness' ? 'SKYBLUE' : 'WHITE'}
                width={130}>
                <Typhograph type="NOTO" color={state.selectType === 'buisness' ? 'WHITE' : 'BLUE'} weight="MEDIUM">
                  개인사업자
                </Typhograph>
              </CustomButton>
            </ButtonItem>
          </ButtonBox>
          <ContentsContainer>
            <EmailInputBox>
              <LabelBox>
                <Typhograph type="NOTO" weight="MEDIUM">
                  이메일
                </Typhograph>
              </LabelBox>
              <InputBox>
                <DefaultInput
                  {...inputState?.email}
                  keyboardType="email-address"
                  placeholder="이메일주소를 입력하세요."
                  textContentType="emailAddress"
                />
              </InputBox>
            </EmailInputBox>

            <NameInputBox>
              <LabelBox>
                <Typhograph type="NOTO" weight="MEDIUM">
                  이름
                </Typhograph>
              </LabelBox>
              <InputBox>
                <DefaultInput {...inputState?.name} placeholder="이름을 입력하세요.(예:홍길동)" />
              </InputBox>
            </NameInputBox>

            <NameInputBox>
              <LabelBox>
                <Typhograph type="NOTO" weight="MEDIUM">
                  휴대전화
                </Typhograph>
              </LabelBox>
              <InputBox>
                <RowBox>
                  <SelectBox style={{ width: '40%', marginRight: '2%' }}>
                    <ServiceSelect
                      value={state.selectService}
                      items={state.serviceType}
                      right={15}
                      onValueChange={onValueChange}
                    />
                  </SelectBox>
                  <NumberBox>
                    <DefaultInput
                      {...inputState?.phone}
                      maxLength={11}
                      keyboardType="phone-pad"
                      placeholder="숫자만 입력해주세요."
                    />
                  </NumberBox>
                </RowBox>
              </InputBox>
            </NameInputBox>

            <JuminInputBox>
              <LabelBox>
                <Typhograph type="NOTO" weight="MEDIUM">
                  주민등록번호
                </Typhograph>
              </LabelBox>
              <RowBox>
                <InputBox style={{ width: '50%' }}>
                  <DefaultInput
                    {...inputState?.idNumber}
                    keyboardType="numeric"
                    maxLength={6}
                    placeholder="생년월일 6자리"
                  />
                </InputBox>
                <Typhograph type="NOTO" style={{ marginLeft: 10, marginRight: 10 }} lineheight={20}>
                  -
                </Typhograph>
                <InputBox style={{ width: 30, marginRight: 2 }}>
                  <Input
                    {...inputState?.sexNumber}
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
                  ●●●●●●
                </Typhograph>
              </RowBox>
            </JuminInputBox>
          </ContentsContainer>
        </KeyboardAwareScrollView>
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
