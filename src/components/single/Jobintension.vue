<template>
  <div class="box">
    <div class="min-box">
      <span class="title">工作类型</span>
      <span class="content"><span class="content-p">{{jobType}}</span><span @click="onClickRadio('工作类型')" class="iconfont" style="margin-left: 0.2rem;" >&#xe614;</span></span>
    </div>
    <div class="min-box">
      <span class="title">工作内容</span>
      <span class="content"><span class="content-p">{{jobSearchCategory.toString()}}</span><span @click="onClickContent('工作内容')" class="iconfont" style="margin-left: 0.2rem;" >&#xe614;</span></span>
    </div>
    <div class="min-box">
      <span class="title">期待薪资</span>
      <span class="content"><span class="content-p">{{salaryExpectation}}</span><span @click="onClickRadio('期待薪资')" class="iconfont" style="margin-left: 0.2rem;" >&#xe614;</span></span>
    </div>
    <div class="min-box">
      <span class="title">每周休息</span>
      <span class="content"><span class="content-p">{{rest}}</span><span @click="onClickRadio('每周休息')" class="iconfont" style="margin-left: 0.2rem;" >&#xe614;</span></span>
    </div>
    <div class="min-box">
      <span class="title">现住地址</span>
      <span class="content"><span class="content-p">{{currentAddress}}</span><span @click="onClickText('现住地址')" class="iconfont" style="margin-left: 0.2rem;" >&#xe614;</span></span>
    </div>
    <div class="min-box">
      <span class="title">工作状态</span>
      <span class="content"><span class="content-p">{{jobState}}</span><span @click="onClickRadio('工作状态')" class="iconfont" style="margin-left: 0.2rem;" >&#xe614;</span></span>
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
  name:'Jobintension',
  components: {
    [Button.name]: Button,
    Popup
  },
  created() {
    this.jobType = this.$route.query.jobType;
    this.jobSearchCategory = this.$route.query.jobSearchCategory;
    this.salaryExpectation = this.$route.query.salaryExpectation;
    this.rest = this.$route.query.rest;
    this.currentAddress = this.$route.query.currentAddress;
    this.jobState = this.$route.query.jobState;
  },
  data() {
    return {
      jobType: '',
      jobSearchCategory: [],
      salaryExpectation: '',
      rest: '',
      currentAddress:'',
      jobState:''
    };
  },
  methods: {
    getData(data) {},
    onClickText(title) {
      let placeholderText;
      if (title === '现住地址') {
        placeholderText = '例如：北京市朝阳区垡头东里'
      }
      const obj = {
        valueText:this.currentAddress,
        labelText: title,
        placeholderText: placeholderText
      };
      this.$refs.model.show('text',obj)
    },
    onClickRadio(title) {
      let columnsRadio;
      if (title=== '工作类型') {
        columnsRadio = ['保姆-住家','保姆-不住家','育儿嫂-住家','育儿嫂-不住家','月嫂','钟点工'];
      } else if (title=== '期待薪资') {
        columnsRadio = [
          {
            values: ['1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K']
          },
          {
            values: ['1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K']
          },
        ]
      } else if (title === '每周休息') {
        columnsRadio = ['1天','2天', '不休','都可以'];
      } else if (title === '工作状态') {
        columnsRadio = ['待岗','在岗'];
      }
      const obj = {
        titleRadio:title,
        columnsRadio: columnsRadio
      };
      this.$refs.model.show('Radio',obj)
    },
    onClickContent (title) {
      let obj = {
        title:title,
        result: ['做饭','做家务','3岁以上','1至3岁','0至1岁','自理老人','半自理老人','不自理老人','照顾病人','接送小孩','手洗衣物','开车','手擦地','洗衣服'],
        checkResult: this.jobSearchCategory
      };
      this.$refs.model.show('checkbox',obj)
    },
    submit() {}
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
