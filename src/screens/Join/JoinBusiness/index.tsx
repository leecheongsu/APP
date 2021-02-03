import React from 'react';
import { Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import theme from '@app/style/theme';
import { screenWidth } from '@app/lib';

const Container = styled.View`
  width: ${screenWidth()}px;
`;
const ContentsContainer = styled.View`
  background-color: ${theme.color.WHITE};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 20px;
  height: 100%;
`;
const TopArrow = styled.View`
  left: 210px;
  top: 0px;
  width: 0px;
  height: 0px;
  background-color: transparent;
  border-style: solid;
  border-top-width: 0px;
  border-right-width: 10px;
  border-bottom-width: 15px;
  border-left-width: 10px;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: ${theme.color.WHITE};
  border-left-color: transparent;
`;

export default function JoinBusiness({ state, onChangeState }) {
  return (
    <>
      <Container>
        <TopArrow />
        <ContentsContainer>
          <Typhograph type="NOTO">개인사업자</Typhograph>
        </ContentsContainer>
      </Container>
    </>
  );
}
