import React, { useEffect } from 'react';
import { BackButton, BottomFixButton, FocusAwareStatusBar } from '@app/components';
import styled from '@app/style/typed-components';
import Modal from 'react-native-modal';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import { BackHandler, Platform, View } from 'react-native';
import PDFView from 'react-native-view-pdf';
const ContentsBox = styled.View`
  width: ${screenWidth()}px;
  height: 100%;
`;
const Header = styled.View`
  padding: ${Platform.OS === 'ios' ? '50px 10px 0px 10px' : '10px 10px 10px 10px'};
  background-color: ${theme.color.WHITE};
  border-bottom-width: 0px;
`;
const BackButtonBox = styled.View``;

export default function TermsPdf({ open, close, onPress, isButton = true }) {
  const resources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: 'https://insrb.com/download/MRHI1810_terms.pdf',
  };
  const resourceType = 'url';

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Modal isVisible={open} style={{ padding: 0, margin: 0 }} onBackButtonPress={() => close()}>
        <ContentsBox>
          <Header>
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
