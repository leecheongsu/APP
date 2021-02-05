import {
  CustomButton,
  DefaultInput,
  FocusAwareStatusBar,
  IconButton,
  OverayLoading,
  Typhograph,
} from '@app/components';
import { MainLayout } from '@app/layout';
import styled from '@app/style/typed-components';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Image } from 'react-native';
import { insuIcon } from '@app/assets';
import theme from '@app/style/theme';
import { screenHeight } from '@app/lib';

const ContensContainer = styled.View`
  padding: 50px 20px;
`;
const InputContainer = styled.View``;
const InputBox = styled.View`
  margin-top: 20px;
`;
const AutoLoginBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;
const CheckBox = styled.View`
  width: 10%;
`;
const TextBox = styled.View`
  width: 90%;
`;
const ButtonBox = styled.View`
  margin-top: 30px;
`;
const TextButton = styled.TouchableOpacity`
  padding: 0px 10px;
`;
const SearchAndChangeButtonBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const BottomBox = styled.View`
  margin-top: ${screenHeight() / 3}px;
  justify-content: center;
  align-items: center;
`;

function LoginPresenter({ inputState, state, handleAutoLoginButton, submitLogin }) {
  const navigation = useNavigation();
  return (
    <MainLayout>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <ContensContainer>
        <InputContainer>
          <InputBox>
            <DefaultInput {...inputState.email} placeholder="이메일을 입력하세요." />
          </InputBox>
          <InputBox>
            <DefaultInput {...inputState.password} secureTextEntry={true} placeholder="비밀번호를 입력하세요." />
          </InputBox>
        </InputContainer>
        <AutoLoginBox>
          <CheckBox>
            <IconButton onPress={() => handleAutoLoginButton()}>
              <Image source={state.isAutoLogin ? insuIcon.BT_CHECK_ON : insuIcon.BT_CHECK_OFF} />
            </IconButton>
          </CheckBox>
          <TextBox>
            <Typhograph type="NOTO">자동로그인</Typhograph>
          </TextBox>
        </AutoLoginBox>
        <ButtonBox>
          <CustomButton onPress={() => submitLogin()} background="SKYBLUE" radius={30} isLoading={state.loading}>
            <Typhograph type="NOTO" color="WHITE">
              로그인
            </Typhograph>
          </CustomButton>
        </ButtonBox>
        <SearchAndChangeButtonBox>
          <TextButton onPress={() => navigation.navigate('FIND_EMAIL')}>
            <Typhograph type="NOTO" color="BLACK2">
              아이디 찾기
            </Typhograph>
          </TextButton>
          <Typhograph type="NOTO" color="BLACK2" size={12} lineheight={3}>
            |
          </Typhograph>
          <TextButton onPress={() => navigation.navigate('FIND_PASSWORD')}>
            <Typhograph type="NOTO" color="BLACK2">
              비밀번호 변경
            </Typhograph>
          </TextButton>
        </SearchAndChangeButtonBox>
        <BottomBox>
          <Typhograph type="NOTO" color="BLACK2" weight="REGULAR">
            아직 회원이 아니세요?
          </Typhograph>
          <TextButton onPress={() => navigation.navigate('JOIN')}>
            <Typhograph type="NOTO" color="BLACK3" weight="BOLD" style={{ textDecorationLine: 'underline' }}>
              회원가입
            </Typhograph>
          </TextButton>
        </BottomBox>
      </ContensContainer>
    </MainLayout>
  );
}

export default LoginPresenter;
