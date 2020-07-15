<template>
  <div class="box">
    <div class="head-url-box">
      <span class="title">头像</span>
      <van-uploader :after-read="afterRead">
        <div class="seize" :style="{backgroundImage: 'url(' + (headPortraitUrl ? headPortraitUrl : require('../../assets/img/touxiang.png')) + ')',backgroundPosition:'center',backgroundSize: 'cover',backgroundRepeat:'no-repeat'}"></div>
      </van-uploader>

    </div>
    <div class="phone-box">
      <span class="title">电话号码</span>
      <span class="content">{{phone}}</span>
    </div>
    <div class="card-box">
      <span class="title">身份证号</span>
      <span class="content">{{idCard}}<span class="iconfont" style="margin-left: 0.2rem;" @click="showidCardModel">&#xe614;</span></span>
    </div>
    <div class="name-box">
      <span class="title">姓名</span>
      <span class="content">{{name}}<span class="iconfont" style="margin-left: 0.2rem;">&#xe614;</span></span>
    </div>
    <div class="gender-box">
      <span class="title">性别</span>
      <span class="content">{{gender}}<span class="iconfont" style="margin-left: 0.2rem;">&#xe614;</span></span>
    </div>
    <div class="age-box">
      <span class="title">年龄</span>
      <span class="content">{{age}}<span class="iconfont" style="margin-left: 0.2rem;">&#xe614;</span></span>
    </div>
    <div class="native-box">
      <span class="title">籍贯</span>
      <span class="content">{{native}}<span class="iconfont" style="margin-left: 0.2rem;">&#xe614;</span></span>
    </div>
    <div class="education-box">
      <span class="title">学历</span>
      <span class="content">{{education}}<span class="iconfont" style="margin-left: 0.2rem;">&#xe614;</span></span>
    </div>
    <div class="nation-box">
      <span class="title">民族</span>
      <span class="content">{{nation}}<span class="iconfont" style="margin-left: 0.2rem;">&#xe614;</span></span>
    </div>
    <div class="marriage-box">
      <span class="title">婚姻状态</span>
      <span class="content">{{marriage ===0? '已婚':'未婚'}}<span class="iconfont" style="margin-left: 0.2rem;">&#xe614;</span></span>
    </div>
    <div class="experiences-box">
      <span class="title">从业经验</span>
      <span class="content">{{experiences}}年<span class="iconfont" style="margin-left: 0.2rem;">&#xe614;</span></span>
    </div>
    <div class="foot">
      <van-button round block type="info" native-type="submit">保存</van-button>
    </div>
    <Popup ref="model"></Popup>
  </div>
</template>
<script>
import { Button,Uploader  } from "vant";
import Popup from '../Popup'
export default {
  name:'BasicInformation',
   components: {
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    Popup
  },
  data() {
    return {
      headPortraitUrl: '',
      name: '',
      education:'',
      genitals:'',
      nation:'',
      constellation:'',
      age:'',
      native: '',
      experiences:'',
      phone: '',
      idCard: '',
      gender: '',
      marriage:''
    }
  },
  created() {
    this.headPortraitUrl = this.$route.query.headPortraitUrl;
    this.name = this.$route.query.name;
    this.education = this.$route.query.education;
    this.genitals = this.$route.query.genitals;
    this.nation = this.$route.query.nation;
    this.constellation = this.$route.query.constellation;
    this.age = this.$route.query.age;
    this.native = this.$route.query.native;
    this.experiences = this.$route.query.experiences;
    this.phone = this.$route.query.phone;
    this.idCard = this.$route.query.idCard;
    this.gender = this.$route.query.gender;
    this.marriage = this.$route.query.marriage;
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      this.headPortraitUrl = file.content;
    },
    showidCardModel() {
      let obj = {
        idCard:this.idCard,
        name:this.idCard,
        gender: this.gender,
        age: this.gender
      };
      this.$refs.model.show('showIdCard',obj)
    }
  }
}
</script>
<style scoped>
  .box {
  position: absolute;
  padding-top: 1.2rem;
  left: 0;
  width: 100%;
  background: #eee;
  padding-bottom: 1.7rem;
}
.title {
  font-size: 0.36rem;
  color: #000;
  font-weight: 600;
}
.seize {
    width: 1.7rem;
    height: 2.27rem;
    display: flex;
    margin-right: 0.2rem;
}
.head-url-box,.phone-box,.card-box,.name-box,.gender-box,.age-box,.native-box,.education-box,.nation-box,.marriage-box,.experiences-box {
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
  align-items: center;
}
.phone-box{
  margin: 0.2rem 0;
}
.age-box {
  margin-bottom: 0.2rem;
}
.content {
  color: #666;
  font-size: 0.32rem;
}
.foot {
  margin-top: 0.2rem;
  margin: 16px;
  background: #fff;
  position: fixed;
  bottom: -0.3rem;
  width: 100%;
  height: 1.5rem;
  left: -0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>>
