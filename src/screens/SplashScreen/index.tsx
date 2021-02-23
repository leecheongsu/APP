import React, { useEffect, useState } from 'react';
import { FocusAwareStatusBar, SafeArea, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { MainLayout } from '@app/layout';
import { Image, Platform, StatusBar } from 'react-native';
import { insuImg } from '@app/assets';
import { screenHeight, screenWidth } from '@app/lib';
import * as Progress from 'react-native-progress';
import theme from '@app/style/theme';
const Container = styled.View`
  padding: 20px;
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

export default function SplashScreen() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (value < 1) {
      console.log(1);
      setTimeout(() => {
        setValue(value + 0.1);
      }, 100);
    }
  }, [value]);
  return (
    <>
      <MainLayout>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
        <Container>
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
              borderColor={theme.color.SKYBLUE}
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
