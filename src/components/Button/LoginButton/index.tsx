import React from 'react';
import Typhograph from '@app/components/Typhograph';
import styled from '@app/style/typed-components';
import { ColorName } from 'styled-components';
import theme from '@app/style/theme';

type LoginButtonTypes = {
  title: string | number;
  right?: number;
  color: ColorName;
  background: ColorName;
  onPress: () => void;
};

const Container = styled.TouchableOpacity`
  background-color: ${(props: any) => theme.color[props.background]};
  padding: 5px 0px;
  width: 100px;
  align-items: center;
  border-radius: 30px;
  margin-right: ${(props: any) => props.right}px;
`;

function LoginButton({ title, color = 'BLACK', background = 'BLACK', onPress, right = 0 }: LoginButtonTypes) {
  return (
    <Container onPress={onPress} background={background} right={right}>
      <Typhograph type="NOTO" color={color} size={13} weight="REGULAR">
        {title}
      </Typhograph>
    </Container>
  );
}

export default LoginButton;
