import React from 'react';
import { MainLayout } from '@app/layout';
import styled from '@app/style/typed-components';
import { FocusAwareStatusBar, Typhograph } from '@app/components';

const Container = styled.View``;
const StepTitle = styled.View`
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
`;

function AddressSearchPresenter() {
  return (
    <MainLayout>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Container>
        <StepTitle>
          <Typhograph type="NOTO" weight="BOLD" size={16} color="BLUE">
            가입유형
          </Typhograph>
        </StepTitle>
      </Container>
    </MainLayout>
  );
}
export default AddressSearchPresenter;
