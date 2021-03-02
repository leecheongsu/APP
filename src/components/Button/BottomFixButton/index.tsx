import React from 'react';
import styled from '@app/style/typed-components';
import Typhograph from '@app/components/Typhograph';
import theme from '@app/style/theme';
import { nomalize } from '@app/lib';
import { Loading } from '@app/components';
import { StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
type BottomFixButtonTypes = {
  bottomLeftPress: () => void;
  bottomRightPress: () => void;
  leftTitle?: string | number;
  rightTitle: string | number;
  index: number;
  isKeybordView?: boolean;
  loading?: boolean;
};

const styles = StyleSheet.create({
  iphone: {
    ...ifIphoneX({
      height: 70,
    }),
  },
});

const Container = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 0px;
`;

const LeftButton = styled.TouchableOpacity`
  background-color: ${theme.color.GRAY_RGB};
  height: ${nomalize(53)}px;
  align-items: center;
  justify-content: center;
`;
const RightButton = styled.TouchableOpacity`
  background-color: ${theme.color.BLUE_RGB};
  height: ${nomalize(53)}px;
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
  loading = false,
}: BottomFixButtonTypes) {
  switch (index) {
    case 1:
      return (
        <Container isKeybordView={isKeybordView}>
          <WideBox>
            <RightButton onPress={() => bottomRightPress()} style={styles.iphone}>
              {loading ? (
                <Loading />
              ) : (
                <Typhograph type="NOTO" color="WHITE" weight="BOLD" size={15}>
                  {rightTitle}
                </Typhograph>
              )}
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
                {loading ? (
                  <Loading />
                ) : (
                  <Typhograph type="NOTO" color="WHITE" weight="BOLD" size={15}>
                    {rightTitle}
                  </Typhograph>
                )}
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
                {loading ? (
                  <Loading />
                ) : (
                  <Typhograph type="NOTO" color="WHITE" weight="BOLD" size={15}>
                    {rightTitle}
                  </Typhograph>
                )}
              </Typhograph>
            </RightButton>
          </Box>
        </Container>
      );
  }
}

export default BottomFixButton;
