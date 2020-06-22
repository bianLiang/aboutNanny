<template>
  <div>
    <div v-if="isOnePage">
      <img src="../../assets/img/zhu_1.png" alt="">
      <p class="field">
        <span class="field_1">已有</span>
        <span class="field_2">3</span>
        <span class="field_2">8</span>
        <span class="field_2">9</span>
        <span class="field_3">,</span>
        <span class="field_2">3</span>
        <span class="field_2">2</span>
        <span class="field_2">3</span>
        <span class="field_1">人下单预约阿姨</span>
      </p>
      <div class="bianzu-box">
        <div class="bianzu-item">
          <img src="../../assets/img/编组.png" alt="">
          <span>60+</span>
          <span>城市覆盖</span>
        </div>
        <div class="bianzu-item">
          <img src="../../assets/img/编组 2.png" alt="">
          <span>8000+</span>
          <span>线下门店</span>
        </div>
        <div class="bianzu-item">
          <img src="../../assets/img/编组 3.png" alt="">
          <span>1对1</span>
          <span>家政顾问</span>
        </div>
        <div class="bianzu-item">
          <img src="../../assets/img/编组 4.png" alt="">
          <span>8万+</span>
          <span>优质阿姨</span>
        </div>
      </div>
      <div>
        <div class="pipei">
          <img src="../../assets/img/第一.png" alt="">
          <span>所有阿姨身份可查，健康有保证</span>
        </div>
        <div class="pipei">
          <img src="../../assets/img/第一备份.png" alt="">
          <span>所有阿姨身份可查，健康有保证</span>
        </div>
        <div class="pipei">
          <img src="../../assets/img/第一备份 2.png" alt="">
          <span>所有阿姨身份可查，健康有保证</span>
        </div>
        <div class="pipei">
          <img src="../../assets/img/第一备份 3.png" alt="">
          <span>所有阿姨身份可查，健康有保证</span>
        </div>
      </div>
      <div class="matching-box">
        <van-button class="matching" type="info" @click="onMatching">一键匹配阿姨</van-button>
      </div>
    </div>
    <div class="two-page-box" v-if="isTwoPage">
      <p class="select">请选择您需要的服务类型？(可多选)</p>
      <div class="img-box">
        <div class="server-item" v-for="( item, index) in serverList" :key="index" @click="selectImg(index)">
          <img class="select-img" :src="item.isSelected? require('../../assets/img/xuanzhong.png'):require('../../assets/img/weixuanzhon.png')" alt="">
          <img class="zhutu" :src="item.url" alt="">
          <div class="title">{{item.title}}</div>
        </div>
      </div>
      <div class="matching-box">
        <van-button class="matching-s" type="info" @click="onNext">下一步</van-button>
      </div>
    </div>
    <div class="three-page-box" v-if="isThreePage">
      <p class="select">在24小时内已有&nbsp;<span style="color:#1890FF; font-size: 0.4rem;">108</span>&nbsp;人成功预约了保姆</p>
      <div class="rotation">
        <p>05月30日10时14分 王** 137****0287匹配到 阿姨</p>
        <p>05月30日10时14分 王** 137****0287匹配到 阿姨</p>
        <p>05月30日10时14分 王** 137****0287匹配到 阿姨</p>
      </div>
      <div v-if="isShowFrom">
        <div class="address">
          <input :value="address" readonly="readonly" class="i-input" type="text">
          <span class="iconfont" @click="showAddressSelect">&#xe614;</span>
        </div>
        <div class="phone">
          <input maxlength="11" :value="phone" class="i-input" type="text" placeholder="请输入你的手机号">
        </div>
        <div class="verification-box">
          <input maxlength="6" class="verification" :value="verification" type="text">
          <van-button  @click="onVerificationBtn" :disabled="verificationDisabled" class="verification-btn" type="default">{{verificationText}}</van-button>
        </div>
        <div class="matching-box">
        <van-button class="matching-s" type="info" @click="onMatching">一键匹配阿姨</van-button>
      </div>
      </div>
      <div v-if="isAreaList">
        <van-area title="请选择" @cancel="cancel" @confirm="confirm" :area-list="areaList" :columns-num="2" />
      </div>
    </div>

  </div>
