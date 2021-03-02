import React, { useEffect } from 'react';
import { FocusAwareStatusBar, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { FullLabel } from '@app/components';
import theme from '@app/style/theme';
import { CUMTOMER_NUMBER, KAKAO_CHAT_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { BackHandler, Image, Linking, StyleSheet } from 'react-native';
import { insuIcon } from '@app/assets';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const Cotnainer = styled.View`
  padding: 20px 15px;
`;

const ButtonBox = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${theme.color.BORDER_GRAY};
  background-color: ${theme.color.WHITE};
  border-radius: 10px;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
const ButtonItem = styled.View``;

function CustomerCenter() {
  const navigation = useNavigation();
  //안드로이드 하드웨어 백버튼 핸들러
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <FullLabel title={`문의 및 상담 시간은 ${'\n'} 오전 10:00 부터 오후 05:00 까지 입니다.`} />
      <Cotnainer>
        <ButtonBox style={styles.shadow} onPress={() => Linking.openURL(`tel:${CUMTOMER_NUMBER}`)}>
          <ButtonItem>
            <Typhograph type="NOTO" weight="BOLD">
              고객센터
            </Typhograph>
            <Typhograph type="NOTO" color="GRAY3">
              {CUMTOMER_NUMBER}
            </Typhograph>
          </ButtonItem>
          <ButtonItem>
            <Image style={{ tintColor: theme.color.SKYBLUE, width: 30 }} source={insuIcon.PHONE} />
          </ButtonItem>
        </ButtonBox>
        <ButtonBox style={styles.shadow} onPress={() => Linking.openURL(KAKAO_CHAT_URL)}>
          <ButtonItem>
            <Typhograph type="NOTO" weight="BOLD">
              카카오톡 문의
            </Typhograph>
            <Typhograph type="NOTO" color="GRAY3">
              카카오톡 상담 서비스
            </Typhograph>
          </ButtonItem>
          <ButtonItem>
            <Image style={{ tintColor: theme.color.YELLOW, width: 30, height: 30 }} source={insuIcon.KAKAO} />
          </ButtonItem>
        </ButtonBox>
      </Cotnainer>
    </>
  );
}

export default CustomerCenter;
