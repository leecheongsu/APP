import { insuApis } from '@app/api/Insurance';
import { useGlobalState } from '@app/context';
import { useInput } from '@app/hooks';
import { EmptyLayout } from '@app/layout';
import { handleApiError } from '@app/lib';
import { StormFloodName, StormFloodStateTypes } from '@app/screens/StormFlood/StormFloodContainer';
import React from 'react';
import { Alert } from 'react-native';
import StormFloodPayPresenter from './StormFloodPayPresenter';

type StormFloodPayContainerTypes = {
  state: StormFloodStateTypes;
  onChangeState: (name: StormFloodName, value: any) => void;
  handleNextButton: () => null | undefined;
  handlePreviousButton: () => void;
};

export default function StormFloodPayContainer({
  state,
  onChangeState,
  handleNextButton,
  handlePreviousButton,
}: StormFloodPayContainerTypes) {
  const globalState = useGlobalState();
  const inputState = {
    card1: useInput(''), //카드넘버1
    card2: useInput(''), //카드넘버2
    card3: useInput(''), //카드넘버3
    card4: useInput(''), //카드넘버4
    cardYear: useInput(''), //카드년도
    cardMonth: useInput(''), //카드월
    birthDay: useInput(''), //생년월일
    pw: useInput(''), //카드 비밀번호
  };

  //체크로직
  const checkInput = () => {
    const cardNumber =
      inputState.card1.value + inputState.card2.value + inputState.card3.value + inputState.card4.value;
    const cardYearAndMonth = inputState.cardYear.value + inputState.cardMonth.value;
    if (state?.isSign === false) {
      Alert.alert('알림', '전자서명을 진행해주세요.');
      return false;
    } else if (state.isSignConfirm === false) {
      Alert.alert('알림', '전자서명을 확인해주세요.');
      return false;
    } else if (state.selectCard === '') {
      Alert.alert('알림', '카드사를 선택해주세요.');
      return false;
    } else if (state.selectTerm === '') {
      Alert.alert('알림', '할부개월수를 선택해주세요.');
      return false;
    } else if (cardNumber.length !== 16) {
      Alert.alert('알림', '카드번호를 입력해주세요.');
      return false;
    } else if (cardYearAndMonth.length !== 4) {
      Alert.alert('알림', '카드유효기간을 입력해주세요.');
      return false;
    } else if (inputState.birthDay.value === '') {
      Alert.alert('알림', '생년월일/사업자번호를 입력해주세요.');
      return false;
    } else if (inputState.pw.value.length !== 2) {
      Alert.alert('알림', '카드비밀번호 앞2자리를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

  //카드 셀렉트 핸들러
  const selectCard = (name) => {
    onChangeState('selectCard', name);
  };

  //할부개월수 셀렉트 핸들러
  const selectTerm = (name) => {
    onChangeState('selectTerm', name);
  };

  //사인확인하기 핸들러
  const postDenial = () => {
    const data = {
      user_id: globalState.user.email,
      quote_no: state?.selectAddress?.quote_no,
      reg_no: globalState.jumina + globalState.juminb,
    };
    insuApis
      .postDenial(data)
      .then((res) => {
        if (res.status === 200) {
          onChangeState('signConfirmModal', true);
          onChangeState('signData', res.data);
        }
      })
      .catch((e) => {
        handleApiError(e.response);
      });
  };

  //결제하기 버튼
  const submitPay = () => {
    onChangeState('loading', true);
    const params = {
      user_id: globalState?.user?.email,
      data: {
        quote_no: state?.selectAddress?.quote_no,
        prod_code: state?.selectAddress?.product?.p_code,
        advisor_no: globalState?.recommendUser?.seq === undefined ? '' : String(globalState?.recommendUser?.seq),
        card: {
          regNo1: globalState?.jumina,
          regNo2: globalState?.juminb,
          cardNo1: inputState.card1.value,
          cardNo2: inputState.card2.value,
          cardNo3: inputState.card3.value,
          cardNo4: inputState.card4.value,
          cardDivide: state.selectTerm,
          validMonth: inputState.cardMonth.value,
          validYear: '20' + inputState.cardYear.value,
        },
        terms: {
          termsa_1: 1,
          termsa_2: 1,
          termsa_3: 1,
          termsa_4: 1,
          termsa_5: 1,
          termsb_1: 1,
          termsb_2: 1,
          termsb_3: 1,
          termsc_1: 1,
          termsc_2: 1,
          termsc_3: 1,
          termsc_4: 1,
          termsc_5: 1,
          termsd_1: 1,
          termsd_2: 1,
          termsd_3: 1,
          termse_1: 1,
          termse_2: 1,
          termse_3: 1,
          termsf_1: 1,
          termsg_2: 1,
        },
      },
    };
    // handleNextButton();
    insuApis
      .postWwPay(params)
      .then((res) => {
        onChangeState('loading', false);
        if (res.status === 200) {
          handleNextButton();
        }
      })
      .catch((e) => {
        handleApiError(e.response);
        onChangeState('loading', false);
      });
  };

  //다음버튼
  const nextButton = () => {
    if (checkInput()) {
      submitPay();
    }
  };
  if (state.stepNumber === 9) {
    return (
      <StormFloodPayPresenter
        state={state}
        nextButton={nextButton}
        onChangeState={onChangeState}
        handlePreviousButton={handlePreviousButton}
        inputState={inputState}
        selectCard={selectCard}
        postDenial={postDenial}
        selectTerm={selectTerm}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
