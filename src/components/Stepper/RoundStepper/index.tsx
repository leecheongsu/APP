import React from 'react';
import styled from '@app/style/typed-components';
import { ColorName } from 'styled-components';
import theme from '@app/style/theme';
import { Typhograph } from '@app/components';

type RoundStepper = {
  backgroundcolor: ColorName;
  color: ColorName;
  title: string | number;
};

const Conateiner = styled.View`
  background-color: ${(props: any) => theme.color[props.backgroundcolor]};
  color: ${(props: any) => theme.color[props.color]};
  width: 22px;
  height: 22px;
  border-radius: 50px;
  align-items: center;
  justify-content: flex-start;
`;

function RoundStepper({ backgroundcolor, color, title }: RoundStepper) {
  return (
    <Conateiner backgroundcolor={backgroundcolor} color={color}>
      <Typhograph type="ROBOTO" size={13} color={color} lineheight={4}>
        {title}
      </Typhograph>
    </Conateiner>
  );
}

export default RoundStepper;
