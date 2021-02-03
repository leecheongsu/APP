import React, { useEffect, useRef, useState } from 'react';
import { BottomFixButton, CheckLabelButton, DefaultInput, ServiceSelect, Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import theme from '@app/style/theme';
import { screenWidth } from '@app/lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, TextInputProps } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import { TermsModal } from '@app/screens';
import { individualTerms, useTermsHtml } from '@app/lib/html';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  width: ${screenWidth()}px;
  margin-left: 40px;
`;
const ContentsContainer = styled.View`
  background-color: ${theme.color.WHITE};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 0px 20px 200px 20px;
`;
const TopArrow = styled.View`
  left: 70px;
  top: 0px;
  width: 0px;
  height: 0px;
  background-color: transparent;
  border-style: solid;
  border-top-width: 0px;
  border-right-width: 10px;
  border-bottom-width: 15px;
  border-left-width: 10px;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: ${theme.color.WHITE};
  border-left-color: transparent;
`;

const TextInputBox = styled.View`
  margin-top: 20px;
`;
const InputLabel = styled.View``;
const InputBox = styled.View`
  margin-top: 10px;
`;
const InputBox2 = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const InputItem = styled.View``;
const SelectBox = styled.View`
  border-width: 1px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border-color: ${theme.color.BORDER_GRAY};
`;

const Input = styled.TextInput<{ isFocus: boolean } & TextInputProps>`
  height: 50px;
  min-width: 0px;
  border-color: ${(props: any) => (props.isFocus ? theme.color.GRAY : theme.color.INPUT_GRAY)};
  border-width: ${(props: any) => (props.isFocus ? '1px' : '1px')};
  border-radius: 10px;
  padding: 0px 10px 0px 10px;
`;

const AgreeBox = styled.View`
  margin-top: 100px;
`;
const AgreeBoxItem = styled.View`
  margin-top: 10px;
`;

// 개인회원 가입 비밀번호 페이지
function JoinIndividualPassword({ state, inputState, onChangeState }) {
  //모달안의 확인버튼 핸들러
  const handleClickInModal = () => {
    onChangeState('termsModal', false);
    switch (state.selectTermsModal) {
      case 'individual':
        return onChangeState('isAgreeIndividualTerms', true);
      case 'useTerms':
        return onChangeState('isAgreeUseTerms', true);
    }
  };

  //개인정보 처리방침 버튼
  const handleIndividualButtonClick = () => {
    if (state.isAgreeIndividualTerms) {
      onChangeState('isAgreeIndividualTerms', false);
    } else {
      onChangeState('termsModal', true);
      onChangeState('selectTermsModal', 'individual');
      onChangeState('termsHtml', individualTerms());
    }
  };

  //이용약관 버튼
  const handleUseTermsButtonClick = () => {
    if (state.isAgreeUseTerms) {
      onChangeState('isAgreeUseTerms', false);
    } else {
      onChangeState('termsModal', true);
      onChangeState('selectTermsModal', 'useTerms');
      onChangeState('termsHtml', useTermsHtml());
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ width: screenWidth() - 40, marginLeft: 40 }}
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'ios' ? -200 : -10}>
      <TextInputBox>
        <InputLabel>
          <Typhograph type="NOTO" weight="MEDIUM">
            비밀번호
          </Typhograph>
        </InputLabel>
        <InputBox>
          <DefaultInput
            secureTextEntry={true}
            {...inputState.password}
            placeholder="비밀번호를 입력하세요. (영문+숫자+특수기호 8자리 이상)"
            textContentType="password"
          />
        </InputBox>
      </TextInputBox>

      <TextInputBox>
        <InputLabel>
          <Typhograph type="NOTO" weight="MEDIUM">
            비밀번호 확인
          </Typhograph>
        </InputLabel>
        <InputBox>
          <DefaultInput
            secureTextEntry={true}
            {...inputState.passwordConfirm}
            placeholder="비밀번호를 입력하세요. (영문+숫자+특수기호 8자리 이상)"
            textContentType="password"
          />
        </InputBox>
      </TextInputBox>

      <AgreeBox>
        <AgreeBoxItem>
          <CheckLabelButton
            active={state.isAgreeIndividualTerms}
            onPress={() => handleIndividualButtonClick()}
            iscenter
            title="개인정보처리방침 동의(필수)"
          />
        </AgreeBoxItem>
        <AgreeBoxItem>
          <CheckLabelButton
            active={state.isAgreeUseTerms}
            onPress={() => handleUseTermsButtonClick()}
            iscenter
            title="이용약관 동의(필수)"
          />
        </AgreeBoxItem>
      </AgreeBox>
      <TermsModal
        open={state?.termsModal}
        close={() => onChangeState('termsModal', false)}
        html={state.termsHtml}
        onPress={handleClickInModal}
      />
    </KeyboardAwareScrollView>
  );
}

//개인회원가입 정보입력 페이지
function JoinIndividualInfo({ state, inputState, onValueChange }) {
  const sexRef: any = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    if (inputState.idNumber.value.length === 6) {
      sexRef.current.focus();
    }
  }, [inputState.idNumber.value]);
  return (
    <>
      <KeyboardAwareScrollView
        style={{ width: screenWidth() - 40 }}
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === 'ios' ? -200 : -10}>
        <TextInputBox>
          <InputLabel>
            <Typhograph type="NOTO" weight="MEDIUM">
              이메일
            </Typhograph>
          </InputLabel>
          <InputBox>
            <DefaultInput
              {...inputState.email}
              keyboardType="email-address"
              placeholder="이메일주소를 입력하세요."
              textContentType="emailAddress"
            />
          </InputBox>
        </TextInputBox>

        <TextInputBox>
          <InputLabel>
            <Typhograph type="NOTO" weight="MEDIUM">
              이름
            </Typhograph>
          </InputLabel>
          <InputBox>
            <DefaultInput {...inputState.name} placeholder="이름을 입력하세요.(예:홍길동)" />
          </InputBox>
        </TextInputBox>
        <TextInputBox>
          <InputLabel>
            <Typhograph type="NOTO" weight="MEDIUM">
              휴대전화
            </Typhograph>
          </InputLabel>
          <InputBox2>
            <SelectBox style={{ width: '40%', marginRight: '2%' }}>
              <ServiceSelect
                value={state.selectService}
                items={state.serviceType}
                right={15}
                onValueChange={onValueChange}
              />
            </SelectBox>
            <InputItem style={{ width: '58%' }}>
              <DefaultInput {...inputState.phone} keyboardType="phone-pad" />
            </InputItem>
          </InputBox2>
        </TextInputBox>
        <TextInputBox>
          <InputLabel>
            <Typhograph type="NOTO" weight="MEDIUM">
              주민등록번호
            </Typhograph>
          </InputLabel>
          <InputBox2>
            <InputItem style={{ width: '50%' }}>
              <DefaultInput {...inputState.idNumber} keyboardType="numeric" maxLength={6} />
            </InputItem>
            <Typhograph type="NOTO" style={{ marginLeft: 10, marginRight: 10 }} lineheight={20}>
              -
            </Typhograph>
            <InputItem style={{ width: 30 }}>
              <Input
                {...inputState.sexNumber}
                blurOnSubmit={false}
                onFocus={() => setIsFocus(true)}
                onBlur={() => {
                  setIsFocus(false);
                }}
                ref={sexRef}
                style={{ alignSelf: 'stretch', fontSize: 13 }}
                maxLength={1}
                onSubmitEditing={() => Keyboard.dismiss()}
                keyboardType="numeric"
                isFocus={isFocus}
                autoCompleteType="off"
                numberOfLines={1}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
              />
            </InputItem>
            <Typhograph type="NOTO" color="GRAY3">
              ● ● ● ● ● ●
            </Typhograph>
          </InputBox2>
        </TextInputBox>
      </KeyboardAwareScrollView>
    </>
  );
}

export default function JoinIndividual({ state, onChangeState, inputState, onValueChange, handlePostJoin }) {
  const scrollRef: any = useRef(null);
  const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const phoneCheck = /^\d{3}\d{3,4}\d{4}$/;
  const juminFront = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;
  const navigaion = useNavigation();
  //정보입력 체크
  const checkInput = () => {
    if (inputState.email.value === '') {
      Toast.show('이메일을 입력해주세요.');
      return false;
    } else if (!emailCheck.test(inputState.email.value)) {
      Toast.show('올바른 이메일 주소를 입력해주세요.');
    } else if (inputState.name.value === '') {
      Toast.show('이름을 입력하세요.');
      return false;
    } else if (inputState.phone.value === '') {
      Toast.show('휴대 전화번호를 입력해주세요.');
      return false;
    } else if (!phoneCheck.test(inputState.phone.value)) {
      Toast.show('올바른 휴대 전화번호를 입력해주세요.');
      return false;
    } else if (inputState.idNumber.value === '' || inputState.idNumber.value.length < 6) {
      Toast.show('주민등록번호 앞자리를 입력해주세요.');
      return false;
    } else if (!juminFront.test(inputState.idNumber.value) || inputState.sexNumber.value > 2) {
      Toast.show('올바른 주민등록번호를 입력해주세요.');
      return false;
    } else if (inputState.sexNumber.value === '') {
      Toast.show('주민등록번호 뒤 첫번째 자리를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

  //비밀번호 체크 로직
  const checkPassword = () => {
    const pattern1 = /[0-9]/;
    const pattern2 = /[a-zA-Z]/;
    const pattern3 = /[~!@\#$%<>^&*]/;
    const pw = inputState.password.value;
    if (pw === '') {
      Toast.show('비밀번호를 입력하세요.');
      return false;
    } else if (!pattern1.test(pw) || !pattern2.test(pw) || !pattern3.test(pw) || pw.length < 8 || pw.length > 50) {
      Toast.show('영문+숫자+특수기호 8자리 이상으로 구성하여야 합니다.');
      return false;
    } else if (pw !== inputState.passwordConfirm.value) {
      Toast.show('확인된 비밀번호가 틀립니다.');
      return false;
    } else if (!state.isAgreeIndividualTerms) {
      Toast.show('개인정보 처리방침에 동의해주세요.');
    } else if (!state.isAgreeUseTerms) {
      Toast.show('이용약관에 동의해주세요.');
    } else {
      return true;
    }
  };

  // 다음버튼
  function handleNextButton() {
    if (state.currentPage === 'info') {
      if (checkInput()) {
        onChangeState('currentPage', 'password');
        scrollRef.current?.scrollTo({ x: screenWidth(), animated: true });
      }
    } else {
      if (checkPassword()) {
        handlePostJoin();
      }
    }
  }

  //이전버튼
  function handlePreviousButton() {
    onChangeState('currentPage', 'info');
    scrollRef.current?.scrollTo({
      x: screenWidth() * -1,
      animated: true,
    });
  }

  //개인회원 가입 페이지 리턴
  const returnComponent = (id: 'info' | 'password' | 'success') => {
    switch (id) {
      case 'info':
        return <JoinIndividualInfo key={id} state={state} inputState={inputState} onValueChange={onValueChange} />;
      case 'password':
        return <JoinIndividualPassword state={state} inputState={inputState} key={id} onChangeState={onChangeState} />;
    }
  };

  return (
    <>
      <TopArrow />
      <ContentsContainer>
        <ScrollView
          onScroll={() => null}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          scrollEventThrottle={100}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ref={scrollRef}>
          {state.individualStep?.map((item) => {
            return returnComponent(item.id);
          })}
        </ScrollView>
      </ContentsContainer>
      <BottomFixButton
        index={state.currentPage === 'info' ? 1 : 0}
        leftTitle="이전"
        rightTitle={state.currentPage === 'info' ? '다음' : '가입하기'}
        bottomRightPress={handleNextButton}
        bottomLeftPress={handlePreviousButton}
        isKeybordView={state.isKeybordView}
      />
    </>
  );
}
