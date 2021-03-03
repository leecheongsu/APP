import React from 'react';
import TermsPdfPresenter from '@app/screens/TermsPdf/TermsPdfPresenter';
import { PROD_URL } from '@env';
import { Platform } from 'react-native';

type TermsPdfContainerTypes = {
  flag: any;
  open: boolean;
  close: () => void;
  onPress: () => void;
  isButton: boolean;
};

export default function TermsPdfContainer({ flag, open, close, onPress, isButton = true }: TermsPdfContainerTypes) {
  const resources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: flag === 'hyundai' ? `${PROD_URL}/files/PUNGSUHAI6.pdf` : `${PROD_URL}/files/MRHI1810_terms.pdf`,
  };
  const resourceType = 'url';

  return (
    <TermsPdfPresenter
      open={open}
      close={close}
      onPress={onPress}
      isButton={isButton}
      resources={resources}
      resourceType={resourceType}
    />
  );
}
