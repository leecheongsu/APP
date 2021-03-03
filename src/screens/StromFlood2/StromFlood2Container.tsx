import React, { useEffect, useState } from 'react';
import { screenWidth } from '@app/lib';
import StromFlood2Presenter from '@app/screens/StromFlood2/StromFlood2Presenter';
import { useNavigation } from '@react-navigation/native';
import { BackHandler, Animated } from 'react-native';

export default function StromFlood2Container() {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const width = screenWidth();
  const leftValue = useState(new Animated.Value(-width))[0];
  const leftValue2 = useState(new Animated.Value(-width))[0];
  const rightValue = useState(new Animated.Value(width))[0];
  const rightValue2 = useState(new Animated.Value(width))[0];

  const leftmove = () => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(leftValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(rightValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(leftValue2, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(rightValue2, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start(() => leftmove());
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    leftmove();
    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StromFlood2Presenter
      leftValue={leftValue}
      rightValue={rightValue}
      leftValue2={leftValue2}
      rightValue2={rightValue2}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
}
