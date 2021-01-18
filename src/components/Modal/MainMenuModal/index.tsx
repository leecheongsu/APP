import React from 'react';
import styled from '@app/style/typed-components';

type MainMenuModalTypes = {
  open: boolean;
  close: () => void;
  children: React.ReactChild;
};

const Container = styled.Modal``;
const ModalContainer = styled.View`
  height: 95%;
  margin-top: auto;
  background-color: #00ffd5;
`;

export default function MainMenuModal({ open, close, children }: MainMenuModalTypes) {
  return (
    <Container
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        close();
      }}>
      <ModalContainer>{children}</ModalContainer>
    </Container>
  );
}
