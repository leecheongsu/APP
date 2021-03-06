import React from 'react';
import { insuIcon } from '@app/assets';
import IconButton from '@app/components/Button/IconButton';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import styled from '@app/style/typed-components';

const Container = styled.View`
  padding-right: 7px;
`;

function MenuButton(props) {
  const navigation: any = useNavigation();
  return (
    <Container>
      <IconButton onPress={() => navigation.openDrawer()}>
        <Image source={insuIcon.MENU_ICON} />
      </IconButton>
    </Container>
  );
}

export default MenuButton;
