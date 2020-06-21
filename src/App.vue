<template>
  <div id="app">
    <Title ref="myTitle" />
    <!-- <keep-alive>
      <router-view />
    </keep-alive> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
export default {
  name: "App",
  components: {
    Title
  },
  watch: {
    $route(to, from) {
      this.$refs.myTitle.onIsShowIcon();
      if (to.path === "/Details") {
        this.$refs.myTitle.changeTitle("简历详情");
      } else if (to.path === "/") {
        this.$refs.myTitle.changeTitle("帮宝家政阿姨简历库");
      } else if (this.$route.path === "/Search") {
        this.$refs.myTitle.changeTitle("搜索");
      }
    }
  },
  methods: {
    // onClickList() {
    //   this.$refs.details.onClickList();
    // }
  }
};
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
