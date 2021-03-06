import React from 'react';
import { CustomButton, FocusAwareStatusBar, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import theme from '@app/style/theme';
import { ProfileStateName, ProfileStateTypes } from './ProfileContainer';
import UserInfo from '@app/screens/Profile/UserInfo';
import { BusinessInfo, PasswordInfo } from '@app/screens';
import { useNavigation } from '@react-navigation/native';
import { useGlobalState } from '@app/context';

type ProfilePresenterTypes = {
  state: ProfileStateTypes;
  handleClickButton: (name) => void;
  scrollRef: any;
  onChangeState: (name: ProfileStateName, value: any) => void;
  inputState: {
    email: any;
  };
  onValueChange: (name: any) => void;
};

const Container = styled.View`
  background-color: ${theme.color.MENU_BACKGROUD_COLOR};
  flex: 1;
`;

const ButtonBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${theme.color.MENU_BACKGROUD_COLOR};
  padding: 15px;
`;

const ButtonItem = styled.View``;

const InfoBox = styled.View`
  background-color: ${theme.color.WHITE};
  padding: 50px 20px;
  align-items: center;
  justify-content: center;
`;
const SecessionBox = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

function ProfilePresenter({
  handleClickButton,
  state,
  onChangeState,
  inputState,
  onValueChange,
}: ProfilePresenterTypes) {
  const navigation = useNavigation();
  const globalState = useGlobalState();
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Container>
        <InfoBox>
          <Typhograph type="NOTO" weight="REGULAR" style={{ textAlign: 'center' }}>
            회원가입시 등록한 개인정보와 비밀번호를{'\n'} 수정하실 수 있습니다.
          </Typhograph>
          <SecessionBox onPress={() => navigation.navigate('SECESSION')}>
            <Typhograph
              type="NOTO"
              weight="REGULAR"
              color="GRAY"
              style={{ textAlign: 'center', textDecorationLine: 'underline' }}>
              회원탈퇴
            </Typhograph>
          </SecessionBox>
        </InfoBox>
        <ButtonBox>
          <ButtonItem style={{ marginRight: 10 }}>
            <CustomButton
              onPress={() => handleClickButton('basic')}
              radius={30}
              background={state.selectTab === 'basic' ? 'SKYBLUE' : 'WHITE'}
              width={110}>
              <Typhograph type="NOTO" color={state.selectTab === 'basic' ? 'WHITE' : 'BLUE'} weight="MEDIUM">
                개인회원
              </Typhograph>
            </CustomButton>
          </ButtonItem>
          <ButtonItem style={{ marginRight: 10 }}>
            <CustomButton
              onPress={() => handleClickButton('password')}
              radius={30}
              background={state.selectTab === 'password' ? 'SKYBLUE' : 'WHITE'}
              width={110}>
              <Typhograph type="NOTO" color={state.selectTab === 'password' ? 'WHITE' : 'BLUE'} weight="MEDIUM">
                비밀번호
              </Typhograph>
            </CustomButton>
          </ButtonItem>
          {globalState?.user?.utype !== 'u' && (
            <ButtonItem>
              <CustomButton
                onPress={() => handleClickButton('business')}
                radius={30}
                background={state.selectTab === 'business' ? 'SKYBLUE' : 'WHITE'}
                width={110}>
                <Typhograph type="NOTO" color={state.selectTab === 'business' ? 'WHITE' : 'BLUE'} weight="MEDIUM">
                  사업자정보
                </Typhograph>
              </CustomButton>
            </ButtonItem>
          )}
        </ButtonBox>
        {state.selectTab === 'basic' && (
          <UserInfo state={state} inputState={inputState} onValueChange={onValueChange} onChangeState={onChangeState} />
        )}
        {state.selectTab === 'password' && (
          <PasswordInfo state={state} inputState={inputState} onChangeState={onChangeState} />
        )}
        {state.selectTab === 'business' && (
          <BusinessInfo state={state} inputState={inputState} onChangeState={onChangeState} />
        )}
      </Container>
    </>
  );
}
export default ProfilePresenter;
