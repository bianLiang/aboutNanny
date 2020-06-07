<template>
  <div class="hello">
    <i class="iconfont">&#xe6d1;</i>
    <!-- <van-rate v-model="val"></van-rate> -->
    <van-button type="primary">主要按钮</van-button>
    <van-pull-refresh
      success-text="刷新成功"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <div v-for="item in list" :key="item">{{item}}</div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Rate, Button, PullRefresh, List } from "vant";
export default {
  components: {
    [Rate.name]: Rate,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List
  },
  name: "HelloWorld",
  data() {
    return {
      count: 0,
      isLoading: false,
      msg: "Welcome to Your Vue.js App",

      list: [],
      loading: false,
      finished: false,
    };
  },

  methods: {
    onRefresh() {
      this.isLoading = false;
    },
     onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 4000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
