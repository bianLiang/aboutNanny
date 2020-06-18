<template>
  <div>
    <div>
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
          <span>加盟店铺</span>
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
    </div>
  </div>
</template>
<script>
export default {
  name:"PageOne"
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
</style>
