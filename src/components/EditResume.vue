<template>
  <div class="edit-box">
    <div class="teacher-max-box">
      <div class="teacher-box">
        <span class="teacher">家政老师</span>
        <span class="push">去添加<span class="iconfont">&#xe614;</span></span>
      </div>
      <p class="paragraph">家政公司：{{company}}</p>
      <p class="paragraph">老师手机号：{{phone}}</p>
    </div>
    <div>
      <div>
        <div class="seize" :style="{backgroundImage: url('../assets/img/zhanwei.png'),backgroundPosition:'center',backgroundSize: 'cover',backgroundRepeat:'no-repeat'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"EditResume",
  data() {
    return {
      company:'帮宝家政',
      phone:'18918292901',
      headPortraitUrl:require("../assets/img/zhanwei.png")
    }
  }
}
</script>
<style scoped>
  .teacher-max-box {
    background: #fff;
    margin: 0.1rem 0;
  }
  .edit-box{
    margin-top: 1rem;
    background: #ccc;
  }
  .teacher-box {
    display: flex;
    justify-content: space-between;
  }
  .teacher {
    font-size: 0.36rem;
    color: #000;
  }
  .push {
    font-size: 0.3rem;
    color: #3395FF;
  }
  .paragraph {
    font-size: 0.32rem;
    color: #666;
  }
</style>
