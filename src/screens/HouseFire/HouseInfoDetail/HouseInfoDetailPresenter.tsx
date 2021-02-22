import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  AddressCard,
  CheckLabelButton,
  FocusAwareStatusBar,
  FullLabel,
  IconButton,
  Select,
  Typhograph,
} from '@app/components';
import styled from '@app/style/typed-components';
import Modal from 'react-native-modal';
import theme from '@app/style/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { insuIcon } from '@app/assets';
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.WHITE,
    padding: 0,
    margin: 0,
    height: 0,
    justifyContent: 'flex-start',
  },
});
const Container = styled.View``;
const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 15px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;
const HeaderTitle = styled.View``;
const CloseIconBox = styled.View`
  position: absolute;
  right: 10px;
  top: 20px;
`;
const LabelBox = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: ${theme.color.WHITE};
`;
const SubmitButtonBox = styled.View`
  padding: 10px 20px;
`;
const ButtonInfoTitle = styled.View`
  padding: 10px 0px;
`;
const SelectBox = styled.View`
  padding: 10px 20px;
`;

function HouseInfoDetailPresenter({
  state,
  onChangeState,
  inputState,
  handleSelectDong,
  handleSelectDetail,
  submitAddressDetail,
}) {
  const buttonLabel =
    state.resultDong === ''
      ? '동.호를 선택해주세요.'
      : state?.resultDetail !== '' && state.resultDong !== ''
      ? `${state?.addressData[0]?.roadAddr} ${state?.resultDong.dongNm} ${state?.resultDetail.hoNm}`
      : '호를 선택 해주세요.';
  return (
    <>
      <Container>
        <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
        <Modal
          style={styles.container}
          isVisible={state.isDetailModal}
          onBackButtonPress={() => onChangeState('isDetailModal', false)}>
          <SafeAreaView style={{ flex: 1 }}>
            <Header>
              <HeaderTitle>
                <Typhograph type="NOTO" size={16} color="BLACK2" weight="BOLD">
                  주소찾기(상세정보)
                </Typhograph>
              </HeaderTitle>
              <CloseIconBox>
                <IconButton
                  onPress={() => {
                    onChangeState('isDetailModal', false);
                    onChangeState('resultDongList', []);
                    onChangeState('resultDetailList', []);
                  }}>
                  <Image source={insuIcon.CLOSE_ICON} />
                </IconButton>
              </CloseIconBox>
            </Header>
            <FullLabel title="  건물 전체와 개별 선택을 하실 수 있습니다." />
            <LabelBox>
              <AddressCard item={state.sedeAddress} highlight={inputState.searchInput.value} />
            </LabelBox>
            <SubmitButtonBox>
              <ButtonInfoTitle>
                <Typhograph type="NOTO" weight="BOLD" size={13} color="BLACK2">
                  상세 주소 선택(동, 호)
                </Typhograph>
              </ButtonInfoTitle>
              {console.log(state)}
              <CheckLabelButton
                active={state?.resultDong !== '' && state?.resultDetail !== ''}
                iscenter={false}
                onPress={() => submitAddressDetail()}
                title={buttonLabel}
              />
            </SubmitButtonBox>
            <SelectBox>
              <Select
                label="동을 선택하세요."
                value={state.resultDong}
                items={state?.resultDongList}
                onValueChange={handleSelectDong}
                disabled={false}
              />
            </SelectBox>
            <SelectBox>
              <Select
                label={state.loading ? 'Loading...' : '호를 선택해주세요.'}
                value={state.resultDetail}
                items={state?.resultDetailList}
                onValueChange={handleSelectDetail}
                disabled={state?.resultDetailList?.length === 0}
              />
            </SelectBox>
          </SafeAreaView>
        </Modal>
      </Container>
    </>
  );
}

export default HouseInfoDetailPresenter;
