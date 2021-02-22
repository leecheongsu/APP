import { userApis } from '@app/api/User';
import { BottomFixButton, DefaultInput, ServiceSelect, Typhograph } from '@app/components';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { handleApiError, screenWidth, setStoreData } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, StyleSheet, TextInputProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';

const styles = StyleSheet.create({
  container: {
    width: screenWidth(),
    padding: 20,
    backgroundColor: theme.color.WHITE,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

const Container = styled.View``;

const TopArrow = styled.View`
  left: ${Platform.OS === 'ios' ? 65 : 60}px;
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
  margin-top: 0px;
`;
const InputLabel = styled.View``;
const InputBox = styled.View`
  margin-top: 10px;
`;
const InputBox2 = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const InputItem = styled.View``;
const SelectBox = styled.View`
  border-width: 1px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border-color: ${theme.color.BORDER_GRAY};
`;
const Input = styled.TextInput<{ isFocus: boolean } & TextInputProps>`
  height: 50px;
  min-width: 0px;
  border-color: ${(props: any) => (props.isFocus ? theme.color.GRAY : theme.color.INPUT_GRAY)};
  border-width: ${(props: any) => (props.isFocus ? '1px' : '1px')};
  border-radius: 10px;
  padding: 0px 10px 0px 10px;
`;

function UserInfo({ state, inputState, onValueChange, onChangeState }) {
  const sexRef: any = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const phoneCheck = /^\d{3}\d{3,4}\d{4}$/;
  const juminFront = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;
  const checkInput = () => {
    if (inputState.email.value === '') {
      Toast.show('이메일을 입력해주세요.');
      return false;
    } else if (!emailCheck.test(inputState.email.value)) {
      Toast.show('올바른 이메일 주소를 입력해주세요.');
    } else if (inputState.name.value === '') {
      Toast.show('이름을 입력하세요.');
      return false;
    } else if (inputState.phone.value === '') {
      Toast.show('휴대 전화번호를 입력해주세요.');
      return false;
    } else if (!phoneCheck.test(inputState.phone.value)) {
      Toast.show('올바른 휴대 전화번호를 입력해주세요.');
      return false;
    } else if (inputState.idNumber.value === '' || inputState.idNumber.value.length < 6) {
      Toast.show('주민등록번호 앞자리를 입력해주세요.');
      return false;
    } else if (!juminFront.test(inputState.idNumber.value) || inputState.sexNumber.value > 2) {
      Toast.show('올바른 주민등록번호를 입력해주세요.');
      return false;
    } else if (inputState.sexNumber.value === '') {
      Toast.show('주민등록번호 뒤 첫번째 자리를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

  const handleChangeButton = () => {
    if (checkInput()) {
      const params = {
        name: inputState.name.value,
        teltype: state.selectService,
        mobile: inputState.phone.value,
        jumina: inputState.idNumber.value,
        sex: inputState.sexNumber.value,
      };
      const existData = {
        name: globalState.user?.name,
        teltype: globalState.user?.teltype,
        mobile: globalState.user?.mobile,
        jumina: globalState.user?.jumina,
        sex: globalState.user?.sex,
      };
      const newUserInfo = {
        ...globalState?.user,
        name: inputState.name.value,
        teltype: state.selectService,
        mobile: inputState.phone.value,
        jumina: inputState.idNumber.value,
        sex: inputState.sexNumber.value,
      };
      if (JSON.stringify(params) === JSON.stringify(existData)) {
        Toast.show('기본정보가 변경 되었습니다.');
      } else {
        userApis
          .putChangeUserInfo(globalState?.user?.email, params)
          .then((res) => {
            if (res.data === 'OK') {
              setStoreData('user', newUserInfo);
              globalDispatch({ type: 'CHANGE', name: 'user', value: newUserInfo });
              Toast.show('기본정보가 변경되었습니다.');
            }
          })
          .catch((e) => {
            handleApiError(e.response);
            onChangeState('loading', false);
          });
      }
    }
  };

  useEffect(() => {
    onChangeState('selectService', globalState.user?.teltype);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopArrow />
      <KeyboardAwareScrollView
        style={styles.container}
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        extraScrollHeight={Platform.OS === 'ios' ? 10 : -10}>
        <Container>
          <TextInputBox>
            <InputLabel>
              <Typhograph type="NOTO" weight="MEDIUM">
                이메일
              </Typhograph>
            </InputLabel>
            <InputBox>
              <DefaultInput
                {...inputState.email}
                editable={false}
                keyboardType="email-address"
                placeholder="이메일주소를 입력하세요."
                textContentType="emailAddress"
                background="GRAY2"
              />
            </InputBox>
          </TextInputBox>

          <TextInputBox>
            <InputLabel>
              <Typhograph type="NOTO" weight="MEDIUM">
                이름
              </Typhograph>
            </InputLabel>
            <InputBox>
              <DefaultInput {...inputState.name} placeholder="이름을 입력하세요.(예:홍길동)" />
            </InputBox>
          </TextInputBox>
          <TextInputBox>
            <InputLabel>
              <Typhograph type="NOTO" weight="MEDIUM">
                휴대전화
              </Typhograph>
            </InputLabel>
            <InputBox2>
              <SelectBox style={{ width: '40%', marginRight: '2%' }}>
                <ServiceSelect
                  value={state.selectService}
                  items={state.serviceType}
                  right={15}
                  onValueChange={onValueChange}
                />
              </SelectBox>
              <InputItem style={{ width: '58%' }}>
                <DefaultInput {...inputState.phone} keyboardType="phone-pad" />
              </InputItem>
            </InputBox2>
          </TextInputBox>
          <TextInputBox>
            <InputLabel>
              <Typhograph type="NOTO" weight="MEDIUM">
                주민등록번호
              </Typhograph>
            </InputLabel>
            <InputBox2>
              <InputItem style={{ width: '50%' }}>
                <DefaultInput {...inputState.idNumber} keyboardType="numeric" maxLength={6} />
              </InputItem>
              <Typhograph type="NOTO" style={{ marginLeft: 10, marginRight: 10 }} lineheight={20}>
                -
              </Typhograph>
              <InputItem style={{ width: '8%', marginRight: 10 }}>
                <Input
                  {...inputState.sexNumber}
                  blurOnSubmit={false}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => {
                    setIsFocus(false);
                  }}
                  ref={sexRef}
                  style={{ alignSelf: 'stretch', fontSize: 13 }}
                  maxLength={1}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  keyboardType="numeric"
                  isFocus={isFocus}
                  autoCompleteType="off"
                  numberOfLines={1}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                />
              </InputItem>
              <Typhograph type="NOTO" color="GRAY3">
                ● ● ● ● ● ●
              </Typhograph>
            </InputBox2>
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
      />
    </>
  );
}
export default UserInfo;
