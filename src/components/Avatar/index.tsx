import React from 'react';
import styled from '@app/style/typed-components';
import { insuIcon } from '@app/assets';
import theme from '@app/style/theme';

const Container = styled.View`
  box-shadow: 3px 3px 3px #ccc;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background: ${theme.color.WHITE};
  padding-top: 10px;
  align-items: center;
  elevation: 4;
`;
const AvatarImage = styled.Image``;

export default function Avatar() {
  return (
    <Container>
      <AvatarImage source={insuIcon.AVATAR_ICON} />
    </Container>
  );
}
