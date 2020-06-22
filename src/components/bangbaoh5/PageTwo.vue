<template>
  <div>
    <div>
      <div><img src="../../assets/img/zhu_2.png" alt=""></div>
      <div class="form">
        <p>请填写您的手机号，专业顾问24小时为您服务</p>
        <div v-if="isShowFrom">
          <div style="margin: 0.2rem 0;" class="address">
            <input :value="address" placeholder="选择地址" readonly="readonly" class="i-input" type="text">
            <span class="iconfont" @click="showAddressSelect">&#xe614;</span>
          </div>
          <div class="phone">
            <input maxlength="11" :value="phone" class="i-input" type="text" placeholder="请输入你的手机号">
          </div>
          <div class="verification-box">
            <input maxlength="6" class="verification" :value="verification" type="text">
            <van-button  @click="onVerificationBtn" :disabled="verificationDisabled" class="verification-btn" type="default">{{verificationText}}</van-button>
          </div>
          <div class="address">
            <input :value="server" placeholder="选择服务" readonly="readonly" class="i-input" type="text">
            <span class="iconfont" @click="showServe">&#xe614;</span>
          </div>
          <div class="matching-box">
            <van-button class="matching-s" type="info" @click="onMatching">一键匹配阿姨</van-button>
          </div>
        </div>
      </div>
      <div v-if="isAreaList">
        <van-area title="选择地址" @cancel="cancel" @confirm="confirm" :area-list="areaList" :columns-num="2" />
      </div>
      <div v-if="isPicker">
              <van-picker
          title="选择服务"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Button,Area,Picker } from "vant";
import areaList from '../../api/area.js'
export default {
  name:"PageTwo",
   components: {
    [Button.name]: Button,
    [Area.name]: Area,
    [Picker.name]: Picker
  },
  data() {
    return {
      address: '',
      server: '',
      isShowFrom: true,
      isAreaList: false,
      isPicker: false,
      phone: null,
      verification: null,
      areaList: areaList,
      verificationText: '获取验证码',
      verificationDisabled: false,
      columns: ['做饭', '做家务', '日常保洁', '照顾老人', '照顾小孩','照顾孕妇','洗衣洗鞋','照顾病人','收纳整理'],
    };
  },
  methods: {
    showAddressSelect() {
      this.isShowFrom = false;
      this.isAreaList = true;
    },
    showServe() {
      this.isShowFrom = false;
      this.isPicker = true;
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
    },
    onMatching (){},
    cancel() {
      this.isAreaList = false;
      this.isShowFrom = true;
    },
    confirm(e) {
      this.isAreaList = false;
      this.isShowFrom = true;
      this.address = e[0].name + e[1].name;
    },
    onConfirm(value, index) {
      this.isShowFrom = true;
      this.isPicker = false;
      this.server = value;
    },
    onCancel() {
      this.isShowFrom = true;
      this.isPicker = false;
    },
  }
}
</script>
<style scoped>
.form{
  width: 90%;
  margin: 0 auto;
}
.form p {
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(51,51,51,1);
  font-size: 0.3rem;
}
 .address {
  position: relative;
  text-align: center;
  top: 0.1rem;
  line-height: 0;
}
.address span{
  font-size: 0.32rem;
  top: 0.45rem;
  right: 0.5rem;
  position: absolute;
}
.i-input {
  width: 100%;
  font-size: 0.32rem;
  height: 0.88rem;
  margin: 0 auto;
  padding-left: 0.2rem;
}
.phone {
  text-align: center;
  line-height: 0;
  margin: 0.3rem 0;
}
.verification-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
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
 .matching-box{
    text-align: center;
  }
  .matching-s {
    font-size: 0.36rem;
    color: #fff;
    width: 100%;
  }
</style>
