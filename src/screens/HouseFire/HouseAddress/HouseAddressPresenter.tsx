import React from 'react';
import { FullLabel, Loading, SearchInput, EmptyCard, AddressCard, Typhograph } from '@app/components';
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
const PaddingBox = styled.View`
  height: 220px;
`;

const TipBox = styled.ScrollView`
  padding: 20px;
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
      {state?.addressData?.length === 0 && (
        <TipBox>
          <Typhograph type="NOTO" color="BLACK2" weight="REGULAR">
            ****** 검색 Tip{'\n'}
            아래와 같은 조합으로 검색을 하시면 더욱정확한 결과가 검색됩니다.
          </Typhograph>
          {/* 도로명 + 건물번호*/}
          <Typhograph type="NOTO" color="BLACK" weight="BOLD" style={{ marginTop: 20 }}>
            도로명 + 건물번호
          </Typhograph>
          <Typhograph type="NOTO" color="BROWN" size={12}>
            예) 유엔빌리지3길 84, 송정중앙로 9-1
          </Typhograph>
          {/* 지역명(동/리) + 번지*/}
          <Typhograph type="NOTO" color="BLACK" weight="BOLD" style={{ marginTop: 20 }}>
            지역명(동/리) + 번지
          </Typhograph>
          <Typhograph type="NOTO" color="BROWN" size={12}>
            예) 둔내면 두원274-2
          </Typhograph>
          {/* 지역명(동/리) + 건물명(아파트명)*/}
          <Typhograph type="NOTO" color="BLACK" weight="BOLD" style={{ marginTop: 20 }}>
            지역명(동/리) + 건물명(아파트명)
          </Typhograph>
          <Typhograph type="NOTO" color="BROWN" size={12}>
            예) 효창동 현대아트빌(아파트), 논현동 신동아(아파트)
          </Typhograph>
          {/* 세대별 가입*/}
          <Typhograph type="NOTO" color="BLACK" weight="BOLD" style={{ marginTop: 20 }}>
            세대별 가입
          </Typhograph>
          <Typhograph type="NOTO" color="BROWN" size={12} style={{ paddingBottom: 100 }}>
            예) 남천 비치아파트, 중동 아남하이츠3차
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
