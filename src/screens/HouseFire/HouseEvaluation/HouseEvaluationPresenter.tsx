import React from 'react';
import {
  BottomFixButton,
  Typhograph,
  InsuCard,
  CheckLabelButton,
  Collapse,
  CheckButtonCard,
  IconButton,
} from '@app/components';
import { priceDot, screenWidth, sliceTenThousand } from '@app/lib';
import styled from '@app/style/typed-components';
import theme from '@app/style/theme';
import { Image, Platform } from 'react-native';
import { insuIcon } from '@app/assets';
import { danchInfoText, selectDamboText, gajeDamboText } from '@app/lib/html';

const Container = styled.View`
  width: ${screenWidth()}px;
  padding-bottom: 65px;
`;
const ContentsContainer = styled.ScrollView``;
const CardBox = styled.View`
  padding: 20px;
  background-color: ${theme.color.GRAY2};
`;
const SubTextBox = styled.View`
  margin-top: 15px;
`;
const SectionTwoContainer = styled.View``;
const SectionTwoTitleBox = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
  margin: 0px 20px;
`;
const SelectButtonBox = styled.View`
  padding: 0px 20px 20px 20px;
  flex-direction: row;
  justify-content: space-between;
`;
const ButtonBox = styled.View`
  width: 49.5%;
`;
const CheckButtonBox = styled.View`
  margin: 5px 0px;
`;
const InfoIconTextBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const InfoIconTextBox1 = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const IconButtonBox = styled.View`
  padding: 0px 10px;
  margin-top: ${Platform.OS === 'ios' ? '5px' : '-2px'};
`;

const ResultBox = styled.View`
  padding: 20px;
