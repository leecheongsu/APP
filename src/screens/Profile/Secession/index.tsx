import React, { useState } from 'react';
import styled from '@app/style/typed-components';
import { BottomFixButton, CheckLabelButton, FocusAwareStatusBar, FullLabel, Typhograph } from '@app/components';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import theme from '@app/style/theme';
import Toast from 'react-native-simple-toast';
import { userApis } from '@app/api/User';
import { clearStoreData } from '@app/lib';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View``;

const InfoBox = styled.View`
  padding: 20px;
`;
const TextBox = styled.View`
  flex-direction: row;
  padding: 20px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.GRAY3};
`;

const ButtonContainer = styled.View`
  padding: 40px 20px 20px 20px;
`;
const ButtonTextBox = styled.View``;
const ButtonBox = styled.View`
  margin-top: 20px;
`;

function Secession() {
  const navigation = useNavigation();
  const dot = '\u2022';
  const InfoText = `회원탈퇴를 신청하시기 전에 ${'\n'}안내 사항을 꼭 확인해 주세요.`;
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const number = '070-4126-3333';
  const [isAgree, setIsAgree] = useState(false);

  const handleClickButton = () => {
    setIsAgree(!isAgree);
  };

  const handleSubmitButton = () => {
    if (isAgree) {
      const email = globalState.user?.email;
      userApis
        .putSecession(email)
        .then((res) => {
          if (res.status === 200) {
            globalDispatch({ type: 'REMOVE', name: 'user' });
            clearStoreData();
            navigation.navigate('MAIN_STACK');
          }
        })
        .catch((e) => {
          console.log(e.response);
        });
    } else {
      Toast.show('동의후 탈퇴 가능합니다.');
    }
  };

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <FullLabel title={InfoText} />
      <Container>
        <InfoBox>
          <TextBox>
            <Typhograph type="NOTO" size={11} color="BLACK2">
              {dot}
              {'  '}
            </Typhograph>
            <Typhograph type="NOTO" size={14} color="BLACK2">
              사용하고 계신 아이디{' '}
              <Typhograph type="ROBOTO" weight="BOLD" color="BLACK3" size={16}>
                {globalState.user?.email}
              </Typhograph>{' '}
              는 탈퇴할 경우 재사용 및 복구가 불가능합니다.
            </Typhograph>
          </TextBox>

          <TextBox>
            <Typhograph type="NOTO" size={11} color="BLACK2">
              {dot}
              {'  '}
            </Typhograph>
            <Typhograph type="NOTO" size={14} color="BLACK2">
              탈퇴 후 회원정보 및 데이터는 복구할 수 없습니다.
            </Typhograph>
          </TextBox>

          <TextBox>
            <Typhograph type="NOTO" size={11} color="BLACK2">
              {dot}
              {'  '}
            </Typhograph>
            <Typhograph type="NOTO" size={14} color="BLACK2">
              계약정보는 고객센터{' '}
              <Typhograph type="ROBOTO" weight="BOLD" color="BLACK3" size={16}>
                {number}
              </Typhograph>{' '}
              으로 연락 주시면 확인이 가능합니다.
            </Typhograph>
          </TextBox>
        </InfoBox>
        <ButtonContainer>
          <ButtonTextBox>
            <Typhograph type="NOTO" color="BLACK3" weight="REGULAR" size={12}>
              회원탈퇴 후에는 아이디와 데이터는 복구할 수 없습니다.
            </Typhograph>
            <ButtonBox>
              <CheckLabelButton onPress={() => handleClickButton()} active={isAgree} title="동의합니다" iscenter />
            </ButtonBox>
          </ButtonTextBox>
        </ButtonContainer>
      </Container>
      <BottomFixButton
        index={1}
        leftTitle="이전"
        rightTitle="탈퇴"
        bottomRightPress={handleSubmitButton}
        bottomLeftPress={() => null}
        isKeybordView={false}
        loading={false}
      />
    </>
  );
}

export default Secession;
