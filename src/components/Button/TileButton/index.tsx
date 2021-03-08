import { Typhograph } from '@app/components';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React from 'react';
import { Image } from 'react-native';
import { ColorName } from 'styled-components';

type TileButtonTypes = {
  source: any;
  title: string;
  background?: ColorName;
  color?: ColorName;
  isBorder?: boolean;
  onPress?: () => void;
  borderColor?: ColorName;
  isBadge?: boolean;
  badgeCount?: number;
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${(props: any) => (props.background ? theme.color[props.background] : theme.color.SKYBLUE)};
  border-radius: 13px;
  border-width: ${(props: any) => (props.isBorder ? '1px' : '0px')};
  border-color: ${(props: any) => (props.borderColor ? theme.color[props.borderColor] : theme.color.GRAY)};
  padding: 10px 0px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const IconBox = styled.View`
  margin-right: 10px;
`;
const TextBox = styled.View``;
const BadgeBox = styled.View`
  background-color: ${theme.color.GRAY2};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  margin-left: 5px;
`;
export default function TileButton({
  onPress = () => null,
  source,
  title,
  background,
  color = 'WHITE',
  isBorder,
  borderColor = 'GRAY',
  isBadge = false,
  badgeCount,
}: TileButtonTypes) {
  return (
    <Container background={background} isBorder={isBorder} onPress={() => onPress()} borderColor={borderColor}>
      <IconBox>
        <Image source={source} />
      </IconBox>
      <TextBox>
        <Typhograph type="NOTO" color={color}>
          {title}
        </Typhograph>
      </TextBox>
      {isBadge && (
        <BadgeBox>
          <Typhograph
            type="ROBOTO"
            color="SKYBLUE"
            size={14}
            lineheight={6}
            style={{ width: 24, height: 24, textAlign: 'center' }}>
            {badgeCount}
          </Typhograph>
        </BadgeBox>
      )}
    </Container>
  );
}
