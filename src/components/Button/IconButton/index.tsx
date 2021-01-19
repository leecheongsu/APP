import styled from '@app/style/typed-components';
import React from 'react';

type IconButtonTypes = {
  children: React.ReactNode;
  onPress: () => void;
  size?: number;
};

const Container = styled.TouchableOpacity`
    width:${(props) => props.size}px;
    height${(props) => props.size}px;
`;

function IconButton({ children, onPress, size = 30 }: IconButtonTypes) {
  return (
    <Container size={size} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={onPress}>
      {children}
    </Container>
  );
}

export default IconButton;
