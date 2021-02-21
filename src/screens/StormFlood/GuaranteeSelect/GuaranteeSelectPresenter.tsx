import React from 'react';
import {
  BottomFixButton,
  CheckLabelButton,
  DefaultInput,
  FullLabel,
  IconButton,
  OverayLoading,
  Select,
  Typhograph,
} from '@app/components';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';
import { InputStateTypes, StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import { TermsModal } from '@app/screens';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert, Image, Platform } from 'react-native';
import { insuIcon } from '@app/assets';
import { gunmulText, jipgiText, jegoJasanText, jagibudamText } from '@app/lib/html';

type GuaranteeSelectPresenterTypes = {
  state: StormFloodStateTypes;
  nextButton: () => void;
  onClickTermsModalOpen: (name: any, html: any) => void;
  handlePreviousButton: () => void;
  onChangeState: (name: StormFloodName, value: any) => void;
  openInfoModal: (title: any, contents: any) => void;
  handleSectorSelect: (value: any) => void;
  handleBuildingPriceSelect: (value: any) => void;
  handleFacilityPriceSelect: (value: any) => void;
  handleselfPriceSelect: (value: any) => void;
  handleInventoryPriceSelect: (value: any) => void;
  inputState: InputStateTypes;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const ContentsContainer = styled.ScrollView`
  padding: 20px 15px;
`;

const LabelBox = styled.View`
  margin: 10px 0px;
`;
const LabelBox2 = styled.View`
  margin: 10px 0px;
  flex-direction: row;
`;

const RowBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const RowItem = styled.View`
  align-items: center;
  width: ${(props) => (props.width ? props.width : '0px')};
`;
const InputBox = styled.View``;
const PaddingBox = styled.View`
  height: 100px;
`;

function GuaranteeSelectPresenter({
  state,
  nextButton,
  onChangeState,
  onClickTermsModalOpen,
  handlePreviousButton,
  openInfoModal,
  handleSectorSelect,
  handleBuildingPriceSelect,
  handleFacilityPriceSelect,
  handleselfPriceSelect,
  handleInventoryPriceSelect,
  inputState,
}: GuaranteeSelectPresenterTypes) {
  return (
    <>
      <Container>
        <OverayLoading visible={state.loading} />
        <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={Platform.OS === 'ios' ? 30 : -10}>
          <FullLabel title="기본정보를 확인해주세요." />
          <ContentsContainer>
            {/* 가입유형 */}
            <LabelBox>
              <Typhograph type="NOTO" color="BLACK2" weight="BOLD">
                가입 유형
              </Typhograph>
            </LabelBox>
            <RowBox>
              <RowItem width="49%">
                <CheckLabelButton
                  iscenter
                  onPress={() => onChangeState('joinType', '개인')}
                  title="개인"
                  active={state?.joinType === '개인'}
                />
              </RowItem>
              <RowItem width="49%">
                <CheckLabelButton
                  iscenter
                  onPress={() =>
                    Alert.alert('알림', `법인사업자는${'\n'}전화문의주시길바랍니다.${'\n'}${'\n'}070-4126-3333`)
                  }
                  title="법인"
                  active={state?.joinType === '법인'}
                />
              </RowItem>
            </RowBox>
            {/* 물건 구분 */}
            <LabelBox>
              <Typhograph type="NOTO" color="BLACK2" weight="BOLD">
                물건 구분
              </Typhograph>
            </LabelBox>
            <RowBox>
              <RowItem width="49%">
                <CheckLabelButton
                  iscenter
                  onPress={() => onChangeState('stuffDivision', '일반')}
                  title="일반"
                  active={state.stuffDivision === '일반'}
                />
              </RowItem>
              <RowItem width="49%">
                <CheckLabelButton
                  iscenter
                  onPress={() => {
                    onChangeState('stuffDivision', '공장');
                    onChangeState('selectFacilityprice', '');
                  }}
                  title="공장"
                  active={state.stuffDivision === '공장'}
                />
              </RowItem>
            </RowBox>
            {/* 소유구분 */}
            <LabelBox>
              <Typhograph type="NOTO" color="BLACK2" weight="BOLD">
                소유 구분
              </Typhograph>
            </LabelBox>
            <RowBox>
              <RowItem width="49%">
                <CheckLabelButton
                  iscenter
                  onPress={() => onChangeState('possessionDivision', '소유자')}
                  title="소유자"
                  active={state.possessionDivision === '소유자'}
                />
              </RowItem>
              <RowItem width="49%">
                <CheckLabelButton
                  iscenter
                  onPress={() => {
                    onChangeState('possessionDivision', '임차자');
                    onChangeState('selectBuildingPrice', '');
                  }}
                  title="임차자"
                  active={state.possessionDivision === '임차자'}
                />
              </RowItem>
            </RowBox>
            {/* 상호명 */}
            <LabelBox>
              <Typhograph type="NOTO" color="BLACK2" weight="BOLD">
                상호명
              </Typhograph>
            </LabelBox>
            <InputBox>
              <DefaultInput {...inputState.buildName} placeholder="상호명을 입력해 주세요." />
            </InputBox>
            {/* 해당층 */}
            <LabelBox>
              <Typhograph type="NOTO" color="BLACK2" weight="BOLD">
                해당 층(시작/끝)
              </Typhograph>
            </LabelBox>
            <RowBox>
              <RowItem width="49%">
                <DefaultInput {...inputState.bldFloor1} placeholder="시작 층" keyboardType="numeric" />
              </RowItem>
              <RowItem width="49%">
                <DefaultInput {...inputState.bldFloor2} placeholder="끝 층" keyboardType="numeric" />
              </RowItem>
            </RowBox>
            {/* 해당층 */}
            <LabelBox>
              <Typhograph type="NOTO" color="BLACK2" weight="BOLD">
                면적
              </Typhograph>
            </LabelBox>
            <DefaultInput {...inputState.hsArea} placeholder="목적물 면적(m2)" keyboardType="numeric" />
            {/* 업종선택 */}
            <LabelBox>
              <Typhograph type="NOTO" color="BLACK2" weight="BOLD">
                업종선택
              </Typhograph>
            </LabelBox>
            <InputBox>
              <Select
                label="업종을 선택하세요."
                value={state.selectSector}
                items={state.sectorItems}
                onValueChange={handleSectorSelect}
                disabled={false}
                borderColor="BORDER_GRAY"
              />
            </InputBox>

            {/* 건물 */}
            <LabelBox2>
              <Typhograph type="NOTO" color="BLACK2" weight="BOLD">
                건물
              </Typhograph>
              <IconButton onPress={() => openInfoModal('건물', gunmulText())}>
                <Image source={insuIcon.ICON_INFO} />
              </IconButton>
            </LabelBox2>
            <InputBox>
              <Select
                label="건물 가격을 선택해주세요."
                value={state.selectBuildingPrice}
                items={state.stuffDivision === '공장' ? state.factoryBuildingPriceItems : state.basicBuildingPriceItems}
                onValueChange={handleBuildingPriceSelect}
                disabled={state.possessionDivision === '임차자'}
                borderColor="BORDER_GRAY"
              />
            </InputBox>

            {/* 시설(기계) 및 집기  */}
            <LabelBox2>
              <Typhograph type="NOTO" color="BLACK2" weight="BOLD">
                시설(기계) 및 집기
              </Typhograph>
              <IconButton onPress={() => openInfoModal('시설(기계) 및 집기', jipgiText())}>
                <Image source={insuIcon.ICON_INFO} />
              </IconButton>
            </LabelBox2>
            <InputBox>
              <Select
                label="시설(기계) 및 집기"
                value={state.selectFacilityprice}
                items={state.stuffDivision === '공장' ? state.factoryFacilityPriceItems : state.basicFacilityPriceItems}
                onValueChange={handleFacilityPriceSelect}
                disabled={state.stuffDivision === '공장'}
                borderColor="BORDER_GRAY"
              />
            </InputBox>

            {/* 재고자산  */}
            <LabelBox2>
              <Typhograph type="NOTO" color="BLACK2" weight="BOLD">
                재고자산
              </Typhograph>
              <IconButton onPress={() => openInfoModal('재고자산', jegoJasanText())}>
                <Image source={insuIcon.ICON_INFO} />
              </IconButton>
            </LabelBox2>
            <InputBox>
              <Select
                label="재고자산"
                value={state.selectInventoryPrice}
                items={state.inventoryPriceItems}
                onValueChange={handleInventoryPriceSelect}
                disabled={false}
                borderColor="BORDER_GRAY"
              />
            </InputBox>

            {/* 자기부담금안내  */}
            <LabelBox2>
              <Typhograph type="NOTO" color="BLACK2" weight="BOLD">
                자기부담금
              </Typhograph>
              <IconButton onPress={() => openInfoModal('자기부담금안내', jagibudamText())}>
                <Image source={insuIcon.ICON_INFO} />
              </IconButton>
            </LabelBox2>
            <InputBox>
              <Select
                label="자기부담금"
                value={state.selectSelfPrice}
                items={state.selfPriceItems}
                onValueChange={handleselfPriceSelect}
                disabled={false}
                borderColor="BORDER_GRAY"
              />
            </InputBox>

            <PaddingBox />
          </ContentsContainer>
          <TermsModal
            open={state?.termsModal}
            close={() => onChangeState('termsModal', false)}
            html={state?.termsHtml}
            onPress={() => onChangeState('termsModal', false)}
            buttonTitle="확인"
            isButton
          />
        </KeyboardAwareScrollView>
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

export default GuaranteeSelectPresenter;
