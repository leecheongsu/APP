import { EmptyLayout } from '@app/layout';
import { sortArray2 } from '@app/lib';
import { HouseFireStateName, HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';
import React, { useCallback, useEffect, useReducer } from 'react';
import SimpleToast from 'react-native-simple-toast';
import HouseEvaluationPresenter from './HouseEvaluationPresenter';

type HouseEvaluationContainerTypes = {
  state: HouseFireStateTypes;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  handleNextButton: () => void;
  handlePreviousButton: () => void;
  resultBuildPrice: () => number;
  resultGajePrice: () => number;
};

export type evaluationStateTypes = {
  BCMP: any;
  groupBCMP: any;
  listBCMP: Array<any>;
  listGroupBCMP: Array<any>;
  KSTL: any;
  groupKSTL: any;
  listKSTL: Array<any>;
  listGroupKSTL: Array<any>;
  KLCK: any;
  groupKLCK: any;
  listKLCK: Array<any>;
  listGroupKLCK: Array<any>;
  KFRE: any;
  listKFRE: Array<any>;
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
  }
}

const initialState = {
  BCMP: {}, //건물 (대물대상책임)
  groupBCMP: {}, //건물 (대물대상책임) 단체
  listBCMP: [], //건물 (대물대상책임) 리스트
  listGroupBCMP: [], //건물 (대물대상책임)단체 리스트
  KSTL: {}, // 가재도난위험
  groupKSTL: {}, // 가재도난위험 단체
  listKSTL: [], // 가재도난위험 리스트
  listGroupKSTL: [], // 가재도난위험 단체 리스트
  KLCK: {}, // 잠금장치
  groupKLCK: {}, // 잠금장치 단체
  listKLCK: [], // 잠금장치 리스트
  listGroupKLCK: [], // 잠금장치 단체 리스트
  KFRE: {}, // 가재도구 화재/폭발/파열
  listKFRE: [], // 가재도구 화재/폭발//파열
};

