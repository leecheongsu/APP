import { Alert } from 'react-native';

type DefaultAlertTypes = {
  title: string;
  msg: string;
  cancelPress?: () => void;
  okPress: () => void;
};

function DefaultAlert({ title, msg, cancelPress = () => null, okPress }: DefaultAlertTypes) {
  Alert.alert(
    title,
    msg,
    [
      {
        text: '아니오',
        style: 'cancel',
        onPress: () => cancelPress(),
      },
      { text: '네', onPress: () => okPress() },
      ,
    ],
    { cancelable: false }
  );
}

export default DefaultAlert;
