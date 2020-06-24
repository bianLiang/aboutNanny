<template>
  <div>
    <div>
      <div><img src="../../assets/img/zhu_2.png" alt=""></div>
      <div class="form">
        <p id="matching">请填写您的手机号，专业顾问24小时为您服务</p>
        <div v-if="isShowFrom">
          <div style="margin: 0.2rem 0;" class="address">
            <input :value="address" placeholder="选择地址" readonly="readonly" class="i-input" type="text">
            <span class="iconfont" @click="showAddressSelect">&#xe614;</span>
          </div>
          <div class="phone">
            <input maxlength="11" v-model="phone" class="i-input" type="text" placeholder="请输入你的手机号">
          </div>
          <div class="verification-box">
            <input maxlength="6" class="verification" placeholder="请输入验证码" v-model="verification" type="text">
            <van-button  @click="onVerificationBtn" :disabled="verificationDisabled" class="verification-btn" type="default">{{verificationText}}</van-button>
          </div>
          <div class="address">
            <input :value="server" placeholder="选择服务" readonly="readonly" class="i-input" type="text">
            <span class="iconfont" @click="showServe">&#xe614;</span>
          </div>
          <div  class="matching-box">
            <van-button class="matching-s" type="info" @click="onMatching">一键匹配阿姨</van-button>
          </div>
        </div>
      </div>
      <div  class="img-max">
        <img src="../../assets/img/bianzu7.png" alt="">
      </div>
      <div class="img-max">
        <img class="img" src="../../assets/img/biaoti.png" alt="">
        <div class="img-min">
          <img src="../../assets/img/beijin.png" alt="">
          <a href="#matching">立即匹配</a>
        </div>
        <div class="img-min">
          <img src="../../assets/img/baoxian.png" alt="">
          <a href="#matching">立即匹配</a>
        </div>
        <div class="img-min">
          <img src="../../assets/img/jineng.png" alt="">
          <a href="#matching">立即匹配</a>
        </div>
        <div class="img-min">
          <img src="../../assets/img/mianfei.png" alt="">
          <a href="#matching">立即匹配</a>
        </div>
      </div>
      <div v-if="isAreaList" class="area">
        <van-area title="选择地址" @cancel="cancel" @confirm="confirm" :area-list="areaList" :columns-num="2" />
      </div>
      <div v-if="isPicker" class="area">
              <van-picker
          title="选择服务"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </div>
    </div>
    <Verification ref="verification"></Verification>
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
  created () {
    document.title = '帮宝家政';
  },
  data() {
    return {
      address: '',
      server: '',
      isShowFrom: true,
      isAreaList: false,
      isPicker: false,
      phone: "",
      verification: "",
      areaList: areaList,
      verificationText: '获取验证码',
      verificationDisabled: false,
      columns: ['做饭', '做家务', '日常保洁', '照顾老人', '照顾小孩','照顾孕妇','洗衣洗鞋','照顾病人','收纳整理'],
    };
  },
  methods: {
    showAddressSelect() {
      this.isAreaList = true;
    },
    showServe() {
      this.isPicker = true;
    },
    onVerificationBtn() {
      const that = this;
      if (that.$refs.verification.validateMobilePhone(that.phone)) {
        this.verificationDisabled = true;
        let index = 60;
        const timer = setInterval(() => {
          index--;
          that.verificationText = index + "s";
          if (index === 0) {
            window.clearInterval(timer);
            that.verificationDisabled = false;
            that.verificationText = "获取验证码";
          }
        }, 1000);
        axios
          .post(that.API.serverApi + "/hwNannyPhone/sendCode", {
            phone: that.phone
          })
          .then(function(response) {
            if (response.data.code === 500) {
              that.$refs.verification.notify('warning', response.data.msg)
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    onMatching (){
      const that = this;
      if (that.$refs.verification.nonempty(that.verification,'验证码不能为空')) {
        axios
        .post(that.API.serverApi + "/hwNannyPhone/user/register", {
          phone: that.phone,
          code: that.verification,
          cityName: that.address,
          selectServer: [that.server]
        })
        .then(function(response) {
          if (response.data.code === 500) {
            that.$refs.verification.notify('warning', response.data.msg)
          } else if (response.data.code === 200) {
            that.$refs.verification.notify('success', '提交成功，我们会及时联系您');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    },
    cancel() {
      this.isAreaList = false;
    },
    confirm(e) {
      this.isAreaList = false;
      this.address = e[0].name + e[1].name;
    },
    onConfirm(value, index) {
      this.isPicker = false;
      this.server = value;
    },
    onCancel() {
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
  right: 0.2rem;
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
  margin: 0.2rem 0 0.1rem;
}
.verification-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.02rem;
}
.verification {
  height: 0.88rem;
  width: 60%;
  padding-left: 0.2rem;
  font-size: 0.32rem;
}
.verification-btn {
  border-radius:0.08rem;
  border:0.02rem solid rgba(213,213,213,1);
  height: 0.88rem;
  color: #999999;
  width: 2.2rem;
}
 .matching-box{
    text-align: center;
  }
  .matching-s {
    font-size: 0.36rem;
    color: #fff;
    width: 100%;
  }
  .img-min {
    position: relative;
  }
  .img-max {
    text-align: center;
  }
  .img {
    width: 80%;
  }
  .img-min a {
    position: absolute;
    display: inline-block;
    background:rgba(24,144,255,1);
    font-size:0.28rem;
    font-family:PingFangSC-Semibold,PingFang SC;
    top: 0.3rem;
    right: 0.6rem;
    color: #fff;
    width: 1.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 0.5rem;
  }
  .area {
    position: fixed;
    bottom: 0;
    width: 100%;
    -moz-box-shadow:0px -1px 6px #A6A6A6; -webkit-box-shadow:0px -1px 6px #A6A6A6; box-shadow:0px -1px 6px #A6A6A6;
  }
</style>
