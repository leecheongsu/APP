import Typhograph from '@app/components/Typhograph';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import React, { useState } from 'react';
import { Keyboard, TextInputProps } from 'react-native';

const Container = styled.View``;
const Input = styled.TextInput<{ isFocus: boolean } & TextInputProps>`
  height: 50px;
  min-width: 0px;
  border-color: ${(props: any) =>
    props.helperText !== '' ? theme.color.WARING_RED : props.isFocus ? theme.color.GRAY : theme.color.INPUT_GRAY};
  border-width: ${(props: any) => (props.isFocus ? '1px' : '1px')};
  border-radius: 10px;
  padding: 0px 10px 0px 10px;
`;
const HelperTextBox = styled.View`
  margin-top: 5px;
`;

export default function DefaultInput(props) {
  const [isFocus, setIsFocus] = useState(false);
  const { helperText = '' } = props;
  return (
    <Container>
      <Input
        {...props}
        blurOnSubmit={false}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
        }}
        style={{ alignSelf: 'stretch', fontSize: 13 }}
        secureTextEntry={props.secureTextEntry}
        maxLength={props.maxLength}
        onSubmitEditing={() => Keyboard.dismiss()}
        keyboardType={props.keyboardType}
        textContentType={props.textContentType}
        isFocus={isFocus}
        autoCompleteType="off"
        numberOfLines={1}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        helperText={helperText}
      />
      {helperText !== '' && (
        <HelperTextBox>
          <Typhograph type="NOTO" size={10} color="WARING_RED">
            {props.helperText}
          </Typhograph>
        </HelperTextBox>
      )}
    </Container>
  );
}
