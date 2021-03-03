import React from 'react';
import { BottomFixButton, CheckLabelButton, FullLabel, IconButton, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import { Image } from 'react-native';
import { insuIcon } from '@app/assets';
import theme from '@app/style/theme';
import { ScrollView } from 'react-native-gesture-handler';
import TermsModal from '@app/screens/TermsModal';
import { productInfoHtml2, productInfoHtml3 } from '@app/lib/html';
type CheckListPresenterTypes = {
  state: StormFloodStateTypes;
  nextButton: () => void;
  onClickTermsModalOpen2: (name: any, html: any) => void;
  handlePreviousButton: () => void;
  onChangeState: (name: StormFloodName, value: any) => void;
  termsChange: (name: any, value: any) => void;
  onClickTermsModalAgree: () => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const ContentsContainer = styled.View`
  padding: 20px;
`;

const TextBox = styled.View`
  margin-top: 20px;
`;
const CheckBox = styled.View`
  margin-top: 10px;
  margin-bottom: 20px;
`;
const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
const RowItem = styled.View`
  width: ${(props) => (props.width ? props.width : '0px')};
`;

const CardBox = styled.View`
  margin-top: 10px;
  padding: 20px 15px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props) => theme.color.BORDER_GRAY};
`;
const CardLeftBox = styled.View`
  width: 33px;
  height: 33px;
  background-color: ${theme.color.SKYBLUE2};
  align-items: center;
  justify-content: center;
  border-radius: 33px;
`;

const PaddingBox = styled.View`
  height: 150px;
`;

const ButtonBox = styled.View`
  margin-top: 20px;
`;

const RadioBox = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;
const RadioItem = styled.View``;
const RadioItemBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const InfoButtonContainer = styled.TouchableOpacity`
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;
const InfoButtonBox = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.color.BORDER_GRAY};
  border-radius: 15px;
  justify-content: center;
  width: 80%;
  padding: 2px 0px;
`;
function CheckListPresenter({
  state,
  nextButton,
  onClickTermsModalOpen2,
  handlePreviousButton,
  termsChange,
  onChangeState,
  onClickTermsModalAgree,
}: CheckListPresenterTypes) {
  return (
    <>
      <Container>
        <ScrollView>
          <FullLabel
            title={`법률상소상공인 여부를${'\n'} 확인바랍니다.`}
            icon={<Image style={{ marginLeft: 10 }} source={insuIcon.STORMFLOOD_CHECK} />}
          />
          <ContentsContainer>
            <TextBox>
              <Typhograph type="NOTO" color="GRAY" size={12}>
                본 체크리스트는 계약자 본인이 법률소상공인에 해당함을 명확히 알고 확인한 후 사실대로 직접 작성하였으며,
                허위 또는 부실 작성 시에는 약관상 고의 및 과실에 해당되어 보험금지급이 제한될 수 있고, 보험회사는
                계약해지 또는 취소할 수 있음을 확인합니다.
              </Typhograph>
            </TextBox>
            <CheckBox>
              <RowBox>
                <RowItem width="10%">
                  <IconButton onPress={() => termsChange('terms1', state?.terms?.terms1?.isChecked === 0 ? 1 : 0)}>
                    <Image
                      source={state?.terms?.terms1?.isChecked === 1 ? insuIcon.BT_CHECK_ON : insuIcon.BT_CHECK_OFF}
                    />
                  </IconButton>
                </RowItem>
                <RowItem width="90%">
                  <Typhograph type="NOTO" color="BLACK2" weight="REGULAR">
                    네. 동의합니다
                  </Typhograph>
                </RowItem>
              </RowBox>
            </CheckBox>
            <CardBox>
              <RowBox>
                <RowItem width="15%">
                  <CardLeftBox>
                    <Typhograph type="ROBOTO" weight="BOLD" color="WHITE" size={15}>
                      Q1
                    </Typhograph>
                  </CardLeftBox>
                </RowItem>
                <RowItem width="83%">
                  <Typhograph type="NOTO" color="GRAY" size={12}>
                    「“소상공인 보호 및 지원에 관한 법률” 제2조, “중소기업 기본법” 제2조2항 」에서는 소상공인의 상시
                    근로자 수를 광업·제조업·건설업·운수업은 10명 미만, 그 밖의 업종은 5명 미만으로 제한 합니다.
                    피보험자의 상시 근로자수 (아르바이트 제외)가 기준 미만입니까?
                  </Typhograph>
                </RowItem>
              </RowBox>
              <RadioBox>
                <RadioItem>
                  <RadioItemBox>
                    <IconButton onPress={() => termsChange('terms2', 1)}>
                      <Image source={state?.terms?.terms2?.isChecked === 1 ? insuIcon.RADIO_ON : insuIcon.RADIO_OFF} />
                    </IconButton>
                    <Typhograph type="NOTO" color="GRAY" style={{ marginLeft: 10 }}>
                      네
                    </Typhograph>
                  </RadioItemBox>
                </RadioItem>

                <RadioItem style={{ marginLeft: 30 }}>
                  <RadioItemBox>
                    <IconButton onPress={() => termsChange('terms2', 2)}>
                      <Image source={state?.terms?.terms2?.isChecked === 1 ? insuIcon.RADIO_OFF : insuIcon.RADIO_ON} />
                    </IconButton>

                    <Typhograph type="NOTO" color="GRAY" style={{ marginLeft: 10 }}>
                      아니오
                    </Typhograph>
                  </RadioItemBox>
                </RadioItem>
              </RadioBox>
            </CardBox>
            <CardBox>
              <RowBox>
                <RowItem width="15%">
                  <CardLeftBox>
                    <Typhograph type="ROBOTO" weight="BOLD" color="WHITE" size={15}>
                      Q2
                    </Typhograph>
                  </CardLeftBox>
                </RowItem>
                <RowItem width="83%">
                  <Typhograph type="NOTO" color="GRAY" size={12}>
                    「 “중소기업기본법시행령” 제8조1항 」 에서는 주요 업종별 평균 매출액을 [주요 업종별 연평균 매출액
                    제한]과 같이 제한합니다. 피보험자의 평균매출액이 기존 미만입니까?
                  </Typhograph>
                </RowItem>
              </RowBox>

              <InfoButtonContainer
                onPress={() => {
                  onClickTermsModalOpen2('terms3', productInfoHtml2());
                }}>
                <InfoButtonBox>
                  <Image source={insuIcon.ICON_FILE} style={{ marginRight: 10 }} />
                  <Typhograph type="NOTO" color="BLUE" size={10}>
                    주요 업종별 연평균 매출액
                  </Typhograph>
                  <Image style={{ width: 5, height: 10, marginLeft: 5 }} source={insuIcon.ARR_RIGHT} />
                </InfoButtonBox>
              </InfoButtonContainer>

              <RadioBox>
                <RadioItem>
                  <RadioItemBox>
                    <IconButton onPress={() => termsChange('terms3', 1)}>
                      <Image source={state?.terms?.terms3?.isChecked ? insuIcon.RADIO_ON : insuIcon.RADIO_OFF} />
                    </IconButton>
                    <Typhograph type="NOTO" color="GRAY" style={{ marginLeft: 10 }}>
                      네
                    </Typhograph>
                  </RadioItemBox>
                </RadioItem>

                <RadioItem style={{ marginLeft: 30 }}>
                  <RadioItemBox>
                    <IconButton onPress={() => termsChange('terms3', 0)}>
                      <Image source={state?.terms?.terms3?.isChecked ? insuIcon.RADIO_OFF : insuIcon.RADIO_ON} />
                    </IconButton>

                    <Typhograph type="NOTO" color="GRAY" style={{ marginLeft: 10 }}>
                      아니오
                    </Typhograph>
                  </RadioItemBox>
                </RadioItem>
              </RadioBox>
            </CardBox>
            <CardBox>
              <RowBox>
                <RowItem width="15%">
                  <CardLeftBox>
                    <Typhograph type="ROBOTO" weight="BOLD" color="WHITE" size={15}>
                      Q3
                    </Typhograph>
                  </CardLeftBox>
                </RowItem>
                <RowItem width="83%">
                  <Typhograph type="NOTO" color="GRAY" size={12}>
                    계약자가 임차인인 경우 임대인 소유의 물건 (건물)을 대신하여 가입하는 계약(제3자를 위한 계약)은
                    불가하며, 기 경우 사고발생시 임대인의 소상공인 해당 여부를 불문하고 보험금지급이 제한됩니다. 동
                    내용을 정확히 확인하였습니까?
                  </Typhograph>
                </RowItem>
              </RowBox>

              <RadioBox>
                <RadioItem>
                  <RadioItemBox>
                    <IconButton onPress={() => termsChange('terms4', 1)}>
                      <Image source={state?.terms?.terms4?.isChecked ? insuIcon.RADIO_ON : insuIcon.RADIO_OFF} />
                    </IconButton>
                    <Typhograph type="NOTO" color="GRAY" style={{ marginLeft: 10 }}>
                      네
                    </Typhograph>
                  </RadioItemBox>
                </RadioItem>

                <RadioItem style={{ marginLeft: 30 }}>
                  <RadioItemBox>
                    <IconButton onPress={() => termsChange('terms4', 0)}>
                      <Image source={state?.terms?.terms4?.isChecked ? insuIcon.RADIO_OFF : insuIcon.RADIO_ON} />
                    </IconButton>

                    <Typhograph type="NOTO" color="GRAY" style={{ marginLeft: 10 }}>
                      아니오
                    </Typhograph>
                  </RadioItemBox>
                </RadioItem>
              </RadioBox>
            </CardBox>
            <ButtonBox>
              <CheckLabelButton
                onPress={() => {
                  onClickTermsModalOpen2('terms5', productInfoHtml3());
                  // termsChange('terms5', 1);
                }}
                title="꼭!! 알아 두실 사항"
                iscenter
                active={state?.terms.terms5.isChecked === 1}
              />
            </ButtonBox>
            <PaddingBox />
          </ContentsContainer>
        </ScrollView>
        <TermsModal
          open={state?.termsModal}
          close={() => {
            onChangeState('termsModal', false);
          }}
          html={state?.termsHtml}
          onPress={onClickTermsModalAgree}
          buttonTitle="확인"
          isButton
        />

        <BottomFixButton
          index={state.stepNumber}
          leftTitle="이전"
          rightTitle="다음"
          bottomRightPress={() => nextButton()}
          bottomLeftPress={() => handlePreviousButton()}
          isKeybordView={state.isKeybordView}
        />
      </Container>
    </>
  );
}

export default CheckListPresenter;
