import React from 'react';
import { BottomFixButton, CheckLabelButton, TermsList, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { priceDot, recomendMasking, screenWidth } from '@app/lib';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import { TermsModal, TermsPdf } from '@app/screens';
import theme from '@app/style/theme';
import { useGlobalState } from '@app/context';
import { ScrollView } from 'react-native-gesture-handler';
import { wwTermsSd1, wwTermsSd2 } from '@app/lib/html';
import moment from 'moment';
type StormFloodTermsPresenterTypes = {
  state: StormFloodStateTypes;
  nextButton: () => void;
  onClickTermsModalOpen: (name: any, html: any) => void;
  handlePreviousButton: () => void;
  onChangeState: (name: StormFloodName, value: any) => void;
  termsChange: (name, value) => void;
  onClickAllCheck: (list: any, isActive: any) => void;
  onClickTermsModalAgree: () => void;
  buttonTermsPdf: (name) => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const ContentsContainer = styled.View`
  padding: 20px 15px;
`;

const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RowItem = styled.View`
  align-items: center;
  margin-top: 7px;
`;
const TitleBox = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.INPUT_GRAY};
  padding: 7px 0px;
`;
const PayInfoContainer = styled.View``;

const TableBox = styled.View`
  margin-top: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.INPUT_GRAY};
`;
const TableHeadBox = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${theme.color.INPUT_GRAY};
  background-color: ${theme.color.GRAY2};
`;
const TableHeadItem = styled.View`
  width: 50%;
  padding: 15px 0px;
`;
const TableBodyBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 5px;
  border-top-width: 1px;
  border-top-color: ${theme.color.INPUT_GRAY};
`;
const TableBodyItem = styled.View``;
const InfoBox = styled.View`
  margin-top: 20px;
`;

const RecommendUserBox = styled.View``;
const TermsBox = styled.View`
  padding: 20px 15px 100px 15px;
  background-color: ${theme.color.GRAY2};
`;
const ButtonBox = styled.View`
  margin-top: 15px;
`;
const Terms2Box = styled.View`
  margin-top: 30px;
`;

const TermsListItemBox = styled.View``;
const Divider = styled.View`
  border-bottom-width: 1px;
  margin: 10px 0px;
  border-bottom-color: ${theme.color.INPUT_GRAY};
