import React, { useRef, useState } from 'react';
import styled from '@app/style/typed-components';
import { BottomFixButton, RightIconButton, Typhograph } from '@app/components';
import { EmptyLayout } from '@app/layout';
import { screenWidth } from '@app/lib';
import { Animated, Image } from 'react-native';
import { insuIcon, insuImg } from '@app/assets';
import theme from '@app/style/theme';
import { TermsModal } from '@app/screens';
import { houseProductInfoHtml } from '@app/lib/html';

const Container = styled.View`
  width: ${screenWidth()}px;
`;
const ContentsContainer = styled.ScrollView`
  padding: 20px 20px;
  background-color: ${theme.color.WHITE};
`;
const TextBox = styled.View``;
const IconBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
`;
const IconItem = styled.View`
  justify-content: center;
  align-items: center;
`;
const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RowItem = styled.View`
  align-items: center;
  width: ${(props) => (props.width ? props.width : '0px')};
`;
const CollapseBox = styled.View`
  margin-top: 40px;
`;
const CollapseItem = styled.View``;
const CollapseItemTitle = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.BORDER_GRAY};
  padding: 10px 0px;
  align-items: center;
  background-color: ${theme.color.WHITE};
`;
const CollapseItemBody = styled.View`
  background-color: ${theme.color.GRAY2};
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
`;
const CollapseTextBox = styled.View`
  align-items: flex-start;
  margin-top: 10px;
`;

const ButtonBox = styled.View`
  margin-top: 40px;
  padding-bottom: 150px;
`;

