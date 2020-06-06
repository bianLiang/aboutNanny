<template>
  <div class="title-box">
    <span v-if="isIcon" class="iconfont title-icon" @click="backHistory"
      >&#xe613;</span
    >
    <p class="title">{{ title }}</p>
  </div>
</template>
<script>
export default {
  name: "Title",
  data() {
    return {
      isIcon: false,
      title: "帮宝家政找阿姨"
    };
  },
  watch: {
    $route: "routeChange"
  },
  created(){
    console.log(this.$route.path);
    if(this.$route.path === '/') {
      this.isIcon = false;
    } else {
      this.isIcon = true;
    }
    if (this.$route.path === '/') {
      this.title = '帮宝家政找阿姨';
    } else if (this.$route.path === '/Details') {
      this.title = '简历详情';
    }
  },
  methods: {
    backHistory() {
      this.$router.go(-1); //返回上一层
    },
    onIsShowIcon() {
      if (this.$route.path === "/") {
        this.isIcon = false;
      } else {
        this.isIcon = true;
      }
    },
    changeTitle (title) {
      this.title = title;
    }
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
