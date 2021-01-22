import React from 'react';
import styled from '@app/style/typed-components';
import { Platform, TextProps, TextStyle } from 'react-native';
import { ColorName } from 'styled-components';
import { FontweightTypes } from '@app/types';
import { nomalize, setFont } from '@app/lib';
import theme from '@app/style/theme';

type TyphographTypes = {
  type: 'NOTO' | 'ROBOTO';
  children: React.ReactNode;
  option?: TextProps;
  color?: ColorName;
  weight?: FontweightTypes;
  style?: TextStyle;
  size?: number;
  lineheight?: number;
};

const Text = styled.Text`
  font-family: ${(props: any) => setFont(props.type, props.weight)};
  font-size: ${(props: any) => nomalize(props.size)}px;
  color: ${(props: any) => theme.color[props.color]};
  line-height: ${(props: any) => nomalize(props.size + props.lineheight)}px;
`;

function Typhograph({
  type,
  color = 'BLACK',
  weight = 'MEDIUM',
  size = 14,
  option,
  children,
  lineheight = 9,
  style,
}: TyphographTypes) {
  return (
    <Text type={type} color={color} weight={weight} size={size} lineheight={lineheight} style={style} {...option}>
      {children}
    </Text>
  );
}

export default Typhograph;
