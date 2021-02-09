import 'styled-components';

declare module 'styled-components' {
  export type ColorName =
    | 'WHITE'
    | 'BLUE'
    | 'BLUE2'
    | 'TABLE_BACK'
    | 'SKYBLUE'
    | 'SKYBLUE3'
    | 'BLACK'
    | 'BLACK2'
    | 'BLACK3'
    | 'BORDER_GRAY'
    | 'GRAY'
    | 'GRAY2'
    | 'GRAY3'
    | 'INPUT_GRAY'
    | 'MENU_BACKGROUD_COLOR'
    | 'SOFTPUPLE'
    | 'SOFTPUPLE2'
    | 'SKYBLUE2'
    | 'SOFTGRAY'
    | 'DIVIDER_BACK'
    | 'LIGHTGRAY'
    | 'ROUND_STEPPER'
    | 'BACKGROUND_GRAY'
    | 'BLUE_RGB'
    | 'WARING_RED'
    | 'GRAY_RGB'
    | 'SOFTBLUE';
  export interface DefaultTheme {
    color: {
      BLACK: string;
      BLACK2: string;
      BLACK3: string;
      BORDER_GRAY: string;
      SKYBLUE2: string;
      TABLE_BACK: string;
      WHITE: string;
      BLUE: string;
      BLUE2: string;
      SOFTBLUE: string;
      GRAY: string;
      GRAY2: string;
      INPUT_GRAY: string;
      DIVIDER_BACK: string;
      GRAY3: string;
      BLUE_RGB: string;
      GRAY_RGB: string;
      SKYBLUE3: string;
      BACKGROUND_GRAY: string;
      SOFTPUPLE: string;
      SOFTPUPLE2: string;
      WARING_RED: string;
      ROUND_STEPPER: string;
      SKYBLUE: string;
      SOFTGRAY: string;
      LIGHTGRAY: string;
      MENU_BACKGROUD_COLOR: string;
    };
  }
}
