import React from 'react';
import { MainLayout } from '@app/layout';
import { FocusAwareStatusBar, HomeCard, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { insuIcon, insuImg } from '@app/assets';
import { useNavigation } from '@react-navigation/native';
import { FloatingAction } from 'react-native-floating-action';
import { Image, Linking } from 'react-native';
import theme from '@app/style/theme';
import { KAKAO_CHAT_URL, CUMTOMER_NUMBER } from '@env';
const Container = styled.View`
  padding-bottom: 10px;
`;

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
  padding-top: 30px;
  padding-horizontal: 20px;
  flex-direction: row;
  justify-content: space-between;
`;
const RowItem = styled.View``;
const ActionRow = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ActionItem = styled.View`
  margin-right: 10px;
`;
const IconBox = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.WHITE};
  border-radius: 50px;
`;
const IconBox2 = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.SKYBLUE};
  border-radius: 50px;
`;
function HomePresenter() {
  const navigation = useNavigation();

  const actions = [
    {
      text: '고객센터',
      name: 'customerCenter',
      position: 1,
      render: () => {
        return (
          <ActionRow>
            <ActionItem>
              <Typhograph type="NOTO" color="WHITE">
                고객센터
              </Typhograph>
            </ActionItem>

            <IconBox>
              <Image source={insuIcon.ICON_CUSTOMER} />
            </IconBox>
          </ActionRow>
        );
      },
    },
    {
      text: '전화문의',
      name: 'mobile',
      position: 1,
      render: () => {
        return (
          <ActionRow>
            <ActionItem>
              <Typhograph type="NOTO" color="WHITE">
                전화문의
              </Typhograph>
            </ActionItem>
            <IconBox>
              <Image source={insuIcon.ICON_PHONE} />
            </IconBox>
          </ActionRow>
        );
      },
    },
    {
      text: '카카오톡 문의',
      name: 'kakao',
      position: 2,
      render: () => {
        return (
          <ActionRow>
            <ActionItem>
              <Typhograph type="NOTO" color="WHITE">
                카카오톡 문의
              </Typhograph>
            </ActionItem>
            <IconBox2>
              <Image source={insuIcon.ICON_KAKAO} />
            </IconBox2>
          </ActionRow>
        );
      },
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
                까다로운 절차, {'\n'}복잡한 과정
              </Typhograph>
              <Typhograph type="NOTO" weight="LIGHT" size={16} color="SOFTPUPLE">
                주소입력만으로 가입에서{'\n'}결제까지 한 방에!
              </Typhograph>
            </RowItem>
            <RowItem style={{ width: '15%' }}>
              <MainTitleBoxImg source={insuImg.MAIN_S_ROBOT} />
            </RowItem>
          </RowBox>

          <CardContainer>
            <HomeCard navigation={navigation} />
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
        overlayColor="rgba(0, 0, 0, 0.65)"
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
