/**
 * Returns the sum of a and b
 * @param {}
 */
import React, { createContext, Dispatch, useReducer, useContext } from 'react';

//type
export type StateTypes = {
  user: any;
  isAutoLogin: boolean | undefined;
  isLogin: boolean | undefined;
  password: string | undefined;
  recommendUser: any;
  selectAddress: any;
  isIdentityverification: boolean;
  insuType: any;
  isSplash: boolean;
  contractorAddress: any;
  companyName: any;
  companyNumber: any;
  isInfoModal: boolean;
  infoTitle: string;
  infoContents: any;
};
type StateNames =
  | 'user'
  | 'isAutoLogin'
  | 'isLogin'
  | 'password'
  | 'recommendUser'
  | 'selectAddress'
  | 'isIdentityverification'
  | 'insuType'
  | 'postWwPremium'
  | 'jumina'
  | 'juminb'
  | 'isMainModal'
  | 'electronicSignPreData'
  | 'homeFireTitle'
  | 'stormFloodTitle'
  | 'contractorAddress'
  | 'companyName'
  | 'companyNumber'
  | 'infoTitle' //안내모달 타이틀
  | 'infoContents' // 안내모달 컨텐츠
  | 'isInfoModal'; // 안내모달 flag
type Action =
  | { type: 'CHANGE'; name: StateNames; value: any }
  | { type: 'REMOVE'; name: StateNames }
  | { type: 'RESET' }
  | { type: 'LOGOUT' };

type GlobalDispatch = Dispatch<Action>;
type Provider = {
  children: React.ReactNode;
};

const initialState = {
  user: undefined,
  isAutoLogin: undefined,
  isLogin: undefined,
  password: undefined,
  recommendUser: undefined,
  isIdentityverification: false,
  isKakaoLogin: false,
  insuType: undefined,
  postWwPremium: undefined,
  jumina: '',
  juminb: '',
  isMainModal: false,
  electronicSignPreData: undefined,
  homeFireTitle: '가입구분',
  stormFloodTitle: '상품안내',
  constractorAddress: '',
  companyName: null,
  companyNumber: null,
  isInfoModal: false,
  infoTitle: '',
  infoContents: '',
};

//context
const stateContext = createContext<any>(undefined);
const dispatchContext = createContext<GlobalDispatch | undefined>(undefined);

/**
 * reducer
 * @param {state}   : object
 * @param {action}  : action type
 */
function globalReducer(state: StateTypes, action: Action): any {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'REMOVE':
      return {
        ...state,
        [action.name]: undefined,
      };
    case 'RESET':
      return {
        ...state,
        user: undefined,
        isAutoLogin: undefined,
        isLogin: undefined,
        password: undefined,
        recommendUser: undefined,
        isIdentityverification: false,
        insuType: undefined,
        postWwPremium: undefined,
        jumina: '',
        juminb: '',
        electronicSignPreData: undefined,
      };
    case 'LOGOUT':
      return {
        user: undefined,
        isAutoLogin: false,
        isLogin: false,
        password: undefined,
      };
    default:
      return { state };
    /**
     * @see default return or throw Error
     */
    //  throw new Error('Unhandled action');
  }
}

// Provider
export function GlobalContextProvider({ children }: Provider) {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  return (
    <dispatchContext.Provider value={dispatch}>
      <stateContext.Provider value={state}>{children}</stateContext.Provider>
    </dispatchContext.Provider>
  );
}

// useState
export function useGlobalState() {
  const state = useContext(stateContext);
  if (!state) {
    throw new Error('useGlobalState not found');
  }
  return state;
}

// useDispatch
export function useGlobalDispatch() {
  const dispatch = useContext(dispatchContext);
  if (!dispatch) {
    throw new Error('useGlobalDispatch not found');
  }
  return dispatch;
}
