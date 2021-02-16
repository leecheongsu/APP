import React from 'react';
import PayPresenter from './PayPresenter';
import { useNavigation } from '@react-navigation/native';

export default function PayContainer() {
  const navigation = useNavigation();

  return <PayPresenter />;
}
