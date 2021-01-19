import 'styled-components';

declare module 'styled-components' {
  export type ColorName =
    | 'WHITE'
    | 'BLUE'
    | 'SKYBLUE'
    | 'BLACK'
    | 'GRAY'
    | 'MENU_BACKGROUD_COLOR'
    | 'SOFTPUPLE'
    | 'SOFTGRAY'
    | 'SOFTBLUE';
  export interface DefaultTheme {
    color: {
      BLACK: string;
      WHITE: string;
      BLUE: string;
      SOFTBLUE: string;
      GRAY: string;
      SOFTPUPLE: string;
      SKYBLUE: string;
      SOFTGRAY: string;
      MENU_BACKGROUD_COLOR: string;
    };
  }
}
