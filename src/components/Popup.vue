<template>
  <div>
    <!-- 身份证上传 -->
    <van-popup
      v-model="showIdCard"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <div class="box">
        <div class="id-card-max-box">
          <p class="title" style="margin-bottom:0.2rem">身份证照片</p>
          <div class="id-card-box">
            <div style="position: relative;">
              <van-uploader :after-read="uploaderPositive">
                <div class="id-card-item">
                  <img
                    style="width: 0.6rem;"
                    src="../assets/img/camera.png"
                    alt=""
                  />
                  <p style="color:#000;font-size:0.28rem;">
                    点击拍摄/上传人像面
                  </p>
                </div>
              </van-uploader>
              <div
                v-if="positiveUrl ? true : false"
                style="position: absolute;top: 0;left: 0.2rem;"
              >
                <div
                  class="seize"
                  :style="{
                    backgroundImage: 'url(' + positiveUrl + ')',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }"
                ></div>
                <img
                  @click="closePositive"
                  style="position: absolute;right: -0.3rem;top: -0.3rem;width: 0.5rem;"
                  src="../assets/img/close.png"
                  alt=""
                />
              </div>
            </div>
            <div style="position: relative;">
              <van-uploader :after-read="uploaderBack">
                <div class="id-card-item">
                  <img
                    style="width: 0.6rem;"
                    src="../assets/img/camera.png"
                    alt=""
                  />
                  <p style="color:#000;font-size:0.28rem;">
                    点击拍摄/上传国徽面
                  </p>
                </div>
              </van-uploader>
              <div
                v-if="backUrl ? true : false"
                style="position: absolute;top: 0;left: 0.2rem;"
              >
                <div
                  class="seize"
                  :style="{
                    backgroundImage: 'url(' + backUrl + ')',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }"
                ></div>
                <img
                  @click="closeBack"
                  style="position: absolute;right: -0.3rem;top: -0.3rem;width: 0.5rem;"
                  src="../assets/img/close.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <p v-if="isPhotoError" style="color:red;font-size:0.2rem;">{{photoErrorMsg}}</p>
        </div>
        <div style='margin: 0.2rem 0;'>
          <van-form @submit="onSubmit">
            <van-field
              v-model="idCard"
              name="idCard"
              label="身份证号"
              placeholder="身份证号"
              size='large'
              input-align='right'
              :rules="[{ required: true, message: '请填写身份证号' }]"
            />
            <van-field
              v-model="name"
              name="name"
              label="姓名"
              placeholder="姓名"
              size='large'
              input-align='right'
              :rules="[{ required: true, message: '请正确填写姓名' }]"
            />
            <van-field
              v-model="gender"
              name="gender"
              label="性别"
              placeholder="性别"
              size='large'
              input-align='right'
              :rules="[{ required: true, message: '请正确填写性别' }]"
            />
            <van-field
              v-model="age"
              name="age"
              label="年龄"
              placeholder="年龄"
              size='large'
              input-align='right'
              :rules="[{ required: true, message: '请正确填写年龄' }]"
            />
            <div class="submit-box">
              <van-button round block type="info" native-type="submit">
                保存
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-popup>
    <!-- 籍贯 -->
    <van-popup v-model="showNative" position="bottom">
      <van-picker
        show-toolbar
        title="籍贯"
        :default-index= indexNative
        :columns="columnsNative"
        @confirm="onConfirmNative"
        @cancel="showNative = false"
      />
    </van-popup>
    <!-- 学历 -->
    <van-popup v-model="showEducation" position="bottom">
      <van-picker
        show-toolbar
        title="学历"
        :default-index= indexEducation
        :columns="columnsEducation"
        @confirm="onConfirmEducation"
        @cancel="showEducation = false"
      />
    </van-popup>
    <!-- 民族 -->
    <van-popup v-model="showNation" position="bottom">
      <van-picker
        show-toolbar
        title="民族"
        :default-index= indexNation
        :columns="columnsNation"
        @confirm="onConfirmNation"
        @cancel="showNation = false"
      />
    </van-popup>
    <!-- 婚姻状况 -->
    <van-popup v-model="showMarriage" position="bottom">
      <van-picker
        show-toolbar
        title="婚姻状况"
        :default-index= indexMarriage
        :columns="columnsMarriage"
        @confirm="onConfirmMarriage"
        @cancel="showMarriage = false"
      />
    </van-popup>
    <!-- 从业经验 -->
    <van-popup v-model="showExperiences" position="bottom">
      <van-picker
        show-toolbar
        title="从业经验"
        :default-index= indexExperiencese
        :columns="columnsExperiences"
        @confirm="onConfirmExperiences"
        @cancel="showExperiences = false"
      />
    </van-popup>
    <!-- 有点特长,通用多选 -->
    <van-popup v-model="showSpecialty" :style="{ height: '50%' }" position="bottom">
      <div>
        <p class="popup-title"><span @click="cancelSelect" style="font-size:0.3rem;margin-left: 0.5rem;">取消</span><span style="font-size:0.36rem;font-weight: 600;">{{title}}</span><span style="font-size:0.3rem;margin-right: 0.5rem;" @click="okSelect">确定</span></p>
        <van-checkbox-group style="padding: 0 0.5rem;" v-model="checkResult" direction="horizontal">
          <van-checkbox v-for="item in result" :key="item" shape="square" :name="item" style="font-size:0.3rem;width: 2.1rem;margin: 0.2rem 0;">{{item}}</van-checkbox>
        </van-checkbox-group>
      </div>
    </van-popup>
     <!-- 通用单选 -->
    <van-popup v-model="showRadio" position="bottom">
      <van-picker
        show-toolbar
        :title=titleRadio
        :default-index= indexRadio
        :columns="columnsRadio"
        @confirm="onConfirmRadio"
        @cancel="showRadio = false"
      />
    </van-popup>
    <!-- 通用文本输入 -->
    <van-popup style="background: #eee;" v-model="showText" :style="{ height: '50%' }" position="bottom">
      <p class="popup-title"><span @click="cancelText" style="font-size:0.3rem;margin-left: 0.5rem;">取消</span><span style="font-size:0.36rem;font-weight: 600;">{{labelText}}</span><span style="font-size:0.3rem;margin-right: 0.5rem;" @click="okText">确定</span></p>
      <van-cell-group>
        <van-field v-model="valueText" :label="labelText" :placeholder="placeholderText" />
      </van-cell-group>
    </van-popup>
    <!-- 通用上传 -->
    <van-popup style="background: #eee;" v-model="showUploader" :style="{ height: '80%' }" position="bottom">
      <div style="background: #fff;padding: 0.2rem;">
        <p style="margin: 0.2rem 0;font-size:0.36rem;color:#000;font-weight: 600;">{{uploaderTitle}}</p>
        <van-uploader v-model="fileList" multiple :max-count="uploadeCount" />
      </div>
      <div class="foot">
        <van-button round block type="info" @click="confirmUpload">保存</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import areaList from '../api/area.js'
