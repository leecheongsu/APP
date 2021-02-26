import { insuImg } from '@app/assets';
import { Typhograph } from '@app/components';
import { useInterval } from '@app/hooks';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Image, Animated } from 'react-native';

const CollapsContainer = styled.View`
  width: 90%;
`;
const CollapsHeader = styled.TouchableOpacity`
  background-color: ${theme.color.GRAY2};
  align-items: center;
  padding: 20px;
`;
const CollapsBody = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.WHITE};
  min-height: 300px;
`;

function HomeCard({ navigation }) {
  // const navigation = useNavigation();
  const colList = ['col1', 'col2', 'col3', 'col4'];
  const [isClick, setIsClick] = useState(false);
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

  const toggleCollapsed = (name) => {
    // setName(name);
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
      duration: 300,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const expandView = (value) => {
    Animated.timing(colAnimationheight[value], {
      duration: 300,
      toValue: 300,
      useNativeDriver: false,
    }).start();
  };

  useInterval(() => {
    if (!isClick) {
      if (collapsed.col1) {
        return toggleCollapsed('col2');
      } else if (collapsed.col2) {
        return toggleCollapsed('col3');
      } else if (collapsed.col3) {
        return toggleCollapsed('col4');
      } else if (collapsed.col4) {
        return toggleCollapsed('col1');
      } else {
        return null;
      }
    }
  }, 10000);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsClick(false);
      toggleCollapsed('col1');
    });
    return unsubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <CollapsContainer style={styles.container}>
      {!collapsed.col1 && (
        <CollapsHeader
          style={[styles.topRadius, styles.borderBottom]}
          onPress={() => {
            toggleCollapsed('col1');
            setIsClick(true);
          }}
          activeOpacity={0.9}>
          <Typhograph type="NOTO" color="BLUE" size={18}>
            주택화재
          </Typhograph>
        </CollapsHeader>
      )}
      <Animated.View style={{ maxHeight: colAnimationheight.col1 }}>
        {collapsed.col1 && (
          <CollapsBody
            style={collapsed.col1 && styles.topRadius}
            onPress={() => navigation.navigate('HOUSE_FIRE')}
            activeOpacity={0.9}>
            <Image style={styles.image} source={insuImg.MAIN1} />
          </CollapsBody>
        )}
      </Animated.View>

      {!collapsed.col2 && (
        <CollapsHeader
          onPress={() => {
            toggleCollapsed('col2');
            setIsClick(true);
          }}
          activeOpacity={0.9}
          style={[styles.borderBottom]}>
          <Typhograph type="NOTO" color="BLUE" size={18}>
            풍수해 Ⅵ
          </Typhograph>
        </CollapsHeader>
      )}
      <Animated.View style={{ maxHeight: colAnimationheight.col2 }}>
        {collapsed.col2 && (
          <CollapsBody onPress={() => navigation.navigate('STORM_FLOOD')} activeOpacity={0.9}>
            <Image style={styles.image} source={insuImg.MAIN3} />
          </CollapsBody>
        )}
      </Animated.View>

      {!collapsed.col3 && (
        <CollapsHeader
          onPress={() => {
            toggleCollapsed('col3');
            setIsClick(true);
          }}
          activeOpacity={0.9}
          style={styles.borderBottom}>
          <Typhograph type="NOTO" color="BLUE" size={18}>
            다중이용시설 화재배상책임
          </Typhograph>
        </CollapsHeader>
      )}
      <Animated.View style={{ maxHeight: colAnimationheight.col3 }}>
        {collapsed.col3 && (
          <CollapsBody onPress={() => navigation.navigate('STORM_FLOOD2')} activeOpacity={0.9}>
            <Image style={styles.image} source={insuImg.MAIN2} />
          </CollapsBody>
        )}
      </Animated.View>

      {!collapsed.col4 && (
        <CollapsHeader
          style={!collapsed.col4 && styles.bottomRadius}
          onPress={() => {
            toggleCollapsed('col4');
            setIsClick(true);
          }}
          activeOpacity={0.9}>
          <Typhograph type="NOTO" color="BLUE" size={18}>
            재난 배상책임
          </Typhograph>
        </CollapsHeader>
      )}
      <Animated.View style={{ maxHeight: colAnimationheight.col4 }}>
        {collapsed.col4 && (
          <CollapsBody
            style={collapsed.col4 && styles.bottomRadius}
            onPress={() => navigation.navigate('CALAMITY')}
            activeOpacity={0.9}>
            <Image style={styles.image} source={insuImg.MAIN4} />
          </CollapsBody>
        )}
      </Animated.View>
    </CollapsContainer>
  );
}

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: theme.color.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  topRadius: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  bottomRadius: {
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.color.INPUT_GRAY,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: theme.color.INPUT_GRAY,
  },
  image: {
    width: 300,
    height: 280,
  },
});
