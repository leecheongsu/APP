import 'styled-components';

declare module 'styled-components' {
  export type ColorName = 'WHITE';
  export interface DefaultTheme {
    color: {
      WHITE: string;
    };
  }
}
