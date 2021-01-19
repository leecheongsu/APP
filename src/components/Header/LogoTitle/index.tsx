import { insuIcon } from '@app/assets';
import styled from '@app/style/typed-components';
import React from 'react';
import { Image } from 'react-native';

const Container = styled.View``;

function LogoTitle(props) {
  return (
    <Container>
      <Image source={insuIcon.HEADER_LOGO} />
    </Container>
  );
}

export default LogoTitle;
