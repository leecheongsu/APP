import { insuIcon } from '@app/assets';
import { DefaultAlert } from '@app/components';
import IconButton from '@app/components/Button/IconButton';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { clearStoreData, getStoreData } from '@app/lib';
import styled from '@app/style/typed-components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
const Container = styled.View`
  padding-left: 5px;
`;

function UserButton(props) {
  const navigation = useNavigation();
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();

  const logoutButton = () => {
    clearStoreData();
    globalDispatch({ type: 'RESET' });
    navigation.navigate('MAIN_STACK');
  };

  const handleButtonClick = async () => {
    const user = await getStoreData('user');
    if (user === null) {
      navigation.navigate('LOGIN');
    } else {
      // navigation.navigate('PROFILE');
      DefaultAlert({ title: '알림', msg: '로그아웃 하시겠습니까?', okPress: logoutButton });
    }
  };

  return (
    <Container>
      <IconButton onPress={() => handleButtonClick()}>
        <Image source={globalState?.user === undefined ? insuIcon.HEADER_USER : insuIcon.ICON_LOGOUT} />
      </IconButton>
    </Container>
  );
}

export default UserButton;
