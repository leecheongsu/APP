import React from 'react';
import { BottomFixButton, FullLabel, RightIconButton, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import { InsuCertificate, TermsModal } from '@app/screens';
import { useGlobalState } from '@app/context';

type StormFloodFinalPresenterTypes = {
  state: StormFloodStateTypes;
  nextButton: () => void;
  handlePreviousButton: () => void;
  onChangeState: (name: StormFloodName, value: any) => void;
  downloadfileButton: () => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const ContentsContainer = styled.View`
  padding: 20px 15px;
`;

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
const InfoBox = styled.View`
  margin-top: 10px;
`;

function StormFloodFinalPresenter({
  state,
  nextButton,
  onChangeState,
  handlePreviousButton,
  downloadfileButton,
}: StormFloodFinalPresenterTypes) {
  const globalState = useGlobalState();
  return (
    <>
      <Container>
        {/* 카드결제 결과 */}
        <FullLabel title={`인슈로보 풍수해 Ⅵ 계약이${'\n'}정상적으로 완료되었습니다.`} />
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
                disabled={state?.loading}
                title="보험 가입 증명원"
                onPress={() => onChangeState('insuCertificateModal', true)}
              />
            </ButtonItem>
            <ButtonItem>
              <RightIconButton
                active={false}
                disabled={state?.loading}
                title={state?.loading ? 'Downloading..' : '보험증권'}
                onPress={() => downloadfileButton()}
              />
            </ButtonItem>
            <ButtonItem>
              <RightIconButton
                disabled={state?.loading}
                active={false}
                title={state?.loading ? 'Downloading..' : '보험약관'}
                onPress={() => downloadfileButton()}
              />
            </ButtonItem>
          </ButtonBox>
          <HelperText>
            <Typhograph type="NOTO" color="WARING_RED" size={10}>
              ※ 통합청약서 및 증권은 가입하신 이메일 주소로 발송됩니다.
            </Typhograph>
          </HelperText>
        </ContentsContainer>

        <TermsModal
          open={state?.termsModal}
          close={() => onChangeState('termsModal', false)}
          html={state?.termsHtml}
          onPress={() => null}
          isButton={false}
        />
        <InsuCertificate
          open={state?.insuCertificateModal}
          close={() => {
            onChangeState('insuCertificateModal', false);
          }}
          isButton
          insuPrice={0}
          state={state}
        />
        <BottomFixButton
          index={1}
          leftTitle="이전"
          rightTitle="다음"
          bottomRightPress={() => nextButton()}
          bottomLeftPress={() => handlePreviousButton()}
          isKeybordView={false}
        />
      </Container>
    </>
  );
}

export default StormFloodFinalPresenter;
