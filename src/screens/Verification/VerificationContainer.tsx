import React, { useEffect, useState } from 'react';
import VerificationPresenter from '@app/screens/Verification/VerificationPresenter';
import { DefaultAlert } from '@app/components';
import { Alert, BackHandler, Keyboard, StatusBar } from 'react-native';
import { handleApiError } from '@app/lib';
import { insuApis } from '@app/api/Insurance';
import { userApis } from '@app/api/User';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { useNavigation } from '@react-navigation/native';

export default function VerificationContainer() {
  const navigation = useNavigation();
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const [data, setData] = useState<any>('');
  const [loading, setLoading] = useState(false);
  // 서버로부터 본인인증키 받아오는 함수
  const getOkcert = () => {
    const quote_no = globalState?.selectAddress?.quote_no;
    const params = {
      quote_no,
      user_id: globalState?.user?.email,
    };
    if (globalState?.insuType === 'home') {
      userApis
        .getOkcert(params)
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => {
          handleApiError(e.response);
        });
    } else {
      userApis
        .getwwOkcert(params)
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => {
          handleApiError(e.response);
        });
    }
  };

  const html = `
  <html lang="en">
  <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script type="text/javascript">
        function request(){
            document.form1.action = "${data?.popupUrl}";
            document.form1.method = "post";
            document.form1.submit();
        }
      </script>
  </head>
  <body>
      <form name="form1">
      <input type="hidden" name="tc" value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd"/>
      <input type="hidden" name="cp_cd" value="${data?.CP_CD}">
      <input type="hidden" name="mdl_tkn" value="${data?.MDL_TKN}">	
      <input type="hidden" name="target_id" value="">		
      </form>
    <script type="text/javascript">
        request()
    </script>
  </body>
  </html>
  `;
  const onMessage = (e) => {
    StatusBar.setBarStyle('dark-content');
    if (globalState.insuType === 'home') {
      if (e.nativeEvent.data === 'ok') {
        globalDispatch({ type: 'CHANGE', name: 'isIdentityverification', value: true });
        Alert.alert('알림', '본인인증에 성공하였습니다.');
        navigation.goBack();
      } else {
        globalDispatch({ type: 'CHANGE', name: 'isIdentityverification', value: false });
        Alert.alert('알림', '인증에 실패하였습니다. 다시 본인인증을 진행해 주세요.');
        navigation.goBack();
      }
    } else {
      setLoading(true);
      const result = JSON.parse(e.nativeEvent.data);
      if (result.status === 'ok') {
        // globalDispatch({ type: 'CHANGE', name: 'isIdentityverification', value: true });
        const datas = {
          user_id: globalState?.user?.email,
          data: {
            quote_no: globalState?.selectAddress?.quote_no,
            ca_serial: result.ca_serial,
            ca_dn: result.ca_dn,
            ww_info: {
              ...globalState.postWwPremium?.data,
              oagi6002vo: {
                ...globalState.postWwPremium?.data?.oagi6002vo,
                ptyKorNm: globalState?.user?.name,
                regNo1: globalState?.jumina,
                regNo2: globalState?.juminb,
                telCat: '3',
                telNo1: globalState?.user?.mobile?.slice(0, 3),
                telNo2: globalState?.user?.mobile?.slice(3, 7),
                telNo3: globalState?.user?.mobile?.slice(7, 11),
                ptyBizNm: '',
                bizNo1: '',
                bizNo2: '',
                bizNo3: '',
              },
            },
          },
        };
        insuApis
          .postWwPremium(datas)
          .then((res) => {
            if (res.status === 200) {
              globalDispatch({ type: 'CHANGE', name: 'isIdentityverification', value: true });
              globalDispatch({ type: 'CHANGE', name: 'electronicSignPreData', value: res.data });
              navigation.goBack();
              setLoading(false);
              Alert.alert('알림', '본인인증에 성공하였습니다.');
            } else {
              globalDispatch({ type: 'CHANGE', name: 'isIdentityverification', value: false });
              Alert.alert('알림', '오류가발생하였습니다.');
              navigation.goBack();
              setLoading(false);
            }
          })
          .catch((e) => {
            globalDispatch({ type: 'CHANGE', name: 'isIdentityverification', value: false });
            handleApiError(e.response);
            navigation.goBack();
            setLoading(false);
          });
      } else {
        // globalDispatch({ type: 'CHANGE', name: 'isIdentityverification', value: false });
        Alert.alert('알림', '인증에 실패하였습니다. 다시 본인인증을 진행해 주세요.');
        navigation.goBack();
      }
    }
  };

  const handleLoading = (e) => {
    StatusBar.setBarStyle('dark-content');
  };

  useEffect(() => {
    getOkcert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //안드로이드 백버튼 핸들러
  useEffect(() => {
    const backAction = () => {
      DefaultAlert({ title: '알림', msg: '본인인증을 종료하시겠습니까?', okPress: () => navigation.goBack() });
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  //웹뷰에서 키보드 입력하면 status바 없어지는거 방지
  const _keyboardDidShow = () => {
    StatusBar.setBarStyle('dark-content');
  };

  const _keyboardDidHide = () => {
    StatusBar.setBarStyle('dark-content');
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <VerificationPresenter loading={loading} html={html} onMessage={onMessage} handleLoading={handleLoading} />;
}
