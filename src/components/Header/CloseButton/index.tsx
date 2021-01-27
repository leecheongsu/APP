import React from 'react';
import { insuIcon } from '@app/assets';
import IconButton from '@app/components/Button/IconButton';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

function CloseButton({ onPress }) {
  const navigation: any = useNavigation();
  return (
    <IconButton onPress={() => (onPress ? onPress : navigation.openDrawer())}>
      <Image source={insuIcon.CLOSE_ICON} />
    </IconButton>
  );
}

export default CloseButton;
