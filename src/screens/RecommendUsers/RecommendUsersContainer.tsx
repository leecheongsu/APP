import React, { useCallback, useEffect, useReducer } from 'react';
import RecommendUsersPresenter from './RecommendUsersPresenter';
import { userApis } from '@app/api/User';
import { handleApiError } from '@app/lib';
import { uniqBy } from 'lodash';
import { useInput } from '@app/hooks';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { useGlobalDispatch } from '@app/context';
import { BackHandler } from 'react-native';

export type RecommendUsersStateTypes = {
  selectCompanyItem: Array<any>;
  selectCompany: string;
  recommendUsers: Array<any>;
  selectRecommendUser: undefined;
  loading: boolean;
};

export type RecommendUsersStateName =
  | 'selectCompanyItem'
  | 'selectCompany'
  | 'recommendUsers'
  | 'selectRecommendUser'
  | 'loading';

type ActionTypes = { type: 'CHANGE'; name: RecommendUsersStateName; value: any };

function reducer(state: RecommendUsersStateTypes, action: ActionTypes) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
  }
}

const initialState: RecommendUsersStateTypes = {
  selectCompanyItem: [],
  selectCompany: 'all',
  recommendUsers: [],
  selectRecommendUser: undefined,
  loading: false,
};

export default function RecommendUsersContainer() {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const globalDispatch = useGlobalDispatch();
  const inputState = {
    searchInput: useInput(''),
  };

  const onChangeState = useCallback((name: RecommendUsersStateName, value) => {
    dispatch({ type: 'CHANGE', name, value });
  }, []);

  //리스트 추천인 선택함수
  const onClickRecommendUser = (user) => {
    onChangeState('selectRecommendUser', user);
  };

  //셀렉트 체인지
  const onValueChange = (value) => {
    inputState.searchInput.setValue('');
    onChangeState('selectCompany', value);
  };

  //취소버튼
  const bottomLeftPress = () => {
    navigation.goBack();
  };

  //선택 버튼
  const bottomRightPress = () => {
    if (state?.selectRecommendUser === undefined) {
      Toast.show('추천인을 선택해주세요');
    } else {
      globalDispatch({ type: 'CHANGE', name: 'recommendUser', value: state.selectRecommendUser });
      navigation.goBack();
    }
  };

  //추천인목록 선택한 부서,검색어에따른 값추출 함수
  const getRecommendRist = () => {
    const newRecommendUsers = state?.recommendUsers?.filter((item) => {
      if (state.selectCompany === 'all') {
        return item;
      } else {
        return item.company === state.selectCompany;
      }
    });

    if (inputState.searchInput.value !== '') {
      const newList: any = [];
      newRecommendUsers?.map((item) => {
        if (
          item?.name?.includes(inputState.searchInput.value) ||
          item?.mobile?.includes(inputState.searchInput.value)
        ) {
          newList.push(item);
        }
      });
      return newList;
    } else {
      return newRecommendUsers;
    }
  };

  //추천인목록 가져오는 api
  const getRecommendUser = () => {
    onChangeState('loading', true);
    userApis
      .getRecommendUsers()
      .then((res) => {
        if (res.status === 200) {
          const newSelectItem: any = [];
          res.data.map((item) => {
            const newItem = {
              label: item.company,
              value: item.company,
            };
            newSelectItem.push({ label: '소속,선택', value: 'all' });
            newSelectItem.push(newItem);
            onChangeState('selectCompanyItem', uniqBy(newSelectItem, 'label'));
            onChangeState('recommendUsers', res.data);
          });
        }
        onChangeState('loading', false);
      })
      .catch((e) => {
        handleApiError(e.response);
        onChangeState('loading', false);
      });
  };
  //추천인목록 가져오는 api실행
  useEffect(() => {
    getRecommendUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //안드로이드 백버튼 핸들러
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <RecommendUsersPresenter
      state={state}
      onChangeState={onChangeState}
      onValueChange={onValueChange}
      inputState={inputState}
      bottomLeftPress={bottomLeftPress}
      bottomRightPress={bottomRightPress}
      getRecommendRist={getRecommendRist}
      onClickRecommendUser={onClickRecommendUser}
    />
  );
}
