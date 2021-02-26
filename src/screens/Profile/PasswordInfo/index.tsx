import React from 'react';
import { BottomFixButton, CheckLabelButton, DefaultInput, Typhograph } from '@app/components';
import { handleApiError, screenWidth, setStoreData } from '@app/lib';
import { individualTerms, useTermsHtml } from '@app/lib/html';
import { TermsModal } from '@app/screens';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { Platform, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import { userApis } from '@app/api/User';

const styles = StyleSheet.create({
  container: {
    width: screenWidth(),
    paddingHorizontal: 20,
    backgroundColor: theme.color.WHITE,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

const Container = styled.View`
  padding: 20px 0px 100px 0px;
`;

const TopArrow = styled.View`
  left: 180px;
  top: 0px;
  width: 0px;
  height: 0px;
  background-color: transparent;
  border-style: solid;
  border-top-width: 0px;
  border-right-width: 10px;
  border-bottom-width: 15px;
  border-left-width: 10px;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: ${theme.color.WHITE};
  border-left-color: transparent;
`;

const TitleBox = styled.View`
  align-items: center;
  padding: 10px 0px;
`;

const TextInputBox = styled.View`
  margin-top: 20px;
`;
const InputLabel = styled.View``;
const InputBox = styled.View`
  margin-top: 5px;
`;
const AgreeBox = styled.View`
  margin-top: 30px;
`;
const AgreeBoxItem = styled.View`
  margin-top: 10px;
`;

function PasswordInfo({ state, inputState, onChangeState }) {
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
    } else {
      return true;
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

  const handleChangeButton = () => {
    if (checkPassword()) {
      onChangeState('loading', true);
      const email = inputState.email.value;
      const params = {
        teltype: state.selectService,
        mobile: inputState.phone.value,
        newPwd: inputState.password.value,
      };
      userApis
        .putChangeUserPassword(email, params)
        .then((res) => {
          if (res.status === 200) {
            Toast.show('비밀번호가 변경되었습니다.');
            setStoreData('password', inputState.password);
            onChangeState('loading', false);
          }
          onChangeState('loading', false);
        })
        .catch((e) => {
          handleApiError(e.response);
          onChangeState('loading', false);
        });
    }
  };

  return (
    <>
      <TopArrow />
      <KeyboardAwareScrollView
        style={styles.container}
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        extraScrollHeight={Platform.OS === 'ios' ? 10 : -10}>
        <Container>
          <TextInputBox style={{ marginTop: 0 }}>
            <InputLabel>
              <Typhograph type="NOTO" weight="MEDIUM">
                비밀번호
              </Typhograph>
            </InputLabel>
            <InputBox>
              <DefaultInput
                secureTextEntry={true}
                {...inputState.password}
                placeholder="비밀번호를 입력하세요. (영문+숫자+특수기호 8자리 이상)"
                textContentType="password"
              />
            </InputBox>
          </TextInputBox>

          <TextInputBox>
            <InputLabel>
              <Typhograph type="NOTO" weight="MEDIUM">
                비밀번호 확인
              </Typhograph>
            </InputLabel>
            <InputBox>
              <DefaultInput
                secureTextEntry={true}
                {...inputState.passwordConfirm}
                placeholder="비밀번호를 입력하세요. (영문+숫자+특수기호 8자리 이상)"
                textContentType="password"
              />
            </InputBox>
          </TextInputBox>

          <AgreeBox>
            <AgreeBoxItem>
              <CheckLabelButton
                active
                onPress={() => handleIndividualButtonClick()}
                iscenter
                title="개인정보처리방침 동의(필수)"
              />
            </AgreeBoxItem>
            <AgreeBoxItem>
              <CheckLabelButton
                active
                onPress={() => handleUseTermsButtonClick()}
                iscenter
                title="이용약관 동의(필수)"
              />
            </AgreeBoxItem>
          </AgreeBox>
          <TermsModal
            open={state?.termsModal}
            close={() => onChangeState('termsModal', false)}
            html={state.termsHtml}
            onPress={handleClickInModal}
            isButton={false}
          />
        </Container>
      </KeyboardAwareScrollView>
      <BottomFixButton
        index={1}
        leftTitle="이전"
        rightTitle="변경"
        bottomRightPress={handleChangeButton}
        bottomLeftPress={() => null}
        isKeybordView={state.isKeybordView}
        loading={state.loading}
      />
    </>
  );
}

export default PasswordInfo;
