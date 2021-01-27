import React from 'react';
import styled from '@app/style/typed-components';
import RNPickerSelect from 'react-native-picker-select';
import { Image, StyleSheet } from 'react-native';
import { insuIcon } from '@app/assets';
import theme from '@app/style/theme';

type SelectPropsTypes = {
  label: string;
  value: string;
  items?: Array<any>;
  onValueChange: (value: any) => void;
  disabled?: boolean;
};

const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.color.BLUE,
    borderRadius: 10,
    color: theme.color.BLUE,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: theme.color.BLUE,
    borderRadius: 10,
    color: theme.color.BLUE,
  },
});
const disabledStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.color.GRAY,
    borderRadius: 10,
    color: theme.color.BLUE,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: theme.color.GRAY,
    borderRadius: 10,
    color: theme.color.BLUE,
  },
});

const IconBox = styled.View``;

export default function Select({ label, value, items = [], onValueChange, disabled = false }: SelectPropsTypes) {
  return (
    <RNPickerSelect
      style={
        disabled
          ? {
              ...disabledStyles,
              iconContainer: {
                top: 18,
                right: 15,
              },
            }
          : {
              ...styles,
              iconContainer: {
                top: 18,
                right: 15,
              },
            }
      }
      placeholder={{
        label,
        value: '',
      }}
      onValueChange={(value) => onValueChange(value)}
      value={value}
      items={items}
      disabled={disabled}
      fixAndroidTouchableBug={true}
      useNativeAndroidPickerStyle={false}
      Icon={() => {
        return (
          <IconBox>
            <Image source={insuIcon.SELECT_ICON} />
          </IconBox>
        );
      }}
    />
  );
}
