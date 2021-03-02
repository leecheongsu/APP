import React from 'react';
import { BottomFixButton, CheckLabelButton, TermsList, Typhograph } from '@app/components';
import { screenWidth } from '@app/lib';
import { TermsModal } from '@app/screens';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { HouseFireStateName, HouseFireStateTypes, TermsNames } from '@app/screens/HouseFire/HouseFireContainer';

type HouseTermsUsePresenterTypes = {
  state: HouseFireStateTypes;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  handlePreviousButton: () => void;
  onChangeTermsState: (name: TermsNames, value: any) => void;
  onClickTermsModalAgree: () => void;
  onClickTermsModalOpen: (name: any, html: any) => void;
  onClickAllCheck: (list: any, isActive: any) => void;
  submitNextButton: () => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
  padding-bottom: 65px;
`;
const ContentsContainer = styled.ScrollView`
  padding: 20px;
`;
const RequireTermsBox = styled.View``;
const TermsTitleBox = styled.View`
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;
const TermsButtonBox = styled.View`
  margin-top: 20px;
`;
const TermsListBox = styled.View`
  margin-top: 10px;
`;
const TermsListItemBox = styled.View``;
const ChoiceTermsBox = styled.View`
  margin-top: 40px;
`;
function HouseTermsUsePresenter({
  state,
  submitNextButton,
  handlePreviousButton,
  onChangeTermsState,
  onChangeState,
  onClickTermsModalAgree,
  onClickTermsModalOpen,
  onClickAllCheck,
}: HouseTermsUsePresenterTypes) {
  const isActive1 =
    state?.terms?.TERMSA_1.isChecked === 1 &&
    state?.terms?.TERMSA_2.isChecked === 1 &&
    state?.terms?.TERMSA_3.isChecked === 1 &&
    state?.terms?.TERMSA_4.isChecked === 1;
  const isActive2 =
    state?.terms?.TERMSB_1.isChecked === 1 &&
    state?.terms?.TERMSB_2.isChecked === 1 &&
    state?.terms?.TERMSB_3.isChecked === 1;
  return (
    <Container>
      <ContentsContainer>
        <RequireTermsBox>
          <TermsTitleBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={13}>
              (필수) 가입 설계를 위한 개인정보처리에 대한 동의
            </Typhograph>
          </TermsTitleBox>
          <TermsButtonBox>
            <CheckLabelButton
              onPress={() => onClickAllCheck(['TERMSA_1', 'TERMSA_2', 'TERMSA_3', 'TERMSA_4'], isActive1)}
              title="모두 동의하기"
              iscenter
              active={isActive1}
            />
            <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={10}>
              * 항목을 클릭하시면 해당 내용을 확인하실 수 있습니다.
            </Typhograph>
          </TermsButtonBox>
          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSA_1}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>
          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSA_2}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>
          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSA_3}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>
          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSA_4}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>
        </RequireTermsBox>

        <ChoiceTermsBox>
          <TermsTitleBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={13}>
              (선택) 상품소개 등에 관한 개인정보처리에 대한 동의
            </Typhograph>
          </TermsTitleBox>
          <TermsButtonBox>
            <CheckLabelButton
              onPress={() => onClickAllCheck(['TERMSB_1', 'TERMSB_2', 'TERMSB_3'], isActive2)}
              title="모두 동의하기"
              iscenter
              active={isActive2}
            />
            <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={10}>
              * 항목을 클릭하시면 해당 내용을 확인하실 수 있습니다.
            </Typhograph>
          </TermsButtonBox>
          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSB_1}
                onChangeTermsState={onChangeTermsState}
                isButton
              />
            </TermsListItemBox>
          </TermsListBox>
          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSB_2}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>
          <TermsListBox>
            <TermsListItemBox>
              <TermsList
                onClickTermsModalOpen={onClickTermsModalOpen}
                item={state.terms.TERMSB_3}
                onChangeTermsState={onChangeTermsState}
              />
            </TermsListItemBox>
          </TermsListBox>
        </ChoiceTermsBox>
      </ContentsContainer>
      <TermsModal
        open={state?.termsModal}
        close={() => onChangeState('termsModal', false)}
        html={state?.termsHtml}
        onPress={onClickTermsModalAgree}
        isButton
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

export default HouseTermsUsePresenter;
