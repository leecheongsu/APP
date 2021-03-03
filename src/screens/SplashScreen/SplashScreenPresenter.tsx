import React from 'react';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { Image, StatusBar, StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { MainLayout } from '@app/layout';
import { Typhograph } from '@app/components';
import { insuImg } from '@app/assets';
import * as Progress from 'react-native-progress';
import { screenWidth } from '@app/lib';

type SplashScreenPresenterTypes = {
  value: number;
};

const styles = StyleSheet.create({
  isIphone: {
    ...ifIphoneX({
      paddingTop: 25,
    }),
  },
});
const Container = styled.View`
  padding: 70px 20px 20px 20px;
  background-color: ${theme.color.WHITE};
  height: 500px;
`;
const TextBox = styled.View`
  margin-top: 50px;
`;
const ProgressBarBox = styled.View`
  margin-top: 50px;
`;
const Logobox = styled.View`
  align-items: center;
`;
const ImageBox = styled.View`
  position: absolute;
  bottom: 0px;
`;

function SplashScreenPresenter({ value }: SplashScreenPresenterTypes) {
  return (
    <>
      <MainLayout>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
        <Container style={styles.isIphone}>
          <Logobox>
            <Image source={insuImg.INTRO_LOGO} />
          </Logobox>
          <TextBox>
            <Typhograph type="NOTO" weight="MEDIUM" size={20} color="BLACK2">
              고객을 위한 예측과 맞춤{'\n'}
              차세대 지능형{'\n'}
              인슈테크 플랫폼
            </Typhograph>
          </TextBox>
          <ProgressBarBox>
            <Progress.Bar
              progress={value}
              width={200}
              color={theme.color.SKYBLUE}
              borderColor={theme.color.GRAY2}
              height={3}
            />
            <Typhograph type="NOTO" color="GRAY" size={10}>
              2021 Ⓒ INSUROBO CO. LTD.
            </Typhograph>
          </ProgressBarBox>
        </Container>
      </MainLayout>
      <ImageBox>
        <Image style={{ width: screenWidth() }} source={insuImg.INTRO} />
      </ImageBox>
    </>
  );
}

export default SplashScreenPresenter;