export default function HouseEvaluationContainer({
  state,
  onChangeState,
  handlePreviousButton,
  handleNextButton,
  resultBuildPrice,
  resultGajePrice,
}: HouseEvaluationContainerTypes) {
  const [evaluationState, evaluationDispatch] = useReducer(reducer, initialState);
  const evalutionChangeState = useCallback((name, value) => {
    evaluationDispatch({ type: 'CHANGE', name, value });
  }, []);

  //단체보험 가입 /미가입 선택버튼 핸들러
  const clickDancheButton = useCallback(
    (value) => {
      const newPremiums: any = [];
      state?.selectAddress?.premiums?.map((i) => {
        if (i.item_id === 'BFRE') {
          const newItem = {
            ...i,
            aply_yn: 'Y',
          };
          newPremiums.push(newItem);
        } else {
          const newItem = {
            ...i,
            aply_yn: 'N',
          };
          newPremiums.push(newItem);
        }
      });
      const newSelectAddress = {
        ...state?.selectAddress,
        already_group_ins: value,
        premiums: newPremiums,
      };
      onChangeState('selectAddress', newSelectAddress);
    },
    [onChangeState, state.selectAddress]
  );

  //리스트 체크박스 선택버튼 핸들러
  const clickCheckBox = useCallback(
    (name, isToggle, isSelect) => {
      const newList: any = [];
      if (!isSelect) {
        if (name === 'KFRE') {
          state?.selectAddress?.premiums?.map((i) => {
            if (i.item_id === 'KDRG' || i.item_id === 'KLCK' || i.item_id === 'KSTL') {
              const newItem = {
                ...i,
                aply_yn: 'N',
              };
              newList.push(newItem);
            } else {
              if (i.item_id === name && i.already_group_ins === state.selectAddress.already_group_ins) {
                const newItem = {
                  ...i,
                  aply_yn: isToggle ? 'Y' : 'N',
                };
                newList.push(newItem);
              } else {
                newList.push(i);
              }
            }
          });
        } else {
          state?.selectAddress?.premiums?.map((i) => {
            if (i.item_id === name && i.already_group_ins === state.selectAddress.already_group_ins) {
              const newItem = {
                ...i,
                aply_yn: isToggle ? 'Y' : 'N',
              };
              newList.push(newItem);
            } else {
              newList.push(i);
            }
          });
        }
      } else {
        if (name === 'KFRE') {
          const select =
            state?.selectAddress?.already_group_ins === 'Y' ? evaluationState['group' + name] : evaluationState[name];
          state?.selectAddress?.premiums?.map((i) => {
            if (i.item_id === 'KDRG' || i.item_id === 'KLCK' || i.item_id === 'KSTL') {
              const newItem = {
                ...i,
                aply_yn: 'N',
              };
              newList.push(newItem);
            } else if (
              i.already_group_ins === select.already_group_ins &&
              i.ins_name === select.ins_name &&
              i.item_id === select.item_id
            ) {
              const newItem = {
                ...i,
                aply_yn: isToggle ? 'Y' : 'N',
              };
              newList.push(newItem);
            } else {
              newList.push(i);
            }
          });
        } else {
          const select =
            state?.selectAddress?.already_group_ins === 'Y' ? evaluationState['group' + name] : evaluationState[name];
          state?.selectAddress?.premiums?.map((i) => {
            if (
              i.already_group_ins === select.already_group_ins &&
              i.ins_name === select.ins_name &&
              i.item_id === select.item_id
            ) {
              const newItem = {
                ...i,
                aply_yn: isToggle ? 'Y' : 'N',
              };
              newList.push(newItem);
            } else {
              newList.push(i);
            }
          });
        }
      }
      const newSelectAddress = {
        ...state?.selectAddress,
        premiums: newList,
      };
      onChangeState('selectAddress', newSelectAddress);
    },
    [evaluationState, onChangeState, state.selectAddress]
  );

  //리스트별 보험료값
  const eachPrice = (name: any) => {
    switch (state?.selectAddress?.already_group_ins) {
      case 'Y': {
        const filterItem = state?.selectAddress?.premiums?.filter((item: any) => {
          return item.item_id === name && item.already_group_ins === 'Y';
        })[0];
        return filterItem === undefined ? 0 : filterItem;
      }
      case 'N': {
        const filterItem = state?.selectAddress?.premiums?.filter((item: any) => {
          return item.item_id === name && item.already_group_ins === 'N';
        })[0];
        return filterItem === undefined ? 0 : filterItem;
      }
      default:
        return 0;
    }
  };

  //infomodal open
  const openInfoModal = (title, contents) => {
    onChangeState('infoTitle', title);
    onChangeState('infoContents', contents);
    onChangeState('isInfoModal', true);
  };

  const onValueChange = useCallback(() => {
    (item) => {
      const newPremiums: any = [];
      state?.selectAddress?.premiums.map((i) => {
        if (i.item_id === item.item_id) {
          const newItem = {
            ...i,
            aply_yn: 'N',
          };
          newPremiums.push(newItem);
        } else {
          newPremiums.push(i);
        }
      });
      const newSelectAddress = {
        ...state.selectAddress,
        premiums: newPremiums,
      };
      onChangeState('selectAddress', newSelectAddress);
      if (item.already_group_ins === 'Y') {
        evalutionChangeState('group' + item.item_id, item);
      } else {
        evalutionChangeState(item.item_id, item);
      }
    };
  }, [evalutionChangeState, onChangeState, state.selectAddress]);

  const setSelectList = (name, listName, group) => {
    const newList: any = [];
    state?.selectAddress?.premiums?.map((item: any) => {
      if (item.item_id === name && item.already_group_ins === group) {
        const newItem = {
          label: item.ins_name,
          value: item,
        };
        newList.push(newItem);
      }
    });
    if (group === 'Y') {
      evalutionChangeState(listName, sortArray2(newList, 'ins_amt'));
      evalutionChangeState('group' + [name], sortArray2(newList, 'ins_amt')?.[0]?.value);
    } else {
      evalutionChangeState(name, sortArray2(newList, 'ins_amt')?.[0]?.value);
      evalutionChangeState(listName, sortArray2(newList, 'ins_amt'));
    }
  };

  const gajeListClick = (name, isToggle, isSelect) => {
    const isChecked =
      state?.selectAddress?.premiums?.filter((item) => {
        return item.item_id === 'KFRE' && item.aply_yn === 'Y';
      })?.length > 0;
    if (isChecked) {
      clickCheckBox(name, isToggle, isSelect);
    } else {
      SimpleToast.show('가재도구 기본담보(보통약관)을 선택후 선택가능합니다.');
    }
  };

  useEffect(() => {
    if (state?.selectAddress?.premiums !== undefined && evaluationState.listBCMP?.length === 0) {
      if (state.selectType === 'T') {
        setSelectList('KFRE', 'listKFRE', 'N');
        setSelectList('BCMP', 'listBCMP', 'N');
        setSelectList('KSTL', 'listKSTL', 'N');
        setSelectList('KLCK', 'listKLCK', 'N');
      } else {
        setSelectList('BCMP', 'listBCMP', 'N');
        setSelectList('BCMP', 'listGroupBCMP', 'Y');
        setSelectList('KSTL', 'listKSTL', 'N');
        setSelectList('KSTL', 'listGroupKSTL', 'Y');
        setSelectList('KLCK', 'listKLCK', 'N');
        setSelectList('KLCK', 'listGroupKLCK', 'Y');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleNextButton, handlePreviousButton]);
  if (state.stepNumber === 5) {
    return (
      <HouseEvaluationPresenter
        state={state}
        handlePreviousButton={handlePreviousButton}
        handleNextButton={handleNextButton}
        openInfoModal={openInfoModal}
        clickCheckBox={clickCheckBox}
        eachPrice={eachPrice}
        clickDancheButton={clickDancheButton}
        resultBuildPrice={resultBuildPrice}
        evaluationState={evaluationState}
        onValueChange={onValueChange}
        resultGajePrice={resultGajePrice}
        gajeListClick={gajeListClick}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
