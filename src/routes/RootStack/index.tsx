import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FindEmail, Join, JoinSuccess, FindPassword, Profile, Secession, Verification, MyInsu } from '@app/screens';
import { BackButton, CloseButton, Typhograph } from '@app/components/index';
import theme from '@app/style/theme';
import Login from '@app/screens/Login';
import MainStack from '@app/routes/MainStack';
import { useNavigation } from '@react-navigation/native';
import RecommendUsers from '@app/screens/RecommendUsers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ContractorAddress from '@app/screens/ContractorAddress';
import { useGlobalState } from '@app/context';
import KakaoLogin from '@app/screens/KakaoLogin';

function RootStack() {
  const Stacks = createStackNavigator();
  const navigation = useNavigation();
  const globalState = useGlobalState();
  return (
    <Stacks.Navigator
      initialRouteName="HOME"
      mode="modal"
      screenOptions={{
        headerStyle: null,
        headerTitleAlign: 'center',
        gestureEnabled: false,
      }}>
      <Stacks.Screen
        name="MAIN_STACK"
        component={MainStack}
        options={{
          headerShown: false,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomColor: theme.color.BORDER_GRAY,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />
      <Stacks.Screen
        name="JOIN"
        component={Join}
        options={{
          headerLeft: () => <BackButton />,
          headerLeftContainerStyle: { paddingHorizontal: 10 },
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              회원가입
            </Typhograph>
          ),
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomColor: theme.color.BORDER_GRAY,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />
      <Stacks.Screen
        name="LOGIN"
        component={Login}
        options={{
          headerLeft: () => <BackButton onPress={() => navigation.navigate('MAIN_STACK')} />,
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              로그인
            </Typhograph>
          ),
          title: '',
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />
      <Stacks.Screen
        name="KakaoLogin"
        component={KakaoLogin}
        options={{
          headerLeft: () => <BackButton onPress={() => navigation.navigate('MAIN_STACK')} />,
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              카카오 로그인
            </Typhograph>
          ),
          title: '',
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />
      <Stacks.Screen
        name="VERIFICATION"
        component={Verification}
        options={{
          headerLeft: () => null,
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              본인인증
            </Typhograph>
          ),
          headerRight: () => <CloseButton onPress={() => navigation.goBack()} />,
          title: '',
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />
      <Stacks.Screen
        name="JOIN_SUCCESS"
        component={JoinSuccess}
        options={{
          headerLeft: () => <BackButton onPress={() => navigation.navigate('MAIN_STACK')} />,
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              회원가입완료
            </Typhograph>
          ),
          title: '',
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />

      <Stacks.Screen
        name="PROFILE"
        component={Profile}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              회원정보변경
            </Typhograph>
          ),
          title: '',
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />

      <Stacks.Screen
        name="SECESSION"
        component={Secession}
        options={{
          headerLeft: () => null,
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              회원탈퇴
            </Typhograph>
          ),
          headerRight: () => <CloseButton onPress={() => navigation.goBack()} />,
          title: '',
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />
      <Stacks.Screen
        name="FIND_EMAIL"
        component={FindEmail}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              이메일 찾기
            </Typhograph>
          ),
          title: '',
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />
      <Stacks.Screen
        name="FIND_PASSWORD"
        component={FindPassword}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              비밀번호 변경
            </Typhograph>
          ),
          title: '',
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />
      <Stacks.Screen
        name="RECOMMEND_USERS"
        component={RecommendUsers}
        options={{
          headerLeft: () => null,
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              추천인 선택
            </Typhograph>
          ),
          headerRight: () => <CloseButton onPress={() => navigation.goBack()} />,
          title: '',
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />
      <Stacks.Screen
        name="CONTRANCTOR_ADDRESS"
        component={ContractorAddress}
        options={{
          headerLeft: () => null,
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              {globalState?.contractorTitle}
            </Typhograph>
          ),
          headerRight: () => <CloseButton onPress={() => navigation.goBack()} />,
          title: '',
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />
      <Stacks.Screen
        name="MY_INSU"
        component={MyInsu}
        options={{
          headerLeft: () => <BackButton onPress={() => navigation.navigate('MAIN_STACK')} />,
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              내보험
            </Typhograph>
          ),
          headerRight: () => null,
          title: '',
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />
    </Stacks.Navigator>
  );
}

export default RootStack;
