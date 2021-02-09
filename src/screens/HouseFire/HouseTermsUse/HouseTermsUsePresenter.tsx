import { BottomFixButton, CheckLabelButton, TermsList, Typhograph } from '@app/components';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React from 'react';

const Container = styled.View`
  width: ${screenWidth()}px;
  padding-bottom: 65px;
`;
const ContentsContainer = styled.ScrollView`
  padding: 20px;
`;
const RequireTermsBox = styled.View``;
const RequireTermsTitleBox = styled.View`
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;
const RequireTermsButtonBox = styled.View`
  margin-top: 20px;
`;
const TermsListBox = styled.View`
  margin-top: 20px;
`;
const TermsListItemBox = styled.View``;
function HouseTermsUsePresenter({ state, handleNextButton, handlePreviousButton }) {
  return (
    <Container>
      <ContentsContainer>
        <RequireTermsBox>
          <RequireTermsTitleBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD">
              (필수) 가입 설계를 위한 개인정보처리에 대한 동의
            </Typhograph>
          </RequireTermsTitleBox>
          <RequireTermsButtonBox>
            <CheckLabelButton onPress={() => console.log(1)} title="모두 동의하기" iscenter />
            <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={10}>
              * 항목을 클릭하시면 해당 내용을 확인하실 수 있습니다.
            </Typhograph>
          </RequireTermsButtonBox>
          <TermsListBox>
            <TermsListItemBox>
              <TermsList title="개인(신용)정보의 수집/이용에 관한 사항" />
            </TermsListItemBox>
          </TermsListBox>
        </RequireTermsBox>
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
  );
}

export default HouseTermsUsePresenter;
