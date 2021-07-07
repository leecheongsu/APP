import React from 'react';
import {Image, TextInputProps, View} from 'react-native';
import { CameraStateName, CameraStateTypes } from '@screens/Camera/CameraContainer';
import { useGlobalState } from '@app/context';
import styled from 'styled-components';
import { screenHeight, screenWidth } from '@app/lib';
import {BottomFixButton, DefaultInput, OverayLoading, Typhograph} from '@app/components';
import theme from "@app/style/theme";

type ImageConfirmPresenterTypes = {
  state: CameraStateTypes;
  onChangeState: (name: CameraStateName, value: any) => void;
  bottomLeftPress: () => void;
  bottomRightPress: () => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const ContentsContainer = styled.View`
  padding: 20px 15px;
`;

const LabelBox = styled.View`
  margin-top: 10px;
`;

const InputBox = styled.View`
  margin-top: 5px;
`;


const SimpleInputBox = styled.View`
  margin-top: 5px;
  border-radius: 10px;
  padding: 0px 10px 0px 10px;
  border-width: 1px;
  background-color: white;
  border-color: ${theme.color.INPUT_GRAY};
  height: 50px;
`;

const CompanyNameInputBox = styled.View``;
const CompanyNumberInputBox = styled.View``;

function ImageConfirmPresenter({ state, bottomLeftPress, bottomRightPress }: ImageConfirmPresenterTypes) {
    return (
    <>
      <Container>
        <Image
          style={{
            width: '100%',
            height: '60%',
          }}
          source={{
            uri: state.imageUri,
          }}
        />
          <ContentsContainer>
          <CompanyNameInputBox>
              <LabelBox>
                  <Typhograph type="NOTO" weight="MEDIUM">
                      상호명
                  </Typhograph>
              </LabelBox>
                  <SimpleInputBox>
                      <Typhograph type="NOTO" weight="MEDIUM" style={{ marginTop: 10}} color='GRAY'>
                          {state.companyName}
                      </Typhograph>
                  </SimpleInputBox>
          </CompanyNameInputBox>
          <CompanyNumberInputBox>
              <LabelBox>
                  <Typhograph type="NOTO" weight="MEDIUM">
                      사업자 번호
                  </Typhograph>
              </LabelBox>
                  <SimpleInputBox>
                      <Typhograph type="NOTO" weight="MEDIUM" style={{ marginTop: 10}} color='GRAY'>
                          {state.companyNumber}
                      </Typhograph>
                  </SimpleInputBox>
          </CompanyNumberInputBox>
          </ContentsContainer>
        <BottomFixButton
          bottomLeftPress={bottomLeftPress}
          bottomRightPress={bottomRightPress}
          rightTitle="확인"
          leftTitle="재촬영"
          index={state.stepNumber}
        />
      </Container>
    </>
  );
}

export default ImageConfirmPresenter;
