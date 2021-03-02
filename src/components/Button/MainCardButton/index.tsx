import React from 'react';
import styled from '@app/style/typed-components';
import Typhograph from '@app/components/Typhograph';
import theme from '@app/style/theme';

const Container = styled.TouchableOpacity`
  padding: 20px 0px;
  width: 100%;
  background-color: ${theme.color.GRAY2};
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${theme.color.LIGHTGRAY};
`;

function MainCardButton({ title, onPress }) {
  return (
    <Container onPress={onPress}>
      <Typhograph type="NOTO" weight="REGULAR" size={20} color="BLUE">
        {title}
      </Typhograph>
    </Container>
  );
}

export default MainCardButton;
