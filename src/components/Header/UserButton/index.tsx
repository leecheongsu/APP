import { insuIcon } from '@app/assets';
import IconButton from '@app/components/Button/IconButton';
import React from 'react';
import { Image } from 'react-native';

function UserButton(props) {
  return (
    <IconButton onPress={() => console.log(1)}>
      <Image source={insuIcon.HEADER_USER} />
    </IconButton>
  );
}

export default UserButton;
