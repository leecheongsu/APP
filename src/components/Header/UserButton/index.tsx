import { insuIcon } from '@app/assets';
import IconButton from '@app/components/Button/IconButton';
import { useGlobalState } from '@app/context';
import { getStoreData } from '@app/lib';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';

function UserButton(props) {
  const navigation = useNavigation();
  const globalState = useGlobalState();
  const handleButtonClick = async () => {
    const user = await getStoreData('user');
    if (user === null) {
      navigation.navigate('LOGIN');
    } else {
      navigation.navigate('PROFILE');
    }
  };
  return (
    <IconButton onPress={() => handleButtonClick()}>
      <Image source={globalState?.user === undefined ? insuIcon.ICON_LOGOUT : insuIcon.HEADER_USER} />
    </IconButton>
  );
}

export default UserButton;
