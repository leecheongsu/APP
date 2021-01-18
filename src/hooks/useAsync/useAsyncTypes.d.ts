export type ReducerType = {
  loading: boolean;
  data: any;
  error: any;
};

export type ActionType = {
  type: 'LOADING' | 'SUCCESS' | 'ERROR';
  data?: any;
  error?: any;
};
