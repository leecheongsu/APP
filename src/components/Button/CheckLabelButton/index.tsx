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
  width: 100%;
`;

const Box = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.iscenter ? 'center' : 'flex-start')};
  padding: 0px 20px;
`;

const Icon = styled.Image`
  margin-right: 10px;
`;
const TextBox = styled.View`
  padding-right: 10px;
`;
function CheckLabelButton({ title, active = false, onPress, iscenter }) {
  return (
    <Container activeOpacity={0.6} onPress={onPress} backgroundcolor={active ? 'SKYBLUE' : 'WHITE'} active={active}>
      <Box active iscenter={iscenter}>
        <Icon source={active ? insuIcon.BTN_OFF : insuIcon.BTN_ON} />
        <TextBox>
          <Typhograph type="NOTO" size={12} color={active ? 'WHITE' : 'BLUE'} weight="MEDIUM">
            {title}
          </Typhograph>
        </TextBox>
      </Box>
    </Container>
  );
}

export default CheckLabelButton;
