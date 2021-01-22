import { insuImg } from '@app/assets';
import { MainCardButton, MainCardLastButton } from '@app/components';
import Typhograph from '@app/components/Typhograph';
import { nomalize, screenHeight } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React from 'react';

const Card = styled.View`
  margin-top: -${screenHeight() / 12}px;
  background-color: ${theme.color.WHITE};
  border-radius: 30px;
  width: 93%;
  box-shadow: 3px 2px 3px gray;
  elevation: 4;
  align-items: center;
  padding: 40px 0px 0px 0px;
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
  align-items: center;
  justify-content: center;
`;
const CardInfoRight = styled.View`
  width: 50%;
  align-items: flex-start;
  justify-content: flex-end;
`;
const SubText = styled.View`
  position: absolute;
  top: ${nomalize(62)}px;
  right: 55px;
  color: ${theme.color.BLUE};
`;

const Divider = styled.View`
  height: 3px;
  width: 80%;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: ${theme.color.LIGHTGRAY};
`;

const DetailBox = styled.View`
  flex-direction: row;
`;

const DetailBoxLeft = styled.View`
  width: 50%;
`;
const DetailBoxRight = styled.View`
  width: 50%;
`;
const RowBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ButtonBox = styled.View`
  margin-top: 20px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

function HomeCard({ cardData }) {
  const { mainValue, detailRightInfo, cardList } = cardData;
  return (
    <Card>
      <Typhograph type="NOTO" weight="MEDIUM" size={20} color="SOFTBLUE">
        주택화재
      </Typhograph>
      <InsurobotImg source={insuImg.MAIN_B_ROBOT} />
      <CardInfo>
        <CardInfoLeft>
          <RowBox>
            <Typhograph type="ROBOTO" weight="REGULAR" size={45} color="SOFTBLUE">
              {mainValue}
            </Typhograph>
            <Typhograph style={{ marginTop: 10 }} type="NOTO" weight="REGULAR" size={25} color="SOFTGRAY">
              %
            </Typhograph>
          </RowBox>
          <SubText>
            <Typhograph type="NOTO" weight="REGULAR" size={15} color="BLACK">
              부주의
            </Typhograph>
          </SubText>
        </CardInfoLeft>
        <CardInfoRight>
          <Typhograph type="ROBOTO" weight="REGULAR" size={18} color="SOFTGRAY">
            DETAILS
          </Typhograph>
          <Divider />
          {detailRightInfo.map((item, index) => {
            return (
              <DetailBox key={index}>
                <DetailBoxLeft>
                  <Typhograph type="NOTO" weight="REGULAR" size={14} color="BLUE">
                    {item.title}
                  </Typhograph>
                </DetailBoxLeft>
                <DetailBoxRight>
                  <Typhograph type="ROBOTO" weight="REGULAR" size={14} color="SKYBLUE">
                    {item.value}
                    <Typhograph type="NOTO" weight="REGULAR" size={14} color="SOFTPUPLE2">
                      %
                    </Typhograph>
                  </Typhograph>
                </DetailBoxRight>
              </DetailBox>
            );
          })}
        </CardInfoRight>
      </CardInfo>
      <ButtonBox>
        {cardList.map((item, index) => {
          if (index === cardList.length - 1) {
            return <MainCardLastButton title={item.title} key={index} onPress={item.onPress} />;
          } else {
            return <MainCardButton title={item.title} key={index} onPress={item.onPress} />;
          }
        })}
      </ButtonBox>
    </Card>
  );
}

export default HomeCard;
