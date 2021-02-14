import React, { useEffect, useState } from 'react';
import { insuIcon } from '@app/assets';
import IconButton from '@app/components/Button/IconButton';
import { clearStoreData, getStoreData, screenHeight, setStoreData } from '@app/lib';
import styled from '@app/style/typed-components';
import { Image, Platform } from 'react-native';
import { Avatar, LoginButton, TileButton, Typhograph } from '@app/components';
import theme from '@app/style/theme';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { Switch } from 'react-native-gesture-handler';
const Container = styled.View`
  padding-top: ${Platform.OS === 'ios' ? screenHeight() / 20 : 10}px;
  background-color: ${theme.color.MENU_BACKGROUD_COLOR};
`;

const CloseButton = styled.View`
  justify-content: flex-end;
  flex-direction: row;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const AvatarBox = styled.View`
  width: 22%;
  align-items: flex-start;
`;
const ProfileBox = styled.View`
  width: ${(props: any) => (props.isLogin ? '75%' : '95%')};
`;

const ButtonBox = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0px;
`;
const ButtonItem = styled.View`
  width: 49%;
`;
const Section1Container = styled.View`
  padding-horizontal: 20px;
`;
const MenuContainer = styled.View`
  padding: 15px;
  background-color: ${theme.color.WHITE};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;
const SwitchBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px 20px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;
const CardTitleBox = styled.View`
  padding: 10px 0px;
`;

const CardContainer = styled.View`
  background-color: ${theme.color.WHITE};
`;
const CardBox = styled.View`
  flex-direction: row;
  margin: 3px 0px;
  justify-content: space-between;
`;
const CardItem = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${theme.color.BORDER_GRAY};
  border-radius: 15px;
  padding: 15px;
  width: 49%;
`;
const IconBox = styled.View`
  padding: 10px 0px;
  justify-content: flex-end;
  align-items: flex-end;
`;

