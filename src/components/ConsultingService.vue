<template>
  <div>
    <van-action-sheet v-model="show" round="false">
      <div class="content" v-if="isShowFrom">
        <div class="title">填写您的手机号，专业顾问7*24小时为您服务</div>
        <div class="address">
          <input :value="address" readonly="readonly" class="i-input" type="text">
          <span class="iconfont" @click="showAddressSelect">&#xe614;</span>
        </div>
        <div class="phone">
          <input maxlength="11" :value="phone" class="i-input" type="text" placeholder="请输入你的手机号">
        </div>
        <div class="btn-box">
           <van-button class="immediate" type="info" @click="immediateConsultation">立即咨询</van-button>
        </div>
      </div>
      <div v-if="isAreaList">
        <van-area title="请选择" @cancel="cancel" @confirm="confirm" :area-list="areaList" :columns-num="2" />
      </div>
      <div class="success" v-if="isSuccess">
        <img src="../assets/img/tijiao.png" alt="">
        <p>提交成功</p>
        <p>我们会尽快与您联系</p>
         <van-button class="immediate" type="info" @click="showModel">我知道了</van-button>
      </div>
    </van-action-sheet>
    <van-action-sheet v-model="phoneShow" round="false">
      <div class="content" v-if="isShowFrom">
        <div class="title-1">{{callPhoneText}}</div>
        <div class="btn-box">
           <van-button class="immediate" type="info" @click="callPhone">立即咨询</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import { ActionSheet, Area,Button } from "vant";
import areaList from '../api/area.js'
export default {
  name: "ConsultingService",
  components: {
    [ActionSheet.name]: ActionSheet,
    [Area.name]: Area,
    [Button.name]: Button
  },
  data() {
    return {
      show: false,
      phoneShow:false,
      isShowFrom: true,
      isAreaList: false,
      isSuccess: false,
      address: '北京',
      areaList: areaList,
      phone: null,
      callPhoneText:null
    };
  },
  methods: {
    showModel() {
      this.show = !this.show;
    },
    onPhoneShow(callPhone) {
      this.callPhoneText = callPhone;
      this.phoneShow = !this.show;
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
    callPhone() {
      window.location.href = "tel://" + this.callPhoneText;
    },
    immediateConsultation() {
      console.log('提交咨询');
      // address,
      // phone
      const that = this;
      axios
        .post(that.API.serverApi+"/hwNannyPhone/insert", {
          cityName: that.address,
          phone: that.phone

        })
        .then(function(response) {
          console.log(response.data.data);
          that.isShowFrom = false;
          that.isSuccess = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.content {
  padding-bottom: 0.4rem;
}
.title {
  font-size: 0.28rem;
  color: #3395FF;
  text-align: center;
  margin: 0.4rem 0 0.1rem 0;
}
.title-1 {
  font-size: 0.6rem;
  color: #3395FF;
  text-align: center;
  margin: 0.4rem 0 0.1rem 0;
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
  width: 90%;
  font-size: 0.32rem;
  height: 0.88rem;
  margin: 0 auto;
  padding-left: 0.2rem;
}
.btn-box {
  width: 100%;
  text-align: center;
}
.immediate{
  font-size: 0.32rem;
  color: #fff;
  width: 90%;
}
.success {
  text-align: center;
  padding-bottom: 0.2rem;
}
.success img {
  width: 3.68rem;
  margin-top: 0.2rem;
}
.success p{
  font-size: 0.28rem;
  color: #3395FF;
}
</style>
