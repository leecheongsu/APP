import React, { useEffect, useRef } from 'react';
import { BottomFixButton, DefaultInput, OverayLoading, Select, Typhograph } from '@app/components';
import { screenWidth } from '@app/lib';
import { HouseFireStateName, HouseFireStateTypes, TermsNames } from '@app/screens/HouseFire/HouseFireContainer';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, StatusBar } from 'react-native';
import WebView from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';
import { useGlobalState } from '@app/context';

type HousePayPresenterTypes = {
  state: HouseFireStateTypes;
  onClickTermsModalOpen: (name: any, html: any) => void;
  handlePreviousButton: () => void;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  insuPrice: number;
  submitNextButton: () => void;
  onChangeTermsState: (name: TermsNames, value: any) => void;
  onClickTermsModalAgree: () => void;
  onClickAllCheck: (list: any, isActive: any) => void;
  selectInsu: any;
  selectCard: (name) => any;
  inputState: any;
  onMessage: any;
};
const Container = styled.View`
  width: ${screenWidth()}px;
`;
const ContentsContainer = styled.ScrollView`
  padding: 20px;
`;
const TitleBox = styled.View`
  padding-bottom: 10px;
  background-color: ${theme.color.GRAY2};
`;

const TitleBox2 = styled.View`
  padding: 10px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
`;

const InfoBox = styled.View`
  margin-top: 10px;
`;

const RowBox = styled.View`
  margin-top: 5px;
  flex-direction: row;
  justify-content: space-between;
`;
const RowItem = styled.View``;

const SelectBox = styled.View``;

const LabelBox = styled.View`
  padding: 10px 0px;
`;
const InputBox = styled.View``;
const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const InputItem = styled.View`
  width: 24%;
`;

