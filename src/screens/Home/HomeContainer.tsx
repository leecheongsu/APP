import React, { useEffect } from 'react';
import HomePresenter from '@app/screens/Home/HomePresenter';
import { getStoreData } from '@app/lib';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { useNavigation } from '@react-navigation/native';

export default function HomeContainer() {
  const navigation = useNavigation();
  const globalState = useGlobalState();

  const globalDispatch = useGlobalDispatch();
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

  return <HomePresenter />;
}
