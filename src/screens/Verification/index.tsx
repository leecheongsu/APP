import { Loading } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import WebView from 'react-native-webview';

function Verification() {
  const navigation = useNavigation();
  const test = async () => {
    axios({
      method: 'get',
      url: 'http://192.168.0.14:8080/okcert',
      params: {
        quote_no: '123',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  test();

  const html = `
  <html lang="en">
  <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script type="text/javascript">
        function request(){
            document.form1.action = "https://safe.ok-name.co.kr/CommonSvl";
            document.form1.method = "post";
            document.form1.submit();
        }
      </script>
  </head>
  <body>
      <form name="form1">
      <input type="hidden" name="tc" value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd"/>
      <input type="hidden" name="cp_cd" value="V44820000000">
      <input type="hidden" name="mdl_tkn" value="fb97675c34524f0fa9b4245800de9e6a">	
      <input type="hidden" name="target_id" value="">		
      </form>
    <script type="text/javascript">
        request()
    </script>
  </body>
  </html>
    `;

  const onMessage = (e) => {
    if (e.nativeEvent.data) {
      navigation.goBack();
    }
  };

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
