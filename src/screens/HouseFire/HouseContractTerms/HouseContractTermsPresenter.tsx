import React from 'react';
import { BottomFixButton, CheckLabelButton, TermsList, Typhograph } from '@app/components';
import { screenWidth } from '@app/lib';
import { termsTermsSd1, termsTermsSd2 } from '@app/lib/html';
import { TermsModal, TermsPdf } from '@app/screens';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { HouseFireStateName, HouseFireStateTypes, TermsNames } from '@app/screens/HouseFire/HouseFireContainer';

type HouseContractTermsPresenterTypes = {
  state: HouseFireStateTypes;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  handlePreviousButton: () => void;
  onChangeTermsState: (name: TermsNames, value: any) => void;
  onClickTermsModalAgree: () => void;
  onClickTermsModalOpen: (name: any, html: any) => void;
  onClickAllCheck: (list: any, isActive: any) => void;
  submitNextButton: () => void;
  buttonTermsPdf: (name: any) => void;
};

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

const ButtonContainer = styled.View``;
const ButtonItemBox = styled.View`
  margin-top: 10px;
`;
const HelperText = styled.View`
  margin-top: 10px;
`;
const SectionContainer = styled.View`
  margin-top: 40px;
`;
const TermsListBox = styled.View`
  margin-top: 10px;
`;
const TermsListItemBox = styled.View``;
const TermsButtonBox = styled.View`
  margin-top: 20px;
`;
const SpacingBox = styled.View`
  height: 100px;
`;
function HouseContractTermsPresenter({
  state,
  submitNextButton,
  handlePreviousButton,
  onChangeTermsState,
  onChangeState,
  onClickTermsModalAgree,
  onClickTermsModalOpen,
  onClickAllCheck,
  buttonTermsPdf,
}: HouseContractTermsPresenterTypes) {
  const allCheckList1 = ['TERMSC_1', 'TERMSC_2', 'TERMSC_3', 'TERMSC_4', 'TERMSC_5', 'TERMSA_5', 'TERMSF_1'];
  const isActive1 =
    state?.terms?.TERMSC_1.isChecked === 1 &&
    state?.terms?.TERMSC_2.isChecked === 1 &&
    state?.terms?.TERMSC_3.isChecked === 1 &&
    state?.terms?.TERMSC_4.isChecked === 1 &&
    state?.terms?.TERMSC_5.isChecked === 1 &&
    state?.terms?.TERMSA_5.isChecked === 1 &&
    state?.terms?.TERMSF_1.isChecked === 1;
  const isActive2 =
    state?.terms?.TERMSE_1.isChecked === 1 &&
    state?.terms?.TERMSE_2.isChecked === 1 &&
    state?.terms?.TERMSE_3.isChecked === 1;
  return (
    <Container>
      <ContentsContainer>
        {/* 계약전 확인사항 */}
        <ButtonContainer>
          <TitleBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
              (필수) 계약전 확인사항
            </Typhograph>
          </TitleBox>
          <ButtonItemBox>
            <CheckLabelButton
              active={state.terms?.TERMSD_1?.isChecked === 0 ? false : true}
              onPress={() => onClickTermsModalOpen('TERMSD_1', termsTermsSd1())}
              iscenter
              title={state.terms?.TERMSD_1?.title}
            />
          </ButtonItemBox>
          <ButtonItemBox>
            <CheckLabelButton
              active={state.terms?.TERMSD_2?.isChecked === 0 ? false : true}
              onPress={() => onClickTermsModalOpen('TERMSD_2', termsTermsSd2())}
              iscenter
              title={state.terms?.TERMSD_2?.title}
            />
          </ButtonItemBox>
          <ButtonItemBox>
            <CheckLabelButton
              active={state.terms?.TERMSD_3?.isChecked === 0 ? false : true}
              onPress={() => buttonTermsPdf('TERMSD_3')}
              iscenter
              title={state.terms?.TERMSD_3?.title}
            />
          </ButtonItemBox>
          {/*<HelperText>*/}
          {/*  <Typhograph type="NOTO" color="WARING_RED" size={11}>*/}
          {/*    ※ 통합청약서 및 증권은 가입하신 이메일 주소로 발송됩니다.*/}
          {/*  </Typhograph>*/}
          {/*</HelperText>*/}
        </ButtonContainer>
        {/* (필수) 보험계약 체결, 이행을 위한 동의 */}

        <SectionContainer>
          <TitleBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
              (필수) 보험계약 체결, 이행을 위한 동의
            </Typhograph>
          </TitleBox>
          <TermsButtonBox>
            <CheckLabelButton
              onPress={() => onClickAllCheck(allCheckList1, isActive1)}
              active={isActive1}
              title="모두 동의하기"
              iscenter
            />
            <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={10}>
              * 항목을 클릭하시면 해당 내용을 확인하실 수 있습니다.
            </Typhograph>
          </TermsButtonBox>
          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSC_1}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>

          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSC_2}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>

          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSC_3}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>

          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSC_4}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>

          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSC_5}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>

          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSA_5}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>
          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSF_1}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>
        </SectionContainer>

        <SectionContainer>
          <TitleBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
              (필수) 결제 약관 동의
            </Typhograph>
          </TitleBox>
          <TermsButtonBox>
            <CheckLabelButton
              onPress={() => onClickAllCheck(['TERMSE_1', 'TERMSE_2', 'TERMSE_3'], isActive2)}
              title="모두 동의하기"
              iscenter
              active={isActive2}
            />
          </TermsButtonBox>
          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSE_1}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>

            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSE_2}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>

            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSE_3}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>
        </SectionContainer>

        <SectionContainer>
          <TitleBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
              (필수) 전자서명
            </Typhograph>
          </TitleBox>

          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSG_1}
                onChangeTermsState={onChangeTermsState}
                isButton={false}
              />
            </TermsListItemBox>
          </TermsListBox>
        </SectionContainer>
        <SpacingBox />
      </ContentsContainer>
      <TermsModal
        open={state?.termsModal}
        close={() => {
          onChangeState('termsModal', false);
        }}
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
        flag="meritz"
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

export default HouseContractTermsPresenter;
