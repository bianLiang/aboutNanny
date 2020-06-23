<template>
  <div>
    <div class="search-box">
      <van-search
        background="#fff"
        shape="round"
        show-action
        v-model="value"
        clearable="true"
        autofocus="true"
        placeholder="请输入搜索关键词"
      >
        <template #action>
          <div @click="onSearch">
            <van-button class="searchBtn" color="#3395FF" @click="search">搜索</van-button>
          </div>
        </template>
      </van-search>
      <div class="position-box" v-if="isRecommendedSearch">
        <p class="recommended-search">推荐搜索</p>
        <div>
          <button
            class="content-btn"
            v-for="item in recommendedSearchList"
            :key="item"
            @click="clickrecommendedSearchBtn(item)"
          >
            {{ item }}
          </button>
        </div>
      </div>
      <div v-if="isScreen">
        <Screen @getScreen="getScreen"></Screen>
      </div>
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
              @click="onClickList(item.id)"
            >
              <div class="li-box">
                <div class="seize" :style="{backgroundImage: 'url(' + (item.headPortraitUrl ? item.headPortraitUrl : '../../assets/img/zhanwei.png') + ')',backgroundPosition:'center',backgroundSize: 'cover',backgroundRepeat:'no-repeat'}">
                  <!-- <img v-bind:src="item.headPortraitUrl" alt="" /> -->
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
import { PullRefresh, List, Search, Button } from "vant";
import ConsultingService from "../ConsultingService";
import Screen from "../Screen";
export default {
  name: "Search",
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Search.name]: Search,
    [Button.name]: Button,
    Screen,
    ConsultingService
  },
  beforeRouteLeave(to, from, next) {
    console.log(to.name);
    next();
  },
   activated() {
    if (!this.$router.meta.isBack) {
      this.ajax()
    }
  },
  data() {
    return {
      value: "",
      isRecommendedSearch: true,
      isScreen: false,
      isEmpty: false,
      recommendedSearchList: ["育儿嫂", "保姆", "月嫂"],
      // 列表数据
      isLoading: false,
      loading: false,
      finished: false,
      isImmediateCheck: false,
      dataList: [],
      pageNo: 0,
      page: 0,
      pageSize: 5,
      datas: {jobTypeList:[], cityNameList:[], experience: null,age:null, education:null, isMarriage:null}
    };
  },
  mounted() {
  },
  methods: {
    showServiceModel() {
      this.$refs.mymodel.showModel();
    },
    onSearch() {},
    clickrecommendedSearchBtn(item) {
      this.value = item;
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
      this.ajax();
    },
    onClickList(id) {
      console.log(id);
      this.$router.push({
        name: "Details",
        query: { ID: id }
      });
    },
    search() {
      const that = this;
      this.dataList = [];
      this.isLoading = false;
      that.loading = true,
      that.finished = false,
      this.pageNo = 0;
      this.page = 0;
      this.datas = {jobTypeList:[], cityNameList:[], experience: null,age:null, education:null, isMarriage:null};
      axios
        .post(that.API.serverApi+"/hwWorkerNanny/listAll", {
          pageNo: that.pageNo,
          pageSize: that.pageSize,
          keyword: that.value? that.value: null,
          jobTypeList: that.datas.jobTypeList.length > 0? that.datas.jobTypeList: null,
          cityNameList: that.datas.cityNameList.length > 0? that.datas.cityNameList: null,
          experience: that.datas.experience? that.datas.experience: null,
          age: that.datas.age? that.datas.age: null,
          education: that.datas.education? that.datas.education: null,
          isMarriage: that.datas.marriage? that.datas.marriage: null,
        })
        .then(function(response) {

          if (response.data.data.list.length>0) {
            that.isRecommendedSearch = false;
            that.isScreen = true;
            that.isEmpty = false;
          } else {
            that.isRecommendedSearch = false;
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
    getScreen(data) {
      console.log(data);
      const that = this;
      this.dataList = [];
      this.isLoading = false;
      that.loading = true,
      that.finished = false,
      this.pageNo = 0;
      this.page = 0;
      this.datas = data;
      axios
        .post(that.API.serverApi+"/hwWorkerNanny/listAll", {
          pageNo: that.pageNo,
          pageSize: that.pageSize,
          keyword: that.value? that.value: null,
          jobTypeList: that.datas.jobTypeList.length > 0? that.datas.jobTypeList: null,
          cityNameList: that.datas.cityNameList.length > 0? that.datas.cityNameList: null,
          experience: that.datas.experience? that.datas.experience: null,
          age: that.datas.age? that.datas.age: null,
          education: that.datas.education? that.datas.education: null,
          isMarriage: that.datas.marriage? that.datas.marriage: null,
        })
        .then(function(response) {
          if (response.data.data.list.length>0) {
            that.isRecommendedSearch = false;
            that.isScreen = true;
            that.isEmpty = false;
          } else {
            that.isRecommendedSearch = false;
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
    ajax(data) {
      const that = this;
      if (that.isLoading) {
        that.dataList = [];
        that.isLoading = false;
        that.pageNo = 0;
        that.page = 0;
      }
      axios
        .post(that.API.serverApi+"/hwWorkerNanny/listAll", {
          pageNo: that.pageNo,
          pageSize: that.pageSize,
          keyword: that.value? that.value: null,
          jobTypeList: that.datas.jobTypeList.length > 0? that.datas.jobTypeList: null,
          cityNameList: that.datas.cityNameList.length > 0? that.datas.cityNameList: null,
          experience: that.datas.experience? that.datas.experience: null,
          age: that.datas.age? that.datas.age: null,
          education: that.datas.education? that.datas.education: null,
          isMarriage: that.datas.marriage? that.datas.marriage: null,
        })
        .then(function(response) {
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
          workingYears: `从业${data[i].workWorkingYears}年`,
          intention: `${data[i].isHome === 0 ? "不住家" : "住家"}|${
            data[i].workHopeJob? data[i].workHopeJob: '无'
          }|${data[i].nativePlace? data[i].nativePlace : '无'}`,
          specialty: data[i].introduceOneselfTo? data[i].introduceOneselfTo : '',
          id: data[i].id
        });
      }
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
.searchBtn {
  height: 0.68rem;
  border-radius: 0.08rem;
}
.position-box {
  width: 95%;
  margin: 0 auto;
  padding-top: 0.3rem;
  border-top: 0.02rem #d5d5d5 solid;
}
.content-btn {
  border-radius: 0.2rem;
  margin-right: 0.35rem;
  width: 2.1rem;
  color: #333;
  font-size: 0.28rem;
  background: #f5f5f5;
  border: none;
  height: 0.68rem;
}
.content-btn:nth-child(3n + 0) {
  margin-right: 0;
}
.recommended-search {
  font-size: 0.32rem;
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
/**列表页*/
.content-max-box {
  margin-top: 3.2rem;
}
.li-box {
  display: flex;
  padding: 0.13rem 0.3rem 0.33rem 0.3rem;
  margin: 0.3rem 0;
  border-bottom: 0.01rem solid #d5d5d5;
}
.seize {
  width: 2rem;
  height: 2rem;
  display: flex;
  margin-right: 0.2rem;
}
.content-box {
  height: 2rem;
}
.information-box {
  display: flex;
}
.name-box {
  display: flex;
  align-items: center;
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
.intention-box {
  margin: 0.23rem 0.1rem;
}
.intention {
  font-size: 0.28rem;
  color: #333333;
}
.specialty-box {
  margin: 0 0.1rem;
  margin: 0 0.1rem;
  width: 4rem;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.specialty {
  font-size: 0.28rem;
  color: #999999;
}
</style>
