import { insuIcon } from '@app/assets';
import IconButton from '@app/components/Button/IconButton';
import { getStoreData } from '@app/lib';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';

function UserButton(props) {
  const navigation = useNavigation();
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
      <Image source={insuIcon.HEADER_USER} />
    </IconButton>
  );
}

export default UserButton;
