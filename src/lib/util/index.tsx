import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Dimensions, PixelRatio, Platform } from 'react-native';
import Toast from 'react-native-simple-toast';

const isDev = __DEV__;
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

const isEmpty = function (value) {
  if (
    value === '' ||
    value === null ||
    value === undefined ||
    (value !== null && typeof value === 'object' && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

//setAsyncStoreage
export const setStoreData = (storageName, item) => {
  if (isEmpty(storageName)) {
    throw Error('Storage Name is empty');
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(storageName, JSON.stringify(item), (error) => {
      if (error) {
        reject(error);
      }

      resolve('입력 성공');
    });
  });
};

//getAsyncStoreage
export const getStoreData = (storageName) => {
  if (isEmpty(storageName)) {
    throw Error('Storage Name is empty');
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(storageName, (err, result: any) => {
      if (err) {
        reject(err);
      }

      if (result === null) {
        resolve(null);
      }

      resolve(JSON.parse(result));
    });
  });
};

//removeItem async
export const removeStoreData = async (name) => {
  await AsyncStorage.removeItem(name);
};

//clearAsyncStoreage
export const clearStoreData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // saving error
  }
};

//주민등록번호
export const juminFront = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;

//api error handler
export const handleApiError = async (value) => {
  const errorCode = value?.data?.status;
  Alert.alert('알림', value?.data?.message === undefined ? '알수없는 오류가 발생하였습니다.' : value?.data?.message);
  switch (errorCode) {
    case 401: {
      return Toast.show('권한이 없습니다.');
    }
    case 426: {
      alert('토큰이 만료되었습니다. 다시로그인 해주세요.');
    }
    default: {
      return null;
    }
  }
};

// 보장내용 텍스트

export const getInsuText = (value) => {
  switch (value) {
    case 'BFRE':
      return '(건물) 화재/폭발/파열';
    case 'BDRG':
      return '(건물) 급배수누출손해';
    case 'BGLS':
      return '(건물) 유리손해';
    case 'BCMP':
      return '(건물) 대물배상책임';
    case 'KFRE':
      return '(가재도구) 화재/폭발/파열';
    case 'KDRG':
      return '(가재도구) 급배수누출손해';
    case 'KSTL':
      return '(가재도구) 가재도난위험';
    case 'KLCK':
      return '(가재도구) 잠금장치';
    default:
      return null;
  }
};

export const recomendMasking = (value) => {
  return value.slice(0, 3) + '****' + value.slice(7, 11);
};
