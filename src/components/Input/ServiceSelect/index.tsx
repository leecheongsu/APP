import React from 'react';
import styled from '@app/style/typed-components';
import RNPickerSelect from 'react-native-picker-select';
import { Image, Platform, StyleSheet } from 'react-native';
import { insuIcon } from '@app/assets';
import theme from '@app/style/theme';

type ServiceSelectPropsTypes = {
  label?: string;
  value: any;
  items?: Array<any>;
  onValueChange: (value: any) => void;
  disabled?: boolean;
  right?: number;
};

const styles = StyleSheet.create({
  inputIOS: {
    textAlign: 'left',
    fontSize: 14,
    width: 105,
    height: 50,
    paddingLeft: 10,
    color: theme.color.BLUE,
  },
  inputAndroid: {
    fontSize: 14,
    textAlign: 'left',
    height: 50,
    padding: 0,
    width: 105,
    color: theme.color.BLUE,
  },
});

const IconBox = styled.View``;

export default function ServiceSelect({
  label,
  value,
  items = [],
  onValueChange,
  disabled = false,
}: ServiceSelectPropsTypes) {
  return (
    <RNPickerSelect
      style={{
        ...styles,
        iconContainer: {
          top: 17,
          right: Platform.OS === 'ios' ? 17 : 0,
        },
      }}
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
