import React, { useRef, useState } from 'react';
import HouseProductInfoPresenter from '@app/screens/HouseFire/HouseProductInfo/HouseProductInfoPresenter';
import { Animated } from 'react-native';
import { EmptyLayout } from '@app/layout';
import { HouseFireStateName, HouseFireStateTypes } from '@app/screens/HouseFire/HouseFireContainer';

type HouseProductInfoContainerTypes = {
  state: HouseFireStateTypes;
  onChangeState: (name: HouseFireStateName, value: any) => void;
  handleJoinTypeNextButton: () => void;
};

export default function HouseProductInfoContainer({
  state,
  onChangeState,
  handleJoinTypeNextButton,
}: HouseProductInfoContainerTypes) {
  const colList = ['col1', 'col2', 'col3', 'col4'];
  const [collapsed, setCollapsed] = useState({
    col1: false,
    col2: false,
    col3: false,
    col4: false,
  });
  const colAnimationheight = {
    col1: useRef(new Animated.Value(0)).current,
    col2: useRef(new Animated.Value(0)).current,
    col3: useRef(new Animated.Value(0)).current,
    col4: useRef(new Animated.Value(0)).current,
  };

  const toggleCollapsed = (name: 'col1' | 'col2' | 'col3' | 'col4') => {
    const newCol = {
      col1: false,
      col2: false,
      col3: false,
      col4: false,
    };
    colList.map((item) => {
      if (item === name) {
        if (collapsed[item]) {
          collapseView(item);
        } else {
          expandView(item);
        }
      } else {
        collapseView(item);
      }
    });
    setCollapsed({
      ...newCol,
      [name]: !collapsed[name],
    });
  };

  const collapseView = (value) => {
    Animated.timing(colAnimationheight[value], {
      duration: 100,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const expandView = (value) => {
    Animated.timing(colAnimationheight[value], {
      duration: 400,
      toValue: 1000,
      useNativeDriver: false,
    }).start();
  };

  //terms모달 오픈
  const onClickTermsModalOpen2 = (name, html) => {
    onChangeState('termsName', name);
    onChangeState('termsModal', true);
    onChangeState('termsHtml', html);
  };

  if (state.stepNumber === 1) {
    return (
      <HouseProductInfoPresenter
        state={state}
        onChangeState={onChangeState}
        toggleCollapsed={toggleCollapsed}
        collapsed={collapsed}
        colAnimationheight={colAnimationheight}
        onClickTermsModalOpen2={onClickTermsModalOpen2}
        handleJoinTypeNextButton={handleJoinTypeNextButton}
      />
    );
  } else {
    return <EmptyLayout />;
  }
}
