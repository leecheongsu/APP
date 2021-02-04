import React from 'react';
import { screenWidth } from '@app/lib';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { Platform, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function BusinessInfo({ state, inputState, onChangeState }) {
  const styles = StyleSheet.create({
    container: {
      width: screenWidth(),
      paddingHorizontal: 20,
      backgroundColor: theme.color.WHITE,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
  });

  const Container = styled.View`
    padding-bottom: 100px;
  `;

  const TopArrow = styled.View`
    left: 310px;
    top: 0px;
    width: 0px;
    height: 0px;
    background-color: transparent;
    border-style: solid;
    border-top-width: 0px;
    border-right-width: 10px;
    border-bottom-width: 15px;
    border-left-width: 10px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: ${theme.color.WHITE};
    border-left-color: transparent;
  `;

  const TextInputBox = styled.View`
    margin-top: 20px;
  `;
  const InputLabel = styled.View``;
  const InputBox = styled.View`
    margin-top: 10px;
  `;
  const InputBox2 = styled.View`
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `;
  const InputItem = styled.View``;
  const SelectBox = styled.View`
    border-width: 1px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border-color: ${theme.color.BORDER_GRAY};
  `;
  const Input = styled.TextInput<{ isFocus: boolean } & TextInputProps>`
    height: 50px;
    min-width: 0px;
    border-color: ${(props: any) => (props.isFocus ? theme.color.GRAY : theme.color.INPUT_GRAY)};
    border-width: ${(props: any) => (props.isFocus ? '1px' : '1px')};
    border-radius: 10px;
    padding: 0px 10px 0px 10px;
  `;
  return (
    <>
      <TopArrow />
      <KeyboardAwareScrollView
        style={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === 'ios' ? -200 : -10}>
        <Container />
      </KeyboardAwareScrollView>
    </>
  );
}

export default BusinessInfo;
