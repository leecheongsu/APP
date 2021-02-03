import React from 'react';
import styled from '@app/style/typed-components';
import Typhograph from '@app/components/Typhograph';
import theme from '@app/style/theme';
import { nomalize, isIphoneX } from '@app/lib';

type BottomFixButtonTypes = {
  bottomLeftPress: () => void;
  bottomRightPress: () => void;
  leftTitle?: string | number;
  rightTitle: string | number;
  index: number;
  isKeybordView?: boolean;
};

const Container = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 0px;
`;

const LeftButton = styled.TouchableOpacity`
  background-color: ${theme.color.GRAY_RGB};
  height: ${isIphoneX() ? nomalize(53) : nomalize(53)}px;
  align-items: center;
  justify-content: center;
`;
const RightButton = styled.TouchableOpacity`
  background-color: ${theme.color.BLUE_RGB};
  height: ${isIphoneX() ? nomalize(53) : nomalize(53)}px;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;

const Box = styled.View`
  width: 50%;
`;
const WideBox = styled.View`
  width: 100%;
`;

function BottomFixButton({
  index,
  bottomLeftPress,
  bottomRightPress,
  leftTitle,
  rightTitle,
  isKeybordView = false,
}: BottomFixButtonTypes) {
  console.log(index);
  switch (index) {
    case 1:
      return (
        <Container isKeybordView={isKeybordView}>
          <WideBox>
            <RightButton onPress={() => bottomRightPress()}>
              <Typhograph type="NOTO" color="WHITE" weight="BOLD" size={15}>
                {rightTitle}
              </Typhograph>
            </RightButton>
          </WideBox>
        </Container>
      );
    case 2:
      return (
        <Container isKeybordView={isKeybordView}>
          <Box>
            <LeftButton onPress={() => bottomLeftPress()}>
              <Typhograph type="NOTO" color="WHITE" weight="BOLD" size={15}>
                {leftTitle}
              </Typhograph>
            </LeftButton>
          </Box>
          <Box>
            <RightButton onPress={() => bottomRightPress()} title="22">
              <Typhograph type="NOTO" color="WHITE" weight="BOLD" size={15}>
                {rightTitle}
              </Typhograph>
            </RightButton>
          </Box>
        </Container>
      );
    default:
      return (
        <Container isKeybordView={isKeybordView}>
          <Box>
            <LeftButton onPress={() => bottomLeftPress()}>
              <Typhograph type="NOTO" color="WHITE" weight="BOLD" size={15}>
                {leftTitle}
              </Typhograph>
            </LeftButton>
          </Box>
          <Box>
            <RightButton onPress={() => bottomRightPress()} title="22">
              <Typhograph type="NOTO" color="WHITE" weight="BOLD" size={15}>
                {rightTitle}
              </Typhograph>
            </RightButton>
          </Box>
        </Container>
      );
  }
}

export default BottomFixButton;
