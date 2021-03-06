import React from 'react';
import TermsModalPresenter from '@app/screens/TermsModal/TermsModalPresenter';

type TermsModalContainerTypes = {
  open: boolean;
  close: () => void;
  html: any;
  onPress: () => void;
  isButton: boolean;
  buttonTitle: string;
};

export default function TermsModalContainer({
  open,
  close,
  html,
  onPress,
  isButton = true,
  buttonTitle = '동의',
}: TermsModalContainerTypes) {
  return (
    <TermsModalPresenter
      open={open}
      close={close}
      html={html}
      onPress={onPress}
      isButton={isButton}
      buttonTitle={buttonTitle}
    />
  );
}
