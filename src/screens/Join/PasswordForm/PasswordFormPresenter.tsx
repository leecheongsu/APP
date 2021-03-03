import React from 'react';
import { screenWidth } from '@app/lib';
import styled from '@app/style/typed-components';
import { BottomFixButton, CheckLabelButton, DefaultInput, Typhograph } from '@app/components';
import { TermsModal } from '@app/screens';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform } from 'react-native';
import { JoinStateName, JoinStateTypes } from '@app/screens/Join/JoinContainer';
import { InputTypes } from '@app/types';

type PasswordFormPresenterTypes = {
  state: JoinStateTypes;
  onChangeState: (name: JoinStateName, value: any) => void;
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
  handleIndividualButtonClick: () => void;
  handleUseTermsButtonClick: () => void;
  handleClickInModal: () => void;
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
const AgreeBox = styled.View`
  margin-top: 100px;
`;
const AgreeBoxItem = styled.View`
  margin-top: 10px;
`;

function PasswordFormPresenter({
  state,
  onChangeState,
  inputState,
  handleIndividualButtonClick,
  handleUseTermsButtonClick,
  handleClickInModal,
  nextButton,
  handlePreviousButton,
}: PasswordFormPresenterTypes) {
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
                비밀번호
              </Typhograph>
            </LabelBox>
            <InputBox>
              <DefaultInput
                secureTextEntry={true}
                {...inputState.password}
                placeholder="비밀번호를 입력하세요. (영문+숫자+특수기호 8자리 이상)"
                textContentType="password"
              />
            </InputBox>
          </CompanyNameInputBox>

          <CompanyNumberInputBox>
            <LabelBox>
              <Typhograph type="NOTO" weight="MEDIUM">
                비밀번호 확인
              </Typhograph>
            </LabelBox>
            <InputBox>
              <DefaultInput
                secureTextEntry={true}
                {...inputState.passwordConfirm}
                placeholder="비밀번호를 입력하세요. (영문+숫자+특수기호 8자리 이상)"
                textContentType="password"
              />
            </InputBox>
          </CompanyNumberInputBox>

          <AgreeBox>
            <AgreeBoxItem>
              <CheckLabelButton
                active={state.isAgreeIndividualTerms}
                onPress={() => handleIndividualButtonClick()}
                iscenter
                title="개인정보처리방침 동의(필수)"
              />
            </AgreeBoxItem>
            <AgreeBoxItem>
              <CheckLabelButton
                active={state.isAgreeUseTerms}
                onPress={() => handleUseTermsButtonClick()}
                iscenter
                title="이용약관 동의(필수)"
              />
            </AgreeBoxItem>
          </AgreeBox>
        </ContentsContainer>
      </KeyboardAwareScrollView>
      <TermsModal
        open={state?.termsModal}
        close={() => onChangeState('termsModal', false)}
        html={state.termsHtml}
        onPress={handleClickInModal}
        isButton
      />
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

export default PasswordFormPresenter;
