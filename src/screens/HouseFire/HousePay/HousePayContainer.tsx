import React from 'react';
import HousePayPresenter from './HousePayPresenter';
import { handleApiError, priceDot } from '@app/lib';
import { EmptyLayout } from '@app/layout';
import { useGlobalState } from '@app/context';
import moment from 'moment';
import { useInput } from '@app/hooks';
import { Alert } from 'react-native';
import { insuApis } from '@app/api/Insurance';
import { HouseFireStateName, HouseFireStateTypes, TermsNames } from '@app/screens/HouseFire/HouseFireContainer';

type HousePayContainerTypes = {
  state: HouseFireStateTypes;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  handlePreviousButton: () => void;
  handleNextButton: () => void;
  onChangeTermsState: (name: TermsNames, value: any) => void;
  onClickTermsModalAgree: () => void;
  onClickTermsModalOpen: (name: any, html: any) => void;
  onClickAllCheck: (list: any, isActive: any) => void;
  resultBuildPrice: () => number;
  resultGajePrice: () => number;
};

export default function HousePayContainer({
  state,
  onChangeState,
  handlePreviousButton,
  handleNextButton,
  onChangeTermsState,
  onClickTermsModalAgree,
  onClickTermsModalOpen,
  onClickAllCheck,
  resultBuildPrice,
  resultGajePrice,
}: HousePayContainerTypes) {
  const globalState = useGlobalState();
  const insuPrice = priceDot(resultBuildPrice() + resultGajePrice());
  const selectInsu = state?.selectAddress?.premiums?.filter((item) => {
    return item.aply_yn === 'Y' && item.already_group_ins === state?.selectAddress.already_group_ins;
  });
  const insuEndDateYear = Number(state?.contractInsuInfo?.insDate?.slice(0, 4)) + 1;
  const insuEndDateMonth = state?.contractInsuInfo?.insDate?.slice(5, 7);
  const insuEndDateDay = Number(state?.contractInsuInfo?.insDate?.slice(8)) - 1;
  const filnalInsuEndDateDay =
    String(insuEndDateDay)?.length === 1 ? '0' + String(insuEndDateDay) : String(insuEndDateDay);
  const insuEndDate = insuEndDateYear + '-' + insuEndDateMonth + '-' + filnalInsuEndDateDay;

  const inputState = {
    card1: useInput(''),
    card2: useInput(''),
    card3: useInput(''),
    card4: useInput(''),
    cardYear: useInput(''),
    cardMonth: useInput(''),
    birthDay: useInput(''),
    pw: useInput(''),
  };

  //인풋 체크로직
  const checkInput = () => {
    const cardNumber =
      inputState.card1.value + inputState.card2.value + inputState.card3.value + inputState.card4.value;
    const cardYearAndMonth = inputState.cardYear.value + inputState.cardMonth.value;
    if (state.selectCard === '') {
      Alert.alert('알림', '카드사를 선택해주세요.');
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

  //최종 결제데이터
  const data = {
    user_id: globalState?.user?.email,
    data: {
      quote_no: state?.selectAddress?.quote_no,
      prod_code: state?.selectAddress?.product?.p_code,
      prod_name: state?.selectAddress?.product?.p_name,
      opayment: resultBuildPrice() + resultGajePrice(),
      amt_ins: state?.selectAddress?.amt_ins,
      polholder: globalState?.user?.name,
      insurant_a: state?.contractInsuInfo?.name,
      insurant_b: state?.contractInsuInfo?.name,
      premium: resultBuildPrice() + resultGajePrice(),
      insdate: moment(new Date()).format('YYYYMMDD'),
      ins_from: moment(state?.contractInsuInfo?.insDate).format('YYYYMMDD'),
      ins_to: moment(insuEndDate).format('YYYYMMDD'),
      ptype: '0',
      insloc: state?.selectAddress?.address,
      mobile: globalState?.user?.mobile,
      email: globalState?.user?.email,
      poption: state?.payway === 'card' ? '4' : '5',
      pbohumja_mobile: state?.contractInsuInfo?.mobile,
      jumin: state?.contractInsuInfo?.juminb,
      owner: state?.contractInsuInfo?.owner,
      pbohumja_birth: state?.contractInsuInfo?.pbohumjaBirth,
      advisor_no: String(state?.contractInsuInfo?.advisor_no),
      terms: {
        termsa_1: state.terms.TERMSA_1.isChecked,
        termsa_2: state.terms.TERMSA_2.isChecked,
        termsa_3: state.terms.TERMSA_3.isChecked,
        termsa_4: state.terms.TERMSA_4.isChecked,
        termsa_5: state.terms.TERMSA_5.isChecked,
        termsb_1: state.terms.TERMSB_1.isChecked,
        termsb_2: state.terms.TERMSB_2.isChecked,
        termsb_3: state.terms.TERMSB_3.isChecked,
        termsc_1: state.terms.TERMSC_1.isChecked,
        termsc_2: state.terms.TERMSC_2.isChecked,
        termsc_3: state.terms.TERMSC_3.isChecked,
        termsc_4: state.terms.TERMSC_4.isChecked,
        termsc_5: state.terms.TERMSC_5.isChecked,
        termsd_1: state.terms.TERMSC_1.isChecked,
        termsd_2: state.terms.TERMSC_2.isChecked,
        termsd_3: state.terms.TERMSC_3.isChecked,
        termse_1: state.terms.TERMSE_1.isChecked,
        termse_2: state.terms.TERMSE_2.isChecked,
        termse_3: state.terms.TERMSE_3.isChecked,
        termsf_1: state.terms.TERMSF_1.isChecked,
        termsg_1: state.terms.TERMSG_1.isChecked,
      },
      already_group_ins: state?.selectAddress?.already_group_ins,
      premiums: selectInsu,
    },
  };

  //카드 결제 액션
  const handleCardPay = () => {
    const card_number =
      inputState.card1.value + inputState.card2.value + inputState.card3.value + inputState.card4.value;
    const card_expire = inputState.cardYear.value + inputState.cardMonth.value;
    const reg_no = inputState.birthDay.value;
    const card_pw = inputState.pw.value;
    if (checkInput()) {
      const newData = {
        ...data,
        data: {
          ...data.data,
          card: {
            card_number,
            card_expire,
            reg_no,
            card_pw,
          },
        },
      };
      insuApis
        .postPay(newData)
        .then((res) => {
          if (res.status === 200) {
            handleNextButton();
          } else {
            Alert.alert('알림', `코드 :${res.status}`);
          }
        })
        .catch((e) => {
          handleApiError(e.response);
        });
    }
  };

  //카드사 선택
  const selectCard = (name) => {
    onChangeState('selectCard', name);
  };

  //결제 실행
  const submitNextButton = () => {
    handleCardPay();
  };

  //가상계좌완료되면 서버에서 받아오는 onmessage
  const onMessage = (e) => {
    const result = JSON.parse(e.nativeEvent.data);
    if (result.status === 'ok') {
      onChangeState('vbankResult', result?.data);
      const newData = {
        ...data,
        data: {
          ...data.data,
          vacct: {
            v_bank_name: result?.data?.P_FN_NM,
            v_bank_no: result?.data?.P_VACT_NUM,
            v_bank_due_date: result?.data?.P_VACT_DATE + result?.data?.P_VACT_TIME,
          },
        },
      };
      insuApis
        .postVbank(newData)
        .then((res) => {
          handleNextButton();
        })
        .catch((error) => {
          handlePreviousButton();
          handleApiError(error.response);
        });
    } else if (result.status === 'fail') {
      handlePreviousButton();
    } else {
    }
  };

  if (state.stepNumber === 12) {
    return (
      <HousePayPresenter
        state={state}
        submitNextButton={submitNextButton}
        handlePreviousButton={handlePreviousButton}
        onChangeTermsState={onChangeTermsState}
        onChangeState={onChangeState}
        onClickTermsModalAgree={onClickTermsModalAgree}
        onClickTermsModalOpen={onClickTermsModalOpen}
        onClickAllCheck={onClickAllCheck}
        insuPrice={insuPrice}
        selectInsu={selectInsu}
        selectCard={selectCard}
        inputState={inputState}
        onMessage={onMessage}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
