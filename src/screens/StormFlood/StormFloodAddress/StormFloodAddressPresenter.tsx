import React from 'react';
import { AddressCard, BottomFixButton, EmptyCard, FullLabel, Loading, SearchInput, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { screenWidth } from '@app/lib';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import theme from '@app/style/theme';

type StormFloodAddressPresenterTypes = {
  state: StormFloodStateTypes;
  nextButton: () => void;
  handlePreviousButton: () => void;
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

const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RowItem = styled.View`
  align-items: center;
  width: ${(props) => (props.width ? props.width : '0px')};
`;
const SearchBox = styled.View`
  background-color: ${theme.color.WHITE};
  padding: 20px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;

const AddressFlatList = styled.FlatList`
  margin-bottom: 20px;
`;

function StormFloodAddressPresenter({
  state,
  nextButton,
  onChangeState,
  submitSearchAddress,
  inputState,
  loading,
  SelectAddress,
  handlePreviousButton,
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
                  <AddressCard
                    onPress={SelectAddress}
                    item={item}
                    index={index}
                    highlight={inputState.searchInput.value}
                  />
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
