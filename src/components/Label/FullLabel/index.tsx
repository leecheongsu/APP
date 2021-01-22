import React from 'react';
import styled from '@app/style/typed-components';
import { Typhograph } from '@app/components';
import theme from '@app/style/theme';

type FullLabelTypes = {
  title: string | number;
};

const Container = styled.View`
  background-color: ${theme.color.GRAY2};
  border-top-width: 1px;
  border-top-color: ${theme.color.BORDER_GRAY};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
`;

function FullLabel({ title }: FullLabelTypes) {
  return (
    <Container>
      <Typhograph type="NOTO" color="GRAY" size={11} weight="REGULAR">
        {title}
      </Typhograph>
    </Container>
  );
}

export default FullLabel;
