export const commonCssHtml = () => {
  return `@charset "utf-8";

  header{
	  border-bottom: 1px solid #e0e0e0;
	  position: relative;
  }
  .pop header{
	  width:100%;
	  left:0;
	  top:0;
	  z-index: 10;
	  background:#fff
  }
  header .go-back{
	  width:37px;
	  height:37px;
	  margin-left: 5px;
	  position: absolute;
	  left: 0;
	  top: 9px;
  }
  header .go-back button{
	  width:37px;
	  height:37px;
	  background:url(../img/common/ico-back.png)no-repeat 0 0;
	  background-size: 37px 37px;
  }
  header h1{
	  font-size: 17px;
	  line-height: 55px;
	  text-align: center;
	  width: 100%;
	  color:#000
  }
  .pop #container{
	  padding-top: 0px;
  }

  .pop .cont-inner{
	padding: 0px 15px 100px 15px;
  }
  .cont-inner{
	padding: 0px 15px 140px 15px;
  }
  .cont-inner.point{
	  border-radius: 30px 30px 0 0;
	  background:#fff;
	  margin-top: -40px;
	  padding: 30px 20px 20px;
  }
  
  .cont-inner h4{
	  font-size: 15px;
	  color: #333;
	  font-weight: 500;
  }
  h3.h3{
	  font-size: 15px;
	  color:#013561;
	  margin-bottom: 10px;
	  overflow: hidden;
  }
  .h3 .pri{
	  font-size: 15px;
	  font-weight: 400;
	  color:#707070;
	  float:right
  }
  .h3 .pri .num{
	  font-size: 20px;
	  font-weight: 600;
  }
  .h-line{
	  border-top: 1px solid #e0e0e0;
  }
  .h-line.pb{
	  padding-bottom: 20px;
  }
  .h-line.ltop{
	  border-bottom:none
  }
  .h-top{margin-top: 10px;}
  .h-top2{margin-top: 20px;}
  .h-top + h3,
  .h-line + h3,
  .list-type + .h3,
  .h-top + h4{margin-top: 30px;}
  .step-wrap{
	  padding:15px 0;
	  text-align: center;
	  display:none;
  }
  .step-wrap h2{
	  color:#013561;
	  font-size: 16px;
	  padding-bottom: 10px;
  }
  .step-wrap .step{
	  display:flex;
	  align-items: center;
	  justify-content: center;
  }
  .step-wrap .step li{
	  color:#fff;
	  font-size: 13px;
	  font-family: 'Roboto';
	  background:#ddd;
	  border-radius: 50%;
	  width:19px;
	  height:19px;
	  text-align: center;
	  line-height: 19px;
  }
  .step-wrap .step li + li{
	  margin-left: 7px;
  }
  .step-wrap .step .current{
	  background:#47a5f1
  }
  .infobox{
	  border-bottom:1px solid #dfe4ea;
	  font-size: 15px;
	  color: #333;
	  text-align: center;
	  padding: 20px;
	  box-shadow: 0px 7px 0px 0px rgba(245,245,245,1);
	  margin-bottom: 7px;
  }
  .pop .infobox{
	  border-top:none
  }
  .agree{
	  color:#707070
  }
  .agree .form{
	  margin-top: 18px;
  }
  
  .chk-box{
	  padding-top: 25px;
  }
  .chk-box li{
	  border:1px solid #e0e0e0;
	  border-radius: 10px;
	  box-shadow: 2px 3px 7px 0px rgba(0, 0, 0, 0.05);
	  padding:20px 12px
  }
  .chk-box li + li{
	  margin-top: 20px;
  }
  .chk-box .txt{
	  position:relative;
	  margin-bottom:20px;
	  display:flex
  }
  .chk-box .txt .q{
	  background:#97d1ff;
	  font-size: 17px;
	  color:#fff;
	  font-weight: 700;
	  font-family: 'Roboto';
	  border-radius: 50%;
	  display: block;
	  width:28px;
	  height:28px;
	  text-align: center;
	  line-height: 28px;
	  flex: 0 0 28px;
	  margin-right: 10px;
  }
  .chk-box .form{
	  text-align: center;
	  margin-top:20px
  }
  
  .search-box{
	  padding:30px 20px;	
	  border-bottom: 1px solid #e0e0e0;
	  text-align: center;
  }
  .search-box .input{
	  position:relative;
	  border:2px solid #47a4f1;
	  border-radius: 25px;
	  background:#fff;
	  height: 45px;
  }
  .search-box input{
	  height: 41px;
	  line-height: 38px;
	  padding:0 70px 0 20px;
	  background: transparent;
	  min-width: 100%;
	  border: none;
  }
  .search-box input::placeholder{
	  color:#a3aabd
  }
  
  .search-box .btn-del{
	  position:absolute;
	  right: 40px;
	  top: 5px;
	  width: 30px;
	  height: 30px;
	  background:url(../img/common/btn-del.png) no-repeat center;
	  background-size:19px;
  }
  .search-box .btn-search{
	  position:absolute;
	  right: 10px;
	  top: 5px;
	  width: 30px;
	  height: 30px;
	  background:url(../img/common/btn-search.png) no-repeat center;
	  background-size:20px;
  }
  .input.search{
	  position:relative;
  }
  .input.search .btn-del{
	  position:absolute;
	  right: 40px;
	  top: 7px;
	  width: 30px;
	  height: 30px;
	  background:url(../img/common/btn-del.png) no-repeat center;
	  background-size:19px;
  }
  .input.search .btn-search{
	  position:absolute;
	  right: 10px;
	  top: 7px;
	  width: 30px;
	  height: 30px;
	  background:url(../img/common/btn-search.png) no-repeat center;
	  background-size:20px;
  }
  .addr-list li{	
	  border-bottom:1px solid #e0e0e0
  }
  .addr-list li a{
	  padding:25px 20px;
	  display:block
  }
  .addr-list li a:hover,
  .addr-list li a:active{
	  background:#f3fafc
  }
  .addr-list .addr{
	  margin-bottom: 7px;
	  display: flex;
  }
  .label{
	  display:inline-block;
	  font-size: 11px;
	  color:#fff;
	  background:#91c3ea;
	  border-radius: 10px;
	  padding: 3px 0;
	  min-width: 45px;
	  text-align: center;
	  margin-right: 10px;
	  max-height: 20px;
	  line-height: 14px;
  }
  .addr2 .label{
	  background:#b1b6cc;
  }
  .addr-cont{
	  padding: 20px 20px 15px;
	  display:block;
	  text-align: left;
	  border-bottom:1px solid #e0e0e0
  }
  .addr-cont [class^="addr"]{
	  margin-bottom: 7px;
	  display: flex;
	  font-size: 13px;
  }
  .dl-list dl{
	  display:flex;
	  flex-wrap: wrap;
	  border-bottom:1px solid #e0e0e0;
	  padding: 15px 0;
	  font-size: 15px;
  }
  .dl-list dt{
	  flex:1;
	  min-width:80px;
	  max-width:80px;
	  color:#707070;
	  margin-right: 10px;
  }
  .dl-list dd{
	  text-align: left;
	  flex:1;
	  color: #333;
  }
  .dl-list2{
	  padding: 17px 0;
  }
  .dl-list2 .password{
	  color:#a3aabd;
	  font-size:10px;
	  display: inline-block;
	  vertical-align: top;
	  height: 20px;
	  line-height: 19px;
  }
  .dl-list2 dl{
	  display:flex;
	  flex-wrap: wrap;
	  /* padding: 7px 0; */
	  font-size: 15px;
	  align-items: baseline;
  }
  .dl-list2 dl + dl{
	  padding-top: 12px;
  }
  .dl-list2 dl.auto dt,.dl-list2 dl.auto dd{
	  flex:auto;
	  margin: 0;
  }
  .dl-list2 dt{
	  flex:1;
	  color:#707070;
	  margin-right: 15px;
	  word-break: keep-all;
  }
  .dl-list2 dd{
	  text-align: right;
	  flex: 1;
	  min-width: 60%;
	  word-break: keep-all;
  }
  .dl-list2 dd .pri{
	  color: #707070;
  }
  .dl-list2 dd .pri>span{
	  font-size:16px
  }
  .dl-list2 dd .pri.last>span{
	  font-size: 18px;
	  font-weight: 600;
  }
  .dl-list2 dl.d-block{
	  display:block
  }	
  .dl-list2 dl.d-block dt{
	  margin-bottom: 10px;
  }
  .dl-list2.left dd{
	  text-align: left;
	  color:#333;
	  width: 60%;
	  flex: inherit;
  }
  .map-view{
	  height:214px
  }
  .select-group{
	  display:flex;
	  position: relative;
  }
  .select-group.col2 select{
	  width: 36%;
	  min-width: 36%;
  }
  .select-group.col3 select{
	  width:calc(100% / 3);
  }
  .select-group.col2 select + input,
  .select-group.col3 select + select{
	  margin-left: 5px;
  }
  .select-group dt span{
	  background:#64b5f5;
  }
  .select-group dd{
	  width:100%;
	  text-align: left;
  }
  .select-group ul li + li{
	  margin-top: 16px;
  }
  
  .bg-sec{
	  background:#f5f6fa;
	  padding: 25px 15px;
	  overflow: hidden;
  }
  .bg-sec h4{
	  font-size: 15px;
	  color:#707070;
	  font-weight: 400;
	  padding-bottom: 10px;
  }
  .bnr-box{
	  /* border:1px solid #e0e0e0; */
	  border-radius: 10px;
	  padding:20px;
	  background:#fff;
	  /* box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.05); */
	  display:block;
  }
  .bnr-box + .bnr-box{
	  margin-top: 15px;
  }
  .bnr-box .top{
	  margin-bottom: 15px;
  }
  .bnr-box .top img{max-width: 70px;}
  .bnr-box .top .tit{
	  color:#013662;
	  font-size: 17px;
	  margin-top: 10px;
  } 
  .bnr-box .period{
	  font-size: 12px;
	  color:#a4a9bd;
  }
  .bnr-box .period > p{
	  font-size: 13px;
	  color:#333
  }
  .bnr-box .bottom{
	  display:flex;
	  justify-content: space-between;
	  align-items: flex-end;
  }
  .bnr-box .price>span{
	  font-size: 16px;
  }
  .agree-check{
	  padding: 20px 0 15px;
  }
  .agree-check li{
	  display:flex;
	  justify-content: space-between;
	  color:#707070
  }
  .agree-check + .agree-check{
	  border-top: 1px solid #e0e0e0;
  }
  .agree-check li + li{
	  padding-top: 12px;
  }
  .agree-check .chk-label{
	  color:#013561;
	  display:inline-block;
	  position:relative;
	  max-width: 75%;
	  background: url(../img/common/arr-right.png)no-repeat right top 4px;
	  background-size: 7px 12px;
	  padding-right: 12px;
  }
  .info-txt{
	  font-size: 12px;
	  color:#707070;
	  position: relative;
	  padding-left: 10px;
	  margin-top: 5px;
	  text-align: left;
  }
  .info-txt::before{
	  content:'*';
	  position:absolute;
	  top:3px;
	  left:0
  }
  .info-txt2{
	  font-size: 12px;
	  color:#ff4174;
	  position: relative;
	  padding-left: 15px;
	  margin-top: 12px;
  }
  .info-txt2.bk{
	  color:#333;
	  margin-top: 5px;
  }
  .info-txt2::before{
	  content:'※';
	  position:absolute;
	  top:0;
	  left:0
  }
  
  .list-type{
	  margin-top: 10px;
	  border-top:1px solid #e0e0e0;
	  padding-bottom: 17px;
  }
  .list-type li{
	  display:flex;
	  justify-content: space-between;
	  padding:12px 0;
	  font-size: 15px;
  }
  .list-type li + li{
	  border-top:1px solid #e0e0e0
  }
  .list-type li:hover{
	  background:#f2fafc	
  }
  .list-type li > span{
	  padding:0 10px
  }
  .list-type li .area{
	  color:#707070
  }
  .list-type .no-result{
	  border:none;
	  text-align: center;
	  display: block;
	  padding:50px 0
  }
  div.ul-type,
  .ul-type li{
	  position: relative;
	  padding-left: 10px;
	  font-size: 14px;
  }
  div.ul-type::before,
  .ul-type li::before{
	  content:'';
	  width: 4px;
	  height: 4px;
	  background:#000;
	  border-radius: 50%;
	  display:block;
	  position:absolute;
	  left: 2px;
	  top:7px;
  }
  .ul-type li + li{
	  margin-top: 8px;
  }
  .msg-center{
	  text-align: center;
	  font-size:15px;
	  line-height: 22px;
  }
  .msg-center.full{
	  margin-top: 15vh;	
  }
  .msg-center.full:before{
	  content:'';
	  background: url(../img/common/ico-btn-off.png)no-repeat center;
	  display:block;
	  margin:auto auto 10px;
	  width:66px;
	  height:66px
  
  }
  .msg-center.bg{
	  margin-top:15vh;
	  font-size: 14px;
  }
  .msg-center.bg:before{
	  content:'';
	  background:url(../img/common/bg-robo.png)no-repeat center;
	  background-size: 97px;
	  width:97px;
	  height:97px;
	  display:block;
	  margin:auto auto 10px
  }
  .msg-center.bg strong{
	  font-size: 16px;
  }
  .msg-error{
	  color:#fd4173;
	  font-size: 11px;
	  margin-top: 5px;
	  display:inline-block;
  }
  .infobox + .tab-type{
	  margin-top: -7px;
  }
  .tab-type{
	  padding: 25px 20px 40px;
	  background:#dfe4ea;
	  display: flex;
  }
  .tab-type li{
	  margin-right: 7px;
  }
  .tab-type li a{
	  height: 40px;
	  line-height: 40px;
	  background:#fff;
	  border-radius: 20px;
	  /* border:1px solid #a3a9be; */
	  font-size: 15px;
	  color:#013561;
	  min-width: 95px;
	  display:block;
	  text-align: center;
	  padding: 0 10px;
  }
  .tab-type li.active a{
	  background:#48a5f2;
	  color:#fff;
	  border-color: #48a5f2;
  }
  .tab-type li.active::after{
	  content:'';
	  width: 0px;
	  height: 0px;
	  border-top:none;
	  border-bottom: 10px solid #fff;
	  border-right: 7px solid transparent;
	  border-left: 7px solid  transparent;
	  display:block;
	  margin: 15px auto auto;
  }
  .info-list li{
	  border-bottom: 1px solid #e0e0e0;
	  padding: 15px 0 15px 25px;
	  font-size: 15px;
	  position:relative;
  }
  .info-list li:before{
	  content:'';
	  width:5px;
	  height:5px;
	  display:inline-block;
	  position:absolute;
	  left: 10px;
	  top: 21px;
	  background:#013561;
	  border-radius: 50%;
  }
  .sp-type{
	  padding: 20px 0;
  }
  
  /*약관*/
  .term h1{
	  font-size: 16px;
	  padding: 15px 0 10px;
	  text-align: center;
	  color: #333;
  }
  .term h2{
	  font-size: 15px;
	  padding: 30px 0 10px;
	  color: #333;
  }
  .term h3{
	  padding: 20px 0 10px;
	  font-size: 15px;
	  color: #222;
	  font-weight: 500;
  }
  .term .tbl th{
	  text-align: center;
	  font-size: 13px;
  }
  .term .tbl td{
	  font-size: 13px;
  }
  .term .tbl .bl{
	  border-left: 1px solid #e0e0e0;
  }
  .term h2.first{
	  padding-top: 0;
  }
  .ol-type{
	  padding: 0 0 0 5px;
	  counter-reset: count 0;
  }
  .ol-type>li{
	  position: relative;
	  padding: 0 0 12px 12px;
	  font-size: 15px;
	  font-weight: 500;
  }
  .ol-type>li:before{
	  counter-increment:count 1;
	  content:counter(count)')';
	  margin-left: -15px;
	  margin-right: 3px;
  }
  .ol-type.numb>li{
	  font-weight: 400;
  }
  .ol-type.numb>li::before{
	  content:counter(count)'.';
	  font-weight: 500;
  }
  .ol-type2{
	  padding: 0 0 0 5px;
  }
  .ol-type2>li{
	  position: relative;
	  padding: 0 0 12px 5px;
	  font-size: 15px;
	  color: #333;
  }
  .ol-type2>li>.dep2{
	  padding-left: 10px;
  }
  .ol-type2>li>div.dep2{
	  margin-left: 10px;
  }
  .type-in{
	  padding-top: 5px;
	  font-weight: 400;
	  color:#777;
	  font-size: 13px;
  }
  .in-txt{
	  font-size: 15px;
	  padding-top: 5px;
  }
  .in-box{
	  font-size: 14px;
	  padding: 10px;
	  border:1px solid #e0e0e0;
	  background:#f5f6fa
  }
  .dep2{
	  padding: 10px 0 0 0px;
	  font-weight: 400;
	  font-size: 14px;
  }
  div.dep2{
	  position:relative;
	  padding: 0 0 10px 5px;
	  margin-top: 7px;
  }
  
  .dep2>li{
	  position:relative;
	  padding: 0 0 10px 5px;
  }
  .dep2>li::before,
  div.dep2::before{
	  content:'';
	  width: 4px;
	  height: 4px;
	  background: #666;
	  display: inline-block;
	  position: absolute;
	  left: -4px;
	  top: 8px;
  }
  .dep3{
	  padding: 7px 0 0;
  }
  div.dep3{
	  position:relative;
	  padding: 0 0 7px 7px;
	  font-size: 14px;
	  margin-top: 5px;
  }
  .dep3>li{
	  position:relative;
	  padding: 0 0 5px 5px;
	  font-size: 13px;
  }
  .tbl .dep3>li{
	  font-size: 13px;
  }
  div.dep3:before,
  .dep3>li::before{
	  content:'';
	  width:5px;
	  height:1px;
	  background: #666;
	  position:absolute;
	  left: -3px;
	  top: 9px;
  }
  .total-view{
	  justify-content: space-between;
	  margin-top: 40px;
	  display:flex;
	  align-items: baseline;
  }
  .total-view>div{
	  justify-content: space-between;
	  align-items: flex-end;
	  font-size: 15px;
  }
  .total-view .top{
	  padding-top: 10px;
	  text-align: right;
	  font-size: 13px;
  }
  .total-view .top .l-cont{
	  font-size: 13px;
	  font-weight: 400;
  }
  .total-view .top .r-cont{
	  font-size: 14px;
  }
  .total-view .total{
	  margin-top: 5px;
	  text-align: right;
  }
  .total-view .l-cont{
	  font-weight: 600;
	  display:inline-block;
	  margin-right: 5px;
  }
  .total-view .l-cont .sm{
	  font-weight: 400;
	  font-size: 11px;
  }
  .total-view .total .l-cont{
	  color:#333
  }
  
  .total-view .total .num{
	  font-size: 18px;
  }
  .flex-box{
	  background:#fff;
	  /* border:1px solid #e0e0e0; */
	  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.05);
	  padding:17px 14px;
	  display: flex;
	  justify-content: space-between;
	  font-size: 15px;
  }
  .flex-box .box-tit{
	  color:#013561;
	  text-align:left;	
  }
  .flex-box>div .num{
	  font-size: 20px;
  }
  .sm-al{
	  font-size: 12px;
	  text-align: left;
	  margin-top: 10px;
	  line-height: 16px;
  }
  .accordion-list{
	  margin: 20px -20px 0;
  }
  .accordion-list .trigger{
	  color:#013561;
	  font-weight: 600;
  }
  .accordion-list.ty2{
	  margin:50px 0 0;
  }
  .accordion-list.ty2>li{
	  padding:0
  }
  .acc-trigger{
	  padding: 25px 20px 20px;
	  border-bottom: 1px solid #e0e0e0;
	  display: flex;
	  justify-content: space-between;
	  font-size: 15px;
	  position:relative;
  }
  .accordion-list.ty2 .acc-trigger{
	  padding:0 0 20px 40px;
	  font-size: 15px;
  }
  .acc-trigger:after{
	  content:'';
	  display:inline-block;
	  background: url(../img/common/ico-select.png) right center no-repeat;
	  background-size: 18px;
	  width:18px;
	  height:18px;
	  transition:all 0.4s ease;
  }
  .ty2 .acc-trigger:after{
	  margin-top: 12px;
  }
  .active .acc-trigger:after{
	  transform: rotate(-180deg);
  }
  .accordion-list .total{
	  flex:1;
	  text-align: right;
	  padding-right: 7px;
  }
  .acc-target{
	  background:#f5f6fa;
	  padding:20px;
	  display:none;
  }
  .ty2 .acc-target img{
	  width:100%
  }
  .acc-target dl + dl{margin-top: 20px;}
  .acc-target dt{
	  font-size: 15px;
	  font-weight: 500;
  }
  .acc-target dd{
	  margin-top: 10px;
  }
  .acc-target .line-b{
	  padding: 6px 25px 7px 20px;
	  background:#fff;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  border-radius: 7px;
	  /* border:1px solid #e0e0e0; */
  }
  .acc-target ul li + li{
	  margin-top: 10px;
  }
  .acc-target .pri{
	  display:flex;
	  width:55%;
	  justify-content: flex-end;
	  align-items: center;
  }
  .acc-target .pri .num{
	  color:#333;
	  font-size:15px;
  }
  .acc-target .pri>span{
	  margin-left: 20px;
	  font-size: 15px;
  }
  .acc-target .pri select{
	  width:auto;
	  height: 23px;
	  line-height: 22px;
	  border:none;
  }
  .my-insur{
	  display:flex;
	  justify-content: space-between;
  }
  .my-insur h3{
	  color:#013561;
	  font-size: 16px;
	  font-weight: 500;
	  padding: 0 0 0px 30px;
	  background: url(../img/common/ico-mylist.png) left center no-repeat;
	  background-size: 22px 22px;
	  line-height: 22px;
  }
  .my-insur .num{
	  font-size: 15px;
  }
  
  .customer a{
	  border:1px solid #e0e0e0;
	  border-radius: 10px;
	  box-shadow: 2px 3px 7px 0px rgba(0, 0, 0, 0.05);
	  padding:15px;
	  display: block;
	  color:#a5a5a5
  }
  .customer a.btn-call{
	  background:url(../img/common/ico-phone.png) right 20px center no-repeat;
	  background-size: 30px;
  }
  .customer a.btn-kakao{
	  background:url(../img/common/ico-kakao.png) right 20px center no-repeat;
	  background-size: 30px;
  }
  .customer a strong{
	  display: block;
	  font-size: 16px;
	  margin-bottom: 5px;
	  color:#333;
  }
  .customer a + a{
	  margin-top: 15px;
  }
  
  .m-text{
	  font-size: 16px;
  }
  
  .num-list{
	  margin-top: 40px;
	  color:#013561
  }
  .num-list>li{
	  position:relative;
	  padding-left:40px
  }
  .num-list>li + li{
	  margin-top: 35px;
  }
  .num-list li .list{
	  font-size: 40px;
	  color:#47a5f1;
	  font-weight: 600;
	  position: absolute;
	  left:0;
	  top:10px
  }
  .num-list>li strong{
	  font-size: 16px;
  }
  .num-list>li .img{
	  display:flex;
	  margin: 20px 0 0 -30px;
  }
  .num-list>li .img li{
	  width:calc(100% / 3);
	  margin: 0 10px;
	  text-align: center;
	  font-size: 15px;
  }
  .num-list>li .img img{
	  width:100%;
	  margin-bottom: 5px;
  }
  .talk:after{
	  content:'';
	  clear:both;
	  display:block
  }
  .msg-txt-left {
	  animation:slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) backwards;
	  background:#dedede;
	  padding: 10px 15px;
	  border-radius: 15px 15px 15px 5px;
	  float:left;
	  clear:both;
	  margin-left: 50px;
	  position: relative;
	  max-width: 75%;
  }
  .msg-txt-right {
	  animation:slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) backwards;
	  background:#4a4a4a;
	  padding: 10px 15px;
	  border-radius: 15px 15px 5px 15px;
	  display:inline-block;
	  color:#fff;
	  float:right;
	  clear:both;
	  margin-top: 15px;
  }
  .msg-txt-right + .msg-txt-left{
	  margin-top: 15px;
  }
  .bg-robo::before{
	  content:'';
	  width:40px;
	  height:40px;
	  display: inline-block;
	  background:url(../img/sub/img-robo.png)no-repeat 0 0;
	  background-size: 100%;
	  position: absolute;
	  left: -50px;
	  bottom: -30px;
  }
  [class^="msg-txt"]:nth-child(2){animation-delay: 0.4s;}
  [class^="msg-txt"]:nth-child(3){animation-delay: 0.8s;}
  [class^="msg-txt"]:nth-child(4){animation-delay: 1.2s;}
  
  @keyframes slide-in-left {
	  0% {
		  transform:translateX(-200%);
	  }
	  90% {
		  transform:translateX(3%);
	  }
	  100% {
		  transform:translateX(0);
		  transform:none;
	  }
  }
  @keyframes slide-in-right {
	  0% {
		  transform:translateX(200%);
	  }
	  90% {
		  transform:translateX(-3%);
	  }
	  100% {
		  transform:translateX(0);
	  }
  }
  .insu-bg{
	  padding-left: 110px;
	  background-repeat: no-repeat;
	  background-size: 90px;
	  background-position: center left;
	  word-break: keep-all;
  }
  .insu-bg>strong{
	  font-size: 16px;
  }
  .insu-bg>p{
	  margin-top: 20px;
  }
  .insu-bg.multi{
	  background-image: url(../img/sub/ico-041-01.png);
  }
  .insu-bg.disaster{
	  background-image: url(../img/sub/ico-042-01.png);
  }
  .range{
	  margin-top: 30px;
  }
  .range>strong{
	  display:block;
	  color:#013561;
	  font-size: 16px;
	  line-height: 22px;
  }
  .circle-txt{
	  background: url(../img/sub/arrow-lr.png) no-repeat center;
	  background-size: 47px 17px;
	  display:flex;
	  justify-content: space-between;
	  margin-top: 25px;
  }
  .circle-txt dl{
	  background:#e8eaef;
	  border-radius: 50%;
	  text-align: center;
	  width: 37vw;
	  height: 37vw;
	  display: flex;
	  flex-wrap: wrap;
	  align-items: center;
	  justify-content: center;
	  padding: 27px 0;
  }
  .circle-txt dl dt{
	  font-size: 15px;
	  color:#333;
	  font-weight: 500;
  }
  
  .title-cont{
	  text-align: center;
  }
  .title-cont strong img{
	  max-width: 204px;
  }
  .title-cont>p{
	  font-size: 16px;
	  margin-top: 5px;
  }
  .ico-cont{
	  display:flex;
	  margin-top: 20px;
  }
  .ico-cont li{
	  font-size: 15px;
	  color:#333;
	  text-align: center;
	  width:calc(100% / 3);
	  margin:0 10px
  }
  .ico-cont li img{
	  width:100%;
	  margin-bottom: 5px;
  }
  
  /*table*/
  .tbl table{
	  table-layout: fixed;
	  border: 1px solid #e0e0e0;
	  border-bottom: 0;
	  margin-top:10px;
  }
  .tbl th{
	  background:#f7f7f9;
	  border-bottom: 1px solid #e0e0e0;
	  border-left: 1px solid #e0e0e0;
	  padding:5px 10px
  }
  .tbl th:first-child, .tbl td:first-child{
	  border-left: none;
  }
  .tbl td{
	  border-bottom: 1px solid #e0e0e0;
	  border-left: 1px solid #e0e0e0;
	  padding:10px
  }
  
  .tbl2 table{
	  table-layout: fixed;
	  border-top: 1px solid #e0e0e0;
	  border-bottom: 1px solid #e0e0e0;
  }
  .tbl2 table th{
	  color:#013561;
	  background:#f5f6fa;
	  padding:10px 0;
	  border-left: 1px solid #fff;
  }
  .tbl2 table td{
	  padding:10px;
	  font-size: 15px;
	  border-top: 1px solid #e0e0e0;
	  color:#707070
  }
  
  
  /*form*/
  .inp-group{
	  display:flex;
	  position: relative;
  }
  .inp-group.col2 input.inp{
	  min-width: auto;
	  max-width: calc(50% - 3.5px)
  }
  .inp-group.col2.fix input.inp{
	  max-width:calc(25% - 7px)
  }
  .inp-group input.inp + input.inp{
	  margin-left: 7px;
  }
  .inp-group.col4 input.inp{
	  width:25%;
	  min-width: auto;
  }
  .inp-group .password{
	  color:#a3aabd;
	  line-height: 40px;
	  margin-left: 7px;
	  letter-spacing: 2.5px;
  }
  .inp-group.id-num .sp{
	  display:inline-block;
	  margin: 0 7px;
	  vertical-align: middle;
	  line-height: 35px;
  }
  .inp-group.id-num .inp{
	  max-width:49%
  }
  .inp-group.id-num .inp.pw{
	  width: 35px;
	  padding: 0 5px;
  }
  .btn-del{
	  position:absolute;
	  right: 5px;
	  top: 7px;
	  width: 30px;
	  height: 30px;
	  background:url(../img/common/btn-del2.png) no-repeat center;
	  background-size: 12px;
	  display:block;
  }
  .btn-del.hidden{
	  display:none
  }
  input.inp{
	  font-size: 15px;
	  color: #333;
	  line-height: 34px;
	  width: 100%;
	  padding: 4px 15px 4px 14px;
	  border: 1px solid #d8d8d8;
	  border-radius: 7px;
  }
  input.inp::placeholder{
	  color:#a3aabc;
	  font-weight:300
  }
  input.inp.pw{
	  background:#f2fafc;
	  border-color:#d8d8d8
  }
  input.inp.error{
	  border-color: #fd4173;
  }
  input[type=radio], input[type=checkbox] {
	  position: absolute;
	  width: 1px;
	  height: 1px;
	  padding: 0;
	  overflow: hidden;
	  clip: rect(0,0,0,0);
	  border: 0;
  }
  input.inp.inline{
	  border-color:#e2e2e2;
	  line-height: 24px;
	  min-width:50%;
	  width: 55%;
	  padding: 1px 5px 3px;
	  letter-spacing: 1px;
	  vertical-align: middle;
	  height: auto;
  }
  input.inp.inline::placeholder{
	  font-size: 11px;
  }
  
  .form .radio b {
	  display: inline-block;
	  margin: 1px 5px 0 0;
	  text-align: center;
	  vertical-align: middle;
	  border-radius: 50px;
	  background:url(../img/common/bg-radio-off.png)no-repeat 0 0;
	  background-size: 22px 22px;
	  padding-left:30px;
	  line-height: 22px;
	  color:#333
  }
  .form input[type=radio]:checked ~ b {
	  background:url(../img/common/bg-radio-on.png)no-repeat 0 0;
	  background-size: 22px 22px;
  }
  .form .chk b {
	  display: inline-block;
	  margin: 1px 5px 0 0;
	  text-align: center;
	  vertical-align: middle;
	  background:url(../img/common/bg-check-off.png)no-repeat 0 0;
	  background-size: 22px 22px;
	  padding-left:30px;
	  line-height: 22px;
	  color:#333
  }
  .form input[type=checkbox]:checked ~ b {
	  background:url(../img/common/bg-check-on.png)no-repeat 0 0;
	  background-size: 22px 22px;
  }
  .form label + label{margin-left: 40px;}
  
  .form-button .btn-chk{
	  display:block;
	  vertical-align: middle;
	  border:1px solid #d8d8d8;
	  border-radius: 10px;
	  height:46px;
	  line-height: 43px;
	  display:inline-block;
	  width:100%;
	  text-align: center;
	  color:#013561;
	  font-size: 15px;
	  font-weight: 500;
	  background:#fff;
  }
  .form-button .btn-chk + .btn-chk{
	  margin-top: 15px;
  }
  .form-button .btn-chk:before {
	  content: ' ';
	  vertical-align: middle;
	  background:url(../img/common/ico-btn-off.png)no-repeat center;
	  background-size: 22px 22px;
	  display:inline-block;
	  width: 22px;
	  height:22px;
	  margin-right:5px
  }
  .form-button .btn-chk.checked{
	  color:#fff;
	  background:#47a5f1;
	  border-color: #47a5f1;
  }
  .form-button .btn-chk.checked:before {
	  background:url(../img/common/ico-btn-on.png)no-repeat center;
	  background-size: 22px 22px;
  }
  
  .form-button .chk b {
	  text-align: center;
	  vertical-align: middle;
	  border:1px solid #d8d8d8;
	  border-radius: 10px;
	  height:46px;
	  line-height: 43px;
	  display:inline-block;
	  width:100%;
	  text-align: center;
	  color:#013561;
	  font-size: 15px;
	  font-weight: 500;
	  background: #fff;
  }
  .form-button .chk + .chk{
	  margin-top: 15px;
	  display:block
  }
  .form-button.ty2{
	  margin-top:10px
  }
  .form-button.ty2 + h3{
	  margin-top: 25px;
  }
  .form-button.ty2 .chk b{
	  font-size: 13px;
	  height:auto;
	  min-height:46px;
	  line-height: 1.2;
	  padding:17px 20px 17px 55px;
	  text-align: left;
	  position:relative;
  }
  .form-button .chk b:before {
	  content: ' ';
	  vertical-align: middle;
	  background:url(../img/common/ico-btn-off.png)no-repeat center;
	  background-size: 22px 22px;
	  display:inline-block;
	  width: 22px;
	  height:22px;
	  margin-right:5px
  }
  
  .form-button.ty2 .chk b:before{
	  position: absolute;
	  left:20px;
	  top:50%;
	  transform:translateY(-50%)
  }
  .form-button{
	  margin-top: 20px;
  }
  .form-button input:checked ~ b{
	  color:#fff;
	  background:#47a5f1;
	  border-color: #47a5f1;
  }
  .form-button.ty2 input:checked ~ b{
	  border:1px solid #013561
  }
  .form-button input:checked ~ b:before {
	  background:url(../img/common/ico-btn-on.png)no-repeat center;
	  background-size: 22px 22px;
  }
  
  .form-button.col2 input:checked ~ b:before {
	  background:url(../img/common/ico-btn-on.png)no-repeat center;
	  background-size: 22px 22px;
  }
  .form-button.ty2 input:checked ~ b:before{
	  background-image:url(../img/common/ico-btn-on.png)
  }
  
  .btn-switch{
	  display:flex;
	  /* border:1px solid #d8d8d8; */
	  border-radius: 10px;
	  /* box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.05); */
	  height:46px;
	  line-height:46px;
	  position:relative;
	  align-items: center;
	  background: #f5f5f5;
  }
  .btn-switch label{
	  flex:1;
	  -webkit-tap-highlight-color:transparent;
	  z-index: 1;
  }
  .btn-switch b {
	  vertical-align: middle;
	  display:inline-block;
	  width:100%;
	  text-align: center;
	  color:#013561;
	  font-size: 15px;
	  font-weight: 500;
	  line-height: 1;
  }
  .btn-switch.sm{
	  height:38px;
	  line-height: 36px;
  }
  .btn-switch.sm b{
	  padding-bottom: 3px;
	  font-size: 14px;
  }
  
  .btn-switch b:before {
	  content: ' ';
	  vertical-align: middle;
	  background:url(../img/common/ico-btn-off.png)no-repeat center;
	  background-size: 22px 22px;
	  display:inline-block;
	  width: 22px;
	  height:22px;
	  margin-right:5px
  }
  
  .switch{
	  width:50%;
	  height:100%;
	  position:absolute;
	  background:#47a5f1;
	  border-color: #47a5f1;
	  border-radius: 10px;
	  left:0;
	  /* z-index: -1; */
  }
  .btn-switch label.checked ~ .switch{
	  left:50%;
	  transition: left .5s
  }
  .btn-switch label.checked + label~ .switch{
	  left:0;
	  transition: left .5s
  }
  .btn-switch input:checked ~ b{
	  color:#fff;	
	  transition: color .3s
  }
  .btn-switch input:checked ~ b:before {
	  background:url(../img/common/ico-btn-on.png)no-repeat center;
	  background-size: 22px 22px;
  }
  select {
	  height: 44px;
	  font-size: 15px;
	  color: #013561;
	  line-height: 42px;
	  width: 100%;
	  background: url(../img/common/ico-select.png) right 10px center no-repeat #fff;
	  background-size: 13px;
	  padding:0 30px 0 14px;
	  border: 1px solid #d8d8d8;
	  border-radius: 7px;
	  letter-spacing: -1px;
  }
  
  /*button*/
  .btn-set{
	  margin-top: 20px;
  }
  .btn-set a{
	  display:block;
	  vertical-align: middle;
	  border:1px solid #d8d8d8;
	  border-radius: 10px;
	  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
	  height:46px;
	  line-height: 44px;
	  display:inline-block;
	  width:100%;
	  color:#013561;
	  font-size: 15px;
	  font-weight: 500;
	  background: #fff;
	  padding:0 30px;
	  background:url(../img/common/arr-right2.png)no-repeat center right 26px;
	  background-size:11px 18px;
  }
  .btn-set a + a {
	  margin-top: 15px;
  }
  .btn-wrap{
	  margin-top:10px;
	  display:flex
  }
  .btn-wrap .btn-round{
	  width:33.33%
  }
  .btn-wrap a + a{
	  margin-left: 5px;
  }
  
  .btn-round{
	  border:1px solid #a3a9be;
	  border-radius: 15px;
	  font-size: 12px;
	  text-align: center;
	  display:inline-block;
	  padding: 3px 5px 4px;
	  color:#013561;
  }
  .btn-file{
	  text-align: center;
	  color:#013561;
	  font-size: 11px;
	  border:1px solid #d8d8d8;
	  display: inline-block;
	  padding: 0 15px 0 35px;
	  height:25px;
	  line-height: 24px;
	  border-radius: 15px;
	  background:url(../img/common/ico-file.png)no-repeat center left 15px;
	  background-size: 12px auto;
  }
  .btn-file:after{
	  content:'';
	  width:4px;
	  height:6px;
	  background:url(../img/common/arr-btn.png)no-repeat center;
	  display:inline-block;
	  background-size: 100%;
	  margin: -2px 0 0 7px;
	  vertical-align: middle;
  }
  .btn-close{
	  position: absolute;
	  right: 10px;
	  top: 7px;
  }
  .btn-close button{
	  background:url(../img/common/btn-close.png)no-repeat center;
	  width:20px;
	  height:20px;
	  background-size: 20px 20px;
	  padding: 20px;
  }
  .btn-delete{
	  background:url(../img/common/btn-close.png)no-repeat center;
	  width:10px;
	  height:10px;
	  background-size: 10px 10px;
	  padding: 10px;
  }
  .btn-btt{
	  position:fixed;
	  left:0;
	  bottom:0;
	  display:flex;
	  width:100%
  }
  .btn-btt button{
	  height:53px;
	  line-height:53px;
	  font-size: 15px;
	  display:inline-block;
	  text-align: center;
	  flex:1;
	  background:#cbcbcb;
	  font-weight: 600;
	  color:#fff;
	  opacity: .9;
  }
  button.action{
	  background:#013561
  }
  
  .btn-info{
	  background:url(../img/common/ico-info.png)no-repeat center;
	  width:19px;
	  height:19px;
	  background-size: 100%;
	  display: inline-block;
	  margin:0 5px
  }
  /* .btn-info:hover{
	  background:url(../img/common/ico-info-on.png)no-repeat center;
	  background-size: 100%;
  } */
  .btn-line{
	  text-decoration: underline;
	  display:block;
	  text-align: right;
	  font-size: 13px;
	  color: #b5b5b5;
  }
  
  .btn-camera{
	  background: url(../img/common/ico-camera.png)no-repeat center;
	  background-size: 100%;
	  display: block;
	  width:77px;
	  height:77px;
	  margin:10px auto;
  }
  .btn-log{
	  margin-top: 20px;
	  text-align: center;
  }
  .btn-log .btn-r{
	  background:#48a5f2;
	  color:#fff;
	  font-weight: 600;
	  display:block;
	  height: 44px;
	  line-height: 42px;
	  text-align: center;
	  font-size: 15px;
	  border-radius: 25px;
  }
  .btn-loglink{
	  text-align: center;
	  margin:20px 0
  }
  .btn-loglink a{
	  font-size: 15px;
	  line-height: 16px;
	  display: inline-block;
  }
  .btn-loglink a + a{
	  border-left: 1px solid #a3aabc;
	  margin-left: 10px;
	  padding-left: 10px;
  }
  .btn-join{
	  position:fixed;
	  bottom:50px;
	  left:0;
	  width:100%;
	  text-align: center;
  }
  .btn-join a{
	  display:block;
	  font-size: 15px;
	  text-decoration: underline;
	  margin-top: 15px;
	  font-weight: 500;
  }
  
  
  
  /*modal*/
  
  .modal {
	  width:100%;
	  display:-webkit-box;
	  display:none;
	  -webkit-box-orient:vertical;
	  box-orient:vertical;
	  -webkit-flex-direction:column;
	  flex-direction:column;
	  -webkit-box-pack:center;
	  box-pack:center;
	  -webkit-justify-content:center;
	  justify-content:center;
	  z-index:200;
	  min-height:100%;
	  position:fixed;
	  top:0;
	  left:0;
	  background-color:rgba(0,0,0,0.5);
	  opacity:1;
	  z-index:1000
  }
  .modal.active{display:flex}
  
  .modal-content {
	  display:block;
	  position:relative;
	  -webkit-box-flex:0;
	  box-flex:0;
	  -webkit-flex-grow:0;
	  flex-grow:0;
	  background-color:#fff;
	  margin:0 14px;
  }
  .modal-content .title{
	  background:#47a5f1;
	  color:#fff;
	  text-align: center;
	  font-size: 15px;
	  height:50px;
	  line-height: 48px;
  }
  .modal-content .content{
	  padding:25px 20px
  }
  .modal-content h2{
	  background:#edf0f9;
	  border-radius: 15px;
	  padding:4px 15px 5px;
	  text-align: center;
	  display:inline-block;
	  color:#333;
  }
  .modal-content .con-txt{
	  padding:15px
  }
  .modal-content .con-txt + h2{
	  margin-top: 10px;
  }
  .modal-content button[data-modal-close]{
	  background:#013561;
	  color:#fff;
	  text-align: center;
	  font-size: 15px;
	  height:50px;
	  line-height: 48px;
	  width:100%;
	  display:block
  }                 `;
};
