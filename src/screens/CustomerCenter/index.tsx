import React from 'react';
import { Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { FullLabel } from '@app/components';

const Cotnainer = styled.View``;
function CustomerCenter() {
  return (
    <>
      <FullLabel title={`문의 및 상담 시간은 ${'\n'} 오전 10:00 부터 오후 05:00 까지 입니다.`} />
      <Cotnainer>
        <Typhograph type="NOTO">고객센터</Typhograph>
      </Cotnainer>
    </>
  );
}

export default CustomerCenter;
