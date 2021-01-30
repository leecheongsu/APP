import { commonCssHtml } from '@app/style/commonCss';
import { defaultCssHtml } from '@app/style/defaultCss';
const commonCss = commonCssHtml();
const defaultCss = defaultCssHtml();

export const danchInfoText = () => {
  const html = `
  <html>
  <head>
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
  <link rel="stylesheet" type="text/css" href="../src/style/common.css">  
  <style type="text/css">
    ${commonCss}
    ${defaultCss}
  </style>
  </head>
  <body>
    <div class="modal-content">
      <div class="content">
       <h2>단체보험 가입 건</h2>
      <div class="con-txt">
          관리사무소 등을 통해 단체로 가입되어 있는 건물이라면 ‘단체보험 가입 건’을 선택하세요.
      </div>
      <h2>단체보험 미가입 건</h2>
      <div class="con-txt">
          관리사무소 등을 통해서 단체로 가입되어 있지 않은 건물이라면 ‘단체보험 미가입 건’을 선택하세요.
      </div>
      </div>
      </div>
  </body>
  </html>
    `;
  return html;
};

export const selectDamboText = () => {
  const html = `
  <html>
  <head>
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
  <link rel="stylesheet" type="text/css" href="../src/style/common.css">  
  <style type="text/css">
    ${commonCss}
    ${defaultCss}
  </style>
  </head>
  <body>
  <div class="modal-content">
  <div class="content">
      <h2>급배수누출손해</h2>
      <div class="con-txt">
          급배수 시설이 우연한 사고로 인해 누수 또는 방수 됨에 따라 건물에 대한 직접 손해를 보상합니다.
          <div class="info-txt2 bk">단, 급배수시설 자체의 손해(교체비용, 수리비용 등)는 제외되고, 스프링클러 및 기타 장치는 급배수 시설에 포함하지 않습니다.</div>
      </div>
      <h2>유리 손해</h2>
      <div class="con-txt">
          건물에 부착되어 있는 판유리에 생긴 파손의 손해를 보상합니다.
      </div>
      <h2>대물배상책임</h2>
      <div class="con-txt">
          보험계약자 건물로 인해 타인의 건물에 손해를 가했을 경우에 대한 책임을 보상합니다.
      </div>
      <div class="info-txt2 bk">기타 자세한 정보는 약관을 통해 확인하실 수 있습니다.</div>
  </div>
  </div>
  </body>
  </html>
    `;
  return html;
};

export const gajeDamboText = () => {
  const html = `
  <html>
  <head>
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
  <link rel="stylesheet" type="text/css" href="../src/style/common.css">  
  <style type="text/css">
    ${commonCss}
    ${defaultCss}
  </style>
  </head>
  <body>
  <div class="modal-content">
  <div class="content">
      <h2>급배수누출손해</h2>
      <div class="con-txt">
          급배수 시설이 우연한 사고로 인해 누수 또는 방수 됨에 따라 건물에 대한 직접 손해를 보상합니다.
          <div class="info-txt2 bk">단, 급배수시설 자체의 손해(교체비용, 수리비용 등)는 제외되고, 스프링클러 및 기타 장치는 급배수 시설에 포함하지 않습니다.</div>
      </div>
      <h2>가재 도난</h2>
      <div class="con-txt">
      보험가입 건물 구내에서 강도 또는 절도(그 미수 포함)로 생긴 도난, 훼손 또는 망가진 손해를 보상합니다.
      </div>
      <h2>잠금장치</h2>
      <div class="con-txt">
      도난 손해 발생 시 도어록 잠금 장치 교체 비용에 대해 보상합니다.
      </div>
      <div class="info-txt2 bk">기타 자세한 정보는 약관을 통해 확인하실 수 있습니다.</div>
  </div>
  </div>
  </body>
  </html>
    `;
  return html;
};
