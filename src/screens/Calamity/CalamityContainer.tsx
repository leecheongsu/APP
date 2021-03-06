import { screenWidth } from '@app/lib';
import CalamityPresenter from '@app/screens/Calamity/CalamityPresentert';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, BackHandler } from 'react-native';

export default function CalamityContainer() {
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
    <CalamityPresenter
      leftValue={leftValue}
      leftValue2={leftValue2}
      rightValue={rightValue}
      rightValue2={rightValue2}
    />
  );
}
