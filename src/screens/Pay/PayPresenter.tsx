import { Loading, Typhograph } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
function PayPresenter() {
  const navigation = useNavigation();
  const html = `
  <html> 
  <head> 
  <title>INIpay Mobile WEB example</title> 
  <meta http-equiv="Content-Type" content="text/html; charset=euc-kr"/> 
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
  <script language="javascript"> 
    function on_pay() { 
      form = document.mobileweb; 
      form.action = "https://mobile.inicis.com/smart/payment/";
      form.target = "_self";
      form.submit(); 
    }  
  </script> 

  </head> 

  <body>
  <!-- 인코딩 euc-kr 필수 -->
  <form name="mobileweb" method="post" accept-charset="euc-kr"> 


  <!--*************************필수 세팅 부분************************************-->

  <!-- 리턴받는 가맹점 URL 세팅 -->
  <input type="text" name="P_NEXT_URL" value="http://210.218.238.169:8080/kginicis/rtn/house"> 
  
  
  <!-- 지불수단 선택 (신용카드,계좌이체,가상계좌,휴대폰) -->
  <input type="text" name="P_INI_PAYMENT" value="VBank"> 


  <!-- 복합/옵션 파라미터 -->
  <input type="text" name="P_RESERVED" value="twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N"> 

    
  <input type="text" name="P_MID" value="insurobo01"> 
  <input type="text" name="P_OID" value="test_oid_123456">  
  <input type="text" name="P_GOODS" value="테스트상품"> 
  <input type="text" name="P_AMT" value="1004"> 
  <input type="text" name="P_UNAME" value="테스터"> 


  <!--*************************선택 필수 세팅 부분************************************--> 

  <!-- 가상계좌 입금 노티 사용시 필수 -->
  <input type="text" name="P_NOTI_URL" value="">  


  <!-- 휴대폰결제 필수 [1:컨텐츠, 2:실물] -->
  <input type="text" name="P_HPP_METHOD" value="1">  



  <input type="button" name="pay" value="결제" onclick="on_pay()">


  </form> 

  </body>
  </html> 
  `;
  const onMessage = (e) => {
    if (e.nativeEvent.data === 'ok') {
      alert('본인인증에 성공하였습니다.');
    } else {
    }
  };
  const runFirst = `
  function btnClick(e){ window.ReactNativeWebView.postMessage("ok"); }
  document.querySelector(".btnClose").addEventListener("click",btnClick)
  document.querySelector(".btnWrap span").addEventListener("click",btnClick)

`;

  const onNavigationStateChange = (navState) => {
    if (navState.navigationType === 'backforward') {
      navigation.goBack();
    }
  };

  return (
    <WebView
      style={{}}
      source={{
        uri: 'https://mdirect.hi.co.kr/service.do?m=eb38166bf9&seq=16137284343131777323549&ch=W&nm=',
      }}
      onNavigationStateChange={onNavigationStateChange}
      onMessage={onMessage}
      originWhitelist={'["*"]'}
      renderLoading={() => <Loading />}
      injectedJavaScript={runFirst}
      javaScriptEnabled={true}
      javaScriptEnabledAndroid={true}
      domStorageEnabled={true}
      scalesPageToFit={true}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default PayPresenter;
