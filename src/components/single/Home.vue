<template>
  <div>
    <ul>
      <li v-for="item in dataList" :key="item.name" @click="onClickList()">
        <div class="li-box">
          <div class="seize">
            <img v-bind:src="item.headPortraitUrl" alt="" />
          </div>
          <div class="content-box">
            <div class="information-box">
              <div class="name-box">
                <p class="name">{{item.name}}</p>
                <p class="age">{{item.age}}</p>
                <p class="address">{{item.address}}</p>
                <p class="working-years">{{item.workingYears}}</p>
              </div>
              <div>
                <!-- <p class="consulting-btn">立即咨询</p> -->
              </div>
            </div>
            <div class="intention-box">
              <p class="intention">{{item.intention}}</p>
            </div>
            <div class="specialty-box">
              <p class="specialty">
                {{item.specialty}}
              </p>
            </div>
          </div>
        </div>
        <div style="text-align: center;">
          <hr />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      dataList: [
        {
          headPortraitUrl: require("../../assets/img/zhanwei.png"),
          name: "张琴",
          age: "12岁",
          address: "江西人",
          workingYears: "从业12年",
          intention: "不住家|保姆|北京",
          specialty: "做饭做家务｜能照顾小孩｜照顾老人啦啦啦啦啦啦"
        },
        {
          headPortraitUrl: require("../../assets/img/zhanwei.png"),
          name: "张琴",
          age: "12岁",
          address: "江西人",
          workingYears: "从业12年",
          intention: "不住家|保姆|北京",
          specialty: "做饭做家务｜能照顾小孩｜照顾老人啦啦啦啦啦啦"
        }
      ]
    };
  },
  methods: {
    onClickList() {
      this.$router.push('/Details');
    }
  },
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
