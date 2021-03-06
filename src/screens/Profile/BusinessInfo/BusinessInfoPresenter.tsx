import React from 'react';
import { BottomFixButton, DefaultInput, Typhograph } from '@app/components';
import { screenWidth } from '@app/lib';
import { ProfileInputTypes, ProfileStateTypes } from '@app/screens/Profile/ProfileContainer';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { Platform, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type BusinessInfoPresenterTypes = {
  state: ProfileStateTypes;
  inputState: ProfileInputTypes;
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
  padding-bottom: 100px;
`;

const TopArrow = styled.View`
  left: 300px;
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
  margin-top: 10px;
`;

function BusinessInfoPresenter({ state, inputState, handleChangeButton }: BusinessInfoPresenterTypes) {
  return (
    <>
      <TopArrow />
      <KeyboardAwareScrollView
        style={styles.container}
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        extraScrollHeight={Platform.OS === 'ios' ? -200 : -10}>
        <Container>
          <TextInputBox>
            <InputLabel>
              <Typhograph type="NOTO" weight="MEDIUM">
                상호명
              </Typhograph>
            </InputLabel>
            <InputBox>
              <DefaultInput {...inputState.companyName} placeholder="상호명을 입력해주세요." />
            </InputBox>
          </TextInputBox>
          <TextInputBox>
            <InputLabel>
              <Typhograph type="NOTO" weight="MEDIUM">
                사업자번호
              </Typhograph>
            </InputLabel>
            <InputBox>
              <DefaultInput
                {...inputState?.companyNumber}
                placeholder="사업자번호를 입력하세요."
                maxLength={10}
                keyboardType="numeric"
              />
            </InputBox>
          </TextInputBox>
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

export default BusinessInfoPresenter;
