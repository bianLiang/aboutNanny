<template>
  <div class="box">
     <div class="min-box">
      <span class="title">工作类型</span>
      <span class="content"><span class="content-p">{{experiences.type}}</span><span @click="onClickRadio('工作类型')" class="iconfont" style="margin-left: 0.2rem;" >&#xe614;</span></span>
    </div>
    <div class="min-box">
      <span class="title">开始时间</span>
      <span class="content"><span class="content-p">{{experiences.startTime.join(".")}}</span><span @click="onClickRadio('开始时间')" class="iconfont" style="margin-left: 0.2rem;" >&#xe614;</span></span>
    </div>
    <div class="min-box">
      <span class="title">结束时间</span>
      <span class="content"><span class="content-p">{{experiences.endTime.join(".")}}</span><span @click="onClickRadio('结束时间')" class="iconfont" style="margin-left: 0.2rem;" >&#xe614;</span></span>
    </div>
    <div class="textarea-box">
      <span class="title">工作描述</span>
      <textarea v-model="experiences.experienceContent" style="margin-top: 0.2rem;height: 2rem;width: 100%;font-size: 0.36rem;background: #eee;padding: 0.1rem;border: none;resize: none;" placeholder="请输入工作内容"></textarea>
    </div>
    <div class="foot">
      <van-button v-if="type === '修改工作经验'? true: false" round block type="default" @click="deleteExperience">删除</van-button>
      <van-button round block type="info" @click="submit">保存</van-button>
    </div>
    <Popup ref="model" @getData="getData"></Popup>
  </div>
</template>
<script>
import { Button  } from "vant";
import Popup from '../Popup'
export default {
  name:'Experience',
  components: {
    [Button.name]: Button,
    Popup
  },
  created () {
    this.experiences = this.$route.query.experiences;
    this.experiencesList = this.$route.query.experiencesList;
    console.log(this.experiences);
    this.index = this.$route.query.index;
    this.type = this.$route.query.type;
  },
  data() {
    return {
      experiences: {},
      experiencesList:[],
      index:0,
      type: '',
      content:''
    };
  },
  methods: {
    getData(data) {
      this.experiences[data.key] = data.value;
    },
    onClickRadio(title) {
      let columnsRadio;
      let type;
      if (title=== '工作类型') {
        columnsRadio = ['保姆-住家','保姆-不住家','育儿嫂-住家','育儿嫂-不住家','月嫂','钟点工'];
        type = 'type';
      } else if (title === '开始时间') {
        columnsRadio = [
          {
            values: ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012','2011','2010']
          },
          {
            values: ['01', '02', '03', '04', '05', '06', '07', '08', '09','10','11','12']
          }
        ];
        type = 'startTime';
      } else if (title === '结束时间') {
        columnsRadio = [
          {
            values: ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012','2011','2010']
          },
          {
            values: ['01', '02', '03', '04', '05', '06', '07', '08', '09','10','11','12']
          }
        ];
        type = 'endTime';
      }
      const obj = {
        titleRadio:title,
        columnsRadio: columnsRadio,
        type: type
      };
      this.$refs.model.show('Radio',obj)
    },
    deleteExperience() {
      this.experiencesList.splice(this.index,1);
      const values = {experiencesList:this.experiencesList};
      sessionStorage.setItem("Experience",JSON.stringify(values));
      this.$router.push({
        name: "EditResume",
      });
    },
    submit() {
      if (this.type === '添加工作经验') {
        console.log(this.experiencesList);
        this.experiencesList.splice(this.index,0,this.experiences);
      } else if(this.type === '修改工作经验') {
        this.experiencesList.splice(this.index,1,this.experiences);
      }
      const values = {experiencesList:this.experiencesList};
      sessionStorage.setItem("Experience",JSON.stringify(values));
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
.textarea-box {
  background: #fff;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
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
