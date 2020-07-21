<template>
  <div class="box">
    <div v-for="(item,index) in specialtyList" :key="index" class="min-box">
      <span class="title">{{item.title}}</span>
      <span class="content"><span class="content-p">{{item.list.toString()}}</span><span @click="showSpecialtyModel(index)" class="iconfont" style="margin-left: 0.2rem;" >&#xe614;</span></span>
    </div>
    <div class="foot">
      <van-button round block type="info" @click="submit">保存</van-button>
    </div>
    <Popup ref="model" @getData="getData"></Popup>
  </div>
</template>
<script>
import { Button  } from "vant";
import Popup from '../Popup'
export default {
  name:'Specialty',
  components: {
    [Button.name]: Button,
    Popup
  },
  data() {
    return {
      index:null,
      specialtyList:[]
    };
  },
  created() {
    this.specialtyList = this.$route.query.specialtyList;
  },
  methods: {
    // 处理子组件保存的数据
    getData(data) {
      this.specialtyList[this.index].list = data.checkResult;
    },
    showSpecialtyModel(index) {
      this.index = index;
      let result;
      if (this.specialtyList[index].title === '做饭') {
        result = ['面食','清汤菜','煲汤','北方菜','南方菜','四川菜','湖南菜','浙江菜','广东菜','东北菜','西北菜'];
      } else if (this.specialtyList[index].title === '照顾小孩') {
        result = ['0至1岁','1至3岁','3岁以上','接送小孩'];
      } else if (this.specialtyList[index].title === '照顾老人') {
        result =['自理老人','半自理老人','不自理老人'];
      } else if (this.specialtyList[index].title === '照顾宠物') {
        result = ['狗','猫'];
      } else if (this.specialtyList[index].title === '其他') {
        result = ['营养搭配','衣物保养','开车','英语','照顾病人'];
      }
      let obj = {
        title:this.specialtyList[index].title,
        result: result,
        checkResult: this.specialtyList[index].list
      };
      this.$refs.model.show('checkbox',obj)
    },
    submit() {
      const values = {specialtyList: this.specialtyList};
      sessionStorage.setItem("Specialty",JSON.stringify(values));
      this.$router.push({
        name: "EditResume",
      });
    }
  }
}
</script>
<style scoped>
.box {
  position: absolute;
  padding-top: 1.2rem;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eee;
  padding-bottom: 1.7rem;
}
.min-box {
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
  align-items: center;
}
.title {
  font-size: 0.36rem;
  color: #000;
  font-weight: 600;
}
.content {
  color: #666;
  font-size: 0.32rem;
  display: flex;
  align-items: center;
}
.content-p {
  width: 4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  text-align: right;
}
.foot {
  margin-top: 0.2rem;
  margin: 16px;
  background: #fff;
  position: fixed;
  bottom: -0.3rem;
  width: 100%;
  height: 1.5rem;
  left: -0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
