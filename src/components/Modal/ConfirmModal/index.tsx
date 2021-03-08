import React from 'react';
import { FocusAwareStatusBar, Typhograph } from '@app/components';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import Modal from 'react-native-modal';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  max-height: 150px;
  width: 100%;
  background-color: white;
  justify-content: center;
`;

const ContentsBox = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`;
const BottomButtonBox = styled.View`
  flex-direction: row;
  height: 100px;
`;
const ButtonItem = styled.View`
  width: 50%;
`;
const CustomButton1 = styled.TouchableOpacity`
  background-color: ${theme.color.INPUT_GRAY};
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const CustomButton2 = styled.TouchableOpacity`
  background-color: ${theme.color.BLUE};
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export default function ConfirmModal() {
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const navigation = useNavigation();
  const onPress = () => {
    globalDispatch({ type: 'CHANGE', name: 'isMainModal', value: false });
    globalDispatch({ type: 'CHANGE', name: 'recommendUser', value: undefined });
    globalDispatch({ type: 'CHANGE', name: 'isIdentityverification', value: false });
    globalDispatch({ type: 'CHANGE', name: 'electronicSignPreData', value: undefined });
    globalDispatch({ type: 'CHANGE', name: 'recommendUser', value: undefined });
    globalDispatch({ type: 'CHANGE', name: 'insuType', value: '' });
    globalDispatch({ type: 'CHANGE', name: 'selectAddress', value: undefined });
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  return (
    <>
      <Modal
        isVisible={globalState.isMainModal}
        onBackdropPress={() => globalDispatch({ type: 'CHANGE', name: 'isMainModal', value: false })}>
        <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
        <Container>
          <ContentsBox>
            <Typhograph type="NOTO" color="BLACK2">
              메인페이지로 돌아 가시겠습니까?
            </Typhograph>
          </ContentsBox>

          <BottomButtonBox>
            <ButtonItem>
              <CustomButton1
                onPress={() => globalDispatch({ type: 'CHANGE', name: 'isMainModal', value: false })}
                activeOpacity={1.0}>
                <Typhograph type="NOTO" color="WHITE">
                  아니오
                </Typhograph>
              </CustomButton1>
            </ButtonItem>
            <ButtonItem>
              <CustomButton2 onPress={() => onPress()} activeOpacity={1.0}>
                <Typhograph type="NOTO" color="WHITE">
                  네
                </Typhograph>
              </CustomButton2>
            </ButtonItem>
          </BottomButtonBox>
        </Container>
      </Modal>
    </>
  );
}
