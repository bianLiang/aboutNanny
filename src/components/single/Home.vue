<template>
  <div>
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
      loading-text="刷新中"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有了啦，人家可是有底线的～"
        @load="onLoad"
      >
        <ul>
          <li v-for="item in dataList" :key="item.name" @click="onClickList()">
            <div class="li-box">
              <div class="seize">
                <img v-bind:src="item.headPortraitUrl" alt="" />
              </div>
              <div class="content-box">
                <div class="information-box">
                  <div class="name-box">
                    <p class="name">{{ item.name }}</p>
                    <p class="age">{{ item.age }}</p>
                    <p class="address">{{ item.address }}</p>
                    <p class="working-years">{{ item.workingYears }}</p>
                  </div>
                  <div>
                    <!-- <p class="consulting-btn">立即咨询</p> -->
                  </div>
                </div>
                <div class="intention-box">
                  <p class="intention">{{ item.intention }}</p>
                </div>
                <div class="specialty-box">
                  <p class="specialty">
                    {{ item.specialty }}
                  </p>
                </div>
              </div>
            </div>
            <div style="text-align: center;">
              <hr />
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { PullRefresh, List } from "vant";
export default {
  name: "Home",
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List
  },
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      dataList: [

      ]
    };
  },
  created() {
    // axios.get('https://www.baidu.com/').then((response) => {
    //   console.log(response.data);
    // }).catch(function (error) {
    // console.log(error);
    // })
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(response => (this.info = response.data.bpi));
  },
  methods: {
    onClickList() {
      this.$router.push("/Details");
      // this.$emit('onClickList');
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    // 上拉加载
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        const obj = {
          headPortraitUrl: require("../../assets/img/zhanwei.png"),
          name: "张琴",
          age: "12岁",
          address: "江西人",
          workingYears: "从业12年",
          intention: "不住家|保姆|北京",
          specialty: "做饭做家务｜能照顾小孩｜照顾老人啦啦啦啦啦啦"
        };
        for (let i = 0; i < 10; i++) {
          this.dataList.push(obj);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.dataList.length >= 40) {
          this.finished = true;
        }
      }, 4000);
    }
  }
};
</script>
<style scoped>
.li-box {
  display: flex;
  padding: 0.13rem;
  margin: 0.3rem 0;
}

hr {
  height: 0.01rem;
  background-color: #d5d5d5;
  border: none;
  width: 96%;
  margin: 0.1rem auto;
}
.information-box {
  display: flex;
}
.name-box {
  display: flex;
}
.content-box {
  height: 2rem;
}
.intention-box {
  margin: 0.23rem 0.1rem;
}
.specialty-box {
  margin: 0 0.1rem;
}
.seize {
  width: 1.5rem;
  height: 2rem;
  display: flex;
}
.name {
  font-size: 0.28rem;
  color: #333333;
  font-weight: 600;
  margin: 0 0.1rem;
}
.age,
.address,
.working-years {
  font-size: 0.22rem;
  color: #333333;
  margin: 0 0.1rem;
  background: #e6f7ff;
}
.consulting-btn {
  font-size: 0.22rem;
  color: #fff;
  width: 1.17rem;
  height: 0.43rem;
  line-height: 0.43rem;
  background: rgba(24, 144, 255, 1);
  border-radius: 1rem;
  border: none;
  text-align: center;
  margin-left: 1.1rem;
}
.intention {
  font-size: 0.28rem;
  color: #333333;
}
.specialty {
  font-size: 0.28rem;
  color: #999999;
}
</style>
