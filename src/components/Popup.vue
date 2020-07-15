<template>
  <div>
    <!-- 省份证上传 -->
    <van-popup v-model="showIdCard" position="bottom" :style="{ height: '80%' }" >
      <div class="box">
        <div class="id-card-max-box">
          <p class="title" style="margin-bottom:0.2rem">身份证照片</p>
          <div class="id-card-box">
            <div style="position: relative;">
              <div class="id-card-item">
                <img style="width: 0.6rem;" src="../assets/img/camera.png" alt="">
                <p style="color:#000;font-size:0.28rem;">点击拍摄/上传人像面</p>
              </div>
              <div style="position: absolute;top: 0;left: 0.09rem;">
                <div class="seize" :style="{backgroundImage: 'url(' + positiveUrl + ')',backgroundPosition:'center',backgroundSize: 'cover',backgroundRepeat:'no-repeat'}"></div>
                <img style="position: absolute;right: -0.4rem;top: -0.4rem;" src="../assets/img/close.png" alt="">
              </div>
            </div>
            <div style="position: relative;">
              <div class="id-card-item">
                <img style="width: 0.6rem;" src="../assets/img/camera.png" alt="">
                <p style="color:#000;font-size:0.28rem;">点击拍摄/上传国徽面</p>
              </div>
              <div style="position: absolute;top: 0;left: 0.09rem;">
                <div class="seize" :style="{backgroundImage: 'url(' + positiveUrl + ')',backgroundPosition:'center',backgroundSize: 'cover',backgroundRepeat:'no-repeat'}"></div>
                <img style="position: absolute;right: -0.4rem;top: -0.4rem;" src="../assets/img/close.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Popup } from 'vant';
export default {
  name:'Popup',
   components: {
    [Popup.name]: Popup
  },
  data() {
    return {
      showIdCard:true,
      positiveUrl: require('../assets/img/tupian1.jpg')
    }
  },
  methods: {
    show(type, options) {
      if (type === 'showIdCard') {
        this.showIdCard = true;
        console.log(options);
      }
    }
  }
}
</script>
<style scoped>
.box {
  height: 100%;
  width: 100%;
  background: #eee;

}
.title {
  font-size: 0.36rem;
  color: #000;
  font-weight: 600;
}
.content {
  color: #666;
  font-size: 0.32rem;
}
.id-card-max-box {
  background: #fff;
  padding: 0.3rem;
}
.id-card-box {
  display: flex;
  justify-content: center;
}
.id-card-item {
  text-align: center;
  width: 3.3rem;
  height: 2rem;
  margin: 0 0.2rem;
  background: #eee;
  border-radius: 0.1rem;
}
.seize {
  width: 3.3rem;
  height: 2rem;
  border-radius: 0.1rem;
}
</style>
