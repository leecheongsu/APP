import { BottomFixButton, CheckLabelButton, DefaultInput, Typhograph } from '@app/components';
import { screenWidth } from '@app/lib';
import { individualTerms, useTermsHtml } from '@app/lib/html';
import { TermsModal } from '@app/screens';
import styled from '@app/style/typed-components';
import React, { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';

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
export default function PasswordForm({
  state,
  inputState,
  onChangeState,
  handleNextButton,
  handlePreviousButton,
  handlePostJoin,
}) {
  //비밀번호 체크 로직
  const checkPassword = () => {
    const pattern1 = /[0-9]/;
    const pattern2 = /[a-zA-Z]/;
    const pattern3 = /[~!@\#$%<>^&*]/;
    const pw = inputState.password.value;
    if (pw === '') {
      Toast.show('비밀번호를 입력하세요.');
      return false;
    } else if (!pattern1.test(pw) || !pattern2.test(pw) || !pattern3.test(pw) || pw.length < 8 || pw.length > 50) {
      Toast.show('영문+숫자+특수기호 8자리 이상으로 구성하여야 합니다.');
      return false;
    } else if (pw !== inputState.passwordConfirm.value) {
      Toast.show('확인된 비밀번호가 틀립니다.');
      return false;
    } else if (!state.isAgreeIndividualTerms) {
      Toast.show('개인정보 처리방침에 동의해주세요.');
    } else if (!state.isAgreeUseTerms) {
      Toast.show('이용약관에 동의해주세요.');
    } else {
      return true;
    }
  };

  //모달안의 확인버튼 핸들러
  const handleClickInModal = () => {
    onChangeState('termsModal', false);
    switch (state.selectTermsModal) {
      case 'individual':
        return onChangeState('isAgreeIndividualTerms', true);
      case 'useTerms':
        return onChangeState('isAgreeUseTerms', true);
    }
  };

  //개인정보 처리방침 버튼
  const handleIndividualButtonClick = () => {
    if (state.isAgreeIndividualTerms) {
      onChangeState('isAgreeIndividualTerms', false);
    } else {
      onChangeState('termsModal', true);
      onChangeState('selectTermsModal', 'individual');
      onChangeState('termsHtml', individualTerms());
    }
  };

  //이용약관 버튼
  const handleUseTermsButtonClick = () => {
    if (state.isAgreeUseTerms) {
      onChangeState('isAgreeUseTerms', false);
    } else {
      onChangeState('termsModal', true);
      onChangeState('selectTermsModal', 'useTerms');
      onChangeState('termsHtml', useTermsHtml());
    }
  };

  const nextButton = () => {
    if (checkPassword()) {
      handlePostJoin();
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
        isKeybordView={state.isKeybordView}
      />
    </Container>
  );
}
