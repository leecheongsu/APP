import React from 'react';
import InsuCertificatePresenter from '@app/screens/InsuCertificate/InsuCertificatePresenter';

type InsuCertificateConainerTypes = {
  state: any;
  open: boolean;
  close: () => void;
  isButton: boolean;
  insuPrice: any;
};

export default function InsuCertificateConainer({
  state,
  open,
  close,
  isButton = true,
  insuPrice,
}: InsuCertificateConainerTypes) {
  return <InsuCertificatePresenter state={state} open={open} close={close} isButton={isButton} insuPrice={insuPrice} />;
}
