import { BottomFixButton, DefaultInput, Typhograph } from '@app/components';
import { screenWidth } from '@app/lib';
import styled from '@app/style/typed-components';
import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SimpleToast from 'react-native-simple-toast';

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

export default function BusinessForm({ state, inputState, onChangeState, handleNextButton, handlePreviousButton }) {
  const checkInput = () => {
    if (inputState.companyName.value === '') {
      SimpleToast.show('상호명을 입력해주세요.');
      return false;
    } else if (inputState.companyNumber.value === '') {
      SimpleToast.show('사업자번호를 입력해주세요.');
      return false;
    } else if (inputState.companyNumber.value.length !== 10) {
      SimpleToast.show('올바른 사업자번호를 입력해주세요.');
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
        isKeybordView={state.isKeybordView}
      />
    </Container>
  );
}