import { Popup, Uploader,Button,Form,Field,Picker,Checkbox, CheckboxGroup} from "vant";
export default {
  name: "Popup",
  components: {
    [Popup.name]: Popup,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  data() {
    return {
      uploadeCount:1,
      fileList:[],
      uploaderTitle:'',
      showUploader:false,
      showText:false,
      valueText: '',
      labelText:'文本',
      placeholderText: '请输入',
      titleRadio: '标题',
      showRadio:false,
      indexRadio:false,
      columnsRadio:[],
      type: '',
      showIdCard: false,
      isPhotoError: false,
      photoErrorMsg:'',
      positiveUrl: '',
      backUrl: '',
      idCard: "",
      name: "",
      gender: "",
      age: "",
      columnsNative: [
        '北京市',
        '天津市',
        '河北省',
        '山西省',
        '内蒙古自治区',
        '辽宁省',
        '吉林省',
        '黑龙江省',
        '上海市',
        '江苏省',
        '浙江省',
        '安徽省',
        '福建省',
        '江西省',
        '山东省',
        '河南省',
        '湖北省',
        '湖南省',
        '广东省',
        '广西壮族自治区',
        '海南省',
        '重庆市',
        '四川省',
        '贵州省',
        '云南省',
        '西藏自治区',
        '陕西省',
        '甘肃省',
        '青海省',
        '宁夏回族自治区',
        '新疆维吾尔自治区',
        '台湾省',
        '香港特别行政区',
        '澳门特别行政区',
        '海外'
      ],
      indexNative:0,
      showNative:false,
      indexEducation:0,
      showEducation:false,
      columnsEducation:[
        '小学',
        '初中',
        '高中',
        '大专',
        '本科',
        '研究生'
      ],
      indexMarriage:0,
      showMarriage:false,
      columnsMarriage:[
        '已婚',
        '未婚'
      ],
      indexExperiencese:0,
      showExperiences:false,
      columnsExperiences:[
        '0年',
        '1年',
        '2年',
        '3年',
        '4年',
        '5年',
        '6年',
        '7年',
        '8年',
        '9年',
        '10年',
        '11年',
        '12年',
        '13年',
        '14年',
        '15年',
        '16年',
        '17年',
        '18年',
        '19年',
        '20年'
      ],
      indexNation :0,
      showNation :false,
      columnsNation :[
        '汉族',
        '蒙古族',
        '回族',
        '藏族',
        '维吾尔族',
        '苗族',
        '彝族',
        '壮族',
        '布依族',
        '朝鲜族',
        '满族',
        '侗族',
        '瑶族',
        '白族',
        '土家族',
        '哈尼族',
        '哈萨克族',
        '傣族',
        '黎族',
        '傈僳族',
        '佤族',
        '畲族',
        '高山族',
        '拉祜族',
        '水族',
        '东乡族',
        '纳西族',
        '景颇族',
        '柯尔克孜族',
        '土族',
        '达翰尔族',
        '么佬族',
        '羌族',
        '布朗族',
        '撒拉族',
        '毛南族',
        '仡佬族',
        '锡伯族',
        '阿昌族',
        '普米族',
        '塔吉克族',
        '怒族',
        '乌孜别克族',
        '俄罗斯族',
        '鄂温克族',
        '德昂族',
        '保安族',
        '裕固族',
        '京族',
        '塔塔尔族',
        '独龙族',
        '鄂伦春族',
        '赫哲族',
        '门巴族',
        '珞巴族',
        '基诺族'
      ],
      showSpecialty:false,
      result:[],
      checkResult:[],
      title:'标题'
    };
  },
  methods: {
    show(type, options) {
      if (type === "showIdCard") {
        this.positiveUrl = options.positiveUrl;
        this.backUrl = options.backUrl;
        this.idCard = options.idCard;
        this.name = options.name;
        this.gender = options.gender;
        this.age = options.age;
        this.showIdCard = true;
      } else if (type === 'showNative') {
        this.indexNative = options.value;
        this.showNative = true;
      } else if (type === 'showEducation') {
        this.indexEducation = options.value;
        this.showEducation = true;
      } else if (type === 'showNation') {
         this.indexNation = options.value;
        this.showNation = true;
      } else if (type === 'showMarriage') {
        this.indexMarriage = options.value;
        this.showMarriage = true;
      } else if (type === 'showExperiences') {
        this.indexExperiences = options.value;
        this.showExperiences = true;
      } else if (type === 'checkbox') {
        this.result = options.result;
        this.checkResult = options.checkResult;
        this.title = options.title;
        this.showSpecialty = true;
      } else if (type === 'Radio') {
        this.titleRadio = options.titleRadio;
        this.columnsRadio = options.columnsRadio;
        this.type = options.type;
        this.showRadio = true;
      } else if (type === 'text') {
        this.valueText=options.valueText;
        this.labelText = options.labelText;
        this.placeholderText = options.placeholderText;
        this.type = options.type;
        this.showText = true;
      } else if (type === 'Uploader') {
        this.type = options.type;
        this.fileList = options.fileList;
        this.uploadeCount = options.uploadeCount;
        this.uploaderTitle = options.uploaderTitle;
        this.showUploader = true;
      }
    },
    uploaderPositive(file) {
      this.positiveUrl = file.content;
      if (this.backUrl === '') {
        this.photoErrorMsg = '请上传身份证背面照片';
      } else {
        this.isPhotoError = false;
      }
    },
    uploaderBack(file) {
      this.backUrl = file.content;
       if (this.positiveUrl === '') {
        this.photoErrorMsg = '请上传身份证正面照片';
      } else {
        this.isPhotoError = false;
      }
    },
    closePositive() {
      this.positiveUrl = "";
    },
    closeBack() {
      this.backUrl = "";
    },
    onSubmit(values) {
      if (this.backUrl === '') {
        this.photoErrorMsg = '请上传身份证背面照片';
        this.isPhotoError = true;
      } else if(this.positiveUrl === '') {
        this.photoErrorMsg = '请上传身份证正面照片';
        this.isPhotoError = true;
      } else {
        const data = {
          positiveUrl: this.positiveUrl,
          backUrl: this.backUrl,
          idCard: this.idCard,
          name: this.name,
          gender: this.gender,
          age: this.age
        };
        this.$emit('getData',data)
        this.showIdCard = false;
      }

    },
    onConfirmNative(value) {
      const data = {native:value};
      this.$emit('getData',data)
      this.showNative = false;
    },
    onConfirmEducation(value) {
      const data = {education:value};
      this.$emit('getData',data)
      this.showEducation = false;
    },
    onConfirmNation(value) {
      const data = {nation:value};
      this.$emit('getData',data)
      this.showNation = false;
    },
    onConfirmMarriage(value) {
      const data = {marriage:value==='已婚'? 0:1};
      this.$emit('getData',data)
      this.showMarriage = false;
    },
    onConfirmExperiences(value) {
      const data = {experiences:parseInt(value)};
      this.$emit('getData',data)
      this.showExperiences = false;
    },
    onConfirmRadio(value) {
      const data = {key: this.type,value:value};
      this.$emit('getData',data);
      this.showRadio = false;
    },
    cancelSelect() {
      this.showSpecialty = false;
    },
    okSelect() {
      const data = {checkResult:this.checkResult}
      this.$emit('getData',data)
      this.showSpecialty = false;
    },
    cancelText() {
      this.showText = false;
    },
    okText() {
      const data = {key: this.type,value:this.valueText};
      this.$emit('getData',data);
      this.showText = false;
    },
    confirmUpload() {
      this.showUploader = false;
    }
  }
};
</script>
<style scoped>
.box {
  height: 100%;
  width: 100%;
  background: #eee;
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
.id-card-max-box {
  background: #fff;
  padding: 0.3rem;
}
.id-card-box {
  display: flex;
  justify-content: center;
}
.id-card-item {
  text-align: center;
  width: 3.3rem;
  height: 2rem;
  margin: 0 0.2rem;
  background: #eee;
  border-radius: 0.1rem;
}
.seize {
  width: 3.3rem;
  height: 2rem;
  border-radius: 0.1rem;
}
.submit-box {
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
.popup-title {
  display: flex;
  justify-content: space-between;
  line-height: 0.2rem;
  margin: 0.5rem 0;
  padding-bottom: 0.3rem;
  border-bottom: 0.01rem solid #ccc;
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
