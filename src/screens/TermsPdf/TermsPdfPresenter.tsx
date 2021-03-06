import React from 'react';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { Platform, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { BackButton, BottomFixButton, FocusAwareStatusBar } from '@app/components';
import PDFView from 'react-native-view-pdf';
import { ifIphoneX } from 'react-native-iphone-x-helper';
const styles = StyleSheet.create({
  iphonePaddingTop: {
    ...ifIphoneX({
      paddingTop: 40,
    }),
  },
});
type TermsPdfPresenterTypes = {
  open: boolean;
  close: () => void;
  onPress: () => void;
  isButton: boolean;
  resources: {
    file: string;
    url: string;
  };
  resourceType: 'url';
};

const ContentsBox = styled.View`
  width: ${screenWidth()}px;
  height: 100%;
`;
const Header = styled.View`
  padding: 25px 10px 10px 10px;
  background-color: ${theme.color.WHITE};
  border-bottom-width: 0px;
`;
const BackButtonBox = styled.View``;

function TermsPdfPresenter({ open, close, onPress, isButton, resources, resourceType }: TermsPdfPresenterTypes) {
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Modal isVisible={open} style={{ padding: 0, margin: 0 }} onBackButtonPress={() => close()}>
        <ContentsBox>
          <Header style={styles.iphonePaddingTop}>
            <BackButtonBox>
              <BackButton onPress={() => close()} />
            </BackButtonBox>
          </Header>
          <View style={{ flex: 1 }}>
            {/* Some Controls to change PDF resource */}
            <PDFView
              fadeInDuration={250.0}
              style={{ flex: 1 }}
              resource={resources[resourceType]}
              resourceType={resourceType}
              onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
              onError={(error) => console.log('Cannot render PDF', error)}
            />
          </View>
        </ContentsBox>
        {isButton && (
          <BottomFixButton
            index={1}
            rightTitle="동의"
            bottomRightPress={() => onPress()}
            bottomLeftPress={() => null}
          />
        )}
      </Modal>
    </>
  );
}
export default TermsPdfPresenter;
