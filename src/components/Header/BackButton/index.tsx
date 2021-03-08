import React from 'react';
import { insuIcon } from '@app/assets';
import { Image } from 'react-native';
import IconButton from '@app/components/Button/IconButton';
import { useNavigation } from '@react-navigation/native';
import { useGlobalDispatch } from '@app/context';

type BackButtonTypes = {
  onPress?: () => void;
  isAlert?: boolean;
};

function BackButton({ onPress, isAlert = false }: BackButtonTypes) {
  const navigation: any = useNavigation();
  const globalDispatch = useGlobalDispatch();
  const backButtonOnpress = () => {
    if (isAlert) {
      globalDispatch({ type: 'CHANGE', name: 'isMainModal', value: true });
    } else {
      onPress ? onPress() : navigation.goBack();
    }
  };

  return (
    <IconButton onPress={() => backButtonOnpress()}>
      <Image source={insuIcon.BACK_BUTTON} />
    </IconButton>
  );
}

export default BackButton;
