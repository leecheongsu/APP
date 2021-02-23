import React from 'react';
import { MainLayout } from '@app/layout';
import { FocusAwareStatusBar, HomeCard, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenHeight } from '@app/lib';
import { insuIcon, insuImg } from '@app/assets';
import { useNavigation } from '@react-navigation/native';
import { FloatingAction } from 'react-native-floating-action';
import { Image, Linking, StyleSheet } from 'react-native';
import theme from '@app/style/theme';
import { KAKAO_CHAT_URL, CUMTOMER_NUMBER } from '@env';
const styles = StyleSheet.create({
  // actionButtonIcon: {
  //   fontSize: 20,
  //   height: 22,
  //   color: 'white',
  // },
});
const Container = styled.View`
  padding-bottom: 10px;
`;

const MainTitleBox = styled.View``;

const MainTitleBoxTitle = styled.View``;
const MainTitleBoxImg = styled.Image`
  width: 60px;
  height: 60px;
`;

const CardContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

const CompanyInfoBox = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0px;
`;
const RowBox = styled.View`
  padding-top: ${screenHeight() / 14}px;
  padding-horizontal: 20px;
  flex-direction: row;
  justify-content: space-between;
`;
const RowItem = styled.View``;

function HomePresenter() {
  const navigation = useNavigation();

  const actions = [
    {
      text: '전화문의',
      name: 'mobile',
      position: 1,
      icon: insuIcon.ICON_PHONE,
      color: theme.color.SKYBLUE,
    },
    {
      text: '카카오톡 문의',
      name: 'kakao',
      position: 2,
      color: theme.color.SKYBLUE,
      icon: insuIcon.ICON_KAKAO,
    },
  ];
  return (
    <>
      <MainLayout headerbackcolor="BLUE">
        <FocusAwareStatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'} />
        <Container>
          <RowBox>
            <RowItem style={{ width: '85%' }}>
              <Typhograph type="NOTO" weight="BOLD" size={24} color="WHITE">
                까다로운 절차,{'\n'}복잡한 서류들!
              </Typhograph>
              <Typhograph type="NOTO" weight="LIGHT" size={16} color="SOFTPUPLE">
                이 모~든 과정을 인슈로보로 한방에!
              </Typhograph>
            </RowItem>
            <RowItem style={{ width: '15%' }}>
              <MainTitleBoxImg source={insuImg.MAIN_S_ROBOT} />
            </RowItem>
          </RowBox>

          <CardContainer>
            <HomeCard />
          </CardContainer>

          <CompanyInfoBox>
            <Typhograph type="ROBOTO" weight="LIGHT" size={14} color="GRAY">
              ⓒ insurobo Co. Ltd.
            </Typhograph>
          </CompanyInfoBox>
        </Container>
      </MainLayout>
      <FloatingAction
        color={theme.color.SKYBLUE}
        actions={actions}
        onPressItem={(name) => {
          switch (name) {
            case 'customerCenter': {
              navigation.navigate('CUSTOMER_CENTER');
              return null;
            }
            case 'mobile': {
              Linking.openURL(`tel:${CUMTOMER_NUMBER}`);
              return null;
            }
            case 'kakao': {
              Linking.openURL(KAKAO_CHAT_URL);
              return null;
            }
          }
        }}
      />
    </>
  );
}

export default HomePresenter;
