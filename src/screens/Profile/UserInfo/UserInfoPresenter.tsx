import React from 'react';
import { BottomFixButton, DefaultInput, ServiceSelect, Typhograph } from '@app/components';
import { screenWidth } from '@app/lib';
import { ProfileInputTypes, ProfileStateTypes } from '@app/screens/Profile/ProfileContainer';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { Keyboard, Platform, StyleSheet, TextInputProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type UserInfoPresenterTypes = {
  state: ProfileStateTypes;
  inputState: ProfileInputTypes;
  handleChangeButton: () => void;
  onValueChange: (value: any) => void;
  isFocus: boolean;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
  sexRef: any;
};

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
  margin-top: 20px;
`;
const InputLabel = styled.View``;
const InputBox = styled.View`
  margin-top: 5px;
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

function UserInfoPresenter({
  state,
  inputState,
  handleChangeButton,
  onValueChange,
  isFocus,
  setIsFocus,
  sexRef,
}: UserInfoPresenterTypes) {
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
                <DefaultInput {...inputState.phone} keyboardType="phone-pad" maxLength={11} />
              </InputItem>
            </InputBox2>
          </TextInputBox>
          <TextInputBox style={{ paddingBottom: 150 }}>
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
        isKeybordView={false}
      />
    </>
  );
}

export default UserInfoPresenter;
