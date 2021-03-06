import React from 'react';
import { AddressCard, EmptyCard, FullLabel, Loading, SearchInput, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import theme from '@app/style/theme';

type StormFloodAddressPresenterTypes = {
  state: StormFloodStateTypes;
  onChangeState: (name: StormFloodName, value: any) => void;
  submitSearchAddress: () => void;
  inputState: any;
  loading: boolean;
  SelectAddress: (item: any) => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const ContentsContainer = styled.View``;

const SearchBox = styled.View`
  background-color: ${theme.color.WHITE};
  padding: 20px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;

const AddressFlatList = styled.FlatList``;
const PaddingBox = styled.View`
  height: 220px;
`;
const TipBox = styled.View`
  padding: 20px;
`;

function StormFloodAddressPresenter({
  state,
  onChangeState,
  submitSearchAddress,
  inputState,
  loading,
  SelectAddress,
}: StormFloodAddressPresenterTypes) {
  const isErrorAndEmpty = state.addressErrorMessage !== '' && state.addressErrorMessage !== '정상';
  const PLACEHOLDER = '도로명이나 건물명을 입력하세요.';
  return (
    <>
      <Container>
        <FullLabel title="주소를 입력해주세요." />
        <ContentsContainer>
          <SearchBox>
            <SearchInput
              {...inputState.searchInput}
              placeholder={PLACEHOLDER}
              onSubmitEditing={submitSearchAddress}
              onChangeState={onChangeState}
            />
          </SearchBox>
          {state?.addressData?.length === 0 && (
            <TipBox>
              <Typhograph type="NOTO" color="BLACK2" weight="REGULAR">
                ****** 검색 Tip{'\n'}
                아래와 같은 조합으로 검색을 하시면 더욱정확한 결과가 검색됩니다.
              </Typhograph>
              <Typhograph type="NOTO" color="BLACK" weight="BOLD" style={{ marginTop: 20 }}>
                도로명 + 건물번호
              </Typhograph>
              <Typhograph type="NOTO" color="BROWN" size={12}>
                예) 서면로 56, 구남로 42-1, 한강대로 271
              </Typhograph>
              <Typhograph type="NOTO" color="BLACK" weight="BOLD" style={{ marginTop: 20 }}>
                지역명(동/리) + 번지
              </Typhograph>
              <Typhograph type="NOTO" color="BROWN" size={12}>
                예) 서현동 260-6(모로미), 관철동 7-1, 부평동 199-36
              </Typhograph>
              <Typhograph type="NOTO" color="BLACK" weight="BOLD" style={{ marginTop: 20 }}>
                지역명(동/리) + 건물명(아파트명)
              </Typhograph>
              <Typhograph type="NOTO" color="BROWN" size={12}>
                {'예) 서현동 웰빙프라자, 우동 메커스(빌딩), 둔산동 선우(빌딩)'}
              </Typhograph>
            </TipBox>
          )}

          {loading ? (
            <Loading height={300} />
          ) : isErrorAndEmpty ? (
            <EmptyCard height={300} title={state.addressErrorMessage} />
          ) : (
            <AddressFlatList
              data={state.addressData}
              keyExtractor={(item, index) => index.toString()}
              windowSize={3}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <AddressCard
                      onPress={SelectAddress}
                      item={item}
                      index={index}
                      highlight={inputState.searchInput.value}
                    />
                    {index === state.addressData.length - 1 && <PaddingBox />}
                  </>
                );
              }}
            />
          )}
        </ContentsContainer>
      </Container>
    </>
  );
}

export default StormFloodAddressPresenter;
