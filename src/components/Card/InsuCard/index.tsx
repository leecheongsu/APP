import React from 'react';
import styled from '@app/style/typed-components';
import { Typhograph } from '@app/components';
import theme from '@app/style/theme';

const Container = styled.View`
  flex-direction: row;
  border-width: 1px;
  border-color: ${theme.color.BORDER_GRAY};
  padding: 20px;
  background-color: ${theme.color.WHITE};
  justify-content: space-between;
`;
const LeftBox = styled.View``;
const RightBox = styled.View`
  max-width: 50%;
`;

export default function InsuCard({ leftText, leftSubText, rightText }) {
  return (
    <Container>
      <LeftBox>
        <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={14}>
          {leftText}
        </Typhograph>
        <Typhograph type="NOTO" color="BLUE" weight="MEDIUM" size={13}>
          {leftSubText}
        </Typhograph>
      </LeftBox>
      <RightBox>
        <Typhograph type="ROBOTO" color="SKYBLUE" weight="BOLD" size={16}>
          {rightText}
          <Typhograph type="NOTO" color="BLACK2">
            {' '}
            원
          </Typhograph>
        </Typhograph>
      </RightBox>
    </Container>
  );
}