const BottomButtonBox = styled.View`
  flex-direction: row;
  margin-top: 30px;
`;
const BottomButtonLeft = styled.TouchableOpacity`
  background-color: ${theme.color.SOFTGRAY};
  width: 50%;
  padding: 20px 0px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-right-width: 1px;
  border-right-color: ${theme.color.WHITE};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const BottomButtonRight = styled.TouchableOpacity`
  background-color: ${theme.color.SOFTGRAY};
  width: 50%;
  padding: 20px 0px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-right-width: 1px;
  border-right-color: ${theme.color.WHITE};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default function Menu(props) {
  const navigation = props.navigation;
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const isLogin = globalState.user !== undefined;
  const [isEnabled, setIsEnabled] = useState(globalState.isAutoLogin);

  const logoutButton = () => {
    clearStoreData();
    globalDispatch({ type: 'LOGOUT' });
    navigation.navigate('MAIN_STACK');
  };

  const handleMemberButton = () => {
    isLogin ? navigation.navigate('PROFILE') : navigation.navigate('LOGIN');
  };
  const handleMyInsuButton = () => {
    isLogin ? navigation.navigate('PROFILE') : navigation.navigate('LOGIN');
  };

  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      setStoreData('isAutoLogin', false);
      globalDispatch({ type: 'CHANGE', name: 'isAutoLogin', value: false });
    } else {
      setStoreData('isAutoLogin', true);
      globalDispatch({ type: 'CHANGE', name: 'isAutoLogin', value: true });
    }
  };

  useEffect(() => {
    setIsEnabled(globalState.isAutoLogin);
  }, [globalState.isAutoLogin]);

  return (
    <>
      <Container>
        <Section1Container>
          <CloseButton>
            <IconButton onPress={() => navigation.closeDrawer()}>
              <Image source={insuIcon.CLOSE_ICON} />
            </IconButton>
          </CloseButton>

          {isLogin ? (
            <ProfileContainer>
              <AvatarBox>
                <Avatar />
              </AvatarBox>
              <ProfileBox isLogin={isLogin}>
                <Typhograph type="NOTO" color="BLUE" weight="MEDIUM" size={16}>
                  {globalState.user?.name} 님, 안녕하세요.
                </Typhograph>
                <ButtonBox>
                  <LoginButton
                    onPress={() => logoutButton()}
                    title="로그아웃"
                    color="WHITE"
                    background="SKYBLUE"
                    right={10}
                  />
                </ButtonBox>
              </ProfileBox>
            </ProfileContainer>
          ) : (
            <ProfileContainer>
              <ProfileBox isLogin={isLogin}>
                <Typhograph type="NOTO" color="BLUE" weight="MEDIUM" size={16}>
                  회원님, 안녕하세요
                </Typhograph>
                <Typhograph type="NOTO" color="GRAY" weight="MEDIUM" size={10}>
                  로그인 하시면 보다 편리한 서비스를 이용하실 수 있습니다.
                </Typhograph>
                <ButtonBox>
                  <LoginButton
                    onPress={() => navigation.navigate('LOGIN')}
                    title="로그인"
                    color="WHITE"
                    background="SKYBLUE"
                    right={10}
                  />
                  <LoginButton
                    onPress={() => navigation.navigate('JOIN')}
                    title="회원가입"
                    color="BLUE"
                    background="WHITE"
                    right={10}
                  />
                </ButtonBox>
              </ProfileBox>
            </ProfileContainer>
          )}
          <ButtonContainer>
            <ButtonItem>
              <TileButton
                onPress={() => handleMemberButton()}
                background="WHITE"
                color="BLUE"
                isBorder
                borderColor="SOFTGRAY"
                title="회원정보"
                source={insuIcon.ICON_INFO2}
              />
            </ButtonItem>
            <ButtonItem>
              <TileButton
                onPress={() => handleMyInsuButton()}
                isBorder
                borderColor="SOFTGRAY"
                title="내 보험"
                background="WHITE"
                color="BLUE"
                source={insuIcon.ICON_MY}
              />
            </ButtonItem>
          </ButtonContainer>
        </Section1Container>

        <MenuContainer>
          {isLogin && (
            <SwitchBox>
              <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={18}>
                자동 로그인 설정
              </Typhograph>
              <Switch
                trackColor={{ false: theme.color.GRAY, true: theme.color.SKYBLUE2 }}
                thumbColor={isEnabled ? theme.color.BLUE2 : theme.color.WHITE}
                ios_backgroundColor={theme.color.GRAY}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </SwitchBox>
          )}
          <CardContainer>
            <CardTitleBox>
              <Typhograph type="NOTO" color="GRAY" weight="MEDIUM" size={16}>
                상품목록
              </Typhograph>
            </CardTitleBox>

            <CardBox>
              <CardItem onPress={() => navigation.navigate('HOUSE_FIRE')}>
                <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
                  주택화재
                </Typhograph>
                <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={14} lineheight={4}>
                  주택화재 보험
                </Typhograph>
                <IconBox>
                  <Image source={insuIcon.CONT01} />
                </IconBox>
              </CardItem>

              <CardItem onPress={() => navigation.navigate('STORM_FLOOD')}>
                <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
                  풍수해Ⅵ
                </Typhograph>
                <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={14} lineheight={4}>
                  소상공인 상가/공장
                </Typhograph>
                <IconBox>
                  <Image source={insuIcon.CONT02} />
                </IconBox>
              </CardItem>
            </CardBox>

            <CardBox>
              <CardItem onPress={() => navigation.navigate('PAY')}>
                <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
                  배상책임
                </Typhograph>
                <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={14} lineheight={4}>
                  다중이용시설
                </Typhograph>
                <IconBox>
                  <Image source={insuIcon.CONT01} />
                </IconBox>
              </CardItem>

              <CardItem onPress={() => console.log(1)}>
                <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
                  배상책임
                </Typhograph>
                <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={14} lineheight={4}>
                  승강기 사고 재난
                </Typhograph>
                <IconBox>
                  <Image source={insuIcon.CONT02} />
                </IconBox>
              </CardItem>
            </CardBox>
          </CardContainer>
          <BottomButtonBox>
            <BottomButtonLeft>
              <Image source={insuIcon.PHONE} />
              <Typhograph type="NOTO" color="WHITE" style={{ marginLeft: 10 }}>
                070-4126-3333
              </Typhograph>
            </BottomButtonLeft>
            <BottomButtonRight>
              <Image source={insuIcon.KAKAO} />
              <Typhograph type="NOTO" color="WHITE" style={{ marginLeft: 10 }}>
                카카오톡 문의
              </Typhograph>
            </BottomButtonRight>
          </BottomButtonBox>
        </MenuContainer>
      </Container>
    </>
  );
}
