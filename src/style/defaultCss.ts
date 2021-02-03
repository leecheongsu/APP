export const defaultCssHtml = () => {
  return `@charset "utf-8";

  /* Reset */
  body,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,form,fieldset,p,input,textarea,i,u,em,strong,b,a,button,th,td, code {margin:0;padding:0;font-style:normal;letter-spacing:-0.04em;}
  b,em {font-weight:inherit;}
  h1,h2,h3,h4,h5,h6 {font-size:inherit;}
  *,*:before,*:after {-webkit-box-sizing:border-box;box-sizing:border-box;}
  img,fieldset,iframe,button {border:0;}
  ul,li {list-style:none}
  input[type="text"],input[type="search"],input[type="tel"],input[type="password"],textarea {-webkit-appearance:none;}
  input,select,button,label,textarea {vertical-align:middle;outline:0;-webkit-appearance:none;}
  input,textarea,button {font-size:inherit;font-family:inherit;color:inherit;line-height:inherit;}
  input[type="password"] {font-family:inherit;}
  select {font-size:inherit;color:inherit;line-height:inherit;-webkit-appearance:none;font-family:'NotoSans', 'Roboto';}
  input:disabled,select:disabled,button:disabled,label:disabled,a:disabled,textarea:disabled {cursor:default;opacity: .5;}
  label,button,select,a {cursor:pointer;}
  table {border-collapse:separate;border-spacing:0;width:100%;table-layout:fixed;}
  legend,
  caption {visibility:hidden !important;color:transparent !important;opacity:0 !important;width:0px !important;height:0px !important;font-size:0px !important;}
  a {text-decoration:none;color:inherit;outline:0;}
  a:visited {text-decoration:none;}
  a:hover,
  a:focus {text-decoration:none;}
  textarea {resize:none;line-height:1.5;}
  button {background:none;font-family:inherit;overflow:visible;text-align:inherit;font-weight:inherit;}
  u {text-decoration:none;}
  code {display:inline;color:inherit;font-size:inherit;line-height:inherit;font-family:inherit;font-weight:inherit;}
  input[type="text"]{border:none;}
  html {-webkit-text-size-adjust:none;}
  
  body {word-break:break-all;font-size:14px;line-height: 20px;font-family:'NotoSans', 'Roboto';font-weight:400;color: #666;}
  
  /* skip */
  #skip {height:0;width:100%;z-index:100000;}
  #skip a {position:absolute;top:-9999px;left:0;z-index:10000;display:block;width:100%;height:40px;background-color:#000;line-height:40px;opacity:1;color:#fff;text-align:center;}
  #skip a:focus, #skip a:hover, #skip a:active, #skip a:visited {top:0;}
  
  /* common */
  input::-webkit-input-placeholder{color:inherit;font-weight:inherit;}
  input:-ms-input-placeholder {color:inherit;font-weight:inherit;}
  input::-moz-input-placeholder{color:inherit;font-weight:inherit;}
  .inp input[type="radio"],
  .inp input[type="checkbox"] {font-size:0;line-height:0;border:0;opacity:0;position:absolute;z-index:-1;width:16px;height:16px;left:0;top:0;}
  input[type="text"][readonly],
  input[type="tel"][readonly],
  input[type="password"][readonly],
  input[type="search"][readonly],
  textarea[readonly] {background:#f7f7f7!important;}
  input[type="text"][readonly]::placeholder{color:#333 !important}
  input::-ms-clear {display:none;}
  input[type="search"]::-webkit-search-cancel-button { display:none; }
  input[type="date"]::-webkit-calendar-picker-indicator {display:none;}
  input[type="date"] {-webkit-appearance: textfield;-moz-appearance: textfield;}
  select::-ms-expand {display:none}
  select:focus::-ms-value {background:inherit;color:inherit;}
  .header:empty {display:none;}
  .footer:empty {display:none;}
  
  /* hidden */
  .blind {visibility:hidden !important;position:absolute !important;color:transparent !important;opacity:0 !important;width:1px !important;height:1px !important;font-size:1px !important;text-indent:-9999px !important;}
  
  .fl {float:left!important;}
  .fr {float:right!important;}
  .al {text-align:left!important;}
  .ac {text-align:center!important;}
  .ar {text-align:right!important;}
  
  .pt0 {padding-top:0!important;}
  .m0 {margin:0 !important;}
  .h50{margin-top: 50px !important;}
  .h100{margin-top: 100px !important;}
  .del {text-decoration:line-through;}
  .block{display:block}
  
  .ir{overflow: hidden;width: 0;height: 0;margin: 0;padding: 0;font-size: 0;line-height: 0;color: transparent;border: 0;clip: rect(0 0 0 0);}
  .num{
	  font-family: 'Roboto' !important;
  }
  /*color*/
  .col-default{
	  color:#1667a8 !important
  }
  .col-bk{
	  color:#333 !important
  }
  .primary{
	  color:#47a5f1 !important
  }
  
  /*font init*/
  
  @font-face {
	  font-family:'NotoSans';
	  font-style:normal;
	  font-weight:300;
	  src:local('NotoSansCJKkr-Light'),
	  url('../font/NotoSansCJKkr-Light.woff2') format('woff2'),
	  url('../font/NotoSansCJKkr-Light.woff') format('woff');
  }
  @font-face {
	  font-family:'NotoSans';
	  font-style:normal;
	  font-weight:400;
	  src:local('NotoSansCJKkr-Regular'),
	  url('../font/NotoSansCJKkr-Regular.woff2') format('woff2'),
	  url('../font/NotoSansCJKkr-Regular.woff') format('woff');
  }
  @font-face {
	  font-family:'NotoSans';
	  font-style:normal;
	  font-weight:500;
	  src:local('NotoSansCJKkr-Medium'),
	  url('../font/NotoSansCJKkr-Medium.woff2') format('woff2'),
	  url('../font/NotoSansCJKkr-Medium.woff') format('woff');
  }
  @font-face {
	  font-family:'NotoSans';
	  font-style:normal;
	  font-weight:700;
	  src:local('NotoSansCJKkr-Bold'),
	  url('../font/NotoSansCJKkr-Bold.woff2') format('woff2'),
	  url('../font/NotoSansCJKkr-Bold.woff') format('woff');
  }
  
  @font-face {
	  font-family:'Roboto';
	  font-style:normal;
	  font-weight:300;
	  src:local(※),url(../font/Roboto-Light.woff) format('woff');
  }
  @font-face {
	  font-family:'Roboto';
	  font-style:normal;
	  font-weight:400;
	  src:local(※),url(../font/Roboto-Regular.woff) format('woff');
  }
  @font-face {
	  font-family:'Roboto';
	  font-style:normal;
	  font-weight:700;
	  src:local(※),url(../font/Roboto-Bold.woff) format('woff');
  }`;
};
