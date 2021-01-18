import 'styled-components';

declare module 'styled-components' {
  export type ColorName = 'WHITE' | 'BLUE';
  export interface DefaultTheme {
    color: {
      WHITE: string;
      BLUE: string;
    };
  }
}
