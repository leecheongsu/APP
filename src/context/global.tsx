/**
 * Returns the sum of a and b
 * @param {}
 */
import React, { createContext, Dispatch, useReducer, useContext } from 'react';

//type
export type StateTypes = {
  user: any;
};
type StateNames = 'user';
type Action = { type: 'CHANGE'; name: StateNames; value: any } | { type: 'REMOVE'; name: StateNames };

type GlobalDispatch = Dispatch<Action>;
type Provider = {
  children: React.ReactNode;
};

const initialState = {
  user: undefined,
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
