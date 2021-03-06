import React from 'react';
import { BottomFixButton, DefaultInput, Typhograph } from '@app/components';
import { screenWidth } from '@app/lib';
import { JoinStateTypes } from '@app/screens/Join/JoinContainer';
import styled from '@app/style/typed-components';
import { InputTypes } from '@app/types';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  nextButton: () => void;
  handlePreviousButton: () => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const ContentsContainer = styled.View`
  padding: 20px 15px;
`;
const LabelBox = styled.View`
  margin-top: 10px;
`;
const InputBox = styled.View`
  margin-top: 5px;
`;
const CompanyNameInputBox = styled.View``;
const CompanyNumberInputBox = styled.View``;

function BusinessFormPresenter({ inputState, state, nextButton, handlePreviousButton }: BusinessFormPresenterTypes) {
  return (
    <Container>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === 'ios' ? 30 : -10}
        enableResetScrollToCoords={false}>
        <ContentsContainer>
          <CompanyNameInputBox>
            <LabelBox>
              <Typhograph type="NOTO" weight="MEDIUM">
                상호명
              </Typhograph>
            </LabelBox>
            <InputBox>
              <DefaultInput {...inputState?.companyName} placeholder="사업자명을 입력하세요." />
            </InputBox>
          </CompanyNameInputBox>

          <CompanyNumberInputBox>
            <LabelBox>
              <Typhograph type="NOTO" weight="MEDIUM">
                사업자 번호
              </Typhograph>
            </LabelBox>
            <InputBox>
              <DefaultInput
                {...inputState?.companyNumber}
                placeholder="사업자번호를 입력하세요."
                maxLength={10}
                keyboardType="numeric"
              />
            </InputBox>
          </CompanyNumberInputBox>
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
