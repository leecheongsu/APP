import {
  HouseFireInputStateTypes,
  HouseFireStateName,
  HouseFireStateTypes,
} from '@app/screens/HouseFire/HouseFireContainer';
import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';
import HouseAddressPresenter from './HouseAddressPresenter';
import { insuApis } from '@app/api/Insurance';
import { useAsync } from '@app/hooks';

type HouseAddressContainerTypes = {
  state: HouseFireStateTypes;
  inputState: HouseFireInputStateTypes;
  onChangeState: (name: HouseFireStateName, value: any) => void;
};

export default function HouseAddressContainer({ state, inputState, onChangeState }: HouseAddressContainerTypes) {
  const [getAddress, getAddressDispatch] = useAsync(
    () => insuApis.getAddress({ search: inputState.searchInput.value }),
    [],
    true
  );

  const submitSearchAddress = () => {
    Keyboard.dismiss();
    onChangeState('addressErrorMessage', '');
    getAddressDispatch();
  };

  useEffect(() => {
    if (getAddress.data?.results !== undefined) {
      const result = getAddress.data?.results;
      onChangeState('addressCommon', result.common);
      onChangeState('addressData', result.juso);

      if (result.common.errorMessage !== '정상') {
        onChangeState('addressErrorMessage', result.common.errorMessage);
      } else if (result.common.totalCount === '0') {
        onChangeState('addressErrorMessage', '검색 결과가 없습니다.');
      } else {
        return;
      }
    }
  }, [getAddress]);
  return (
    <HouseAddressPresenter
      state={state}
      inputState={inputState}
      submitSearchAddress={submitSearchAddress}
      loading={getAddress.loading}
      onChangeState={onChangeState}
    />
  );
}
