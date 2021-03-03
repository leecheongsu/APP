import MyInsuCertificatePresenter from '@app/screens/MyInsuCertificate/MyInsuCertificatePresenter';
import React from 'react';

type MyInsuCertificateContainerTypes = {
  open: boolean;
  close: () => void;
  isButton: boolean;
  insuPrice: any;
  item: any;
};

export default function MyInsuCertificateContainer({
  open,
  close,
  isButton = true,
  insuPrice,
  item,
}: MyInsuCertificateContainerTypes) {
  return <MyInsuCertificatePresenter open={open} close={close} isButton={isButton} insuPrice={insuPrice} item={item} />;
}
