<template>
  <div class="title-box" v-if="isTitle">
    <span v-if="isIcon" class="iconfont title-icon" @click="backHistory"
      >&#xe613;</span
    >
    <p class="title">{{ title }}</p>
    <span v-if="isIcon" class="shouye iconfont" @click="backHome">&#xe677;</span>
  </div>
</template>
<script>
export default {
  name: "Title",
  data() {
    return {
      isIcon: false,
      isTitle: true,
      title: "帮宝家政阿姨简历库"
    };
  },
  watch: {
    $route: "routeChange"
  },
  created(){
    if(this.$route.path === '/') {
      this.isIcon = false;
    } else {
      this.isIcon = true;
    }
    if (this.$route.path === '/') {
      this.title = '帮宝家政阿姨简历库';
    } else if (this.$route.path === '/Details') {
      this.title = '简历详情';
    } else if (this.$route.path === '/Search') {
      this.title = '搜索';
    } else if (this.$route.path === '/EditResume') {
      this.title = '制作简历';
    } else if (this.$route.path === "/Teacher") {
        this.title ="家政老师"
    } else if (this.$route.path === "/BasicInformation") {
        this.title ='基本信息'
    } else if (this.$route.path === "/Specialty") {
        this.title ='优点特长'
    } else if (this.$route.path === "/Jobintension") {
        this.title ='求职意向'
    } else if (this.$route.path === "/Experience") {
        this.title ='添加工作经验'
    }
    if (this.$route.path === "/PageOne" || this.$route.path === "/PageTwo") {
      this.isTitle = false;
    } else {
      this.isTitle = true;
    }
  },
  methods: {
    backHistory() {
      this.$router.back(); //返回上一层
    },
    backHome() {
       this.$router.push({
        name: "Home"
      });
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
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}
.title-icon {
  color: #fff;
  font-size: 0.36rem;
  position: absolute;
  left: 0.2rem;
}
.shouye {
  color: #fff;
  font-size: 0.36rem;
  position: absolute;
  right: 0.2rem;
  top: 0;
}
.title {
  color: #fff;
  font-size: 0.36rem;
  text-align: center;
}
</style>
