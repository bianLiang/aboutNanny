<template>
  <div id="app">
    <Title ref="myTitle" />
    <router-view/>
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
      console.log(to.path);
      this.$refs.myTitle.onIsShowIcon();
      if (to.path === "/Details") {
        this.$refs.myTitle.changeTitle('简历详情');
      } else if (to.path === '/') {
        this.$refs.myTitle.changeTitle('帮宝家政找阿姨');
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
