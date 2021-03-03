import React from 'react';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BottomFixButton, CustomButton, DefaultInput, ServiceSelect, Typhograph } from '@app/components';
import { Platform } from 'react-native';
import { JoinStateTypes } from '@app/screens/Join/JoinContainer';
import { InputTypes } from '@app/types';

type BasicFormPresenterTypes = {
  state: JoinStateTypes;
  handleClickButton: (value: any) => void;
  inputState: {
    email: InputTypes;
    name: InputTypes;
    phone: InputTypes;
    idNumber: InputTypes;
    sexNumber: InputTypes;
    password: InputTypes;
    passwordConfirm: InputTypes;
    companyName: InputTypes;
    companyNumber: InputTypes;
  };
  onValueChange: (value: any) => void;
  nextButton: () => void;
  sexRef: any;
};

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

const NumberBox = styled.View`
  width: 58%;
`;

function BasicFormPresenter({
  state,
  handleClickButton,
  inputState,
  onValueChange,
  nextButton,
  sexRef,
}: BasicFormPresenterTypes) {
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
                  <DefaultInput {...inputState?.sexNumber} propsRef={sexRef} maxLength={1} keyboardType="numeric" />
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
          isKeybordView={false}
        />
      </Container>
    </>
  );
}

export default BasicFormPresenter;
