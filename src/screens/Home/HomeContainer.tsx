import React, { useEffect } from 'react';
import HomePresenter from '@app/screens/Home/HomePresenter';
import { getStoreData } from '@app/lib';
import { useGlobalDispatch } from '@app/context';

export default function HomeContainer() {
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
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <HomePresenter />;
}
