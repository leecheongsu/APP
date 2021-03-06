import React from 'react';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { ColorName } from 'styled-components';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Loading } from '@app/components';

type CustomButtonTypes = {
  onPress: () => void;
  children: any;
  background?: ColorName;
  width?: number;
  style?: TouchableOpacityProps;
  radius?: number;
  isLoading?: boolean;
};

const Container = styled.TouchableOpacity`
  background-color: ${(props: any) => (props.background ? theme.color[props.background] : 'red')};
  padding: 10px;
  width: ${(props: any) => (props.width ? props.width + 'px' : '100%')};
  border-radius: ${(props: any) => (props.radius ? props.radius : 10)}px;
  align-items: center;
  justify-content: center;
`;

export default function CustomButton({
  onPress,
  children,
  width,
  background,
  style,
  radius,
  isLoading = false,
}: CustomButtonTypes) {
  return (
    <Container
      style={style}
      onPress={onPress}
      width={width}
      background={background}
      radius={radius}
      disabled={isLoading}>
      {isLoading ? <Loading height={30} /> : children}
    </Container>
  );
}
