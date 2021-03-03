import { insuImg } from '@app/assets';
import { BottomFixButton, FocusAwareStatusBar, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;
const ContentsContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: -200px;
`;

function JoinSuccessPresenter() {
  const navigation = useNavigation();

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Container>
        <ContentsContainer>
          <Image source={insuImg.BG_LOGO} width={80} />
          <Typhograph type="NOTO" weight="BOLD" color="BLACK2" size={17} style={{ textAlign: 'center', marginTop: 30 }}>
            인슈로보의 신규회원이 되신것을{'\n'} 축하드립니다.
          </Typhograph>
          <Typhograph type="NOTO" weight="REGULAR" color="BLACK2" size={12} style={{ marginTop: 10 }}>
            로그인 후 이용해주세요.
          </Typhograph>
        </ContentsContainer>
        <BottomFixButton
          index={1}
          leftTitle="이전"
          rightTitle="로그인"
          bottomRightPress={() => {
            navigation.goBack();
            navigation.navigate('LOGIN');
          }}
          bottomLeftPress={() => null}
          isKeybordView={false}
        />
      </Container>
    </>
  );
}

export default JoinSuccessPresenter;
