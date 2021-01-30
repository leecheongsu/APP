import { Dimensions, PixelRatio, Platform } from 'react-native';
import Toast from 'react-native-simple-toast';

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

//숫자앞에 0붙이는 함수
export const fillZero = (width, str) => {
  return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str; //남는 길이만큼 0으로 채움
};

//error toast
export const errorToast = (e, title) => {
  if (e.response.data.status === 406) {
    console.log(e.response, title);
    Toast.show(e.response.data.message);
  } else {
    Toast.show('오류가 발생하였습니다.');
    console.log(e.response, title);
  }
};

//오름차순 정렬
export const sortArray = (arr, label) => {
  const newArr = arr.sort(function (a, b) {
    return a[label] < b[label] ? -1 : a[label] > b[label] ? 1 : 0;
  });
  return newArr.sort((a, b) => a.label.length - b.label.length);
};
//오름차순 정렬
export const sortArray2 = (arr, label) => {
  const newArr = arr.sort(function (a, b) {
    return a.value[label] < b.value[label] ? -1 : a.value[label] > b.value[label] ? 1 : 0;
  });
  return newArr;
};

//내림차순 정렬
export const sortArrayDesc = (arr, value) => {
  const newArr = arr.sort(function (a, b) {
    return a[value] > b[value] ? -1 : a[value] < b[value] ? 1 : 0;
  });
  return newArr.sort((a, b) => a.value.length - b.value.length);
};

//숫자 3자리,
export const priceDot = (value) => {
  if (value !== undefined) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return 0;
};

//만원단위 변환
export const sliceTenThousand = (value) => {
  return Number(value) / 10000;
};

//백원단위 절삭
export const floorPrice = (value) => {
  const result = Math.floor(value / 100) * 100; // 10으로 나누면 211.7, floor 함수로 소수점을 버리면 211, 다시 10을 곱하면 2110
  return result;
};
