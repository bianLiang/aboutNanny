<template>
  <div class="box">
    <p style="font-size: 0.4rem;color: #000;font-weight: 800;margin: 0.2rem;">必传证件</p>
    <div class="min-box" v-for="(item,index) in requiredCertificateList" :key="index">
      <span class="title">{{item.text}}</span>
      <span class="content"><span class="content-p">{{item.url? '已添加':'点击上传'}}</span><span @click="onClickUploader('必传',index,item.text)" class="iconfont" style="margin-left: 0.2rem;" >&#xe614;</span></span>
    </div>
    <p style="font-size: 0.4rem;color: #000;font-weight: 800;margin: 0.2rem;">其他证件</p>
    <div class="min-box" v-for="(item,index) in certificateList" :key="index">
      <span class="title">{{item.text}}</span>
      <span class="content"><span class="content-p">{{item.url? '已添加':'点击上传'}}</span><span @click="onClickUploader('不必传',index,item.text)" class="iconfont" style="margin-left: 0.2rem;" >&#xe614;</span></span>
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
  name:'Certificate',
  components: {
    [Button.name]: Button,
    Popup
  },
  created() {
    this.certificateList = this.$route.query.certificateList;
    this.requiredCertificateList = this.$route.query.requiredCertificateList;
  },
  data() {
    return {
      certificateList:[],
      requiredCertificateList:[]
    };
  },
  methods: {
    getData(data) {},
    onClickUploader(required,index,title) {
      let type;
      let fileList;
      if (required === '必传') {
        type = 'requiredCertificateList';
        fileList = [this.requiredCertificateList[index].url];
        console.log(fileList);
      }
      if (required === '不必传') {
        type = 'certificateList';
        fileList = [this.certificateList[index].url];
      }

      const obj = {
        fileList:fileList,
        type: type,
        uploadeCount:1,
        uploaderTitle:title
      };
      this.$refs.model.show('Uploader',obj);
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
</style>>
