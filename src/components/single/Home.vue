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
        :immediate-check="isImmediateCheck"
      >
        <ul>
          <li
            v-for="item in dataList"
            :key="item.name"
            @click="onClickList(item.id)"
          >
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
            <!-- <div class="solid" style="text-align: center;">
            </div> -->
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
      isImmediateCheck: false,
      dataList: [],
      pageNo: 0,
      page: 0,
      pageSize: 5
    };
  },
  mounted() {
    this.ajax();
  },
  methods: {
    ajax() {
      const that = this;
      if (that.isLoading) {
            that.dataList = [];
            that.isLoading = false;
            that.pageNo = 0;
            that.page = 0;
          }
      axios
        .post("http://192.168.1.188:11112/hwWorkerNanny/listAll", {
          pageNo: that.pageNo,
          pageSize: that.pageSize
        })
        .then(function(response) {
          console.log(response.data.data);

          that.loading = false;
          if (response.data.data.list.length) {
            that.processingData(response.data.data.list);
            that.page += 1;
            that.pageNo = that.page * that.pageSize - 1;
          } else {
            console.log("执行这里");
            that.finished = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 处理初始数据
    processingData(data) {
      for (let i = 0; i < data.length; i++) {
        this.dataList.push({
          headPortraitUrl: require("../../assets/img/zhanwei.png"),
          name: data[i].name,
          age: data[i].age + "岁",
          address: data[i].native_place,
          workingYears: `从业${data[i].worWorkingYears}年`,
          intention: `${data[i].isHome === 0 ? "不住家" : "住家"}|${
            data[i].work_hope_job
          }|${data[i].work_hope_job}`,
          specialty: "做饭做家务｜能照顾小孩｜照顾老人啦啦啦啦啦啦",
          id: data[i].id
        });
      }
    },
    onClickList(id) {
      console.log(id);
      // this.$emit('onClickList');
      this.$router.push({
        name: "Details",
        query: { ID: id }
      });
    },
    // 下拉刷新
    onRefresh() {
      const that = this;
      that.finished = false;
      that.loading = true;

      that.ajax();

      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 1000);
    },
    // 上拉加载
    onLoad() {
      // 异步更新数据
      console.log("调用");
      this.ajax();
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   if (this.isLoading) {
      //     this.list = [];
      //     this.isLoading = false;
      //   }
      //   for (let i = 0; i < 10; i++) {
      //     this.dataList.push({
      //       headPortraitUrl: require("../../assets/img/zhanwei.png"),
      //       name: "张琴" + i,
      //       age: "12岁",
      //       address: "江西人",
      //       workingYears: "从业12年",
      //       intention: "不住家|保姆|北京",
      //       specialty: "做饭做家务｜能照顾小孩｜照顾老人啦啦啦啦啦啦"
      //     });
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.dataList.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 4000);
    }
  }
};
</script>
<style scoped>
.li-box {
  display: flex;
  padding: 0.13rem 0.13rem 0.33rem 0.13rem;
  margin: 0.3rem 0;
  border-bottom: 0.01rem solid #d5d5d5;
}

.solid {
  height: 0.01rem;
  background-color: #d5d5d5;
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
