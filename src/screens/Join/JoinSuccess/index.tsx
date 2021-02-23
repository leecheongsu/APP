import React from 'react';
import { CustomButton, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { Image } from 'react-native';
import { insuImg } from '@app/assets';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ButtonBox = styled.View`
  margin-top: 30px;
`;

export default function JoinSuccess() {
  const navigation = useNavigation();
  return (
    <Container>
      <Image source={insuImg.BG_LOGO} width={80} />
      <Typhograph type="NOTO" weight="BOLD" color="BLACK2" size={17} style={{ textAlign: 'center', marginTop: 30 }}>
        인슈로보의 신규회원이 되신것을{'\n'} 축하드립니다.
      </Typhograph>
      <Typhograph type="NOTO" weight="REGULAR" color="BLACK2" size={12} style={{ marginTop: 10 }}>
        로그인 후 이용해주세요.
      </Typhograph>
      <ButtonBox>
        <CustomButton
          background="SKYBLUE"
          onPress={() => {
            navigation.goBack();
            navigation.navigate('LOGIN');
          }}>
          <Typhograph type="NOTO" color="WHITE">
            로그인
          </Typhograph>
        </CustomButton>
      </ButtonBox>
    </Container>
  );
}
