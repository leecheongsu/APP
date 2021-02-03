import { DefaultTheme as DefaultNavigationTheme } from '@react-navigation/native';
import { DefaultTheme } from 'styled-components/native';

const WHITE = '#FFFFFF';
const BLACK = '#000000';
const BLACK2 = '#333';
const BLACK3 = '#666';
const BLUE = '#013561';
const GRAY = '#707070';
const GRAY2 = '#f5f6fa';
const GRAY3 = '#b1b6cc';
const INPUT_GRAY = '#d8d8d8';
const DIVIDER_BACK = '#f6f5f5';
const ROUND_STEPPER = '#ddd';
const BORDER_GRAY = '#e0e0e0';
const BACKGROUND_GRAY = '#cbcbcb';
const SOFTGRAY = '#a3a9be';
const LIGHTGRAY = '#eaeaea';
const MENU_BACKGROUD_COLOR = '#dfe4ea';
const SKYBLUE = '#48a5f2';
const SKYBLUE2 = '#91c3ea';
const SKYBLUE3 = '#1667a8';
const SOFTPUPLE = '#c4d2f1';
const SOFTPUPLE2 = '#4e85ff';
const BLUE_RGB = 'rgba(1, 52, 97, 0.950)';
const GRAY_RGB = 'rgba(203, 203, 203,0.950)';
const WARING_RED = '#fd4173';

const SOFTBLUE = '#40a1ef';

const theme: DefaultTheme = {
  color: {
    BLACK,
    BLACK2,
    BLACK3,
    WHITE,
    BLUE,
    SKYBLUE,
    SKYBLUE2,
    SKYBLUE3,
    GRAY,
    GRAY2,
    GRAY3,
    INPUT_GRAY,
    DIVIDER_BACK,
    BORDER_GRAY,
    ROUND_STEPPER,
    MENU_BACKGROUD_COLOR,
    SOFTPUPLE,
    SOFTBLUE,
    SOFTGRAY,
    LIGHTGRAY,
    SOFTPUPLE2,
    BACKGROUND_GRAY,
    BLUE_RGB,
    GRAY_RGB,
    WARING_RED,
  },
};

export const navigationTheme = {
  ...DefaultNavigationTheme,
  colors: {
    ...DefaultNavigationTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: theme.color.WHITE,
  },
};

export default theme;
