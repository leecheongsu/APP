import React from 'react';
import { BottomFixButton, CheckLabelButton, FocusAwareStatusBar, FullLabel, Typhograph } from '@app/components';
import { useGlobalState } from '@app/context';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { CUMTOMER_NUMBER } from '@env';

type SecessionPresenterTypes = {
  handleClickButton: () => void;
  isAgree: boolean;
  handleSubmitButton: () => void;
};

const Container = styled.View``;

const InfoBox = styled.View`
  padding: 20px;
`;
const TextBox = styled.View`
  flex-direction: row;
  padding: 20px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.GRAY3};
`;

const ButtonContainer = styled.View`
  padding: 40px 20px 20px 20px;
`;
const ButtonTextBox = styled.View``;
const ButtonBox = styled.View`
  margin-top: 20px;
`;

function SecessionPresenter({ handleClickButton, isAgree, handleSubmitButton }: SecessionPresenterTypes) {
  const globalState = useGlobalState();
  const InfoText = `회원탈퇴를 신청하시기 전에 ${'\n'}안내 사항을 꼭 확인해 주세요.`;
  const dot = '\u2022';
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <FullLabel title={InfoText} />
      <Container>
        <InfoBox>
          <TextBox>
            <Typhograph type="NOTO" size={11} color="BLACK2">
              {dot}
              {'  '}
            </Typhograph>
            <Typhograph type="NOTO" size={14} color="BLACK2">
              사용하고 계신 아이디{' '}
              <Typhograph type="ROBOTO" weight="BOLD" color="BLACK3" size={16}>
                {globalState.user?.email}
              </Typhograph>{' '}
              는 탈퇴할 경우 재사용 및 복구가 불가능합니다.
            </Typhograph>
          </TextBox>

          <TextBox>
            <Typhograph type="NOTO" size={11} color="BLACK2">
              {dot}
              {'  '}
            </Typhograph>
            <Typhograph type="NOTO" size={14} color="BLACK2">
              탈퇴 후 회원정보 및 데이터는 복구할 수 없습니다.
            </Typhograph>
          </TextBox>

          <TextBox>
            <Typhograph type="NOTO" size={11} color="BLACK2">
              {dot}
              {'  '}
            </Typhograph>
            <Typhograph type="NOTO" size={14} color="BLACK2">
              계약정보는 고객센터{' '}
              <Typhograph type="ROBOTO" weight="BOLD" color="BLACK3" size={16}>
                {CUMTOMER_NUMBER}
              </Typhograph>{' '}
              으로 연락 주시면 확인이 가능합니다.
            </Typhograph>
          </TextBox>
        </InfoBox>
        <ButtonContainer>
          <ButtonTextBox>
            <Typhograph type="NOTO" color="BLACK3" weight="REGULAR" size={12}>
              회원탈퇴 후에는 아이디와 데이터는 복구할 수 없습니다.
            </Typhograph>
            <ButtonBox>
              <CheckLabelButton onPress={() => handleClickButton()} active={isAgree} title="동의합니다" iscenter />
            </ButtonBox>
          </ButtonTextBox>
        </ButtonContainer>
      </Container>
      <BottomFixButton
        index={1}
        leftTitle="이전"
        rightTitle="탈퇴"
        bottomRightPress={handleSubmitButton}
        bottomLeftPress={() => null}
        isKeybordView={false}
        loading={false}
      />
    </>
  );
}

export default SecessionPresenter;
