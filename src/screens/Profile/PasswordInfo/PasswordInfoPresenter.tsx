import React from 'react';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { Platform, StyleSheet } from 'react-native';
import { BottomFixButton, CheckLabelButton, DefaultInput, Typhograph } from '@app/components';
import { TermsModal } from '@app/screens';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProfileInputTypes, ProfileStateName, ProfileStateTypes } from '@app/screens/Profile/ProfileContainer';

type PasswordInfoPresenterTypes = {
  state: ProfileStateTypes;
  inputState: ProfileInputTypes;
  onChangeState: (name: ProfileStateName, value: any) => void;
  handleIndividualButtonClick: () => void;
  handleUseTermsButtonClick: () => void;
  handleClickInModal: () => void;
  handleChangeButton: () => void;
};

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

function PasswordInfoPresenter({
  state,
  onChangeState,
  inputState,
  handleIndividualButtonClick,
  handleUseTermsButtonClick,
  handleClickInModal,
  handleChangeButton,
}: PasswordInfoPresenterTypes) {
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
        isKeybordView={false}
        loading={state.loading}
      />
    </>
  );
}
export default PasswordInfoPresenter;
