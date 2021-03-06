import React from 'react';
import { BottomFixButton, CloseButton, FocusAwareStatusBar, Typhograph } from '@app/components';
import { useGlobalState } from '@app/context';
import { getInsuText, priceDot, recomendMasking, screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { Platform } from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';

type InsuCertificatePresenterTypes = {
  state: any;
  open: boolean;
  close: () => void;
  isButton: boolean;
  insuPrice: any;
};

const ContentsBox = styled.View`
  width: ${screenWidth()}px;
  height: 100%;
`;
const Header = styled.View`
  padding: ${Platform.OS === 'ios' ? '50px 10px 10px 10px' : '10px 10px 10px 10px'};
  background-color: ${theme.color.WHITE};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.INPUT_GRAY};
  justify-content: center;
  flex-direction: row;
`;

const HeaderTitleBox = styled.View``;

const TitleBox = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.INPUT_GRAY};
  padding: 7px 0px;
`;
const BackButtonBox = styled.View`
  position: absolute;
  right: 0px;
  top: 50px;
`;
const BodyBox = styled.ScrollView`
  background-color: ${theme.color.WHITE};
  padding: 0px 15px 20px 15px;
`;
const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const RowItem = styled.View`
  align-items: center;
`;
const InfoBox = styled.View`
  margin-top: 40px;
`;
const RecommendUserBox = styled.View`
  margin-top: 20px;
`;
const PaddingBox = styled.View`
  height: 100px;
`;
const TableBox = styled.View`
  margin-top: 20px;
`;
const TableHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 1px;
  border-top-color: ${theme.color.BORDER_GRAY};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
  background-color: ${theme.color.GRAY2};
`;
const TableHeaderItem = styled.View`
  width: 50%;
  justify-content: center;
  align-items: center;
  border-right-width: ${(props: any) => (props.isBorder ? '1px' : '0px')};
  border-right-color: ${theme.color.WHITE};
`;
const TableBody = styled.View`
  padding: 10px 0px;
`;
const TableBodyItemBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;
const TableBodyItem = styled.View`
  padding: 0px 10px;
`;

