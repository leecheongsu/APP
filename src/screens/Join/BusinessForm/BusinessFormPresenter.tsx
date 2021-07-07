import React from 'react';
import {BottomFixButton, DefaultInput, ServiceSelect, Typhograph} from '@app/components';
import { screenWidth } from '@app/lib';
import { JoinStateTypes } from '@app/screens/Join/JoinContainer';
import styled from '@app/style/typed-components';
import { InputTypes } from '@app/types';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import theme from "@app/style/theme";

type BusinessFormPresenterTypes = {
  state: JoinStateTypes;
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
  handlePreviousButton: () => void;
  sexRef_bussiness: any;
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

function BusinessFormPresenter({ inputState, state, nextButton, handlePreviousButton, onValueChange, sexRef_bussiness }: BusinessFormPresenterTypes) {
  return (
    <Container>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === 'ios' ? 30 : -10}
        enableResetScrollToCoords={false}>
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
                <DefaultInput {...inputState?.sexNumber} propsRef={sexRef_bussiness} maxLength={1} keyboardType="numeric" />
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
        bottomLeftPress={() => handlePreviousButton()}
        isKeybordView={false}
      />
    </Container>
  );
}

export default BusinessFormPresenter;
