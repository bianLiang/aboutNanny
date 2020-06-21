<template>
  <div>
    <div class="search-box">
      <van-search
        readonly="true"
        background="#fff"
        shape="round"
        placeholder="请输入搜索关键词"
        @click="clickSearch"
      />
      <Screen @getScreen="getScreen"></Screen>
    </div>
    <div class="content-max-box" v-if="isScreen">
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
            >
              <div class="li-box" @click="onClickList(item.id)">
                <div class="seize"  :style="{backgroundImage: 'url(' + (item.headPortraitUrl ? item.headPortraitUrl : '../../assets/img/zhanwei.png') + ')',backgroundPosition:'center',backgroundSize: 'cover',backgroundRepeat:'no-repeat'}">
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
                      <p class="consulting-btn" @click.prevent.stop="showServiceModel">立即咨询</p>
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
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="empty" v-if="isEmpty">
      <img src="../../assets/img/wulirong.png" alt="">
      <p>没有搜索到您输入的内容</p>
      <p>换个词试下吧～</p>
    </div>
    <ConsultingService ref="mymodel" ></ConsultingService>
  </div>
</template>
<script>
import { PullRefresh, List, Search } from "vant";
import Screen from "../Screen";
import ConsultingService from "../ConsultingService";
export default {
  name: "Home",
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Search.name]: Search,
    Screen,
    ConsultingService
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "Detail") {
        from.meta.keepAlive = true;
      } else {
        from.meta.keepAlive = false;
      }
    next();
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
      pageSize: 5,
      isEmpty: false,
      isScreen: true,
      datas: {jobTypeList:[], cityNameList:[], experience: null,age:null, education:null, isMarriage:null}
    };
  },
  mounted() {
    this.ajax();
  },
  methods: {
    showServiceModel() {
      this.$refs.mymodel.showModel();
    },
    getScreen(data) {
      const that = this;
      that.dataList = [];
      that.isLoading = false;
      that.pageNo = 0;
      that.page = 0;
      that.datas = data;
      axios
        .post("https://api.verycleaner.com/hwWorkerNanny/listAll", {
          pageNo: that.pageNo,
          pageSize: that.pageSize,
          jobTypeList: that.datas.jobTypeList.length > 0? that.datas.jobTypeList: null,
          cityNameList: that.datas.cityNameList.length > 0? that.datas.cityNameList: null,
          experience: that.datas.experience? that.datas.experience: null,
          age: that.datas.age? that.datas.age: null,
          education: that.datas.education? that.datas.education: null,
          isMarriage: that.datas.marriage? that.datas.marriage: null,
        })
        .then(function(response) {
          console.log(response.data.data);
           if (response.data.data.list.length>0) {
            that.isScreen = true;
            that.isEmpty = false;
          } else {
            that.isScreen = false;
            that.isEmpty = true;
          }
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
    ajax() {
      const that = this;
      if (that.isLoading) {
        that.dataList = [];
        that.isLoading = false;
        that.pageNo = 0;
        that.page = 0;
      }
      axios
        .post("https://api.verycleaner.com/hwWorkerNanny/listAll", {
          pageNo: that.pageNo,
          pageSize: that.pageSize,
          jobTypeList: that.datas.jobTypeList.length > 0? that.datas.jobTypeList: null,
          cityNameList: that.datas.cityNameList.length > 0? that.datas.cityNameList: null,
          experience: that.datas.experience? that.datas.experience: null,
          age: that.datas.age? that.datas.age: null,
          education: that.datas.education? that.datas.education: null,
          isMarriage: that.datas.marriage? that.datas.marriage: null,

        })
        .then(function(response) {
          console.log(response.data.data);
          // if (response.data.data.list.length>0) {
          //   that.isScreen = true;
          //   that.isEmpty = false;
          // } else {
          //   that.isScreen = false;
          //   that.isEmpty = true;
          // }
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
          headPortraitUrl: data[i].imageWork
            ? data[i].imageWork
            : require("../../assets/img/zhanwei.png"),
          name: data[i].name? data[i].name : '无',
          age: data[i].age? data[i].age + "岁" : 0 + "岁",
          address: data[i].native_place,
          workingYears: `从业${data[i].workWorkingYears? data[i].workWorkingYears : 0}年`,
          intention: `${data[i].isHome === 0 ? "不住家" : "住家"}|${
            data[i].workHopeJob
          }|${data[i].nativePlace}`,
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
    clickSearch() {
      this.$router.push({
        name: "Search"
      });
    },
    // 下拉刷新
    onRefresh() {
      const that = this;
      that.finished = false;
      that.loading = true;
      that.ajax();
    },
    // 上拉加载
    onLoad() {
      // 异步更新数据
      console.log("调用");
      this.ajax();
    }
  }
};
</script>
<style scoped>
.search-box {
  position: fixed;
  background: #fff;
  width: 100%;
  z-index: 100;
  top: 1rem;
}
.van-search {
  width: 90%;
  margin: 0 auto;
}
.van-search__content--round {
  border: 0.02rem solid #d5d5d5;
  background: #fff;
}
.content-max-box {
  margin-top: 3.2rem;
}
.li-box {
  display: flex;
  padding: 0.13rem 0.3rem 0.33rem 0.3rem;
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
  align-items: center;
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
  width: 2rem;
  height: 2rem;
  display: flex;
  margin-right: 0.2rem;
}
.name {
  font-size: 0.28rem;
  color: #333333;
  font-weight: 600;
  margin: 0 0.25rem 0 0.1rem;
}
.age,
.address,
.working-years {
  font-size: 0.22rem;
  color: #333333;
  margin: 0 0.1rem;
  background: #e6f7ff;
  border-radius: 0.04rem;
}
.age,
.working-years {
  padding: 0 0.04rem;
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
  position: absolute;
  right: 0.3rem;
  z-index: 1;
}
.intention {
  font-size: 0.28rem;
  color: #333333;
}
.specialty {
  font-size: 0.28rem;
  color: #999999;
}
.empty {
  text-align: center;
  margin-top: 2.5rem;
}
.empty p {
  color: #999999;
  font-size: 0.32rem;
}
.empty img{
  width: 5rem;
}
</style>
