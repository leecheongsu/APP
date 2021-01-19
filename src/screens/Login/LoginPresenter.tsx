import { Typhograph } from '@app/components';
import { MainLayout } from '@app/layout';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';

function LoginPresenter() {
  const navigation = useNavigation();
  return (
    <MainLayout>
      <Typhograph type="NOTO" weight="BOLD" color="BLACK" size={14}>
        로그인
      </Typhograph>
      <Button onPress={() => navigation.goBack()} title="고백" />
    </MainLayout>
  );
}

export default LoginPresenter;
