import 'styled-components';

declare module 'styled-components' {
  export type ColorName =
    | 'WHITE'
    | 'BLUE'
    | 'SKYBLUE'
    | 'SKYBLUE3'
    | 'BLACK'
    | 'BLACK2'
    | 'BLACK3'
    | 'BORDER_GRAY'
    | 'GRAY'
    | 'GRAY2'
    | 'GRAY3'
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
    | 'GRAY_RGB'
    | 'SOFTBLUE';
  export interface DefaultTheme {
    color: {
      BLACK: string;
      BLACK2: string;
      BLACK3: string;
      BORDER_GRAY: string;
      SKYBLUE2: string;
      WHITE: string;
      BLUE: string;
      SOFTBLUE: string;
      GRAY: string;
      GRAY2: string;
      DIVIDER_BACK: string;
      GRAY3: string;
      BLUE_RGB: string;
      GRAY_RGB: string;
      SKYBLUE3: string;
      BACKGROUND_GRAY: string;
      SOFTPUPLE: string;
      SOFTPUPLE2: string;
      ROUND_STEPPER: string;
      SKYBLUE: string;
      SOFTGRAY: string;
      LIGHTGRAY: string;
      MENU_BACKGROUD_COLOR: string;
    };
  }
}
