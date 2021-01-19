import React from 'react';
import { insuIcon } from '@app/assets';
import IconButton from '@app/components/Button/IconButton';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

function MenuButton(props) {
  const navigation: any = useNavigation();
  return (
    <IconButton onPress={() => navigation.openDrawer()}>
      <Image source={insuIcon.MENU_ICON} />
    </IconButton>
  );
}

export default MenuButton;
