import React, { useEffect, useLayoutEffect } from 'react';
import HomePresenter from '@app/screens/Home/HomePresenter';
import { getStoreData } from '@app/lib';
import { useGlobalDispatch } from '@app/context';
import { useNavigation } from '@react-navigation/native';

export default function HomeContainer() {
  const navigation = useNavigation();
  const globalDispatch = useGlobalDispatch();

  // user정보 얻어온뒤에 globalState에 셋팅
  const loadUser = async () => {
    const localUser = await getStoreData('user');
    const isAutoLogin = await getStoreData('isAutoLogin');
    const isLogin = await getStoreData('isLogin');
    if (localUser !== null) {
      globalDispatch({ type: 'CHANGE', name: 'user', value: localUser });
      globalDispatch({ type: 'CHANGE', name: 'isAutoLogin', value: isAutoLogin });
      globalDispatch({ type: 'CHANGE', name: 'isLogin', value: isLogin });
      globalDispatch({ type: 'CHANGE', name: 'isIdentityverification', value: false });
    }
  };

  //추천인 리셋
  const resetRecommendUser = () => {
    globalDispatch({ type: 'CHANGE', name: 'recommendUser', value: undefined });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUser();
      resetRecommendUser();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useLayoutEffect(() => {}, [navigation]);

  return <HomePresenter />;
}
