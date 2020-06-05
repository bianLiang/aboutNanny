<template>
  <div class="title-box">
    <span class="iconfont title-icon">&#xe613;</span>
    <p class="title">{{ title }}</p>
  </div>
</template>
<script>
export default {
  name: "Title",
  data() {
    return {
      title: "帮宝家政找阿姨"
    };
  }
};
</script>
<style scoped>
.title-box {
  line-height: 1rem;
  height: 1rem;
  background: #3395ff;
  position: relative;
}
.title-icon {
  color: #fff;
  font-size: 0.36rem;
  position: absolute;
}
.title {
  color: #fff;
  font-size: 0.36rem;
  text-align: center;
}
</style>
