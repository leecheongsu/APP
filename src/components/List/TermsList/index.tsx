import { insuIcon } from '@app/assets';
import { Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import React from 'react';
import { Image } from 'react-native';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const RowBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Item = styled.View``;
export default function TermsList({ title }) {
  return (
    <Container>
      <Item>
        <RowBox>
          <Typhograph lineheight={3} type="NOTO" color="BLUE" size={11} style={{ marginRight: 5 }}>
            {title}
          </Typhograph>
          <Image style={{ width: 4, height: 8 }} source={insuIcon.ARR_RIGHT} />
        </RowBox>
      </Item>
      <Item>
        <RowBox>
          <Image source={insuIcon.BT_CHECK_ON} />
          <Typhograph type="NOTO" color="BLUE" size={13} style={{ marginLeft: 5 }}>
            동의
          </Typhograph>
        </RowBox>
      </Item>
    </Container>
  );
}
