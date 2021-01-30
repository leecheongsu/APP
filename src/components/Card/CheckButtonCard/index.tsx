import React, { useEffect, useState } from 'react';
import styled from '@app/style/typed-components';
import { IconButton, MiniSelect, Typhograph } from '@app/components';
import { Image } from 'react-native';
import { insuIcon } from '@app/assets';
import theme from '@app/style/theme';
import { priceDot } from '@app/lib';

type CheckButtonCardPropsTypes = {
  onPress: (name, isToggle, isSelect) => void;
  title: string | number;
  value?: any;
  value2?: string | number;
  isSelect?: boolean;
  disabled?: boolean;
  items?: [];
  name: string;
  propsToggle?: boolean;
  onValueChange?: (item: any) => void;
  state?: any;
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.WHITE};
  padding: 10px 20px;
  border-radius: 10px;
`;
const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SelectBox = styled.View`
  width: 30%;
`;

export default function CheckButtonCard({
  onPress,
  title,
  value,
  value2,
  isSelect = false,
  items = [],
  name = '',
  disabled = false,
  propsToggle = false,
  onValueChange,
  state,
}: CheckButtonCardPropsTypes) {
  const [isToggle, setIstoggle] = useState(false);
  const icon = isToggle ? insuIcon.BT_CHECK_ON : insuIcon.BT_CHECK_OFF;
  const handleOnpress = () => {
    if (!isSelect) {
      onPress(name, !isToggle, isSelect);
    } else {
      onPress(name, !isToggle, isSelect);
    }
  };
  useEffect(() => {
    const filterItem = state?.premiums?.filter((i) => {
      if (isSelect && value.ins_name !== undefined) {
        return i.item_id === name && i.already_group_ins === state?.already_group_ins && i.ins_name === value.ins_name;
      } else {
        return i.item_id === name && i.already_group_ins === state?.already_group_ins;
      }
    })[0];
    filterItem?.aply_yn === 'Y' ? setIstoggle(true) : setIstoggle(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPress, onValueChange]);
  return (
    <>
      <Container>
        <IconButton size={35} disabled={disabled} onPress={handleOnpress}>
          <Image source={icon} />
        </IconButton>
        <InfoContainer>
          <Typhograph style={{ width: 120 }} type="NOTO" color="BLACK2" size={14} weight="REGULAR">
            {title}
          </Typhograph>
          {isSelect ? (
            <SelectBox>
              <MiniSelect label="300억원" value={value} items={items} onValueChange={onValueChange} disabled={false} />
            </SelectBox>
          ) : (
            <Typhograph
              style={{ width: '33%', textAlign: 'right' }}
              type="NOTO"
              color="BLACK2"
              size={14}
              weight="REGULAR"
              numberOfLines={1}>
              {priceDot(value)}만원
            </Typhograph>
          )}

          <Typhograph
            style={{ width: '32%', textAlign: 'center' }}
            type="NOTO"
            color="BLACK2"
            size={14}
            weight="REGULAR"
            numberOfLines={1}>
            {priceDot(value2)}원
          </Typhograph>
        </InfoContainer>
      </Container>
    </>
  );
}
