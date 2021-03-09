import React, { useEffect, useRef, useState } from 'react';
import { Typhograph } from '@app/components';
import styled from '@app/style/typed-components';
import { Animated, Image, StyleSheet } from 'react-native';
import theme from '@app/style/theme';
import { insuIcon } from '@app/assets';
import { priceDot } from '@app/lib';

type CollapsePropsTypes = {
  title: string | number;
  value?: string | number | undefined;
  value2: string | number;
  children: any;
  isTitle?: boolean;
};

const Container = styled.View`
  overflow: hidden;
`;
const ToggleButton = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const PriceInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
const IconBox = styled.View`
  margin-left: 10px;
`;

const ChildContainer = styled.View`
  background-color: ${theme.color.GRAY2};
  padding: 15px;
`;

const TextBox = styled.View`
  flex-direction: column;
`;

export default function Collapse({ title, value, value2 = 0, children, isTitle = false }: CollapsePropsTypes) {
  const [collapsed, setCollapsed] = useState(true);
  const animationHeight = useRef(new Animated.Value(0)).current;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 100,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const expandView = () => {
    Animated.timing(animationHeight, {
      duration: 400,
      toValue: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (collapsed) {
      collapseView();
    } else {
      expandView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsed]);
  return (
    <Container>
      <ToggleButton onPress={toggleCollapsed}>
        <Typhograph type="NOTO">{title}</Typhograph>
        <PriceInfo>
          {value !== undefined && (
            <TextBox>
              {isTitle && (
                <Typhograph type="NOTO" style={{ marginRight: 10, width: 130, textAlign: 'center' }} weight="BOLD">
                  보험가입금액
                </Typhograph>
              )}

              <Typhograph type="NOTO" style={{ marginRight: 10, width: 130, textAlign: 'center' }}>
                {priceDot(value)}만원
              </Typhograph>
            </TextBox>
          )}
          <TextBox>
            {isTitle && (
              <Typhograph type="NOTO" weight="BOLD" style={{ textAlign: 'center' }}>
                보험료
              </Typhograph>
            )}
            <Typhograph type="NOTO">{priceDot(value2)}원</Typhograph>
          </TextBox>

          <IconBox>
            <Image style={{ transform: [{ rotate: collapsed ? '0deg' : '180deg' }] }} source={insuIcon.SELECT_ICON2} />
          </IconBox>
        </PriceInfo>
      </ToggleButton>

      <Animated.View style={{ maxHeight: animationHeight }}>
        <ChildContainer>{children}</ChildContainer>
      </Animated.View>
    </Container>
  );
}
