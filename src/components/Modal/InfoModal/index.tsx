import { FocusAwareStatusBar, Typhograph } from '@app/components';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React from 'react';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';

const Container = styled.View`
  max-height: 400px;
  width: 100%;
  background-color: white;
  justify-content: center;
`;
const ModalTitleBox = styled.View`
  background-color: ${theme.color.SKYBLUE};
  padding: 15px;
  align-items: center;
`;

const ContentsBox = styled.View`
  height: 100%;
  max-height: 300px;
`;
const BottomButtonBox = styled.View``;
const CustomButton = styled.TouchableOpacity`
  background-color: ${theme.color.BLUE};
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export default function InfoModal({ open, title, contents, onClose }) {
  return (
    <>
      <Modal isVisible={open} onBackdropPress={onClose}>
        <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
        <Container>
          <ModalTitleBox>
            <Typhograph type="NOTO" color="WHITE" size={15} weight="BOLD">
              {title}
            </Typhograph>
          </ModalTitleBox>
          <ContentsBox>
            <WebView
              source={{
                html: contents,
                baseUrl: 'web/',
              }}
              originWhitelist={'["*"]'}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scalesPageToFit={true}
            />
          </ContentsBox>

          <BottomButtonBox>
            <CustomButton onPress={() => onClose()} activeOpacity={1.0}>
              <Typhograph type="NOTO" color="WHITE">
                확인
              </Typhograph>
            </CustomButton>
          </BottomButtonBox>
        </Container>
      </Modal>
    </>
  );
}
