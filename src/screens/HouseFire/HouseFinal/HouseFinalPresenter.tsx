import { BottomFixButton, FullLabel, Typhograph, RightIconButton, OverayLoading } from '@app/components';
import { useGlobalState } from '@app/context';
import { screenWidth } from '@app/lib';
import { InsuCertificate } from '@app/screens';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React from 'react';
import moment from 'moment';

const Container = styled.View`
  width: ${screenWidth()}px;
  padding-bottom: 65px;
`;
const ContentsContainer = styled.ScrollView`
  padding: 20px;
`;
const TitleBox = styled.View`
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;

const InfoBox = styled.View`
  margin-top: 10px;
`;
const RowBox = styled.View`
  margin-top: 5px;
  flex-direction: row;
  justify-content: space-between;
`;
const RowItem = styled.View``;
const InfotextBox = styled.View``;
const ButtonBox = styled.View`
  margin-top: 20px;
`;
const ButtonItem = styled.View`
  margin-top: 15px;
`;
const HelperText = styled.View`
  margin-top: 10px;
`;
const InfoTextBox2 = styled.View`
  margin-top: 30px;
  padding: 20px 15px;
  background-color: ${theme.color.GRAY2};
`;

const HelperText2 = styled.View`
  margin-top: 10px;
`;
function HouseFinalPresenter({
  state,
  submitNextButton,
  handlePreviousButton,
  onChangeTermsState,
  onChangeState,
  onClickTermsModalAgree,
  onClickTermsModalOpen,
  onClickAllCheck,
  insuPrice,
  selectInsu,
  downloadfileButton,
}) {
  const globalState = useGlobalState();
  return (
    <Container>
      {state?.payway === 'card' ? (
        <>
          <FullLabel title={`인슈로보 주택화재보험 계약이${'\n'}정상적으로 완료되었습니다.`} />
          <ContentsContainer>
            <InfoBox>
              <InfotextBox>
                <Typhograph type="NOTO" color="GRAY" style={{ textAlign: 'center' }}>
                  <Typhograph type="NOTO" color="SKYBLUE">
                    {globalState?.user?.name}
                  </Typhograph>{' '}
                  님이 계약해 주신 보험 정보는 회원가입 시{'\n'}
                  등록해 주신 이메일로 발송되었습니다.
                </Typhograph>
              </InfotextBox>
              <InfotextBox style={{ marginTop: 20 }}>
                <Typhograph type="NOTO" color="GRAY" style={{ textAlign: 'center' }}>
                  아래 정보를 확인해 주시기 바라며 확인을 누르시면 App 메인으로 이동합니다.
                </Typhograph>
              </InfotextBox>
            </InfoBox>
            <ButtonBox>
              <ButtonItem>
                <RightIconButton
                  active={false}
                  title="보험 가입 증명원"
                  onPress={() => onChangeState('insuCertificateModal', true)}
                />
              </ButtonItem>
              <ButtonItem>
                <RightIconButton
                  active={false}
                  title={state?.loading ? 'Downloading..' : '보험증권'}
                  onPress={() => downloadfileButton('보험증권')}
                />
              </ButtonItem>
              <ButtonItem>
                <RightIconButton
                  active={false}
                  title={state?.loading ? 'Downloading..' : '보험약관'}
                  onPress={() => downloadfileButton('보험약관')}
                />
              </ButtonItem>
            </ButtonBox>
            <HelperText>
              <Typhograph type="NOTO" color="WARING_RED" size={10}>
                ※ 통합청약서 및 증권은 가입하신 이메일 주소로 발송됩니다.
              </Typhograph>
            </HelperText>
          </ContentsContainer>
        </>
      ) : (
        <>
          <FullLabel title={`인슈로보 주택화재보험 계약(예약)이${'\n'}정상적으로 완료되었습니다.`} />
          <ContentsContainer>
            <InfoBox>
              <InfotextBox>
                <Typhograph type="NOTO" color="GRAY" style={{ textAlign: 'center' }}>
                  <Typhograph type="NOTO" color="SKYBLUE">
                    {globalState?.user?.name}
                  </Typhograph>{' '}
                  님이 계약(
                  <Typhograph type="NOTO" color="SKYBLUE">
                    예약
                  </Typhograph>
                  )주신 인슈로보주택종합보험 계약 건에 대한 보험료를 이체하실 계좌번호 정보를 아래와 같이 알려드립니다.
                </Typhograph>
              </InfotextBox>
            </InfoBox>
            <InfoTextBox2>
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    거래은행
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    {state?.vbankResult?.P_FN_NM}
                  </Typhograph>
                </RowItem>
              </RowBox>

              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    계좌주명
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    {state?.vbankResult?.P_VACT_NAME}
                  </Typhograph>
                </RowItem>
              </RowBox>

              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    계좌번호{'\n'}(가상계좌)
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    {state?.vbankResult?.P_VACT_NUM}
                  </Typhograph>
                </RowItem>
              </RowBox>

              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    입금하실 보험료
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    {insuPrice} 원
                  </Typhograph>
                </RowItem>
              </RowBox>
              {console.log(
                moment(state?.vbankResult?.P_VACT_DATE + state?.vbankResult?.P_VACT_TIME).format('YYYY-MM-DD')
              )}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    입금마감일자
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY" size={12}>
                    2020년12월29일 23시59분00초
                  </Typhograph>
                </RowItem>
              </RowBox>
            </InfoTextBox2>
            <HelperText>
              <Typhograph type="NOTO" color="GRAY" size={10}>
                * 입금마감일자가 지나면 계좌가 자동 폐쇄되어 입금이 되지 않고, 계약이 완료되지 않습니다. 이점 유의하시고
                기간 내에 처리 바랍니다.
              </Typhograph>
            </HelperText>
            <HelperText style={{ marginTop: 10 }}>
              <Typhograph type="NOTO" color="GRAY" size={12}>
                * 입금확인 이후 계약은 최종적으로 완료되며, 회원가입 시 등록하신 이메일로 통합청약서 및 증권이
                발송됩니다.
              </Typhograph>
              <Typhograph type="NOTO" color="GRAY" size={12} style={{ marginTop: 10 }}>
                * 또한 [내 보험] 에서 계약 정보를 확인하실 수 있습니다.
              </Typhograph>
            </HelperText>
          </ContentsContainer>
        </>
      )}
      <InsuCertificate
        open={state?.insuCertificateModal}
        close={() => {
          onChangeState('insuCertificateModal', false);
        }}
        isButton
        state={state}
        insuPrice={insuPrice}
      />

      <BottomFixButton
        index={state.stepNumber}
        leftTitle="이전"
        rightTitle="다음"
        bottomRightPress={submitNextButton}
        bottomLeftPress={handlePreviousButton}
        isKeybordView={state.isKeybordView}
      />
    </Container>
  );
}

export default HouseFinalPresenter;
