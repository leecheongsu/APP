import { FullLabel, Loading, SearchInput, EmptyCard, Typhograph, AddressCard } from '@app/components';
import { screenWidth } from '@app/lib';
import {
  HouseFireInputStateTypes,
  HouseFireStateName,
  HouseFireStateTypes,
} from '@app/screens/HouseFire/HouseFireContainer';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React from 'react';
import { Text } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

type HouseAddressPresenterTypes = {
  state: HouseFireStateTypes;
  inputState: HouseFireInputStateTypes;
  loading: boolean;
  submitSearchAddress: () => void;
  onChangeState: (name: HouseFireStateName, value: any) => void;
};

const Container = styled.View`
  width: ${screenWidth()}px;
`;

const SearchBox = styled.View`
  background-color: ${theme.color.GRAY2};
  padding: 20px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;

function HouseAddressPresenter({
  state,
  inputState,
  submitSearchAddress,
  loading,
  onChangeState,
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
        <FlatList
          style={{ marginBottom: 160 }}
          data={state.addressData}
          keyExtractor={(item, index) => index.toString()}
          windowSize={2}
          renderItem={({ item, index }) => {
            return <AddressCard item={item} index={index} highlight={inputState.searchInput.value} />;
          }}
        />
      )}
    </Container>
  );
}
export default HouseAddressPresenter;
