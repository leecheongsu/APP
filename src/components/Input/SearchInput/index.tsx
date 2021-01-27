import React, { useState } from 'react';
import { Keyboard, TextInputProps } from 'react-native';
import { insuIcon } from '@app/assets';
import { IconButton } from '@app/components';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { HouseFireStateName } from '@app/screens/HouseFire/HouseFireContainer';

type SearchInputTypes = TextInputProps;
type SearchInputPropsTypes = {
  onSubmitEditing: () => void;
  onChangeState: (name: HouseFireStateName, value: any) => void;
};

const Container = styled.View`
  width: 100%;
`;

const Input = styled.TextInput<{ isFocus: boolean } & TextInputProps>`
  height: 50px;
  border-color: ${(props: any) => (props.isFocus ? theme.color.SKYBLUE : theme.color.SOFTBLUE)};
  border-width: ${(props: any) => (props.isFocus ? '2px' : '1px')};
  border-radius: 30px;
  padding: 0px 80px 0px 20px;
`;

const InputIconBox = styled.View`
  position: absolute;
  right: 10px;
  top: 15px;
  font-size: 14px;
  flex-direction: row;
`;

const InputIcon = styled.Image``;

function SearchInput(props: SearchInputTypes & SearchInputPropsTypes) {
  const [isFocus, setIsFocus] = useState(false);
  const cleanInput = () => {
    props.setValue('');
    props.onChangeState('addressCommon', {});
    props.onChangeState('addressData', []);
    props.onChangeState('loading', false);
  };
  return (
    <Container>
      <Input
        {...props}
        isFocus={isFocus}
        returnKeyType="search"
        blurOnSubmit={false}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
          Keyboard.dismiss();
        }}
        autoCompleteType="off"
        numberOfLines={1}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
      />
      <InputIconBox>
        {props.value !== '' && (
          <IconButton onPress={() => cleanInput()}>
            <InputIcon source={insuIcon.BTN_DEL} />
          </IconButton>
        )}

        <IconButton onPress={() => props.onSubmitEditing()}>
          <InputIcon source={insuIcon.BTN_SEARCH} />
        </IconButton>
      </InputIconBox>
    </Container>
  );
}
export default SearchInput;
