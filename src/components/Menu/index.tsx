import React from 'react';
import { insuIcon } from '@app/assets';
import IconButton from '@app/components/Button/IconButton';
import { screenHeight } from '@app/lib';
import styled from '@app/style/typed-components';
import { Image } from 'react-native';
import { Avatar, LoginButton, Typhograph } from '@app/components';
import theme from '@app/style/theme';
const Container = styled.View`
  padding-top: ${screenHeight() / 20}px;
  flex: 1;
  background-color: ${theme.color.MENU_BACKGROUD_COLOR};
  padding-horizontal: 20px;
`;

const CloseButton = styled.View`
  justify-content: flex-end;
  flex-direction: row;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const AvatarBox = styled.View`
  width: 22%;
  align-items: flex-start;
`;
const ProfileBox = styled.View`
  width: 78%;
`;

const ButtonBox = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;
export default function Menu(props) {
  const navigation = props.navigation;

  return (
    <Container>
      <CloseButton>
        <IconButton onPress={() => navigation.closeDrawer()}>
          <Image source={insuIcon.CLOSE_ICON} />
        </IconButton>
      </CloseButton>
      <ProfileContainer>
        <AvatarBox>
          <Avatar />
        </AvatarBox>
        <ProfileBox>
          <Typhograph type="NOTO" color="BLUE" weight="MEDIUM" size={16}>
            회원님, 안녕하세요
          </Typhograph>
          <Typhograph type="NOTO" color="GRAY" weight="MEDIUM" size={9}>
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
    </Container>
  );
}