function InsuCertificatePresenter({ state, open, close, isButton = true, insuPrice }: InsuCertificatePresenterTypes) {
  const globalState = useGlobalState();
  const insuEndDateYear = Number(state?.contractInsuInfo?.insDate?.slice(0, 4)) + 1;
  const insuEndDateMonth = state?.contractInsuInfo?.insDate?.slice(5, 7);
  const insuEndDateDay = Number(state?.contractInsuInfo?.insDate?.slice(8)) - 1;
  const filnalInsuEndDateDay =
    String(insuEndDateDay)?.length === 1 ? '0' + String(insuEndDateDay) : String(insuEndDateDay);
  const insuEndDate = insuEndDateYear + '-' + insuEndDateMonth + '-' + filnalInsuEndDateDay;
  const selectInsu = state?.selectAddress?.premiums?.filter((item) => {
    return item.aply_yn === 'Y' && item.already_group_ins === state?.selectAddress.already_group_ins;
  });
  const now = new Date();
  const startDay = moment(now.setDate(now.getDate() + 7)).format('YYYY.MM.DD');
  const endDate = moment(now.setDate(now.getDate() + 364)).format('YYYY.MM.DD');
  const isSede = state?.selectType === 'S';
  return globalState?.insuType === 'ww' ? (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Modal isVisible={open} style={{ padding: 0, margin: 0 }}>
        <ContentsBox>
          <Header>
            <HeaderTitleBox>
              <Typhograph type="NOTO" color="BLACK" weight="BOLD" size={16}>
                보험 가입 증명원
              </Typhograph>
            </HeaderTitleBox>
            <BackButtonBox>
              <CloseButton onPress={() => close()} />
            </BackButtonBox>
          </Header>
          <BodyBox>
            <InfoBox>
              {/* 보험계약자 정보 */}
              <TitleBox>
                <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                  보험계약자 정보
                </Typhograph>
              </TitleBox>
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    성명/상호명
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {globalState?.user?.name}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 이메일 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    이메일
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {globalState?.user?.email}
                  </Typhograph>
                </RowItem>
              </RowBox>

              {/* 보험기간 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험기간
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {startDay} ~ {endDate} (24:00)
                  </Typhograph>
                </RowItem>
              </RowBox>

              {/* 연락처 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    연락처
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {globalState?.user?.mobile}
                  </Typhograph>
                </RowItem>
              </RowBox>

              {/* 주민(사업자)등록번호 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    주민(사업자)등록번호
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {globalState?.user?.jumina} - {globalState?.user?.sex}
                    <Typhograph type="NOTO" color="GRAY3" size={11}>
                      ●●●●●●
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>
            </InfoBox>
            {/* 피보험자 정보 */}
            <InfoBox>
              <TitleBox>
                <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                  피보험자 정보
                </Typhograph>
              </TitleBox>
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    성명/상호명
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {globalState?.user?.name}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 이메일 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    생년월일
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {globalState?.user?.jumina}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 보험기간 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    사업자등록번호
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    -
                  </Typhograph>
                </RowItem>
              </RowBox>

              {/* 연락처 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험목적물 소유자
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.possessionDivision}
                  </Typhograph>
                </RowItem>
              </RowBox>

              {/* 주민(사업자)등록번호 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험목적물 소재지
                  </Typhograph>
                </RowItem>
                <RowItem style={{ width: '50%' }}>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.selectAddress?.address}
                  </Typhograph>
                </RowItem>
              </RowBox>
            </InfoBox>
            {/* 추천인 정보 */}
            {globalState.recommendUser !== undefined && (
              <InfoBox>
                <RecommendUserBox>
                  <TitleBox>
                    <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
                      추천인 정보
                    </Typhograph>
                  </TitleBox>
                  <RowBox>
                    <RowItem>
                      <Typhograph type="NOTO" color="GRAY">
                        {globalState.recommendUser?.company}
                      </Typhograph>
                    </RowItem>
                    <RowItem>
                      <Typhograph type="NOTO" color="GRAY">
                        {recomendMasking(globalState.recommendUser?.mobile)}
                      </Typhograph>
                    </RowItem>
                    <RowItem>
                      <Typhograph type="NOTO" color="GRAY">
                        {globalState.recommendUser?.name}
                      </Typhograph>
                    </RowItem>
                  </RowBox>
                </RecommendUserBox>
              </InfoBox>
            )}
            <InfoBox>
              <TitleBox>
                <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                  보험 가입 정보
                </Typhograph>
              </TitleBox>

              {/* 상품명 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    상품명
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.selectAddress?.product?.p_name}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 보험사 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험사
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.selectAddress?.product?.inscompany}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 상품명 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    상품번호
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.selectAddress?.quote_no}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 보험기간 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험기간
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {startDay} ~ {endDate} (24:00)
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 총보험료 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    총보험료
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                    {priceDot(state?.resultPrice?.tpymPrem)}
                    <Typhograph type="NOTO" color="GRAY">
                      원
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 정부 부담 보험료 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    정부 부담 보험료
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                    {priceDot(state?.resultPrice?.govtPrem)}
                    <Typhograph type="NOTO" color="GRAY">
                      원
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 지자체 부담 보험료 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    지자체 부담 보험료
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                    {priceDot(state?.resultPrice?.lgovtPrem)}
                    <Typhograph type="NOTO" color="GRAY">
                      원
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 결제 보험료 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    결제 보험료
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="ROBOTO" color="SKYBLUE" size={16}>
                    {priceDot(state?.resultPrice?.perPrem)}
                    <Typhograph type="NOTO" color="GRAY">
                      원
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>
            </InfoBox>
            <InfoBox>
              {/* 보장내용,보장범위,보험료 */}
              <TableBox>
                <TableHeader>
                  <TableHeaderItem isBorder>
                    <Typhograph type="NOTO" color="BLUE" weight="BOLD" style={{ marginTop: 10, marginBottom: 10 }}>
                      담보명
                    </Typhograph>
                  </TableHeaderItem>
                  <TableHeaderItem isBorder={false}>
                    <Typhograph type="NOTO" color="BLUE" weight="BOLD">
                      보험가입금액
                    </Typhograph>
                  </TableHeaderItem>
                </TableHeader>

                <TableBody>
                  {/*  풍수해(건물)  */}
                  <TableBodyItemBox>
                    <TableBodyItem>
                      <Typhograph type="NOTO" color="GRAY">
                        풍수해(건물)
                      </Typhograph>
                    </TableBodyItem>
                    <TableBodyItem>
                      <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                        {state?.selectBuildingPrice?.val_name}
                        <Typhograph type="NOTO" color="GRAY">
                          원
                        </Typhograph>
                      </Typhograph>
                    </TableBodyItem>
                  </TableBodyItemBox>
                  {/*  풍수해(시설 및 집기)  */}
                  <TableBodyItemBox>
                    <TableBodyItem>
                      <Typhograph type="NOTO" color="GRAY">
                        풍수해(시설 및 집기)
                      </Typhograph>
                    </TableBodyItem>
                    <TableBodyItem>
                      <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                        {state?.selectFacilityprice?.val_name}
                        <Typhograph type="NOTO" color="GRAY">
                          원
                        </Typhograph>
                      </Typhograph>
                    </TableBodyItem>
                  </TableBodyItemBox>
                  {/*  재고자산  */}
                  <TableBodyItemBox>
                    <TableBodyItem>
                      <Typhograph type="NOTO" color="GRAY">
                        재고자산
                      </Typhograph>
                    </TableBodyItem>
                    <TableBodyItem>
                      <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                        {state?.selectInventoryPrice?.val_name}
                        <Typhograph type="NOTO" color="GRAY">
                          {state?.selectInventoryPrice?.val_name === '미가입' ? '' : '원'}
                        </Typhograph>
                      </Typhograph>
                    </TableBodyItem>
                  </TableBodyItemBox>
                  {/*  자기부담금  */}
                  <TableBodyItemBox>
                    <TableBodyItem>
                      <Typhograph type="NOTO" color="GRAY">
                        자기부담금
                      </Typhograph>
                    </TableBodyItem>
                    <TableBodyItem>
                      <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                        {state?.selectSelfPrice?.val_name}
                        <Typhograph type="NOTO" color="GRAY">
                          원
                        </Typhograph>
                      </Typhograph>
                    </TableBodyItem>
                  </TableBodyItemBox>
                </TableBody>
              </TableBox>
            </InfoBox>
            <PaddingBox />
          </BodyBox>
        </ContentsBox>
        {isButton && (
          <BottomFixButton index={1} rightTitle="확인" bottomRightPress={() => close()} bottomLeftPress={() => null} />
        )}
      </Modal>
    </>
  ) : (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Modal isVisible={open} style={{ padding: 0, margin: 0 }}>
        <ContentsBox>
          <Header>
            <HeaderTitleBox>
              <Typhograph type="NOTO" color="BLACK" weight="BOLD" size={16}>
                보험 가입 증명원
              </Typhograph>
            </HeaderTitleBox>
            <BackButtonBox>
              <CloseButton onPress={() => close()} />
            </BackButtonBox>
          </Header>
          <BodyBox>
            <InfoBox>
              {/* 보험계약자 정보 */}
              <TitleBox>
                <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                  보험계약자 정보
                </Typhograph>
              </TitleBox>
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    성명/상호명
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {globalState?.user?.name}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 이메일 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    이메일
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {globalState?.user?.email}
                  </Typhograph>
                </RowItem>
              </RowBox>

              {/* 보험기간 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험기간
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.contractInsuInfo?.insDate} ~ {insuEndDate} (24:00)
                  </Typhograph>
                </RowItem>
              </RowBox>

              {/* 연락처 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    연락처
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {globalState?.user?.mobile}
                  </Typhograph>
                </RowItem>
              </RowBox>

              {/* 주민(사업자)등록번호 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    주민(사업자)등록번호
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {globalState?.user?.jumina} - {globalState?.user?.sex}
                    <Typhograph type="NOTO" color="GRAY3" size={11}>
                      ●●●●●●
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>
            </InfoBox>
            {/* 피보험자 정보 */}
            <InfoBox>
              <TitleBox>
                <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                  피보험자 정보
                </Typhograph>
              </TitleBox>
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    성명/상호명
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.contractInsuInfo?.name}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 이메일 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    생년월일/사업자등록번호
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.contractInsuInfo?.jumin?.slice(0, 6)}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 연락처 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험목적물 소유자
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.contractInsuInfo?.owner === 'o' ? '자가' : '임차'}
                  </Typhograph>
                </RowItem>
              </RowBox>

              {/* 보험목적물 소재지 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험목적물 소재지
                  </Typhograph>
                </RowItem>
                <RowItem style={{ width: '50%' }}>
                  <Typhograph type="NOTO" color="BLACK2">
                    {isSede ? `${state?.selectAddress?.address}` : state?.selectAddress?.address}
                  </Typhograph>
                </RowItem>
              </RowBox>
            </InfoBox>
            {/* 추천인 정보 */}
            {globalState.recommendUser !== undefined && (
              <InfoBox>
                <RecommendUserBox>
                  <TitleBox>
                    <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
                      추천인 정보
                    </Typhograph>
                  </TitleBox>
                  <RowBox>
                    <RowItem>
                      <Typhograph type="NOTO" color="GRAY">
                        {globalState.recommendUser?.company}
                      </Typhograph>
                    </RowItem>
                    <RowItem>
                      <Typhograph type="NOTO" color="GRAY">
                        {recomendMasking(globalState.recommendUser?.mobile)}
                      </Typhograph>
                    </RowItem>
                    <RowItem>
                      <Typhograph type="NOTO" color="GRAY">
                        {globalState.recommendUser?.name}
                      </Typhograph>
                    </RowItem>
                  </RowBox>
                </RecommendUserBox>
              </InfoBox>
            )}
            <InfoBox>
              <TitleBox>
                <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                  보험 가입 정보
                </Typhograph>
              </TitleBox>
              {/* 상품명 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    상품명
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.selectAddress?.product?.p_name}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 보험사 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험사
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.selectAddress?.product?.inscompany}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 상품명 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    상품번호
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.selectAddress?.quote_no}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 보험기간 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험기간
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.contractInsuInfo?.insDate} ~ {insuEndDate} (24:00)
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 총보험료 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    총보험료
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                    0
                    <Typhograph type="NOTO" color="GRAY">
                      원
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 정부 부담 보험료 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    정부 부담 보험료
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                    {insuPrice}
                    <Typhograph type="NOTO" color="GRAY">
                      원
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 지자체 부담 보험료 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    지자체 부담 보험료
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                    0
                    <Typhograph type="NOTO" color="GRAY">
                      원
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 결제 보험료 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    결제 보험료
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="ROBOTO" color="SKYBLUE" size={16}>
                    {insuPrice}
                    <Typhograph type="NOTO" color="GRAY">
                      원
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>
            </InfoBox>
            <InfoBox>
              {/* 보장내용,보장범위,보험료 */}
              <TableBox>
                <TableHeader>
                  <TableHeaderItem isBorder>
                    <Typhograph type="NOTO" color="BLUE" weight="BOLD" style={{ marginTop: 10, marginBottom: 10 }}>
                      담보명
                    </Typhograph>
                  </TableHeaderItem>
                  <TableHeaderItem isBorder={false}>
                    <Typhograph type="NOTO" color="BLUE" weight="BOLD">
                      보험가입금액
                    </Typhograph>
                  </TableHeaderItem>
                </TableHeader>

                <TableBody>
                  {selectInsu?.map((item, index) => {
                    return (
                      <TableBodyItemBox key={index}>
                        <TableBodyItem>
                          <Typhograph type="NOTO" size={12}>
                            {getInsuText(item.item_id)}
                          </Typhograph>
                        </TableBodyItem>
                        <TableBodyItem>
                          <Typhograph type="NOTO" size={12}>
                            {priceDot(item.ins_amt)}원
                          </Typhograph>
                        </TableBodyItem>
                      </TableBodyItemBox>
                    );
                  })}
                </TableBody>
              </TableBox>
            </InfoBox>
            <PaddingBox />
          </BodyBox>
        </ContentsBox>
        {isButton && (
          <BottomFixButton index={1} rightTitle="확인" bottomRightPress={() => close()} bottomLeftPress={() => null} />
        )}
      </Modal>
    </>
  );
}

export default InsuCertificatePresenter;
