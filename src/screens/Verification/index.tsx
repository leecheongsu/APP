import React, { useEffect, useState } from 'react';
import { userApis } from '@app/api/User';
import { Loading } from '@app/components';
import { useGlobalDispatch, useGlobalState } from '@app/context';
import { handleApiError } from '@app/lib';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';

function Verification() {
  const navigation = useNavigation();
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const [data, setData] = useState<any>('');

  // 서버로부터 본인인증키 받아오는 함수
  const getOkcert = () => {
    const quote_no = globalState?.selectAddress?.quote_no;
    const params = {
      quote_no,
      user_id: globalState?.user?.email,
    };
    userApis
      .getOkcert(params)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        handleApiError(e.response);
      });
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
    if (e.nativeEvent.data === 'ok') {
      globalDispatch({ type: 'CHANGE', name: 'isIdentityverification', value: true });
      alert('본인인증에 성공하였습니다.');
      navigation.goBack();
    } else {
      globalDispatch({ type: 'CHANGE', name: 'isIdentityverification', value: false });
      alert('인증에 실패하였습니다. 다시 본인인증을 진행해 주세요.');
      navigation.goBack();
    }
  };

  useEffect(() => {
    getOkcert();
  }, []);

  return (
    <WebView
      style={{ height: 100 }}
      source={{
        html,
      }}
      onMessage={onMessage}
      originWhitelist={'["*"]'}
      renderLoading={() => <Loading />}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      scalesPageToFit={true}
      scrollEnabled={false}
    />
  );
}

export default Verification;
