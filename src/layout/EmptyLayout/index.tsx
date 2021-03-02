import React from 'react';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';

const Container = styled.View`
  width: ${screenWidth()}px;
`;
export default function EmptyLayout() {
  return <Container />;
}
