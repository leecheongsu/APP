import { SafeArea } from '@app/components';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React from 'react';
import { ColorName } from 'styled-components';

type MainLayoutTypes = {
  children: React.ReactNode;
  headerbackcolor?: ColorName;
  barstyle?: 'light-content' | 'dark-content';
};

const Container = styled.View`
  background-color: ${theme.color.WHITE};
`;
const ScrollContainer = styled.ScrollView``;
const HeaderBack = styled.View`
  position: absolute;
  top: 0px;
  height: 300px;
  width: 100%;
  background-color: ${(props) => theme.color[props.headerbackcolor]};
`;

function MainLayout({ children, headerbackcolor }: MainLayoutTypes) {
  return (
    <>
      <Container>
        {headerbackcolor && <HeaderBack headerbackcolor={headerbackcolor} />}
        <SafeArea />
        <ScrollContainer keyboardShouldPersistTaps="handled">{children}</ScrollContainer>
      </Container>
    </>
  );
}

export default MainLayout;
