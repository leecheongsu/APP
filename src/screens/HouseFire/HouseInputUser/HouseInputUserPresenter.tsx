import React from 'react';
import { BottomFixButton, CheckLabelButton, DefaultInput, IconButton, Select, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { recomendMasking, screenWidth } from '@app/lib';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Image, Platform, StyleSheet } from 'react-native';
import theme from '@app/style/theme';
import { insuIcon } from '@app/assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { useGlobalState } from '@app/context';
import { HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';
import { InputTypes } from '@app/types';

type HouseInputUserPresenterTypes = {
  state: HouseFireStateTypes;
  handlePreviousButton: () => void;
  inputState: {
    insuName: InputTypes;
    insuPhone: InputTypes;
    issuJumina: InputTypes;
    juminb: InputTypes;
  };
  handleClickEqualButton: () => void;
  user: any;
  isCheck: boolean;
  showDatePicker: () => void;
  hideDatePicker: () => void;
  handleConfirm: (date: any) => void;
  onValueChange: (value: any) => void;
  selectItem: {
    label: string;
    value: string;
  }[];
  isDatePickerVisible: boolean;
  onDeleteRecommedUserButton: () => void;
  buttomNextButton: () => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const InfoContainer = styled.View``;

const styles = StyleSheet.create({
  container: {
    width: screenWidth(),
    paddingHorizontal: 20,
    backgroundColor: theme.color.WHITE,
  },
});
const ContentsContainer = styled.ScrollView`
  padding: 20px 0px 100px 0px;
`;
const TitleBox = styled.View`
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;
const InfoBox = styled.View`
  padding: 10px 0px;
`;
const RowBox = styled.View`
  flex-direction: row;
  margin-top: 7px;
  justify-content: space-between;
  align-items: center;
`;
const RowItem = styled.View`
  margin-top: 5px;
`;
const SelectBox = styled.View`
  width: 200px;
`;

const RecommendBox = styled.View`
  padding: 20px 0px;
`;
const RecommendButtonBox = styled.View``;

const RecommendListBox = styled.View`
  padding: 0px 10px;
  border-top-width: 1px;
  border-top-color: ${theme.color.BORDER_GRAY};
`;

const PaddingBox = styled.View`
  height: 100px;
`;

function HouseInputUserPresenter({
  state,
  handlePreviousButton,
  inputState,
  handleClickEqualButton,
  user,
  isCheck,
  showDatePicker,
  hideDatePicker,
  handleConfirm,
  onValueChange,
  selectItem,
  isDatePickerVisible,
  onDeleteRecommedUserButton,
  buttomNextButton,
}: HouseInputUserPresenterTypes) {
  const navigation = useNavigation();
  const globalState = useGlobalState();
  return (
    <>
      <Container>
        <KeyboardAwareScrollView
          style={styles.container}
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === 'ios' ? -200 : -10}>
          <ContentsContainer>
            <InfoContainer>
              <TitleBox>
                <Typhograph type="NOTO" color="BLUE" weight="BOLD">
                  보험계약자 정보
                </Typhograph>
              </TitleBox>
              <InfoBox>
                <RowBox>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY" weight="REGULAR">
                      성명/상호명
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY">
                      {user?.name}
                    </Typhograph>
                  </RowItem>
                </RowBox>

                <RowBox>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY" weight="REGULAR">
                      이메일
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY">
                      {user?.email}
                    </Typhograph>
                  </RowItem>
                </RowBox>

                <RowBox>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY" weight="REGULAR">
                      연락처
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY">
                      {user?.mobile}
                    </Typhograph>
                  </RowItem>
                </RowBox>

                <RowBox>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY" weight="REGULAR">
                      주민(사업자)등록번호
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <RowBox>
                      <RowItem>
                        <Typhograph type="NOTO" color="GRAY" style={{ marginRight: 5 }}>
                          {user?.jumina} - {user?.sex}
                        </Typhograph>
                      </RowItem>
                      <RowItem>
                        <DefaultInput
                          {...inputState?.juminb}
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

                <RowBox>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY" weight="REGULAR">
                      보험기간 시작일
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <RowBox>
                      <RowItem>
                        <Typhograph type="NOTO" color="GRAY">
                          {state?.insFrom}
                        </Typhograph>
                      </RowItem>
                      <RowItem>
                        <IconButton onPress={() => showDatePicker()}>
                          <Image style={{ tintColor: theme.color.GRAY }} source={insuIcon.DATE} />
                        </IconButton>
                      </RowItem>
                    </RowBox>
                  </RowItem>
                </RowBox>
                <Typhograph type="NOTO" color="GRAY" size={10}>
                  * 보험기간은 시작일기준 1년입니다.
                </Typhograph>
              </InfoBox>

              <TitleBox>
                <RowBox>
                  <RowItem>
                    <Typhograph type="NOTO" color="BLUE" weight="BOLD">
                      피보험자 정보
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <RowBox>
                      <RowItem style={{ marginRight: 5 }}>
                        <IconButton onPress={() => handleClickEqualButton()}>
                          <Image source={isCheck ? insuIcon.BT_CHECK_ON : insuIcon.BT_CHECK_OFF} />
                        </IconButton>
                      </RowItem>
                      <RowItem>
                        <Typhograph type="NOTO" color="BLACK2" weight="REGULAR">
                          보험계약자와 동일
                        </Typhograph>
                      </RowItem>
                    </RowBox>
                  </RowItem>
                </RowBox>
              </TitleBox>

              <RowBox style={{ marginTop: 10 }}>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY" weight="REGULAR">
                    성명/상호명
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <DefaultInput {...inputState.insuName} width={200} placeholder="성명/상호명 입력" />
                </RowItem>
              </RowBox>

              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY" weight="REGULAR">
                    생년월일/{'\n'}사업자등록번호
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <DefaultInput
                    {...inputState.issuJumina}
                    width={200}
                    placeholder="숫자 6자리 입력"
                    keyboardType="numeric"
                  />
                  <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={10}>
                    *예 : 1993년7월12일 → 930712
                  </Typhograph>
                </RowItem>
              </RowBox>

              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY" weight="REGULAR">
                    연락처
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <DefaultInput
                    {...inputState.insuPhone}
                    width={200}
                    placeholder="'-'없이 숫자만 입력"
                    keyboardType="numeric"
                  />
                </RowItem>
              </RowBox>

              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY" weight="REGULAR">
                    보험목적물{'\n'}소유구분
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <SelectBox>
                    <Select
                      isPlaceholder={false}
                      borderColor="INPUT_GRAY"
                      label="자가"
                      onValueChange={onValueChange}
                      items={selectItem}
                      value={state?.owner}
                    />
                  </SelectBox>
                </RowItem>
              </RowBox>

              <RowBox>
                <RowItem>
                  <Typhograph type="NOTO" color="GRAY" weight="REGULAR">
                    보험목적물 소재지
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="NOTO" style={{ maxWidth: 210 }} color="GRAY">
                    {state?.selectAddress?.address}
                  </Typhograph>
                </RowItem>
              </RowBox>
            </InfoContainer>

            <RecommendBox>
              <RecommendButtonBox>
                <CheckLabelButton title="추천인선택" iscenter onPress={() => navigation.navigate('RECOMMEND_USERS')} />
              </RecommendButtonBox>
            </RecommendBox>
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
                      {recomendMasking(globalState.recommendUser?.mobile)}
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
            <PaddingBox />
          </ContentsContainer>
        </KeyboardAwareScrollView>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          locale="ko"
          confirmTextIOS="확인"
          cancelTextIOS="취소"
          headerTextIOS="보험기간 시작일"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
        <BottomFixButton
          index={state.stepNumber}
          leftTitle="이전"
          rightTitle="신청"
          bottomRightPress={buttomNextButton}
          bottomLeftPress={handlePreviousButton}
          isKeybordView={state.isKeybordView}
        />
      </Container>
    </>
  );
}

export default HouseInputUserPresenter;
