import React, { useEffect, useRef, useState } from 'react';
import styled from '@app/style/typed-components';
import {
  BottomFixButton,
  DefaultInput,
  FocusAwareStatusBar,
  FullLabel,
  OverayLoading,
  ServiceSelect,
  Typhograph,
} from '@app/components';
import { ScrollView } from 'react-native-gesture-handler';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import { Keyboard } from 'react-native';
import { insuIcon } from '@app/assets';
import { FindEmailStateNames, FindEmailStateTypes } from '@app/screens/FindEmail/FindEmailContainer';

type FindEmailPresenterTypes = {
  state: FindEmailStateTypes;
  onChangeState: (name: FindEmailStateNames, value: any) => void;
  handleNextButton(): void;
  handlePreviousButton(): void;
  scrollRef: any;
  inputState: {
    name: {
      value: string;
      onChangeText: (text: string) => void;
      setValue: React.Dispatch<React.SetStateAction<string>>;
    };
    phone: {
      value: string;
      onChangeText: (text: string) => void;
      setValue: React.Dispatch<React.SetStateAction<string>>;
    };
    jumina: {
      value: string;
      onChangeText: (text: string) => void;
      setValue: React.Dispatch<React.SetStateAction<string>>;
    };
    idNumber: {
      value: string;
      onChangeText: (text: string) => void;
      setValue: React.Dispatch<React.SetStateAction<string>>;
    };
    sex: {
      value: string;
      onChangeText: (text: string) => void;
      setValue: React.Dispatch<React.SetStateAction<string>>;
    };
  };
  onValueChange: (value: any) => void;
};

const Container = styled.View``;
const ContentsContainer = styled.View`
  width: ${screenWidth()}px;
`;
const ContentsBox = styled.View`
  padding: 10px 20px;
  height: 500px;
`;
const InputContainer = styled.View`
  justify-content: center;
  margin-top: 10px;
`;
const LabelBox = styled.View`
  margin-top: 10px;
`;
const InputBox = styled.View`
  margin-top: 5px;
`;
const InputBox2 = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const SelectBox = styled.View`
  border-width: 1px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border-color: ${theme.color.BORDER_GRAY};
`;

const ResultEmailContainer = styled.ScrollView`
  padding: 20px;
`;
const ResultEmailBox = styled.View`
  background-color: ${theme.color.GRAY2};
  padding: 30px 0px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const InfoBox = styled.View`
  padding: 50px 0px;
  align-items: center;
`;

const RowBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CheckIcon = styled.Image`
  width: 66px;
  height: 66px;
`;
const InfoTextBox = styled.View`
  margin-top: 10px;
`;
const PaddingBox = styled.View`
  height: 100px;
`;
const NumberBox = styled.View`
  width: 58%;
`;

function ConfirmConatiner({ state }) {
  return (
    <ContentsContainer>
      <FullLabel title={`인슈로보에 등록하신${'\n'} 본인의 이메일은 아래와 같습니다.`} />

      <ResultEmailContainer>
        {state?.userEmail !== '' &&
          state?.userEmail?.map((item, index) => {
            return (
              <ResultEmailBox key={index}>
                <Typhograph type="NOTO" color="BLACK3" weight="REGULAR">
                  {item?.email}
                </Typhograph>
              </ResultEmailBox>
            );
          })}

        <InfoBox>
          <CheckIcon source={insuIcon.BTN_ON} />
          <InfoTextBox>
            <Typhograph type="NOTO" color="BLACK3">
              확인을 누르시면 로그인 페이지로 이동합니다.
            </Typhograph>
          </InfoTextBox>
        </InfoBox>
        <PaddingBox />
      </ResultEmailContainer>
    </ContentsContainer>
  );
}

function InputConatiner({ inputState, state, onValueChange }) {
  const sexRef: any = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    if (inputState.jumina.value.length === 6) {
      sexRef.current.focus();
    }
  }, [inputState.jumina.value]);
  return (
    <>
      <ContentsContainer>
        <FullLabel title={`회원가입시 입력한 고객님의${'\n'} 정보(이름, 휴대폰, 생년월일)을 입력하여 주세요.`} />
        <ContentsBox>
          <InputContainer>
            <LabelBox>
              <Typhograph type="NOTO">이름</Typhograph>
            </LabelBox>
            <InputBox>
              <DefaultInput {...inputState?.name} placeholder="이름을 입력하세요(예:홍길동)" />
            </InputBox>
          </InputContainer>

          <InputContainer>
            <LabelBox>
              <Typhograph type="NOTO" weight="MEDIUM">
                휴대전화
              </Typhograph>
            </LabelBox>
            <InputBox>
              <RowBox>
                <SelectBox style={{ width: '40%', marginRight: '2%' }}>
                  <ServiceSelect
                    value={state.selectService}
                    items={state.serviceType}
                    right={15}
                    onValueChange={onValueChange}
                  />
                </SelectBox>
                <NumberBox>
                  <DefaultInput {...inputState.phone} keyboardType="phone-pad" maxLength={11} />
                </NumberBox>
              </RowBox>
            </InputBox>
          </InputContainer>

          <InputContainer>
            <LabelBox>
              <Typhograph type="NOTO" weight="MEDIUM">
                주민등록번호
              </Typhograph>
            </LabelBox>
            <InputBox2>
              <InputBox style={{ width: '50%' }}>
                <DefaultInput
                  {...inputState.jumina}
                  keyboardType="numeric"
                  maxLength={6}
                  placeholder="생년월일 6자리"
                />
              </InputBox>
              <Typhograph type="NOTO" style={{ marginLeft: 10, marginRight: 10 }} lineheight={20}>
                -
              </Typhograph>
              <InputBox style={{ width: 30 }}>
                <DefaultInput
                  {...inputState.sex}
                  blurOnSubmit={false}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => {
                    setIsFocus(false);
                  }}
                  propsRef={sexRef}
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
              </InputBox>
              <Typhograph type="NOTO" color="GRAY3">
                ● ● ● ● ● ●
              </Typhograph>
            </InputBox2>
          </InputContainer>
        </ContentsBox>
      </ContentsContainer>
    </>
  );
}

function FindEmailPresenter({
  state,
  onChangeState,
  handleNextButton,
  handlePreviousButton,
  scrollRef,
  inputState,
  onValueChange,
}: FindEmailPresenterTypes) {
  return (
    <>
      <OverayLoading visible={state?.loading} />
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Container>
        <ScrollView
          onScroll={() => null}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          scrollEventThrottle={100}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ref={scrollRef}>
          <InputConatiner inputState={inputState} state={state} onValueChange={onValueChange} />
          <ConfirmConatiner state={state} />
        </ScrollView>
      </Container>
      <BottomFixButton
        index={state.currentPage}
        leftTitle="이전"
        rightTitle="확인"
        bottomRightPress={handleNextButton}
        bottomLeftPress={handlePreviousButton}
        isKeybordView={false}
      />
    </>
  );
}

export default FindEmailPresenter;
