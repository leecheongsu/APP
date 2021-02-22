import React from 'react';
import { Typhograph } from '@app/components';
import { InfoListTypes } from '@app/screens/HouseFire/HouseInfo/HouseInfoContainer';
import theme from '@app/style/theme';
import styled from '@app/style/typed-components';
import { View } from 'react-native';
import { useGlobalState } from '@app/context';

type InfoListPropsTypes = {
  list: InfoListTypes;
  isHouse?: boolean;
};

const Container = styled.View``;
const ListBox = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
  padding: 5px 0px;
  margin: 0px 20px;
`;
const ListBox2 = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
  padding: 5px 0px;
  margin: 0px 20px;
`;
const ListLabel = styled.View`
  width: 25%;
  justify-content: center;
`;
const ListItem = styled.View`
  width: 75%;
  padding-left: 10px;
`;
const ListItem2 = styled.View`
  width: 75%;
  flex-direction: row;
`;
const ListItem2Left = styled.View`
  width: 50%;
  padding-left: 10px;
`;
const ListItem2Rigth = styled.View`
  width: 50%;
  align-items: flex-start;
`;

export default function InfoList({ list, isHouse = true, state }: InfoListPropsTypes) {
  const globalState = useGlobalState();
  const isSede = state?.selectType === 'S';
  return (
    <Container>
      <ListBox>
        <ListLabel>
          <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={13}>
            주소/도로명
          </Typhograph>
        </ListLabel>
        <ListItem>
          <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
            {isSede ? `${list?.address} ${state?.resultDong?.dongNm}${state?.resultDetail?.hoNm}` : list?.address}
          </Typhograph>
        </ListItem>
      </ListBox>
      <ListBox>
        <ListLabel>
          <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={13}>
            건축물 명칭
          </Typhograph>
        </ListLabel>
        <ListItem>
          <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
            {list?.bld_name === undefined ? '-' : list?.bld_name}
          </Typhograph>
        </ListItem>
      </ListBox>
      <ListBox>
        <ListLabel>
          <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={13}>
            주용도
          </Typhograph>
        </ListLabel>
        <ListItem>
          <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
            {list?.main_purps}
          </Typhograph>
        </ListItem>
      </ListBox>
      <ListBox>
        <ListLabel>
          <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={13}>
            층수
          </Typhograph>
        </ListLabel>
        <ListItem>
          <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
            {list?.flr_name}
          </Typhograph>
        </ListItem>
      </ListBox>

      <ListBox>
        <ListLabel>
          <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={13}>
            세대수
          </Typhograph>
        </ListLabel>
        <ListItem>
          <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
            {list?.cnt_sedae}세대
          </Typhograph>
        </ListItem>
      </ListBox>
      {list?.dong_info?.length > 0 && isHouse && !isSede && (
        <>
          <ListBox2>
            <ListLabel>
              <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={13}>
                동별 연면적
              </Typhograph>
            </ListLabel>
            <ListItem>
              {list?.dong_info?.length > 0 ? (
                list?.dong_info?.map((item, index) => {
                  return (
                    <ListItem2>
                      <ListItem2Left>
                        <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
                          {item[0]}
                        </Typhograph>
                      </ListItem2Left>
                      <ListItem2Rigth>
                        <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
                          {item[1]} ㎡
                        </Typhograph>
                      </ListItem2Rigth>
                    </ListItem2>
                  );
                })
              ) : (
                <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
                  {list.dong_info} ㎡
                </Typhograph>
              )}
            </ListItem>
          </ListBox2>
          <ListBox>
            <ListLabel>
              <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={13}>
                전체 연면적
              </Typhograph>
            </ListLabel>
            <ListItem>
              <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
                {list?.total_area} ㎡
              </Typhograph>
            </ListItem>
          </ListBox>
        </>
      )}

      {/* {is && (
        <ListBox2>
          <ListLabel>
            <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={13}>
              세대 연면적
            </Typhograph>
          </ListLabel>

          <ListItem>
            <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
              {state?.resultDetail?.dongNm} {state?.resultDetail?.hoNm} / {state?.resultDetail?.area} ㎡
            </Typhograph>
          </ListItem>
        </ListBox2>
      )} */}
      <ListBox>
        <ListLabel>
          <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={13}>
            주구조
          </Typhograph>
        </ListLabel>
        <ListItem>
          <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
            {list?.main_struct}
          </Typhograph>
        </ListItem>
      </ListBox>
      <ListBox>
        <ListLabel>
          <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={13}>
            지붕
          </Typhograph>
        </ListLabel>
        <ListItem>
          <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
            {list?.roof_name}
          </Typhograph>
        </ListItem>
      </ListBox>
      {isHouse && (
        <ListBox>
          <ListLabel>
            <Typhograph type="NOTO" color="GRAY" weight="REGULAR" size={13}>
              사용승인일
            </Typhograph>
          </ListLabel>
          <ListItem>
            <Typhograph type="NOTO" color="BLACK2" weight="REGULAR" size={13}>
              {list?.use_apr_date}
            </Typhograph>
          </ListItem>
        </ListBox>
      )}
    </Container>
  );
}
