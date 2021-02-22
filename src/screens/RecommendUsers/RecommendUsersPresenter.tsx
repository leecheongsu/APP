import { BottomFixButton, FocusAwareStatusBar, OverayLoading, SearchInput2, Select, Typhograph } from '@app/components';
import { recomendMasking } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React from 'react';
import { Keyboard } from 'react-native';

const Container = styled.ScrollView`
  background-color: ${theme.color.GRAY2};
`;
const SelectBox = styled.View``;
const InputContainer = styled.View`
  padding: 20px;
`;
const LabelBox = styled.View`
  padding: 5px 0px;
`;
const InputBox = styled.View`
  margin-top: 10px;
`;
const SerchInputBox = styled.View``;
const ContentsContainer = styled.View`
  min-height: 500px;
  padding: 20px;
  background-color: ${theme.color.WHITE};
`;
const ContentsTitle = styled.View`
  padding-bottom: 10px;
`;

const RowBox = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  border-top-width: ${(props: any) => (props.isBorderTop ? '1px' : '0px')};
  border-top-color: ${theme.color.BORDER_GRAY};
  border-bottom-width: ${(props: any) => (props.isBorderBottom ? '1px' : '0px')};
  border-bottom-color: ${theme.color.BORDER_GRAY};
  background-color: ${(props: any) => (props.isSelect ? theme.color.TABLE_BACK : theme.color.WHITE)};
`;
const RowItem = styled.View``;
const EmptyBox = styled.View`
  height: 300px;
  background-color: ${theme.color.WHITE};
  justify-content: center;
  align-items: center;
`;
function RecommendUsersPresenter({
  state,
  onChangeState,
  onValueChange,
  inputState,
  bottomLeftPress,
  bottomRightPress,
  getRecommendUser,
  getRecommendRist,
  onClickRecommendUser,
}) {
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <OverayLoading visible={state?.loading} />
      <Container keyboardShouldPersistTaps="handled">
        <InputContainer>
          <SelectBox>
            <LabelBox>
              <Typhograph type="NOTO" color="GRAY">
                소속을 선택해주세요.
              </Typhograph>
            </LabelBox>
            <Select
              isPlaceholder={false}
              borderColor="INPUT_GRAY"
              label="소속,선택"
              onValueChange={onValueChange}
              items={state?.selectCompanyItem}
              value={state?.selectCompany}
            />
          </SelectBox>
          <InputBox>
            <LabelBox>
              <Typhograph type="NOTO" color="GRAY">
                성명 또는 휴대폰 번호를 검색하세요.
              </Typhograph>
            </LabelBox>
            <SerchInputBox>
              <SearchInput2
                {...inputState?.searchInput}
                onSubmitEditing={() => Keyboard.dismiss()}
                placeholder="예)홍길동 또는 1234"
                onChangeState={onChangeState}
              />
            </SerchInputBox>
          </InputBox>
        </InputContainer>

        <ContentsContainer>
          <ContentsTitle>
            <Typhograph type="NOTO" color="GRAY">
              총{' '}
              <Typhograph type="ROBOTO" color="SKYBLUE">
                {getRecommendRist()?.length}
              </Typhograph>{' '}
              건
            </Typhograph>
          </ContentsTitle>
          {getRecommendRist()?.length === 0 && !state.loading ? (
            <EmptyBox>
              <Typhograph type="NOTO">검색된 결과가 없습니다.</Typhograph>
            </EmptyBox>
          ) : (
            getRecommendRist()?.map((item, index) => {
              const isSelect = JSON.stringify(state?.selectRecommendUser) === JSON.stringify(item);
              return (
                <RowBox
                  key={index}
                  onPress={() => onClickRecommendUser(item)}
                  isBorderTop={index === 0}
                  isSelect={isSelect}
                  isBorderBottom={index !== getRecommendRist()?.length}>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY">
                      {item?.company}
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY">
                      {recomendMasking(item?.mobile)}
                    </Typhograph>
                  </RowItem>
                  <RowItem>
                    <Typhograph type="NOTO" color="GRAY">
                      {item?.name}
                    </Typhograph>
                  </RowItem>
                </RowBox>
              );
            })
          )}
        </ContentsContainer>
      </Container>
      <BottomFixButton
        index={2}
        leftTitle="취소"
        rightTitle="선택"
        bottomRightPress={bottomRightPress}
        bottomLeftPress={bottomLeftPress}
        isKeybordView={state?.isKeybordView}
      />
    </>
  );
}

export default RecommendUsersPresenter;
