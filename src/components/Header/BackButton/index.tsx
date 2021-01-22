import React from 'react';
import { insuIcon } from '@app/assets';
import { Image } from 'react-native';
import IconButton from '@app/components/Button/IconButton';
import { useNavigation } from '@react-navigation/native';

function BackButton() {
  const navigation: any = useNavigation();
  return (
    <IconButton onPress={() => navigation.goBack()}>
      <Image source={insuIcon.BACK_BUTTON} />
    </IconButton>
  );
}

export default BackButton;
