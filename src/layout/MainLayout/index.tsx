import { FocusAwareStatusBar, SafeArea } from '@app/components';
import styled from '@app/style/typed-components';
import React from 'react';

const Container = styled.View``;

function MainLayout({ children }) {
  return (
    <>
      <Container>
        <SafeArea />
        <FocusAwareStatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'} />
        {children}
      </Container>
    </>
  );
}

export default MainLayout;
