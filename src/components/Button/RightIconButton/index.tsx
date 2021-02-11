import React from 'react';
import { insuIcon } from '@app/assets';
import { Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import theme from '@app/style/theme';

const Container = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${(props) => theme.color[props.backgroundcolor]};
  border-radius: 10px;
  border-width: ${(props) => (props.active ? '1px' : '1px')};
  border-color: ${(props) => (props.active ? theme.color[props.backgroundcolor] : 'rgb(224, 224, 224)')};
`;

const Box = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between
  padding: 0px 20px;
`;

const Icon = styled.Image`
  margin-right: 10px;
`;
const TextBox = styled.View`
  padding-right: 10px;
`;
function RightIconButton({ title, active = false, onPress }) {
  return (
    <Container activeOpacity={0.6} onPress={onPress} backgroundcolor={active ? 'SKYBLUE' : 'WHITE'} active={active}>
      <Box active>
        <TextBox>
          <Typhograph type="NOTO" size={12} color={active ? 'WHITE' : 'BLUE'} weight="BOLD">
            {title}
          </Typhograph>
        </TextBox>
        <Icon source={insuIcon.ARR_RIGHT} />
      </Box>
    </Container>
  );
}

export default RightIconButton;
