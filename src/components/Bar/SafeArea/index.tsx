import styled from '@app/style/typed-components';
import React from 'react';

function SafeArea() {
  return <SafeAreaView />;
}

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: white;
`;

export default SafeArea;
