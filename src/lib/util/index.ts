import { Dimensions, PixelRatio, Platform } from 'react-native';
//font weight 적용하는 함수
export const setFont = (type: 'NOTO' | 'ROBOTO', weight: 'THIN' | 'LIGHT' | 'REGULAR' | 'MEDIUM' | 'BOLD') => {
  switch (type) {
    case 'NOTO':
      if (weight === 'THIN') {
        return 'NotoSansCJKkr-Thin';
      } else if (weight === 'LIGHT') {
        return 'NotoSansCJKkr-Light';
      } else if (weight === 'REGULAR') {
        return 'NotoSansCJKkr-Regular';
      } else if (weight === 'MEDIUM') {
        return 'NotoSansCJKkr-Medium';
      } else if (weight === 'BOLD') {
        return 'NotoSansCJKkr-Bold';
      }
      break;
    case 'ROBOTO':
      if (weight === 'THIN') {
        return 'Roboto-Thin';
      } else if (weight === 'LIGHT') {
        return 'Roboto-Light';
      } else if (weight === 'MEDIUM') {
        return 'Roboto-Medium';
      } else if (weight === 'REGULAR') {
        return 'Roboto-Regular';
      } else if (weight === 'BOLD') {
        return 'Roboto-Bold';
      }
      break;
    default:
      throw new Error('wrong Name');
  }
  return;
};

// 기기별 폰트사이즈 적용
export const nomalize = (size: number) => {
  const scale = Dimensions.get('window').width / 320;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3;
  }
};

export const screenWidth = () => {
  const width = Dimensions.get('window').width;
  return width;
};

export const screenHeight = () => {
  const height = Dimensions.get('window').height;
  return height;
};

//아이폰x 이상버젼 체크
export const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 428)
  );
};