</template>
<script>
import { Button,Area } from "vant";
import areaList from '../../api/area.js'
export default {
  name:"PageOne",
  components: {
    [Button.name]: Button,
    [Area.name]: Area,
  },
  data() {
    return {
      isOnePage:true,
      isTwoPage:false,
      isThreePage: false,
      isShowFrom: true,
      isAreaList: false,
      address: '北京',
      phone: null,
      verification: null,
      areaList: areaList,
      verificationText: '获取验证码',
      verificationDisabled: false,
      serverList: [
        {
          url:require("../../assets/img/位图.png"),
          title:"做饭",
          isSelected: false
        },
        {
          url:require("../../assets/img/位图备份.png"),
          title:"做家务",
          isSelected: false
        },
        {
          url:require("../../assets/img/位图备份 2.png"),
          title:"日常保洁",
          isSelected: false
        },
        {
          url:require("../../assets/img/位图备份 3.png"),
          title:"照顾老人",
          isSelected: false
        },
        {
          url:require("../../assets/img/位图备份 4.png"),
          title:"照顾小孩",
          isSelected: false
        },
        {
          url:require("../../assets/img/位图备份 5.png"),
          title:"照顾孕妇",
          isSelected: false
        },
        {
          url:require("../../assets/img/位图 6.png"),
          title:"洗衣洗鞋",
          isSelected: false
        },
        {
          url:require("../../assets/img/位图备份 7.png"),
          title:"照顾病人",
          isSelected: false
        },
        {
          url:require("../../assets/img/位图备份 8.png"),
          title:"收纳整理",
          isSelected: false
        },
      ]
    };
  },
  methods:{
    selectImg(index) {
      this.serverList[index].isSelected = !this.serverList[index].isSelected;
    },
    onMatching() {
      this.isOnePage = false;
      this.isTwoPage = true;
    },
    onNext() {
      this.isTwoPage = false;
      this.isThreePage = true;
    },
    showAddressSelect() {
      this.isShowFrom = false;
      this.isAreaList = true;
    },
    cancel() {
      this.isAreaList = false;
      this.isShowFrom = true;
    },
    confirm(e) {
      this.isAreaList = false;
      this.isShowFrom = true;
      this.address = e[0].name + e[1].name;
    },
    onVerificationBtn() {
      const that = this;
      this.verificationDisabled = true;
      let index = 60;
      const timer = setInterval(() => {
        index--;
        that.verificationText = index + 's'
        if (index === 0) {
          window.clearInterval(timer)
          that.verificationDisabled = false;
          that.verificationText = '获取验证码';
        }
      },1000);
    }
  },
}
</script>
<style scoped>
  .field {
    text-align: center;
    line-height: 0;
    margin: 0.3rem 0;
  }
  .field_1{
    font-size: 0.28rem;
    color: #333;
    font-weight:600;
    font-family:PingFangSC-Semibold,PingFang SC;
  }
  .field_2 {
    font-size: 0.4rem;
    color: #0050B3;
    font-weight:600;
    background:rgba(230,247,255,1);
    padding: 0.02rem 0.02rem;
    font-family:PingFangSC-Semibold,PingFang SC;
  }
  .field_3 {
    font-size: 0.4rem;
    color: #0050B3;
    font-weight:600;
    font-family:PingFangSC-Semibold,PingFang SC;
  }
  .bianzu-box {
    display: flex;
    justify-content: center;
  }
  .bianzu-item {
    display: flex;
    flex-direction: column;
    width: 1rem;
    align-items: center;
    margin: 0.4rem 0.5rem;
  }
  .bianzu-item img {
    width: 0.8rem;
    height: 0.8rem;
  }
  .bianzu-item span{
    color: #0050B3;
    font-size: 0.2rem;
    font-family:PingFangSC-Semibold,PingFang SC;
  }
  .pipei {
    border: 0.02rem solid #69C0FF;
    border-radius:0.08rem;
    width: 90%;
    margin: 0.2rem auto;
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
  }
  .pipei img {
    width: 0.35rem;
    margin: 0 0.4rem;
  }
  .pipei span{
    font-size: 0.28rem;
    color: #333;
  }
  .matching-box{
    text-align: center;
  }
  .matching{
  font-size: 0.36rem;
  color: #fff;
  width: 90%;
  }
  .matching-s {
    font-size: 0.36rem;
    color: #fff;
    width: 100%;
  }
  .select {
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    font-size: 0.32rem;
    color: #333333;
    margin: 0.2rem 0;
  }
  .two-page-box, .three-page-box{
    width: 90%;
    margin: 0 auto;
  }
  .img-box {
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    margin: 0.5rem 0;
  }
  .server-item {
    position: relative;
  }
  .select-img {
    width: 0.58rem;
    position: absolute;
    top: 0;
    left: 0;
  }
  .zhutu{
    width: 2.1rem;
    height: 2.56rem;
  }
  .title {
    height: 0.45rem;
    line-height: 0.45rem;
    text-align: center;
    font-size: 0.32rem;
    color: #fff;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,0.5);
  }
  .rotation {
    border-radius: 0.08rem;
    border: 0.02rem solid #D5D5D5;
    padding: 0.6rem 0.5rem;
    margin: 0.5rem 0;
  }
  .rotation p{
    font-size:0.24rem;
    font-family:PingFangSC-Regular,PingFang SC;
    color: #333;
    text-align: center;
  }
  .address {
  position: relative;
  text-align: center;
  top: 0.1rem;
}
.address span{
  font-size: 0.32rem;
  top: 0.6rem;
  right: 0.5rem;
  position: absolute;
}
.phone {
  text-align: center;
}
.i-input {
  width: 100%;
  font-size: 0.32rem;
  height: 0.88rem;
  margin: 0 auto;
  padding-left: 0.2rem;
}
.verification-box {
  display: flex;
  justify-content: space-between;
  margin: 0.3rem 0;
}
.verification {
  height: 0.88rem;
  width: 60%;
  padding-left: 0.2rem;
}
.verification-btn {
  border-radius:0.08rem;
  border:0.02rem solid rgba(213,213,213,1);
  height: 0.88rem;
  color: #999999;
  width: 2rem;
}
</style>
