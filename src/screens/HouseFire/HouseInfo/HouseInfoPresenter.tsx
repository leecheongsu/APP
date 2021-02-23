import React from 'react';
import { BottomFixButton, InfoList, Loading } from '@app/components';
import { screenWidth } from '@app/lib';
import styled from '@app/style/typed-components';
import { WebView } from 'react-native-webview';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const Container = styled.View`
  width: ${screenWidth()}px;
`;
const ContentsContainer = styled.View``;

const InfoScrollView = styled.ScrollView``;
const InfoListBox = styled.View``;

const WebviewBox = styled.View`
  height: 310px;
  max-height: 310px;
`;

const PaddingBox = styled.View`
  height: 400px;
`;

function HouseInfoPresenter({ state, handleNextButton, handlePreviousButton, infoList }) {
  const html = `
  <html lang="en">
  <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ec77629929fd12e024fc9d54d34dbfbc&libraries=services"></script>
  </head>
  <body>
    <div id="roadview" style="width:100%;height:300px;"></div>
    <script type="text/javascript">
    var geocoder = new kakao.maps.services.Geocoder();
    var roadviewContainer = document.getElementById('roadview'); 
    var roadview = new kakao.maps.Roadview(roadviewContainer); 
    var roadviewClient = new kakao.maps.RoadviewClient(); 
    var coords = new kakao.maps.LatLng(${state.lat}, ${state.lng});
    roadviewClient.getNearestPanoId(coords, 50, function(panoId) {
      roadview.setPanoId(panoId, coords); //panoId와 중심좌표를 통해 로드뷰 실행
    });
    </script>
  </body>
  </html>
`;
  return (
    <>
      <Container>
        <ContentsContainer>
          {state.selectAddress.address === undefined ? (
            <Loading />
          ) : (
            <>
              <WebviewBox contentContainerStyle={{ flexGrow: 1 }}>
                <WebView
                  style={{ height: 310 }}
                  source={{
                    html,
                    baseUrl: 'web/',
                  }}
                  automaticallyAdjustContentInsets={false}
                  startInLoadingState={true}
                  originWhitelist={'["*"]'}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  scalesPageToFit={true}
                  scrollEnabled={false}
                />
              </WebviewBox>
              <InfoScrollView>
                <InfoListBox>
                  <InfoList list={infoList} state={state} />
                  <PaddingBox />
                </InfoListBox>
              </InfoScrollView>
            </>
          )}
        </ContentsContainer>
        <BottomFixButton
          index={state.stepNumber}
          leftTitle="이전"
          rightTitle="다음"
          bottomRightPress={handleNextButton}
          bottomLeftPress={handlePreviousButton}
          isKeybordView={state.isKeybordView}
        />
      </Container>
    </>
  );
}

export default HouseInfoPresenter;
