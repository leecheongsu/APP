import React from 'react';
import {
  BottomFixButton,
  CheckLabelButton,
  DefaultInput,
  FullLabel,
  IconButton,
  Select,
  Typhograph,
} from '@app/components';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import { TermsModal } from '@app/screens';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image, Platform } from 'react-native';
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
  sectorItems: any;
  selfPriceItems: any;
  basicBuildingPriceItems: any;
  factoryBuildingPriceItems: any;
  basicFacilityPriceItems: any;
  factoryFacilityPriceItems: any;
  inventoryPriceItems: any;
  handleInventoryPriceSelect: (value: any) => void;
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
  sectorItems,
  handleBuildingPriceSelect,
  handleFacilityPriceSelect,
  basicBuildingPriceItems,
  basicFacilityPriceItems,
  factoryBuildingPriceItems,
  factoryFacilityPriceItems,
  handleselfPriceSelect,
  selfPriceItems,
  inventoryPriceItems,
  handleInventoryPriceSelect,
}: GuaranteeSelectPresenterTypes) {
  return (
    <>
      <Container>
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
                  onPress={() => onChangeState('joinType', '법인')}
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
              <DefaultInput placeholder="상호명을 입력해 주세요." />
            </InputBox>
            {/* 해당층 */}
            <LabelBox>
              <Typhograph type="NOTO" color="BLACK2" weight="BOLD">
                해당 층(시작/끝)
              </Typhograph>
            </LabelBox>
            <RowBox>
              <RowItem width="49%">
                <DefaultInput placeholder="시작 층" />
              </RowItem>
              <RowItem width="49%">
                <DefaultInput placeholder="끝 층" />
              </RowItem>
            </RowBox>
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
                items={sectorItems}
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
                items={state.stuffDivision === '공장' ? factoryBuildingPriceItems : basicBuildingPriceItems}
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
                items={state.stuffDivision === '공장' ? factoryFacilityPriceItems : basicFacilityPriceItems}
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
                items={inventoryPriceItems}
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
                items={selfPriceItems}
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
            onPress={() => null}
            isButton={false}
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
