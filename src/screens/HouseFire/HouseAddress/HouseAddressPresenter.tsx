import React from 'react';
import { FullLabel, Loading, SearchInput, EmptyCard, AddressCard } from '@app/components';
import { screenWidth } from '@app/lib';
import {
  HouseFireInputStateTypes,
  HouseFireStateName,
  HouseFireStateTypes,
} from '@app/screens/HouseFire/HouseFireContainer';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { HouseInfoDetail } from '@app/screens';
type HouseAddressPresenterTypes = {
  state: HouseFireStateTypes;
  inputState: HouseFireInputStateTypes;
  loading: boolean;
  submitSearchAddress: () => void;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  SelectAddress: (item) => void;
  handleSelectDong: (value: any) => void;
  handleSelectDetail: (value: any) => void;
  submitAddressDetail: () => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
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

function HouseAddressPresenter({
  state,
  inputState,
  submitSearchAddress,
  loading,
  onChangeState,
  SelectAddress,
  handleSelectDong,
  handleSelectDetail,
  submitAddressDetail,
}: HouseAddressPresenterTypes) {
  const PLACEHOLDER = '도로명이나 건물명을 입력하세요.';
  const isErrorAndEmpty = state.addressErrorMessage !== '' && state.addressErrorMessage !== '정상';
  return (
    <Container>
      <FullLabel title="주소를 입력해주세요." />

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
              <AddressCard onPress={SelectAddress} item={item} index={index} highlight={inputState.searchInput.value} />
            );
          }}
        />
      )}
      <HouseInfoDetail
        state={state}
        onChangeState={onChangeState}
        inputState={inputState}
        handleSelectDong={handleSelectDong}
        handleSelectDetail={handleSelectDetail}
        submitAddressDetail={submitAddressDetail}
      />
    </Container>
  );
}
export default HouseAddressPresenter;
