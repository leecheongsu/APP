import React, { useEffect } from 'react';
import HomePresenter from '@app/screens/Home/HomePresenter';
import { getStoreData } from '@app/lib';
import { useGlobalDispatch } from '@app/context';

export default function HomeContainer() {
  const globalDispatch = useGlobalDispatch();
  const loadUser = async () => {
    const localUser = await getStoreData('user');
    if (localUser !== null) {
      globalDispatch({ type: 'CHANGE', name: 'user', value: localUser });
    }
  };
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <HomePresenter />;
}