`;

const ResultRowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

function HouseEvaluationPresenter({
  state,
  handleNextButton,
  handlePreviousButton,
  openInfoModal,
  onChangeState,
  eachPrice,
  resultPrice,
  clickCheckBox,
  clickDancheButton,
  resultBuildPrice,
  evaluationState,
  onValueChange,
  resultGajePrice,
}) {
  const price = state?.selectAddress?.const_price !== undefined && priceDot(state?.selectAddress?.const_price);
  const subText =
    '건물 보험가입금액은 한국감정원 신축단가표와 건축물대장의 연면적, 건물구조를 반영하여 평가한 금액입니다.';
  return (
    <>
      <Container>
        <ContentsContainer>
          <CardBox>
            <InsuCard leftText="건물 평가 보험가액" leftSubText="(보험가입금액)" rightText={price} />
            <SubTextBox>
              <Typhograph type="NOTO" color="BLACK2" weight="LIGHT" size={10} lineheight={3}>
                {subText}
              </Typhograph>
            </SubTextBox>
          </CardBox>
          <SectionTwoContainer>
            <SectionTwoTitleBox>
              <Typhograph type="NOTO">담보를 선택해주세요.</Typhograph>
            </SectionTwoTitleBox>
            {state.selectType === 'S' && (
              <>
                <InfoIconTextBox1>
                  <Typhograph type="NOTO"> 단체보험 가입여부</Typhograph>
                  <IconButtonBox>
                    <IconButton onPress={() => openInfoModal('단체보험 가입설명', danchInfoText())}>
                      <Image source={insuIcon.ICON_INFO} />
                    </IconButton>
                  </IconButtonBox>
                </InfoIconTextBox1>
                <SelectButtonBox>
                  <ButtonBox>
                    <CheckLabelButton
                      iscenter
                      title="단체보험 가입"
                      active={state.selectAddress.already_group_ins === 'Y'}
                      onPress={() => clickDancheButton('Y')}
                    />
                  </ButtonBox>
                  <ButtonBox>
                    <CheckLabelButton
                      iscenter
                      title="단체보험 미가입"
                      active={state.selectAddress.already_group_ins === 'N'}
                      onPress={() => clickDancheButton('N')}
                    />
                  </ButtonBox>
                </SelectButtonBox>
              </>
            )}
          </SectionTwoContainer>
          <Collapse title="건물" value={sliceTenThousand(state?.selectAddress?.amt_ins)} value2={resultBuildPrice()}>
            <Typhograph type="NOTO" color="BLACK3">
              기본담보(보통약관)
            </Typhograph>
            <CheckButtonBox>
              <CheckButtonCard
                disabled
                state={state?.selectAddress}
                propsToggle={true}
                onPress={() => null}
                name="BFRE"
                title="화재/폭발/파열"
                value={eachPrice('BFRE')?.ins_name}
                value2={priceDot(eachPrice('BFRE')?.premium)}
              />
            </CheckButtonBox>
            <InfoIconTextBox>
              <Typhograph type="NOTO" color="BLACK3">
                선택담보(특별약관)
              </Typhograph>
              <IconButtonBox>
                <IconButton onPress={() => openInfoModal('건물-선택담보(특별약관)', selectDamboText())}>
                  <Image source={insuIcon.ICON_INFO} />
                </IconButton>
              </IconButtonBox>
            </InfoIconTextBox>

            <CheckButtonBox>
              <CheckButtonCard
                state={state?.selectAddress}
                onPress={clickCheckBox}
                title="급배수누출손해"
                name="BDRG"
                value={eachPrice('BDRG')?.ins_name}
                value2={priceDot(eachPrice('BDRG')?.premium)}
              />
            </CheckButtonBox>
            <CheckButtonBox>
              <CheckButtonCard
                state={state?.selectAddress}
                onPress={clickCheckBox}
                name="BGLS"
                title="유리손해"
                value={eachPrice('BGLS')?.ins_name}
                value2={priceDot(eachPrice('BGLS')?.premium)}
              />
            </CheckButtonBox>
            <CheckButtonBox>
              <CheckButtonCard
                state={state?.selectAddress}
                onPress={clickCheckBox}
                name="BCMP"
                items={
                  state?.selectAddress.already_group_ins === 'Y'
                    ? evaluationState?.listGroupBCMP
                    : evaluationState?.listBCMP
                }
                title="대물배상책임"
                value={
                  state?.selectAddress.already_group_ins === 'Y' ? evaluationState.groupBCMP : evaluationState.BCMP
                }
                value2={
                  state?.selectAddress.already_group_ins === 'Y'
                    ? evaluationState.groupBCMP.premium
                    : evaluationState.BCMP.premium
                }
                onValueChange={onValueChange}
                isSelect
              />
            </CheckButtonBox>
          </Collapse>
          <Collapse title="가재도구" value2={resultGajePrice()}>
            <Typhograph type="NOTO" color="BLACK3">
              기본담보(보통약관)
            </Typhograph>
            <CheckButtonBox>
              <CheckButtonCard
                name="KFRE"
                state={state?.selectAddress}
                onPress={clickCheckBox}
                title="화재/폭발/파열"
                value={eachPrice('KFRE')?.ins_name}
                value2={priceDot(eachPrice('KFRE')?.premium)}
              />
            </CheckButtonBox>
            <InfoIconTextBox>
              <Typhograph type="NOTO" color="BLACK3">
                선택담보(특별약관)
              </Typhograph>
              <IconButtonBox>
                <IconButton onPress={() => openInfoModal('가재도구-선택담보(특별약관)', gajeDamboText())}>
                  <Image source={insuIcon.ICON_INFO} />
                </IconButton>
              </IconButtonBox>
            </InfoIconTextBox>

            <CheckButtonBox>
              <CheckButtonCard
                name="KDRG"
                state={state?.selectAddress}
                onPress={clickCheckBox}
                title="급배수누출손해"
                value={eachPrice('KDRG')?.ins_name}
                value2={priceDot(eachPrice('KDRG')?.premium)}
              />
            </CheckButtonBox>
            <CheckButtonBox>
              <CheckButtonCard
                title="가재도난위험"
                state={state?.selectAddress}
                onPress={clickCheckBox}
                name="KSTL"
                items={
                  state?.selectAddress.already_group_ins === 'Y'
                    ? evaluationState?.listGroupKSTL
                    : evaluationState?.listKSTL
                }
                value={
                  state?.selectAddress.already_group_ins === 'Y' ? evaluationState.groupKSTL : evaluationState.KSTL
                }
                value2={
                  state?.selectAddress.already_group_ins === 'Y'
                    ? evaluationState.groupKSTL.premium
                    : evaluationState.KSTL.premium
                }
                onValueChange={onValueChange}
                isSelect
              />
            </CheckButtonBox>
            <CheckButtonBox>
              <CheckButtonCard
                isSelect
                title="대물배상책임"
                state={state?.selectAddress}
                onPress={clickCheckBox}
                name="KLCK"
                items={
                  state?.selectAddress.already_group_ins === 'Y'
                    ? evaluationState?.listGroupKLCK
                    : evaluationState?.listKLCK
                }
                value={
                  state?.selectAddress.already_group_ins === 'Y' ? evaluationState.groupKLCK : evaluationState.KLCK
                }
                value2={
                  state?.selectAddress.already_group_ins === 'Y'
                    ? evaluationState.groupKLCK.premium
                    : evaluationState.KLCK.premium
                }
                onValueChange={onValueChange}
              />
            </CheckButtonBox>
          </Collapse>

          <ResultBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD">
              합계
            </Typhograph>
            <ResultRowBox>
              <Typhograph style={{ marginTop: 10 }} type="NOTO" color="BLACK3" weight="BOLD">
                보험가입금액{' '}
                <Typhograph type="NOTO" size={10} color="BLACK3">
                  (단위:만원)
                </Typhograph>
              </Typhograph>
              <Typhograph style={{ marginTop: 10 }} type="ROBOTO" color="BLACK3" weight="BOLD" size={16}>
                {priceDot(2323)}
                <Typhograph type="NOTO" size={14} color="BLACK3">
                  원
                </Typhograph>
              </Typhograph>
            </ResultRowBox>

            <ResultRowBox>
              <Typhograph style={{ marginTop: 10 }} type="NOTO" color="BLACK2" weight="BOLD">
                보험료{' '}
                <Typhograph type="NOTO" size={10} color="BLACK2">
                  (백원이하절사)
                </Typhograph>
              </Typhograph>
              <Typhograph style={{ marginTop: 10 }} type="ROBOTO" color="SKYBLUE" weight="BOLD" size={20}>
                {resultBuildPrice() + resultGajePrice()}
                <Typhograph type="NOTO" size={16} color="BLACK3">
                  원
                </Typhograph>
              </Typhograph>
            </ResultRowBox>
          </ResultBox>
        </ContentsContainer>

        <BottomFixButton
          index={state.stepNumber}
          leftTitle="이전"
          rightTitle="다음"
          bottomRightPress={handleNextButton}
          bottomLeftPress={handlePreviousButton}
          isKeybordView={state.isKeybordView}
        />
      </Container>
    </>
  );
}

export default HouseEvaluationPresenter;