`;
function StormFloodTermsPresenter({
  state,
  nextButton,
  onChangeState,
  onClickTermsModalOpen,
  handlePreviousButton,
  termsChange,
  onClickAllCheck,
  onClickTermsModalAgree,
  buttonTermsPdf,
}: StormFloodTermsPresenterTypes) {
  const globalState = useGlobalState();
  const isActive1 =
    state?.terms?.termse1.isChecked === 1 &&
    state?.terms?.termse2.isChecked === 1 &&
    state?.terms?.termse3.isChecked === 1 &&
    state?.terms?.termse4.isChecked === 1 &&
    state?.terms?.termse5.isChecked === 1 &&
    state?.terms?.termsf1.isChecked === 1 &&
    state?.terms?.termsf2.isChecked === 1 &&
    state?.terms?.termsf3.isChecked === 1 &&
    state?.terms?.termsf4.isChecked === 1;
  const now = new Date();
  const startDay = moment(now.setDate(now.getDate() + 7)).format('YYYY.MM.DD');
  const endDate = moment(now.setDate(now.getDate() + 364)).format('YYYY.MM.DD');

  return (
    <>
      <Container>
        <ScrollView>
          <ContentsContainer>
            <PayInfoContainer>
              <TitleBox>
                <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                  결제 정보
                </Typhograph>
              </TitleBox>
              {/* 상품명  */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    상품명
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    인슈로보 풍수해Ⅵ보험
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 보험사  */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험사
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.selectInsuCompany}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 상품명  */}
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
              {/* 보험기간  */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험기간
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {startDay} ~ {endDate}(24:00)
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 총보험료  */}
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
              {/* 정부 부담 보험료  */}
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
              {/* 지자체 부담 보험료  */}
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
              {/* 총보험료  */}
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
            </PayInfoContainer>
            <TableBox>
              <TableHeadBox>
                <TableHeadItem style={{ borderRightWidth: 1, borderRightColor: theme.color.WHITE }}>
                  <Typhograph type="NOTO" color="BLUE" weight="BOLD" style={{ textAlign: 'center' }}>
                    담보명
                  </Typhograph>
                </TableHeadItem>
                <TableHeadItem>
                  <Typhograph type="NOTO" color="BLUE" weight="BOLD" style={{ textAlign: 'center' }}>
                    보험가입금액
                  </Typhograph>
                </TableHeadItem>
              </TableHeadBox>
              {/*  풍수해(건물)  */}
              <TableBodyBox>
                <TableBodyItem>
                  <Typhograph type="NOTO" color="GRAY">
                    풍수해(건물)
                  </Typhograph>
                </TableBodyItem>
                <TableBodyItem>
                  <Typhograph type="ROBOTO" color="BLACK2" size={16}>
                    {state?.selectBuildingPrice?.val_name}
                    <Typhograph type="NOTO" color="GRAY">
                      {state?.selectBuildingPrice?.val_name === undefined ? '-' : '원'}
                    </Typhograph>
                  </Typhograph>
                </TableBodyItem>
              </TableBodyBox>
              {/*  풍수해(시설 및 집기)  */}
              <TableBodyBox>
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
              </TableBodyBox>
              {/*  재고자산  */}
              <TableBodyBox>
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
              </TableBodyBox>
              {/*  자기부담금  */}
              <TableBodyBox>
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
              </TableBodyBox>
            </TableBox>
            <InfoBox>
              <TitleBox>
                <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                  보험계약자 / 피보험자 정보
                </Typhograph>
              </TitleBox>
              {/* 성명/상호명  */}
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
              {/* email */}
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
              {/* mobile */}
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
              {/* 주민(사업자)등록번호*/}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    주민(사업자)등록번호
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2" style={{ marginRight: 5 }}>
                    {globalState?.user?.jumina} - {globalState?.user?.sex}
                    <Typhograph type="NOTO" color="GRAY3" size={10}>
                      ●●●●●●
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>

              {/* 소유구분 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험목적물{'\n'}소유구분
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.possessionDivision}
                  </Typhograph>
                </RowItem>
              </RowBox>
              {/* 보험목적물 소재지 */}
              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY">
                    보험 목적물 소재지
                  </Typhograph>
                </RowItem>
                <RowItem style={{ width: '50%' }}>
                  <Typhograph type="NOTO" color="BLACK2">
                    {state?.selectAddress?.address}
                  </Typhograph>
                </RowItem>
              </RowBox>
            </InfoBox>
            {globalState.recommendUser !== undefined && (
              <RecommendUserBox>
                <TitleBox>
                  <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                    추천인 정보
                  </Typhograph>
                </TitleBox>
                <RowBox>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY">
                      {globalState.recommendUser.company}
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY">
                      {recomendMasking(globalState?.recommendUser?.mobile)}
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY">
                      {globalState.recommendUser.name}
                    </Typhograph>
                  </RowItem>
                </RowBox>
              </RecommendUserBox>
            )}
          </ContentsContainer>
          <TermsBox>
            <TitleBox>
              <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                계약전 확인사항
              </Typhograph>
            </TitleBox>
            <ButtonBox>
              <CheckLabelButton
                active={state.terms?.termsd1?.isChecked === 0 ? false : true}
                onPress={() => onClickTermsModalOpen('termsd1', wwTermsSd1())}
                iscenter
                title={state.terms?.termsd1?.title}
              />
            </ButtonBox>
            <ButtonBox>
              <CheckLabelButton
                active={state.terms?.termsd2?.isChecked === 0 ? false : true}
                onPress={() => onClickTermsModalOpen('termsd2', wwTermsSd2())}
                iscenter
                title={state.terms?.termsd2?.title}
              />
            </ButtonBox>
            <ButtonBox>
              <CheckLabelButton
                active={state.terms?.termsd3?.isChecked === 0 ? false : true}
                onPress={() => buttonTermsPdf('termsd3')}
                iscenter
                title={state.terms?.termsd3?.title}
              />
            </ButtonBox>
            <Typhograph type="NOTO" color="WARING_RED" size={10} style={{ marginTop: 10 }}>
              ※ 통합청약서 및 증권은 가입하신 이메일 주소로 발송됩니다.
            </Typhograph>
            <Terms2Box>
              <TitleBox>
                <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                  계약의 체결, 이행 등을 위한 개인정보처리 동의
                </Typhograph>
              </TitleBox>
              <ButtonBox>
                <CheckLabelButton
                  iscenter
                  active={isActive1}
                  onPress={() =>
                    onClickAllCheck(
                      [
                        'termse1',
                        'termse2',
                        'termse3',
                        'termse4',
                        'termse5',
                        'termsf1',
                        'termsf2',
                        'termsf3',
                        'termsf4',
                      ],
                      isActive1
                    )
                  }
                  title="모두 동의하기"
                />
              </ButtonBox>
              <Typhograph type="NOTO" color="GRAY" size={10} style={{ marginTop: 10, marginBottom: 20 }}>
                * 항목을 클릭하시면 해당 내용을 확인하실 수 있습니다.
              </Typhograph>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termse1}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termse2}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termse3}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termse4}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termse5}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
              <Divider />
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termsf1}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termsf2}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termsf3}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termsf4}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
            </Terms2Box>
          </TermsBox>
        </ScrollView>
        <TermsModal
          open={state?.termsModal}
          close={() => onChangeState('termsModal', false)}
          html={state?.termsHtml}
          onPress={onClickTermsModalAgree}
          isButton
        />
        <TermsPdf
          open={state.termsPdf}
          close={() => {
            onChangeState('termsPdf', false);
          }}
          onPress={onClickTermsModalAgree}
          isButton
          flag="hyundai"
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

export default StormFloodTermsPresenter;
