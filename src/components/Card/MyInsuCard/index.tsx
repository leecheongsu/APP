import React, { useState } from 'react';
import { Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import theme from '@app/style/theme';
import { Alert, Image } from 'react-native';
import { insuImg } from '@app/assets';
import { priceDot } from '@app/lib';
import { MyInsuCertificate } from '@app/screens';
import { useGlobalDispatch } from '@app/context';

const Container = styled.View`
  padding: 20px;
  background-color: ${theme.color.WHITE};
  border-radius: 7px;
  margin-top: 10px;
`;
const ImgBox = styled.View``;
const TitleBox = styled.View`
  margin-top: 20px;
`;
const InfoBox = styled.View``;
const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const RowItem = styled.View``;
const ButtonBox = styled.View`
  padding: 10px 0px;
  flex-direction: row;
  justify-content: space-between;
`;
const Button = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${theme.color.BLUE};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding: 5px 0px;
  width: 100px;
`;
export default function MyInsuCard({ item, downloadfileButton, loading }) {
  const [insuCertificateModal, setInsuCertificateModal] = useState(false);
  const globalDispatch = useGlobalDispatch();
  const openCertificate = () => {
    const insuType = item?.inscompany === '메리츠화재' ? 'home' : 'ww';
    globalDispatch({ type: 'CHANGE', name: 'insuType', value: insuType });
    setInsuCertificateModal(true);
  };

  const onClickInsuButton = (value) => {
    if (item?.inscompany === '메리츠화재') {
      downloadfileButton(value);
      downloadfileButton(value);
    } else {
      Alert.alert('알림', '계약시 발송된 email을 확인해주세요.');
    }
  };

  return (
    <>
      <Container>
        <ImgBox>
          <Image
            style={item?.inscompany === '메리츠화재' ? { width: 100, height: 50 } : { width: 100, height: 20 }}
            source={item?.inscompany === '메리츠화재' ? insuImg.LOGO_MERITZ : insuImg.LOGO_HYUNDAI}
          />
        </ImgBox>
        <TitleBox>
          <Typhograph type="NOTO" size={16} color="BLUE">
            {item?.prod_name}
          </Typhograph>
        </TitleBox>
        <InfoBox>
          <Typhograph type="NOTO" weight="REGULAR">
            가입기간 1년
          </Typhograph>
        </InfoBox>
        <RowBox>
          <RowItem>
            <Typhograph type="NOTO" size={12} color="GRAY3">
              {item?.insdate} ~ {item?.inseddt}
            </Typhograph>
          </RowItem>
          <RowItem>
            <Typhograph type="NOTO" color="SKYBLUE">
              연 {item?.inscompany === '메리츠화재' ? priceDot(item?.opayment) : priceDot(Math.floor(item?.opayment))}{' '}
              <Typhograph type="NOTO" color="BLACK2">
                원
              </Typhograph>
            </Typhograph>
          </RowItem>
        </RowBox>
        <ButtonBox>
          <Button onPress={() => openCertificate()}>
            <Typhograph type="NOTO" size={10} color="BLUE">
              보험가입증명원
            </Typhograph>
          </Button>
          <Button onPress={() => onClickInsuButton('보험증권')}>
            <Typhograph type="NOTO" size={10} color="BLUE">
              {loading ? 'loading...' : '보험증권'}
            </Typhograph>
          </Button>
          <Button onPress={() => onClickInsuButton('보험약관')}>
            <Typhograph type="NOTO" size={10} color="BLUE">
              {loading ? 'loading...' : '보험약관'}
            </Typhograph>
          </Button>
        </ButtonBox>
      </Container>
      <MyInsuCertificate
        open={insuCertificateModal}
        close={() => {
          setInsuCertificateModal(false);
        }}
        isButton
        insuPrice={0}
        state={null}
        item={item}
      />
    </>
  );
}
