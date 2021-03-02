import React from 'react';
import { insuIcon } from '@app/assets';
import IconButton from '@app/components/Button/IconButton';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import styled from '@app/style/typed-components';

const Container = styled.View`
  padding-right: 10px;
`;

function CloseButton({ onPress }) {
  const navigation: any = useNavigation();
  return (
    <Container>
      <IconButton onPress={() => (onPress ? onPress() : navigation.openDrawer())}>
        <Image source={insuIcon.CLOSE_ICON} />
      </IconButton>
    </Container>
  );
}

export default CloseButton;
