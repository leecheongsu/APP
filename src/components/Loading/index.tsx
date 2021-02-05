import React from 'react';
import theme from '@app/style/theme';
import { ActivityIndicator } from 'react-native';
import styled from '@app/style/typed-components';

const LoadingBox = styled.View<{ height: number }>`
  height: ${(props: any) => props.height}px;
  align-items: center;
  justify-content: center;
`;

export default function Loading({ height = 100 }) {
  return (
    <LoadingBox height={height}>
      <ActivityIndicator animating={true} color={theme.color.GRAY} />
    </LoadingBox>
  );
}
