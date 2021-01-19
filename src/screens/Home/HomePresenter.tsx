import React from 'react';
import { MainLayout } from '@app/layout';
import { Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenHeight, screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import { insuImg } from '@app/assets';
import { Image } from 'react-native';

const MainTitleBox = styled.View`
  height: ${screenHeight() / 3.5}px;
  width: ${screenWidth()}px;
  background-color: ${theme.color.BLUE};
  padding-top: ${screenHeight() / 14}px;
  padding-horizontal: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const MainTitleBoxTitle = styled.View``;
const MainTitleBoxImg = styled.Image``;

const Card = styled.View`
  margin-top: -${screenHeight() / 12}px;
  background-color: ${theme.color.WHITE};
  border-radius: 30px;
  width: 93%;
  box-shadow: 3px 2px 3px gray;
  elevation: 4;
  align-items: center;
  padding: 40px 0px;
`;
const CardContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

const InsurobotImg = styled.Image`
  margin-top: 20px;
  margin-left: -10px;
`;

const CardInfo = styled.View`
  flex-direction: row;
  margin-top: 20px;
  justify-content: space-between;
`;

const CardInfoLeft = styled.View`
  width: 50%;
  height: 100%;
  align-items: center;
`;
const CardInfoRight = styled.View`
  width: 50%;
  align-items: flex-start;
`;
const SubText = styled.View`
  position: absolute;
  bottom: -10px;
  right: ${screenWidth() / 7}px;
`;

function HomePresenter() {
  return (
    <>
      <MainLayout>
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
          <Card>
            <Typhograph type="NOTO" weight="MEDIUM" size={20} color="SOFTBLUE">
              주택화재
            </Typhograph>
            <InsurobotImg source={insuImg.MAIN_B_ROBOT} />
            <CardInfo>
              <CardInfoLeft>
                <Typhograph type="NOTO" weight="REGULAR" size={40} lineheight={55} color="SOFTBLUE">
                  54.6
                  <Typhograph type="NOTO" weight="REGULAR" size={20} lineheight={55} color="SOFTGRAY">
                    %
                  </Typhograph>
                </Typhograph>
                <SubText>
                  <Typhograph type="NOTO" weight="REGULAR" size={15} color="BLACK">
                    부주의
                  </Typhograph>
                </SubText>
              </CardInfoLeft>
              <CardInfoRight>
                <Typhograph type="NOTO" weight="REGULAR" size={18} color="SOFTGRAY">
                  DETAILS
                </Typhograph>
              </CardInfoRight>
            </CardInfo>
          </Card>
        </CardContainer>
      </MainLayout>
    </>
  );
}

export default HomePresenter;
