import { insuImg } from '@app/assets';
import { Typhograph } from '@app/components';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React from 'react';
import { Image } from 'react-native';

type ResultCardProps = {
  isActive: boolean;
  onClick: (name: any) => void;
  name: string;
  title?: string;
  period?: string;
  periodDetail?: string;
  price: any;
  img: any;
};
const Container = styled.TouchableOpacity`
  background-color: ${theme.color.WHITE};
  border-width: 1px;
  border-color: ${(props: any) => (props.isActive ? theme.color.BLUE : theme.color.BORDER_GRAY)};
  border-radius: 10px;
  padding: 20px;
`;

const LogoBox = styled.View`
  padding: 0px 0px 10px 0px;
`;

const InfoBox = styled.View`
  margin-top: 10px;
`;

const RowBox = styled.View`
  flex-direction: row;
`;

const RowItem = styled.View`
  width: 50%;
  justify-content: center;
`;

export default function ResultCard({
  isActive,
  onClick,
  name,
  title,
  period,
  periodDetail,
  price,
  img,
}: ResultCardProps) {
  return (
    <Container isActive={isActive} onPress={() => onClick(name)}>
      <LogoBox>
        <Image style={{ resizeMode: 'contain', width: 100, height: 50 }} source={img} />
      </LogoBox>
      {title && (
        <Typhograph type="NOTO" color="BLUE" weight="REGULAR" size={15}>
          {title}
        </Typhograph>
      )}

      <InfoBox>
        {period && (
          <Typhograph type="NOTO" color="BLUE" weight="REGULAR" size={12}>
            {period}
          </Typhograph>
        )}
        <RowBox>
          <RowItem>
            <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={12}>
              {periodDetail}
            </Typhograph>
          </RowItem>
          <RowItem>
            <Typhograph style={{ textAlign: 'right' }} type="ROBOTO" color="SKYBLUE" weight="BOLD" size={18}>
              <Typhograph type="NOTO" color="SKYBLUE" weight="REGULAR" size={15}>
                연
              </Typhograph>{' '}
              {price}
              <Typhograph type="NOTO" color="BLUE" weight="REGULAR" size={14}>
                원
              </Typhograph>
            </Typhograph>
          </RowItem>
        </RowBox>
      </InfoBox>
    </Container>
  );
}