export default function HouseProductInfo({ state, inputState, onChangeState, handleJoinTypeNextButton }) {
  const colList = ['col1', 'col2', 'col3', 'col4'];
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
      duration: 100,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const expandView = (value) => {
    Animated.timing(colAnimationheight[value], {
      duration: 400,
      toValue: 1000,
      useNativeDriver: false,
    }).start();
  };

  //terms모달 오픈
  const onClickTermsModalOpen2 = (name, html) => {
    onChangeState('termsName', name);
    onChangeState('termsModal', true);
    onChangeState('termsHtml', html);
  };

  if (state.stepNumber === 1) {
    return (
      <Container>
        <ContentsContainer>
          <TextBox>
            <Typhograph type="NOTO" color="BLUE" weight="BOLD" size={20}>
              가족이 함께 머무는곳,{'\n'}
              “우리집” 안전하십니까?
            </Typhograph>
          </TextBox>

          <TextBox style={{ marginTop: 30 }}>
            <Typhograph type="NOTO" color="BLACK3" weight="MEDIUM" size={15} lineheight={3}>
              아직도 관리사무소 단체보험만 가입하셨나요?{'\n'}
              <Typhograph type="NOTO" color="SKYBLUE" lineheight={3}>
                개별주택 화재보험 보장내용{' '}
              </Typhograph>
              과 함께 간편하고{'\n'} 저렴하게 준비하세요.
            </Typhograph>
          </TextBox>

          <IconBox>
            <IconItem>
              <Image source={insuIcon.ICON_19_1} />
              <Typhograph type="NOTO" style={{ textAlign: 'center', marginTop: 10 }} lineheight={4} color="BLACK2">
                화재시 {'\n'} 우리 집 손해
              </Typhograph>
            </IconItem>
            <IconItem>
              <Image source={insuIcon.ICON_19_2} />
              <Typhograph type="NOTO" style={{ textAlign: 'center', marginTop: 10 }} lineheight={4} color="BLACK2">
                누수로 인한 {'\n'} 우리 집 손해
              </Typhograph>
            </IconItem>
            <IconItem>
              <Image source={insuIcon.ICON_19_3} />
              <Typhograph type="NOTO" style={{ textAlign: 'center', marginTop: 10 }} lineheight={4} color="BLACK2">
                12대 가전제품 {'\n'} 고장수리비용
              </Typhograph>
            </IconItem>
          </IconBox>

          <CollapseBox>
            <CollapseItem>
              <CollapseItemTitle onPress={() => toggleCollapsed('col1')}>
                <RowItem width="13%">
                  <Typhograph type="ROBOTO" color="SKYBLUE" size={40} weight="BOLD" lineheight={1}>
                    1.
                  </Typhograph>
                </RowItem>
                <RowItem width="75%">
                  <Typhograph type="NOTO" color="BLUE" lineheight={2} size={14}>
                    주택화재 중{'\n'}
                    54.6%는 부주의에 의해 일어납니다.
                  </Typhograph>
                </RowItem>
                <RowItem width="12%">
                  <Image
                    style={{ transform: [{ rotate: collapsed.col1 ? '0deg' : '180deg' }] }}
                    source={insuIcon.SELECT_ICON2}
                  />
                </RowItem>
              </CollapseItemTitle>
              <Animated.View style={{ maxHeight: colAnimationheight.col1 }}>
                {collapsed.col1 && (
                  <>
                    <CollapseItemBody>
                      <Image source={insuImg.IMG_19_1} />
                      <CollapseTextBox>
                        <Typhograph type="NOTO" color="BLUE" size={10} lineheight={2}>
                          · 전체화재에서 주택화재 발생률은 약 18.2%, 화재 사망자 비율 50.1%(절반)가 주택에서 발생
                        </Typhograph>
                        <Typhograph type="NOTO" color="BLUE" size={10} lineheight={2} style={{ marginTop: 10 }}>
                          · 음식물 조리, 담배꽁초, 쓰레기 소각, 불씨·불꽃 등 부주의에 의한 화재 54.6%
                        </Typhograph>
                      </CollapseTextBox>
                    </CollapseItemBody>
                  </>
                )}
              </Animated.View>
            </CollapseItem>

            <CollapseItem>
              <CollapseItemTitle onPress={() => toggleCollapsed('col2')}>
                <RowItem width="13%">
                  <Typhograph type="ROBOTO" color="SKYBLUE" size={40} weight="BOLD" lineheight={1}>
                    2.
                  </Typhograph>
                </RowItem>
                <RowItem width="75%">
                  <Typhograph type="NOTO" color="BLUE" lineheight={2} size={14}>
                    화재사고! 손해배상에 벌금까지 손해가{'\n'}
                    너무나 큽니다.
                  </Typhograph>
                </RowItem>
                <RowItem width="12%">
                  <Image
                    style={{ transform: [{ rotate: collapsed.col2 ? '0deg' : '180deg' }] }}
                    source={insuIcon.SELECT_ICON2}
                  />
                </RowItem>
              </CollapseItemTitle>
              <Animated.View style={{ maxHeight: colAnimationheight.col2 }}>
                {collapsed.col2 && (
                  <>
                    <CollapseItemBody>
                      <Image source={insuImg.IMG_19_2} />
                      <CollapseTextBox>
                        <Typhograph type="NOTO" color="BLUE" size={10} lineheight={2}>
                          · "고의 또는 과실로 인한 위법행위로 타인에게 손해를 가한 자는 그 손해를 배상할 책임이 있다."
                          (민법 750조)
                        </Typhograph>
                        <Typhograph type="NOTO" color="BLUE" size={10} lineheight={2} style={{ marginTop: 10 }}>
                          · "과실로 인해 타인 소유의 물건에 손해를 가한 자는 2천만 원 이하의 벌금에 처한다." (형법
                          170조, 171조)
                        </Typhograph>
                      </CollapseTextBox>
                    </CollapseItemBody>
                  </>
                )}
              </Animated.View>
            </CollapseItem>

            <CollapseItem>
              <CollapseItemTitle onPress={() => toggleCollapsed('col3')}>
                <RowItem width="13%">
                  <Typhograph type="ROBOTO" color="SKYBLUE" size={40} weight="BOLD" lineheight={1}>
                    3.
                  </Typhograph>
                </RowItem>
                <RowItem width="75%">
                  <Typhograph type="NOTO" color="BLUE" lineheight={2} size={13}>
                    화재로 인한{'\n'}
                    경제적 손해 비용, 부담을 덜어드립니다.
                  </Typhograph>
                </RowItem>
                <RowItem width="12%">
                  <Image
                    style={{ transform: [{ rotate: collapsed.col3 ? '0deg' : '180deg' }] }}
                    source={insuIcon.SELECT_ICON2}
                  />
                </RowItem>
              </CollapseItemTitle>
              <Animated.View style={{ maxHeight: colAnimationheight.col3 }}>
                <CollapseItemBody>
                  {collapsed.col3 && (
                    <>
                      <CollapseItemBody>
                        <Image source={insuImg.IMG_19_3} />
                        <CollapseTextBox>
                          <Typhograph type="NOTO" color="BLUE" size={10} lineheight={2}>
                            · 화재로 우리집 건물, 가재도구 피해 시 실제 손해액 보상(가입금액 한도 내, 특약)
                          </Typhograph>
                          <Typhograph type="NOTO" color="BLUE" size={10} lineheight={2} style={{ marginTop: 10 }}>
                            · 임시 거주비 지원 (1일 이상 1일당, 최대 90일, 특약)
                          </Typhograph>
                          <Typhograph type="NOTO" color="BLUE" size={10} lineheight={2} style={{ marginTop: 10 }}>
                            · 화재로 인한 타인 사망 또는 부상으로 손해 발생시 배상책임 보장(특약)
                          </Typhograph>
                        </CollapseTextBox>
                      </CollapseItemBody>
                    </>
                  )}
                </CollapseItemBody>
              </Animated.View>
            </CollapseItem>

            <CollapseItem>
              <CollapseItemTitle onPress={() => toggleCollapsed('col4')}>
                <RowItem width="13%">
                  <Typhograph type="ROBOTO" color="SKYBLUE" size={40} weight="BOLD" lineheight={1}>
                    4.
                  </Typhograph>
                </RowItem>
                <RowItem width="75%">
                  <Typhograph type="NOTO" color="BLUE" lineheight={2} size={13}>
                    화재 외에 일어날 수 있는
                    {'\n'}
                    우리 집 손해 비용을 보상해 드립니다.
                  </Typhograph>
                </RowItem>
                <RowItem width="12%">
                  <Image
                    style={{ transform: [{ rotate: collapsed.col4 ? '0deg' : '180deg' }] }}
                    source={insuIcon.SELECT_ICON2}
                  />
                </RowItem>
              </CollapseItemTitle>
              <Animated.View style={{ maxHeight: colAnimationheight.col4 }}>
                {collapsed.col4 && (
                  <>
                    <CollapseItemBody>
                      <Image source={insuImg.IMG_19_4} />
                      <CollapseTextBox>
                        <Typhograph type="NOTO" color="BLUE" size={10} lineheight={2}>
                          · 가정 생활에 많이 쓰는 12대 가전제품 수리비를 가입금액 한도 내에서 보상(특약)
                        </Typhograph>
                        <Typhograph type="NOTO" color="BLUE" size={10} lineheight={2} style={{ marginTop: 10 }}>
                          · 도둑이 들어 발생한 손해도 가입금액 한도 내에서 보상(특약)
                        </Typhograph>
                      </CollapseTextBox>
                    </CollapseItemBody>
                  </>
                )}
              </Animated.View>
            </CollapseItem>
          </CollapseBox>

          <ButtonBox>
            <RightIconButton
              onPress={() => onClickTermsModalOpen2('productionInfo', houseProductInfoHtml())}
              title="상품안내 및 보장내용 자세히보기"
            />
          </ButtonBox>
        </ContentsContainer>
        <TermsModal
          open={state?.termsModal}
          close={() => onChangeState('termsModal', false)}
          html={state?.termsHtml}
          onPress={() => onChangeState('termsModal', false)}
          buttonTitle="확인"
          isButton
        />
        <BottomFixButton
          index={1}
          leftTitle="이전"
          rightTitle="보험료 간편계산"
          bottomRightPress={() => handleJoinTypeNextButton()}
          bottomLeftPress={() => null}
          isKeybordView={state.isKeybordView}
        />
      </Container>
    );
  } else {
    return <EmptyLayout />;
  }
}
