import React from 'react';
import { BottomFixButton, CheckLabelButton, DefaultInput, IconButton, TermsList, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { recomendMasking, screenWidth } from '@app/lib';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import { TermsModal } from '@app/screens';
import theme from '@app/style/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform, Image } from 'react-native';
import { useGlobalState } from '@app/context';
import { useNavigation } from '@react-navigation/native';
import { insuIcon } from '@app/assets';
import moment from 'moment';

type StormFloodInputPresenterTypes = {
  state: StormFloodStateTypes;
  nextButton: () => void;
  onClickTermsModalOpen: (name: any, html: any) => void;
  handlePreviousButton: () => void;
  onChangeState: (name: StormFloodName, value: any) => void;
  juminb: any;
  onDeleteRecommedUserButton: () => void;
  termsChange: (name: 'terms1' | 'terms2' | 'terms3' | 'terms4' | 'terms5' | 'termsb1', value: any) => void;
  onClickAllCheck: any;
  onClickTermsModalAgree: any;
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
  margin-bottom: 13px;
`;
const InfoTextBox = styled.View`
  margin-top: 10px;
`;

const ButtonBox = styled.View`
  margin: 20px 0px;
`;
const RecommendListBox = styled.View`
  padding: 0px 10px;
  border-top-width: 1px;
  border-top-color: ${theme.color.BORDER_GRAY};
`;
const TermsBox = styled.View`
  padding: 20px 15px 100px 15px;
  background-color: ${theme.color.GRAY2};
`;
const TermsListBox = styled.View`
  margin-top: 10px;
`;
const TermsListItemBox = styled.View``;
const PaddingBox = styled.View``;
function StormFloodInputPresenter({
  state,
  nextButton,
  onChangeState,
  onClickTermsModalOpen,
  handlePreviousButton,
  onDeleteRecommedUserButton,
  juminb,
  termsChange,
  onClickAllCheck,
  onClickTermsModalAgree,
}: StormFloodInputPresenterTypes) {
  const globalState = useGlobalState();
  const navigation = useNavigation();
  const isActive1 =
    state?.terms?.termsb1.isChecked === 1 &&
    state?.terms?.termsb2.isChecked === 1 &&
    state?.terms?.termsb3.isChecked === 1 &&
    state?.terms?.termsb4.isChecked === 1 &&
    state?.terms?.termsb5.isChecked === 1;
  return (
    <>
      <Container>
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === 'ios' ? 30 : -10}>
          <ContentsContainer>
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
                <RowBox>
                  <RowItem>
                    <Typhograph type="NOTO" color="BLACK2" style={{ marginRight: 5 }}>
                      {globalState?.user?.jumina} - {globalState?.user?.sex}
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <DefaultInput
                      {...juminb}
                      width={60}
                      maxLength={6}
                      height="30"
                      secureTextEntry={true}
                      keyboardType="numeric"
                    />
                  </RowItem>
                </RowBox>
              </RowItem>
            </RowBox>
            {/* 계약체결일 */}
            <RowBox>
              <RowItem>
                <Typhograph type="NOTO" color="GRAY">
                  계약체결일
                </Typhograph>
              </RowItem>
              <RowItem>
                <Typhograph type="NOTO" color="BLACK2">
                  {moment(new Date()).format('YYYY년 MM월 DD일')}
                </Typhograph>
              </RowItem>
            </RowBox>

            <InfoTextBox>
              <Typhograph type="NOTO" color="GRAY" size={10}>
                * 보험 개시는 계약일로부터 7일 후부터 시작됩니다.
              </Typhograph>
            </InfoTextBox>

            <ButtonBox>
              <CheckLabelButton iscenter title="추천인선택" onPress={() => navigation.navigate('RECOMMEND_USERS')} />
            </ButtonBox>
            {globalState?.recommendUser !== undefined && (
              <RecommendListBox>
                <RowBox>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY">
                      {globalState?.recommendUser?.company}
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY">
                      {recomendMasking(globalState?.recommendUser?.mobile)}
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY">
                      {globalState?.recommendUser?.name}
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <IconButton onPress={() => onDeleteRecommedUserButton()}>
                      <Image style={{ width: 15, height: 15 }} source={insuIcon.CLOSE_ICON} />
                    </IconButton>
                  </RowItem>
                </RowBox>
              </RecommendListBox>
            )}
          </ContentsContainer>
          <TermsBox>
            <TitleBox>
              <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                가입 설계를 위한 개인정보처리에 대한 동의
              </Typhograph>
            </TitleBox>
            <ButtonBox>
              <CheckLabelButton
                active={isActive1}
                iscenter
                onPress={() => onClickAllCheck(['termsb1', 'termsb2', 'termsb3', 'termsb4', 'termsb5'], isActive1)}
                title="모두동의하기"
              />
            </ButtonBox>
            <TermsListBox>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termsb1}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
            </TermsListBox>
            <TermsListBox>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termsb2}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
            </TermsListBox>
            <TermsListBox>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termsb3}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
            </TermsListBox>
            <TermsListBox>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termsb4}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
            </TermsListBox>
            <TermsListBox>
              <TermsListItemBox>
                <TermsList
                  isButton
                  onClickTermsModalOpen={onClickTermsModalOpen}
                  item={state.terms.termsb5}
                  onChangeTermsState={termsChange}
                />
              </TermsListItemBox>
            </TermsListBox>
          </TermsBox>
          <PaddingBox />
          <TermsModal
            open={state?.termsModal}
            close={() => onChangeState('termsModal', false)}
            html={state?.termsHtml}
            onPress={onClickTermsModalAgree}
            isButton={true}
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

export default StormFloodInputPresenter;
