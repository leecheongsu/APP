import React from 'react';
import { MainLayout } from '@app/layout';
import { FocusAwareStatusBar, HomeCard, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenHeight, screenWidth } from '@app/lib';
import { insuImg } from '@app/assets';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  padding-bottom: 10px;
`;

const MainTitleBox = styled.View`
  height: ${screenHeight() / 3.5}px;
  width: ${screenWidth()}px;
  padding-top: ${screenHeight() / 14}px;
  padding-horizontal: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const MainTitleBoxTitle = styled.View``;
const MainTitleBoxImg = styled.Image``;

const CardContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

const CompanyInfoBox = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
`;

function HomePresenter() {
  const navigation: any = useNavigation();
  const cardData = {
    mainValue: 54.6,
    detailRightInfo: [
      { title: '발생률', value: 18.2 },
      { title: '화재사망자', value: 50.1 },
    ],
    cardList: [
      { title: '풍수해 Ⅵ', onPress: () => console.log(1) },
      { title: '주택화재', onPress: () => navigation.navigate('HOUSE_FIRE') },
      { title: '배상책임', onPress: () => console.log(1) },
    ],
  };
  return (
    <>
      <MainLayout headerbackcolor="BLUE">
        <FocusAwareStatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'} />
        <Container>
          <MainTitleBox>
            <MainTitleBoxTitle>
              <Typhograph type="NOTO" weight="BOLD" size={24} color="WHITE">
                지능형 건물화재가입
              </Typhograph>
              <Typhograph type="NOTO" weight="LIGHT" size={20} color="SOFTPUPLE">
                인슈로보에게 물어보세요!
              </Typhograph>
            </MainTitleBoxTitle>
            <MainTitleBoxImg source={insuImg.MAIN_S_ROBOT} />
          </MainTitleBox>
          <CardContainer>
            <HomeCard cardData={cardData} />
          </CardContainer>
          <CompanyInfoBox>
            <Typhograph type="ROBOTO" weight="LIGHT" size={14} color="GRAY">
              ⓒ insurobo Co., Ltd.
            </Typhograph>
          </CompanyInfoBox>
        </Container>
      </MainLayout>
    </>
  );
}

export default HomePresenter;
