import React from 'react';
import styled from '@app/style/typed-components';
import RNPickerSelect from 'react-native-picker-select';
import { Image, Platform, StyleSheet } from 'react-native';
import { insuIcon } from '@app/assets';
import theme from '@app/style/theme';

type MiniSelectPropsTypes = {
  label: string;
  value: any;
  items?: Array<any>;
  onValueChange: (value: any) => void;
  disabled?: boolean;
};

const styles = StyleSheet.create({
  inputIOS: {
    textAlign: 'right',
    fontSize: 16,
    width: 105,
    height: 30,
    padding: 0,
    paddingRight: 25,
    color: theme.color.BLUE,
  },
  inputAndroid: {
    fontSize: 14,
    textAlign: 'right',
    height: 30,
    padding: 0,
    paddingRight: 25,
    width: 105,
    color: theme.color.BLUE,
  },
});
const disabledStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
  },
  inputAndroid: {
    fontSize: 16,
  },
});

const IconBox = styled.View``;

export default function MiniSelect({
  label,
  value,
  items = [],
  onValueChange,
  disabled = false,
}: MiniSelectPropsTypes) {
  return (
    <RNPickerSelect
      style={
        disabled
          ? {
              ...disabledStyles,
              iconContainer: {
                top: 18,
                right: -5,
              },
            }
          : {
              ...styles,
              iconContainer: {
                top: Platform.OS === 'ios' ? 7 : 9,
                right: -5,
              },
            }
      }
      placeholder={{}}
      onValueChange={(i) => onValueChange(i)}
      value={value}
      items={items}
      disabled={disabled}
      fixAndroidTouchableBug={true}
      useNativeAndroidPickerStyle={false}
      Icon={() => {
        return (
          <IconBox>
            <Image source={insuIcon.SELECT_ICON2} />
          </IconBox>
        );
      }}
    />
  );
}
