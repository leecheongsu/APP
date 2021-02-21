import React, { useEffect, useRef, useState } from 'react';
import styled from '@app/style/typed-components';
import { BottomFixButton, DefaultAlert, RightIconButton, Typhograph } from '@app/components';
import { Animated, BackHandler, Image, Linking, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { screenWidth } from '@app/lib';
import { insuIcon } from '@app/assets';
import theme from '@app/style/theme';
import { TermsModal } from '@app/screens';
import { wwTerms2s1 } from '@app/lib/html';
import { useNavigation } from '@react-navigation/native';
const Container = styled.ScrollView``;

const RowBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const RowItem = styled.View``;
const LeftTextBox = styled.View`
  background-color: ${theme.color.MSG_BACK};
  padding: 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 2px;
`;
const RightTextBox = styled.View`
  background-color: ${theme.color.BLACK4};
  padding: 10px;
  width: 120px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 15px;
`;
const ImageBox = styled.View`
  margin-top: 40px;
  margin-right: 10px;
`;

const ContentsContainer = styled.View`
  padding: 20px 15px;
`;

const ChatBox = styled.View`
  padding: 20px 15px;
  background-color: ${theme.color.GRAY2};
`;

const Section1Box = styled.View``;

const Section2Box = styled.View`
  margin-top: 50px;
`;

const TitleBox = styled.View``;
const CircleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;
const CircleBox = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  background-color: ${theme.color.CIRCLE_BACK};
  align-items: center;
  justify-content: center;
`;

const ArrowBox = styled.View``;
const ButtonBox = styled.View`
  margin-top: 50px;
`;
const PaddingBox = styled.View`
  height: 150px;
`;

function Calamity() {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const width = screenWidth();
  const leftValue = useState(new Animated.Value(-width))[0];
  const leftValue2 = useState(new Animated.Value(-width))[0];
  const rightValue = useState(new Animated.Value(width))[0];
  const rightValue2 = useState(new Animated.Value(width))[0];

  const leftmove = () => {
    Animated.timing(leftValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const leftmove2 = () => {
    Animated.timing(leftValue2, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const rightMove = () => {
    Animated.timing(rightValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const rightMove2 = () => {
    Animated.timing(rightValue2, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    leftmove();
    setTimeout(() => rightMove(), 500);
    setTimeout(() => leftmove2(), 1200);
    setTimeout(() => rightMove2(), 1700);
  }, []);

  //안드로이드 백버튼 핸들러
  useEffect(() => {
    const backAction = () => {
      DefaultAlert({ title: '알림', msg: '메인페이지로 돌아 가시겠습니까?', okPress: () => navigation.goBack() });
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <Container>
        <ChatBox>
          <Animated.View // Special animatable View
            style={{
              transform: [{ translateX: leftValue }],
            }}>
            <RowBox>
              <RowItem>
                <ImageBox>
                  <Image source={insuIcon.INSU_ROBO} />
                </ImageBox>
              </RowItem>
              <RowItem>
                <LeftTextBox>
                  <Typhograph type="NOTO" color="GRAY" size={13}>
                    소상공인 사장님,화재보험은 가입 하셨나요?
                  </Typhograph>
                </LeftTextBox>
              </RowItem>
            </RowBox>
          </Animated.View>

          <Animated.View // Special animatable View
            style={{
              transform: [{ translateX: rightValue }],
              alignItems: 'flex-end',
            }}>
            <RightTextBox>
              <Typhograph type="NOTO" color="WHITE" size={13}>
                네,그럼요^^
              </Typhograph>
            </RightTextBox>
          </Animated.View>

          <Animated.View // Special animatable View
            style={{
              transform: [{ translateX: leftValue2 }],
              marginTop: 20,
            }}>
            <RowBox>
              <RowItem>
                <ImageBox>
                  <Image source={insuIcon.INSU_ROBO} />
                </ImageBox>
              </RowItem>
              <RowItem>
                <LeftTextBox>
                  <Typhograph type="NOTO" color="GRAY" size={13}>
                    그럼,
                    <Typhograph type="NOTO" color="GRAY" weight="BOLD">
                      재난배상책임보험
                    </Typhograph>{' '}
                    은?
                  </Typhograph>
                </LeftTextBox>
              </RowItem>
            </RowBox>
          </Animated.View>

          <Animated.View // Special animatable View
            style={{
              transform: [{ translateX: rightValue2 }],
              alignItems: 'flex-end',
            }}>
            <RightTextBox>
              <Typhograph type="NOTO" color="WHITE" size={13}>
                ............. ??
              </Typhograph>
            </RightTextBox>
          </Animated.View>
        </ChatBox>

        <ContentsContainer>
          <Section1Box>
            <TitleBox>
              <Typhograph type="NOTO" color="BLUE" size={18} weight="BOLD">
                사장님,{'\n'}이제는 “선택”이 아니라,{'\n'} “필수” 입니다.
              </Typhograph>
            </TitleBox>
            <RowBox style={{ marginTop: 30 }}>
              <RowItem style={{ width: '70%' }}>
                <Typhograph type="NOTO" color="GRAY" size={12}>
                  화재, 폭발, 붕괴 등 피해에 대한 사업장에 적합한 재난배상 든든하게 대비하세요. 보험설계사와 관계없이
                  간편하고 저렴하게 다이렉트 간편설계 드립니다.
                </Typhograph>
                <Typhograph type="NOTO" color="GRAY" size={12} style={{ marginTop: 10 }}>
                  - 음식점 등 20개 업종 대상 의무가입
                </Typhograph>
                <Typhograph type="NOTO" color="GRAY" size={12}>
                  - 일련번호 조회로 가입 대상 확인 가능
                </Typhograph>
              </RowItem>
              <RowItem style={{ width: '30%', paddingLeft: '5%' }}>
                <Image source={insuIcon.ICON_42} />
              </RowItem>
            </RowBox>
            <Typhograph type="NOTO" color="BLACK2" size={12} style={{ marginTop: 10 }}>
              {'※ <다중이용업소 화재> 보험에 가입해야 하는 시설은 중복 가입 하지 않아도 돼요.'}
            </Typhograph>
          </Section1Box>

          <Section2Box>
            <TitleBox>
              <Typhograph type="NOTO" color="BLACK2" size={18} weight="BOLD">
                일반 화재보험과 화재배상책임보험의{'\n'} 보장 범위를 확인해 보세요.
              </Typhograph>
            </TitleBox>
            <CircleContainer>
              <RowItem>
                <CircleBox>
                  <Typhograph type="NOTO" color="BLACK2" size={12} lineheight={20}>
                    화재보험
                  </Typhograph>
                  <Typhograph type="NOTO" color="BLACK2" size={10} style={{ textAlign: 'center' }} lineheight={2}>
                    화재로 인한 재산상의{'\n'}
                    손해배상{'\n'}
                    (건물, 집기, 동산 등){'\n'}
                  </Typhograph>
                </CircleBox>
              </RowItem>
              <ArrowBox>
                <Image source={insuIcon.ARR_LR} />
              </ArrowBox>
              <RowItem>
                <CircleBox>
                  <Typhograph type="NOTO" color="BLACK2" size={12} lineheight={20}>
                    화재배상책임보험
                  </Typhograph>
                  <Typhograph type="NOTO" color="BLACK2" size={10} style={{ textAlign: 'center' }} lineheight={2}>
                    화재 및 폭발로 인한{'\n'}
                    타인의 생명, 신체,{'\n'}
                    재산상의 손해 보상{'\n'}
                  </Typhograph>
                </CircleBox>
              </RowItem>
            </CircleContainer>
          </Section2Box>
          <ButtonBox>
            <RightIconButton onPress={() => setIsOpen(true)} title="상품안내 및 보장내용 자세히보기" />
          </ButtonBox>
        </ContentsContainer>

        <TermsModal
          open={isOpen}
          close={() => setIsOpen(false)}
          html={wwTerms2s1()}
          onPress={() => setIsOpen(false)}
          buttonTitle="확인"
          isButton
        />
        <PaddingBox />
      </Container>
      <BottomFixButton
        index={1}
        leftTitle="이전"
        rightTitle="다음"
        bottomRightPress={() =>
          DefaultAlert({
            title: '인슈로보 페이지이동',
            msg: '본 상품은 현대해상 [다중이용시설배상책임보험]으로 현대해상다이렉트로 이동합니다.',
            okPress: () => Linking.openURL('https://insrb.com/DajungCompensate.aspx'),
          })
        }
        bottomLeftPress={() => null}
        isKeybordView={false}
      />
    </>
  );
}

export default Calamity;