function HousePayPresenter({
  state,
  submitNextButton,
  handlePreviousButton,
  onChangeState,
  insuPrice,
  selectCard,
  inputState,
  onMessage,
}: HousePayPresenterTypes) {
  const globalState = useGlobalState();
  const selectItem = [
    { label: '삼성', value: '삼성' },
    { label: 'KB국민', value: 'KB국민' },
    { label: '현대', value: '현대' },
    { label: '비씨', value: '비씨' },
    { label: '신한', value: '신한' },
    { label: 'NH농협', value: 'NH농협' },
    { label: '롯데', value: '롯데' },
  ];
  const vbankInfo = state?.vbankInfo;
  const name = globalState?.user?.name;
  const email = globalState?.user?.email;
  const mobile = globalState?.user?.mobile;
  const product = state?.selectAddress?.product;
  const card2Ref: any = useRef(null);
  const card3Ref: any = useRef(null);
  const card4Ref: any = useRef(null);
  const yyRef: any = useRef(null);

  //카드인풋 자동 다음칸이동
  useEffect(() => {
    const inputCardLength =
      inputState.card1.value + inputState.card2.value + inputState.card3.value + inputState.card4.value;
    if (inputState.card1.value.length === 4 && inputCardLength.length === 4) {
      card2Ref.current.focus();
    } else if (inputState.card2.value.length === 4 && inputCardLength.length === 8) {
      card3Ref.current.focus();
    } else if (inputState.card3.value.length === 4 && inputCardLength.length === 12) {
      card4Ref.current.focus();
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState.card1.value, inputState.card2.value, inputState.card3.value]);

  //웹뷰에서 키보드 입력하면 status바 없어지는거 방지
  const _keyboardDidShow = () => {
    StatusBar.setBarStyle('dark-content');
  };

  const _keyboardDidHide = () => {
    StatusBar.setBarStyle('dark-content');
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //카드 유효기간 다음칸 자동이동
  useEffect(() => {
    const inputTermLength = inputState.cardMonth.value + inputState.cardYear.value;
    if (inputState.cardMonth.value.length === 2 && inputTermLength.length === 2) {
      yyRef.current.focus();
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState.cardMonth.value]);
  const html = `
  <html> 
  <head> 
  <title>INIpay Mobile WEB example</title> 
  <meta http-equiv="Content-Type" content="text/html; charset=euc-kr"/> 
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
  <script language="javascript"> 
    window.onload = function on_pay() { 
      form = document.mobileweb; 
      form.action = "https://mobile.inicis.com/smart/payment/";
      form.target = "_self";
      form.submit(); 
    }  
  </script> 

  </head> 

  <body>
  <!-- 인코딩 euc-kr 필수 -->
  <form name="mobileweb" method="post" accept-charset="euc-kr"> 


  <!--*************************필수 세팅 부분************************************-->

  <!-- 리턴받는 가맹점 URL 세팅 -->
  <input h type="hidden" name="P_NEXT_URL" value="${vbankInfo?.P_NEXT_URL}"> 
  
  
  <!-- 지불수단 선택 (신용카드,계좌이체,가상계좌,휴대폰) -->
  <input type="hidden" name="P_INI_PAYMENT" value=${vbankInfo?.P_INI_PAYMENT}>
   


  <!-- 복합/옵션 파라미터 -->
  <input type="hidden" name="P_RESERVED" value="twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N"> 

    
  <input type="hidden" name="P_MID" value="${vbankInfo?.P_MID}"> 
  <input type="hidden" name="P_OID" value="${state?.selectAddress?.quote_no}">  
  <input type="hidden" name="P_UNAME" value="${name}"> 


  <!--*************************선택 필수 세팅 부분************************************--> 

  <!-- 가상계좌 입금 노티 사용시 필수 -->
  <input type="hidden" name="P_NOTI_URL" value="${vbankInfo?.P_NOTI_URL}">  


  <!-- 휴대폰결제 필수 [1:컨텐츠, 2:실물] -->
  <input type="hidden" name="P_HPP_METHOD" value="${vbankInfo?.P_HPP_METHOD}">  

  <!--*************************선택 필수 세팅 부분************************************--> 

  <input type="hidden" name="P_EMAIL" value="${email}"> 
  <input type="hidden" name="P_MOBILE" value="${mobile}"> 
  <input type="hidden" name="P_MNAME" value="인슈로보">
  <input type="hidden" name="P_GOODS" value="${product?.p_name}"> 
  <input type="hidden" name="P_AMT" value="${insuPrice}"> 
  <input type="hidden" name="P_CHARSET" value="${vbankInfo?.P_CHARSET}"> 
  <input type="hidden" name="P_VBANK_TM" value="${vbankInfo?.P_VBANK_TM}"> 
  <input type="hidden" name="P_VBANK_DT" value="${vbankInfo?.P_VBANK_DT}"> 


  </form> 

  </body>
  </html> 
  `;
  return (
    <Container>
      {state?.payway === 'card' ? (
        <>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraScrollHeight={Platform.OS === 'ios' ? 30 : -10}
            enableResetScrollToCoords={false}>
            <TitleBox>
              <RowBox style={{ padding: 15 }}>
                <RowItem>
                  <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={15}>
                    총 결제 보험료
                  </Typhograph>
                </RowItem>
                <RowItem>
                  <Typhograph type="ROBOTO" color="SKYBLUE" weight="BOLD" size={17}>
                    {insuPrice}
                    <Typhograph type="NOTO" color="BLACK2">
                      원
                    </Typhograph>
                  </Typhograph>
                </RowItem>
              </RowBox>
            </TitleBox>

            <ContentsContainer>
              <TitleBox2>
                <Typhograph type="NOTO" weight="BOLD" color="BLUE" size={15}>
                  신용카드 결제 정보
                </Typhograph>
              </TitleBox2>

              <SelectBox>
                <LabelBox>
                  <Typhograph type="NOTO" color="BLACK2">
                    카드사
                  </Typhograph>
                </LabelBox>
                <Select
                  items={selectItem}
                  label="카드사를 선택해주세요."
                  value={state.selectCard}
                  onValueChange={selectCard}
                  borderColor="BORDER_GRAY"
                />
              </SelectBox>

              <InputBox>
                <LabelBox>
                  <Typhograph type="NOTO" color="BLACK2">
                    카드번호
                  </Typhograph>
                </LabelBox>
                <InputContainer>
                  <InputItem>
                    <DefaultInput {...inputState.card1} keyboardType="numeric" maxLength={4} />
                  </InputItem>
                  <InputItem>
                    <DefaultInput {...inputState.card2} propsRef={card2Ref} keyboardType="numeric" maxLength={4} />
                  </InputItem>
                  <InputItem>
                    <DefaultInput {...inputState.card3} propsRef={card3Ref} keyboardType="numeric" maxLength={4} />
                  </InputItem>
                  <InputItem>
                    <DefaultInput {...inputState.card4} propsRef={card4Ref} keyboardType="numeric" maxLength={4} />
                  </InputItem>
                </InputContainer>
              </InputBox>

              <InputBox>
                <LabelBox>
                  <Typhograph type="NOTO" color="BLACK2">
                    카드유효기간
                  </Typhograph>
                </LabelBox>
                <InputContainer style={{ justifyContent: 'flex-start' }}>
                  <InputItem style={{ marginRight: 5 }}>
                    <DefaultInput {...inputState.cardMonth} placeholder="MM" keyboardType="numeric" maxLength={2} />
                  </InputItem>
                  <InputItem>
                    <DefaultInput
                      {...inputState.cardYear}
                      propsRef={yyRef}
                      placeholder="YY"
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  </InputItem>
                </InputContainer>
              </InputBox>

              <InputBox>
                <LabelBox>
                  <Typhograph type="NOTO" color="BLACK2">
                    생년월일(6자리 예:990101) / 사업자번호
                  </Typhograph>
                </LabelBox>
                <InputContainer style={{ justifyContent: 'flex-start' }}>
                  <InputItem style={{ width: '100%' }}>
                    <DefaultInput {...inputState.birthDay} placeholder="YYMMDD" keyboardType="numeric" maxLength={6} />
                  </InputItem>
                </InputContainer>
              </InputBox>

              <InputBox>
                <LabelBox>
                  <Typhograph type="NOTO" color="BLACK2">
                    카드비밀번호 앞 2자리
                  </Typhograph>
                </LabelBox>
                <InputContainer style={{ justifyContent: 'flex-start' }}>
                  <InputItem style={{ marginRight: 5 }}>
                    <DefaultInput {...inputState.pw} keyboardType="numeric" maxLength={2} />
                  </InputItem>
                  <InputItem>
                    <Typhograph type="NOTO" color="GRAY">
                      ● ●
                    </Typhograph>
                  </InputItem>
                </InputContainer>
              </InputBox>
            </ContentsContainer>
          </KeyboardAwareScrollView>
          <BottomFixButton
            index={state.stepNumber}
            leftTitle="이전"
            rightTitle="결제"
            bottomRightPress={submitNextButton}
            bottomLeftPress={handlePreviousButton}
            isKeybordView={state.isKeybordView}
          />
        </>
      ) : (
        <>
          <ScrollView style={{ height: 800 }}>
            <WebView
              style={{
                minHeight: 1000,
              }}
              source={{
                html,
              }}
              onMessage={onMessage}
              originWhitelist={'["*"]'}
              startInLoadingState={true}
              onLoadStart={(syntheticEvent) => {
                // update component to be aware of loading status
                const { nativeEvent } = syntheticEvent;
                onChangeState('loading', nativeEvent.loading);
              }}
              renderLoading={() => <OverayLoading visible={true} />}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scalesPageToFit={true}
              scrollEnabled={false}
            />
          </ScrollView>
        </>
      )}
    </Container>
  );
}

export default HousePayPresenter;
