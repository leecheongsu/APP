/* eslint-disable eslint-comments/no-unlimited-disable */
import { ActionType, ReducerType } from '@app/hooks/useAsync/useAsyncTypes';
import { handleApiError } from '@app/lib';
import { useReducer, useEffect } from 'react';

function reducer(state, action: ActionType): ReducerType {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error('Unhandled action type: ${action.type}');
  }
}

export default function useAsync(callback, deps: any = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  });
  const fetchData: any = async () => {
    dispatch({ type: 'LOADING' });

    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      handleApiError(e.response);
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    if (skip) {
      return;
    }
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}
