import React from 'react';
import styled from '@app/style/typed-components';
import theme from '@app/style/theme';
import { FocusAwareStatusBar, FullLabel, Loading, MyInsuCard, Typhograph } from '@app/components';
import { Image } from 'react-native';
import { insuIcon } from '@app/assets';

type MyInsuPresenterTypes = {
  loading: boolean;
  data: any;
  downloadfileButton: (name: '보험증권' | '보험약관') => Promise<null | undefined>;
};
const Container = styled.ScrollView``;
const CountBox = styled.View`
  padding: 30px 15px;
`;
const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RowItem = styled.View``;

const CardBox = styled.View`
  padding: 0px 15px 100px;
  background-color: ${theme.color.GRAY2};
`;

const EmptyBox = styled.View`
  align-items: center;
  justify-content: center;
  height: 200px;
`;

function MyInsuPresenter({ loading, data, downloadfileButton }: MyInsuPresenterTypes) {
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      {loading ? (
        <Loading height={500} />
      ) : (
        <Container>
          <FullLabel title={`내 보험 에서는 내가 가입한 보험 정보를${'\n'}확인하실 수 있습니다.`} />
          <CountBox>
            <RowBox>
              <RowItem>
                <RowBox>
                  <RowItem>
                    <Image source={insuIcon.MY_LIST} />
                  </RowItem>
                  <RowItem style={{ marginLeft: 10 }}>
                    <Typhograph type="NOTO" color="BLUE" weight="BOLD">
                      총 보험 계약수
                    </Typhograph>
                  </RowItem>
                </RowBox>
              </RowItem>
              <RowItem>
                <Typhograph type="ROBOTO" color="SKYBLUE">
                  {data?.length}{' '}
                  <Typhograph type="ROBOTO" color="BLACK2">
                    건
                  </Typhograph>
                </Typhograph>
              </RowItem>
            </RowBox>
          </CountBox>
          {data?.length === 0 ? (
            <EmptyBox>
              <Typhograph type="NOTO" color="GRAY" style={{ textAlign: 'center' }}>
                계약한 보험이 없습니다.
              </Typhograph>
            </EmptyBox>
          ) : (
            <CardBox>
              {data?.map((item) => {
                return <MyInsuCard item={item} downloadfileButton={downloadfileButton} loading={loading} />;
              })}
            </CardBox>
          )}
        </Container>
      )}
    </>
  );
}
export default MyInsuPresenter;
