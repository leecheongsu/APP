import { BottomFixButton, Typhograph } from '@app/components';
import { useGlobalState } from '@app/context';
import { getInsuText, priceDot, recomendMasking, screenWidth } from '@app/lib';
import { HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React from 'react';
import { StyleSheet } from 'react-native';

type HouseConfirmPresenterTypes = {
  state: HouseFireStateTypes;
  submitNextButton: () => void;
  insuPrice: any;
  selectInsu: any;
  handlePreviousButton: () => void;
};

const styles = StyleSheet.create({
  left: {
    width: '30%',
  },
  right: {
    width: '70%',
  },
});

const Container = styled.View`
  width: ${screenWidth()}px;
`;
const ContentsContainer = styled.ScrollView`
  padding: 20px;
`;
const TitleBox = styled.View`
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;

const InfoBox = styled.View``;
const RowBox = styled.View`
  margin-top: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RowItem = styled.View``;
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
  width: 33%;
  justify-content: center;
  align-items: center;
  border-right-width: ${(props: any) => (props.isBorder ? '1px' : '0px')};
  border-right-color: ${theme.color.WHITE};
`;
const TableBody = styled.View`
  padding: 10px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;
const TableBodyItemBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const TableBodyItem = styled.View`
  width: 33%;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
`;

const ContractInfoBox = styled.View`
  margin-top: 20px;
`;

const PinsuInfoBox = styled.View`
  margin-top: 20px;
`;

const RecommendUserBox = styled.View`
  margin-top: 20px;
`;

const SpacingBox = styled.View`
  height: 150px;
`;

function HouseConfirmPresenter({
  state,
  submitNextButton,
  handlePreviousButton,
  insuPrice,
  selectInsu,
}: HouseConfirmPresenterTypes) {
  const globalState = useGlobalState();
  const insuEndDateYear = Number(state?.contractInsuInfo?.insDate?.slice(0, 4)) + 1;
  const insuEndDateMonth = state?.contractInsuInfo?.insDate?.slice(5, 7);
  const insuEndDateDay = Number(state?.contractInsuInfo?.insDate?.slice(8)) - 1;
  const filnalInsuEndDateDay =
    String(insuEndDateDay)?.length === 1 ? '0' + String(insuEndDateDay) : String(insuEndDateDay);
  const insuEndDate = insuEndDateYear + '-' + insuEndDateMonth + '-' + filnalInsuEndDateDay;
  const isSede = state?.selectType === 'S';
  return (
    <Container>
      <ContentsContainer>
        {/* 결제정보 */}
        <InfoBox>
          <TitleBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
              결제정보
            </Typhograph>
          </TitleBox>
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

          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                보험기간
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="NOTO" color="BLACK2" numberOfLines={2} style={{ width: '90%', textAlign: 'right' }}>
                {state?.contractInsuInfo?.insDate} (24:00) ~ {insuEndDate} (24:00)
              </Typhograph>
            </RowItem>
          </RowBox>

          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                보험료
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="ROBOTO" color="BLACK2">
                {insuPrice} 원
              </Typhograph>
            </RowItem>
          </RowBox>

          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                할인금액
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="ROBOTO" color="BLACK2">
                0 원
              </Typhograph>
            </RowItem>
          </RowBox>

          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                총 결제 보험료
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="ROBOTO" color="SKYBLUE">
                {insuPrice}{' '}
                <Typhograph type="ROBOTO" color="BLACK2">
                  원
                </Typhograph>
              </Typhograph>
            </RowItem>
          </RowBox>
        </InfoBox>
        {/* 보장내용,보장범위,보험료 */}
        <TableBox>
          <TableHeader>
            <TableHeaderItem isBorder>
              <Typhograph type="NOTO" color="BLUE" weight="BOLD" style={{ marginTop: 10, marginBottom: 10 }}>
                보장내용
              </Typhograph>
            </TableHeaderItem>
            <TableHeaderItem isBorder>
              <Typhograph type="NOTO" color="BLUE" weight="BOLD">
                보장범위
              </Typhograph>
            </TableHeaderItem>
            <TableHeaderItem isBorder={false}>
              <Typhograph type="NOTO" color="BLUE" weight="BOLD">
                보험료
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
                  <TableBodyItem>
                    <Typhograph type="NOTO" size={12}>
                      {priceDot(item.premium)}원
                    </Typhograph>
                  </TableBodyItem>
                </TableBodyItemBox>
              );
            })}
          </TableBody>
        </TableBox>
        {/* 보험계약자 정보 */}
        <ContractInfoBox>
          <TitleBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
              보험 계약자 정보
            </Typhograph>
          </TitleBox>

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

          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                생년월일(사업자) {'\n'}번호
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
        </ContractInfoBox>
        {/* 피보험자 정보 */}
        <PinsuInfoBox>
          <TitleBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
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

          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                생년월일(사업자) {'\n'}번호
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="NOTO" color="BLACK2">
                {state?.contractInsuInfo?.jumin?.slice(0, 6)}
              </Typhograph>
            </RowItem>
          </RowBox>
          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                연락처
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="NOTO" color="BLACK2">
                {state?.contractInsuInfo?.mobile}
              </Typhograph>
            </RowItem>
          </RowBox>

          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                보험목적물{'\n'}소유구분
              </Typhograph>
            </RowItem>
            <RowItem>
              <Typhograph type="NOTO" color="BLACK2">
                {state?.contractInsuInfo?.owner === 'o' ? '자가' : '임차'}
              </Typhograph>
            </RowItem>
          </RowBox>

          <RowBox>
            <RowItem>
              <Typhograph type="NOTO" color="GRAY">
                보험목적물{'\n'}소재지
              </Typhograph>
            </RowItem>
            <RowItem style={styles.right}>
              <Typhograph type="NOTO" color="BLACK2" style={{ textAlign: 'right' }}>
                {isSede ? `${state?.selectAddress?.address}` : state?.selectAddress?.address}
              </Typhograph>
            </RowItem>
          </RowBox>
        </PinsuInfoBox>
        {/* 추천인 정보 */}
        {globalState.recommendUser !== undefined && (
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
        )}
        <SpacingBox />
      </ContentsContainer>
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

export default HouseConfirmPresenter;
