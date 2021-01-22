import React from 'react';
import { insuIcon } from '@app/assets';
import { Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import theme from '@app/style/theme';

const Container = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${(props) => theme.color[props.backgroundcolor]};
  border-radius: 10px;
  border-width: ${(props) => (props.active ? '0px' : '1px')};
  border-color: rgb(224, 224, 224);
`;

const Box = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.Image`
  margin-right: 5px;
`;
function CheckLabelButton({ title, active = false, onPress }) {
  return (
    <Container activeOpacity={0.6} onPress={onPress} backgroundcolor={active ? 'SKYBLUE' : 'WHITE'} active={active}>
      <Box active>
        <Icon source={active ? insuIcon.BTN_OFF : insuIcon.BTN_ON} />
        <Typhograph type="NOTO" size={15} color={active ? 'WHITE' : 'BLUE'} weight="MEDIUM">
          {title}
        </Typhograph>
      </Box>
    </Container>
  );
}

export default CheckLabelButton;
