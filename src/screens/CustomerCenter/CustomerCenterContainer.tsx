import CustomerCenterPresenter from '@app/screens/CustomerCenter/CustomerCenterPresenter';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';

export default function CustomerCenterContainer() {
  const navigation = useNavigation();
  //안드로이드 하드웨어 백버튼 핸들러
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <CustomerCenterPresenter />;
}
