import React from 'react';
import { insuIcon } from '@app/assets';
import { Image } from 'react-native';
import IconButton from '@app/components/Button/IconButton';
import { useNavigation } from '@react-navigation/native';
import { DefaultAlert } from '@app/components';
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
      DefaultAlert({
        title: '알림',
        msg: '메인페이지로 돌아 가시겠습니까?',

        okPress: () => {
          globalDispatch({ type: 'CHANGE', name: 'recommendUser', value: undefined });
          globalDispatch({ type: 'CHANGE', name: 'isIdentityverification', value: false });
          globalDispatch({ type: 'CHANGE', name: 'electronicSignPreData', value: undefined });
          globalDispatch({ type: 'CHANGE', name: 'recommendUser', value: undefined });
          globalDispatch({ type: 'CHANGE', name: 'insuType', value: '' });
          globalDispatch({ type: 'CHANGE', name: 'selectAddress', value: undefined });
          navigation.goBack();
        },
      });
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
