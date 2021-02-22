import React from 'react';
import { handleApiError, screenWidth, setStoreData } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { Platform, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BottomFixButton, DefaultInput, Typhograph } from '@app/components';
import { userApis } from '@app/api/User';
import Toast from 'react-native-simple-toast';
import { useGlobalDispatch, useGlobalState } from '@app/context';

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

function BusinessInfo({ state, inputState, onChangeState }) {
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const checkInput = () => {
    if (inputState.companyName.value === '') {
      Toast.show('상호명을 입력해주세요.');
      return false;
    } else if (inputState.companyNumber.value === '') {
      Toast.show('사업자번호를 입력해주세요.');
      return false;
    } else if (inputState.companyNumber.value.length !== 10) {
      Toast.show('올바른 사업자번호를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

  const handleChangeButton = () => {
    if (checkInput()) {
      onChangeState('loading', true);
      const email = globalState?.user?.email;
      const params = {
        comname: inputState?.companyName?.value,
        businessnum: inputState?.companyNumber?.value,
        sosok: '',
      };
      const existData = {
        comname: globalState?.user?.companyName,
        businessnum: globalState?.user?.companyNumber,
        sosok: globalState?.user?.sosok,
      };
      const newUserInfo = {
        ...globalState?.user,
        comname: inputState?.companyName?.value,
        businessnum: inputState?.companyNumber?.value,
      };
      if (JSON.stringify(params) === JSON.stringify(existData)) {
        Toast.show('기본정보가 변경 되었습니다.');
      } else {
        userApis
          .putChangeBusinessInfo(email, params)
          .then((res) => {
            if (res.data === 'OK') {
              setStoreData('user', newUserInfo);
              globalDispatch({ type: 'CHANGE', name: 'user', value: newUserInfo });
              Toast.show('사업자정보가 수정되었습니다.');
            }
            onChangeState('loading', false);
          })
          .catch((e) => {
            handleApiError(e.response);
            onChangeState('loading', false);
          });
      }
    }
  };

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
        isKeybordView={state.isKeybordView}
        loading={state.loading}
      />
    </>
  );
}

export default BusinessInfo;
