//font weight 적용하는 함수
export const setFont = (type: 'NOTO_SANS' | 'ROBOTO', weight: 'THIN' | 'LIGHT' | 'REGULAR' | 'MEDIUM' | 'BOLD') => {
  switch (type) {
    case 'NOTO_SANS':
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
