import React from 'react';
import styled from '@app/style/typed-components';
import Typhograph from '@app/components/Typhograph';

const Container = styled.View<{ height: number }>`
  height: ${(props: any) => props.height}px;
  justify-content: center;
  align-items: center;
`;

export default function EmptyCard({ height = 100, title }: { height: number; title: string }) {
  return (
    <Container height={height}>
      <Typhograph type="NOTO" weight="REGULAR" size={14} color="SOFTGRAY">
        {title}
      </Typhograph>
    </Container>
  );
}
