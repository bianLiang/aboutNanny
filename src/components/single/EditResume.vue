<template>
  <div class="edit-box">
    <div class="teacher-max-box">
      <div class="teacher-box">
        <span class="teacher">家政老师</span>
        <span class="push" @click="onTeacher">{{company? teacherTitle='去修改' : teacherTitle='去添加'}}<span class="iconfont">&#xe614;</span></span>
      </div>
      <div v-if="company? true: false">
        <p class="paragraph">家政公司：{{company}}</p>
        <p class="paragraph">老师手机号：{{phone}}</p>
      </div>
    </div>
    <div class="head-url-box">
      <div class="head-box">
        <div class="seize" :style="{backgroundImage: 'url(' + (headPortraitUrl ? headPortraitUrl : require('../../assets/img/touxiang.png')) + ')',backgroundPosition:'center',backgroundSize: 'cover',backgroundRepeat:'no-repeat'}"></div>
        <div class="head-content">
          <p>{{name?name:'姓名'}}<span @click="onBasicInformation">{{name? nameTitle='去修改' : nameTitle='去添加'}}<span class="iconfont">&#xe614;</span></span></p>
          <p><span style="width:2.5rem;display: inline-block;">学历：{{education?education: '无'}}</span><span>属相：{{genitals? genitals:'无'}}</span></p>
          <p><span style="width:2.5rem;display: inline-block;">民族：{{nation? nation: '无'}}</span><span>星座：{{constellation?constellation:'无'}}</span></p>
          <p><span>年龄 {{age?age: 0}}岁</span>&nbsp;&nbsp;&nbsp;<span>{{native? native:'无人'}}</span>&nbsp;&nbsp;&nbsp;<span>工作 {{experiences?experiences: 0}}年</span></p>
        </div>
      </div>
    </div>
    <div class="specialty-max-box">
      <div class="teacher-box">
        <span class="teacher">特长优点</span>
        <span class="push" @click="onSpecialty">{{specialtyList.length>0? specialtyTitle='去修改' : specialtyTitle='去添加'}}<span class="iconfont">&#xe614;</span></span>
      </div>
      <div v-if="specialtyList.length>0">
        <div class="specialty-box">
          <p style="font-size: 0.32rem;color: #666;margin-top: 0.3rem;">{{specialtyList[0].title}}</p>
          <div class="specialty-item" v-for="(item,index) in specialtyList[0].list" :key="index">{{item}}</div>
        </div>
        <div class="specialty-box">
          <p style="font-size: 0.32rem;color: #666;margin-top: 0.3rem;">{{specialtyList[1].title}}</p>
          <div class="specialty-item" v-for="(item,index) in specialtyList[1].list" :key="index">{{item}}</div>
        </div>
        <div class="specialty-box">
          <p style="font-size: 0.32rem;color: #666;margin-top: 0.3rem;">{{specialtyList[2].title}}</p>
          <div class="specialty-item" v-for="(item,index) in specialtyList[2].list" :key="index">{{item}}</div>
        </div>
        <div class="specialty-box">
          <p style="font-size: 0.32rem;color: #666;margin-top: 0.3rem;">{{specialtyList[3].title}}</p>
          <div class="specialty-item" v-for="(item,index) in specialtyList[3].list" :key="index">{{item}}</div>
        </div>
        <div class="specialty-box">
          <p style="font-size: 0.32rem;color: #666;margin-top: 0.3rem;">{{specialtyList[4].title}}</p>
          <div class="specialty-item" v-for="(item,index) in specialtyList[4].list" :key="index">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="teacher-max-box">
      <div class="teacher-box">
        <span class="teacher">求职意向</span>
        <span class="push" @click="onJobintension">{{jobType? jobTypeTitle='去修改' : jobTypeTitle='去添加'}}<span class="iconfont">&#xe614;</span></span>
      </div>
      <div v-if="jobType? true: false">
        <p class="paragraph">求职类型：{{jobType}}</p>
        <!-- <p class="paragraph">是否住家：{{isHome}}</p> -->
        <p class="paragraph">求职内容：{{jobSearchCategory.toString()}}</p>
        <p class="paragraph">期望薪资：{{salaryExpectation.join("-")}}</p>
        <p class="paragraph">现住地址：{{currentAddress}}</p>
      </div>
    </div>
    <div class="teacher-max-box">
      <div class="teacher-box">
        <span class="teacher">工作经验</span>
        <span class="push" @click="onExperience('去添加')">去添加<span class="iconfont">&#xe614;</span></span>
      </div>
      <div v-for="(item, index) in experiencesList" :key="index" class="experiences-box">
        <p class="experiences-time">{{item.type}} {{item.startTime.join(".") }}~{{item.endTime.join(".")}}</p>
        <p class="experiences-content"><span>{{item.experienceContent}}</span><span class="iconfont" @click="onExperience('去修改', index)">&#xe614;</span></p>
      </div>
    </div>
    <div class="certificate-max-box">
      <div class="teacher-box">
        <span class="teacher">证件证书</span>
        <span class="push">去添加<span class="iconfont">&#xe614;</span></span>
      </div>
      <div class="certificate-box">
        <div v-for="(item,index) in certificateList" :key="index" class="certificate-icon">
          <span class="iconfont" v-bind:class="{ icon: item.url? true: false,icon_1: item.url? false: true}">&#xe658;</span>
          <span v-bind:class="{ icon_3: item.url? true: false,icon_2: item.url? false: true}">{{item.text}}</span>
        </div>
      </div>
    </div>
    <div class="personal-max-box">
      <div class="teacher-box">
        <span class="teacher">个人展示</span>
        <span class="push">去添加<span class="iconfont">&#xe614;</span></span>
      </div>
      <div class="img-box">
        <div @click="showPersonalDisplay(item, key)" v-for="(item, key) in personalDisplayList_1" :key="key" class="img"  :style="{backgroundImage: 'url(' + (item) + ')',backgroundPosition:'center',backgroundSize: 'cover',backgroundRepeat:'no-repeat'}">
        </div>
        <div
          class="mask"
          @click="showPersonalDisplay(personalDisplayList_1[8], 8)"
          v-if="personalDisplayList.length > 9"
        ></div>
        <span @click="showPersonalDisplay(personalDisplayList_1[8], 8)" class="push_1" v-if="personalDisplayList.length > 9"
          >+{{ personalDisplayList.length }}</span
        >

        <van-popup v-model="isShowPersonalDisplay">
          <v-touch
            v-on:swipeleft="onSwipeLeft"
            v-on:swiperight="onSwipeRight"
            tag="div"
          >
            <div class="isShowPersonalDisplay">
              <span
                >{{ currentPages }}/{{ personalDisplayList.length }}</span
              >
              <img style="width:100%;height:100%" :src="showPersonalDisplayUrl" alt="" />
            </div>
          </v-touch>
        </van-popup>
      </div>
    </div>
    <div class="introduce-max-box">
      <div class="teacher-box">
        <span class="teacher">自我介绍</span>
        <span class="push">{{introduceContent? introduceTitle='去修改' : introduceTitle='去添加'}}<span class="iconfont">&#xe614;</span></span>
      </div>
      <div v-if="introduceContent? true: false">
        <p>{{introduceContent}}</p>
      </div>
    </div>
    <div class="foot">
      <div>提交简历</div>
      <div>预览简历</div>
    </div>
  </div>
</template>
<script>
import { Popup } from "vant";
export default {
  name:"EditResume",
  components: {
    [Popup.name]: Popup
  },
  created () {
    this.setData(JSON.parse(sessionStorage.getItem('Teacher')));
    this.setData(JSON.parse(sessionStorage.getItem('BasicInformation')));
    this.setData(JSON.parse(sessionStorage.getItem('Specialty')));
    this.setData(JSON.parse(sessionStorage.getItem('Jobintension')));
    this.setData(JSON.parse(sessionStorage.getItem('Experience')));
  },
  data() {
    return {
      teacherTitle:'去添加',
      nameTitle: '去添加',
      jobTypeTitle: '去添加',
      experiencesTitle: '去添加',
      introduceTitle:'去添加',
      specialtyTitle:'去添加',
      introduceContent:'这是一段很长的自我介绍，这是一段很长的自我介绍，这是一段很长的自我介绍。',
      company:'',
      phone:'',
      headPortraitUrl:'',
      name:'李华',
      education:'高中',
      genitals:'狗',
      constellation:'射手',
      nation:'汉',
      age:35,
      native:'安徽省',
      experiences: 5,
      jobType:'保姆-不住家',
      isHome: '是',
      jobSearchCategory: ['做家务'],
      salaryExpectation: ["5k","6K"],
      rest: '双休',
      currentAddress: '朝阳欢乐谷',
      jobState: '待岗',
      idCard:'342623199412018513',
      gender:'男',
      marriage: 0,
      positiveUrl:'',
      backUrl:'',
      experiencesList:[
        {type:'保姆',startTime:['2017','05'],endTime:['2019','08'],experienceContent:'从事保姆工作，打扫90平以下两室一厅'},
        {type:'月嫂',startTime:['2017','05'],endTime:['2019','08'],experienceContent:'从事保姆工作，打扫90平以下两室一厅'},
      ],
      certificateList:[
        {text:'身份证', url:'aca'},
        {text:'母婴护理师', url:''},
        {text:'育儿师', url:''},
        {text:'厨师证', url:''},
        {text:'乙肝五项', url:''},
        {text:'营养师证', url:''},
        {text:'护士证', url:''},
        {text:'教师证', url:''}
      ],
      personalDisplayList:[
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian1.jpg'),
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian1.jpg'),
        require('../../assets/img/tupian.jpg'),
        ],
      personalDisplayList_1:[
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian1.jpg'),
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian.jpg'),
        require('../../assets/img/tupian1.jpg')
        ],
      showPersonalDisplayUrl: '',
      currentPages: 0,
      isShowPersonalDisplay: false,
      specialtyList:[
        {title:'做饭', list:['广东菜']},
        {title:'照顾小孩', list:['0至1岁','1至3岁','接送小孩']},
        {title:'照顾老人', list:['自理老人']},
        {title:'照顾宠物', list:['狗']},
        {title:'其他', list:['营养搭配','衣物保养','开车','英语','照顾病人']}
      ]
    }
  },
  methods: {
    onTeacher() {
      this.$router.push({
        name: "Teacher",
        query: {
          company: this.company,
          phone:this.phone
        }
      });
    },
    onBasicInformation () {
      this.$router.push({
        name: "BasicInformation",
        query: {
          headPortraitUrl: this.headPortraitUrl,
          name: this.name,
          education:this.education,
          genitals:this.genitals,
          nation:this.nation,
          constellation:this.constellation,
          age:this.age,
          native: this.native,
          experiences:this.experiences,
          phone: this.phone,
          idCard: this.idCard,
          gender: this.gender,
          marriage:this.marriage,
          positiveUrl:this.positiveUrl,
          backUrl:this.backUrl
        }
      });
    },
    // 处理保存上来的数据
    setData (data) {
      for(let key in data) {
        this[key] = data[key];
      }
    },
     // 截取10条图片
    processingImgList(data) {
      if (data.length > 9) {
        const list = [];
        for (let i = 0; i < 9; i++) {
          list.push(data[i]);
        }
        return list;
      } else {
        return data;
      }
    },
    showPersonalDisplay(url, index) {
      this.showPersonalDisplayUrl = url;
      this.currentPages = index + 1;
      this.isShowPersonalDisplay = true;
    },
    onSwipeLeft() {
      if (this.currentPages !== this.personalDisplayList.length) {
        this.currentPages = this.currentPages + 1;
        this.showPersonalDisplayUrl = this.personalDisplayList[
          this.currentPages - 1
        ];
      }
    },
    onSwipeRight() {
      if (this.currentPages !== 1) {
        this.currentPages = this.currentPages - 1;
        this.showPersonalDisplayUrl = this.personalDisplayList[
          this.currentPages - 1
        ];
      }
    },
     onSpecialty() {
      this.$router.push({
        name: "Specialty",
        query: {
          specialtyList: this.specialtyList
        }
      });
    },
     onJobintension() {
      this.$router.push({
        name: "Jobintension",
        query: {
          jobType: this.jobType,
          jobSearchCategory: this.jobSearchCategory,
          salaryExpectation: this.salaryExpectation,
          rest: this.rest,
          currentAddress:this.currentAddress,
          jobState:this.jobState,
        }
      });
    },
    onExperience(title, index) {
      let data;
      let type;
      if (title === '去添加') {
        // data = {type:'',startTime:[],endTime:[],experienceContent:''};
        type = '添加工作经验';
        this.$emit('changeTitle',type);
      } else if (title === '去修改') {
        // data = this.experiencesList[index];
        type = '修改工作经验';
        this.$emit('changeTitle',type);
      }
      this.$router.push({
        name: "Experience",
        query: {
          experiencesList: this.experiencesList,
          index:index,
          type:type
        }
      });
    }
  }
}
</script>
<style scoped>
  .teacher-max-box {
    background: #fff;
    margin: 0.3rem 0;
    padding: 0.2rem;
  }
  .edit-box{
    margin-top: 1rem;
    background: #eee;
    height: 100%;
    border: 0.01rem solid rgba(0,0,0,0);
  }
  .teacher-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
  }
  .teacher {
    font-size: 0.36rem;
    color: #000;
    font-weight: 600;
  }
  .push {
    font-size: 0.3rem;
    color: #3395FF;
  }
  .paragraph {
    font-size: 0.32rem;
    color: #666;
    line-height: 0.6rem;
    text-indent:0.5em
  }
  .head-url-box {
    background: #fff;
    padding: 0.2rem;
  }
  .seize {
    width: 1.7rem;
    height: 2.27rem;
    display: flex;
    margin-right: 0.2rem;
  }
  .head-box {
    display: flex;
  }
  .head-content {
    width: 80%;
  }
  .head-content p {
    font-size: 0.3rem;
    color: #666;
    line-height: 0.6rem;
  }
  .head-content p:first-child {
    font-weight: 600;
    color: #000;
    font-size: 0.36rem;
    display: flex;
    justify-content: space-between;
  }
  .head-content p:first-child span{
    color: #3395FF;
    font-weight: 400;
    font-size: 0.3rem;
  }
  .teacher-max-box {
    background: #fff;
  }
  .experiences-time {
    font-size: 0.36rem;
    color: #000;
    text-indent:0.5em;
    font-weight: 600;
  }
  .experiences-content {
    font-size: 0.32rem;
    color: #666;
    text-indent:0.5em;
    display: flex;
    justify-content: space-between;
  }
  .experiences-box {
    margin: 0.3rem 0;
  }
  .certificate-max-box {
    background: #fff;
    padding: 0.2rem;
  }
  .certificate-box {
    display: flex;
    flex-wrap:wrap;
  }
  .certificate-icon {
    display: flex;
    flex-direction:column;
    align-items: center;
    margin: 0 0.05rem;
    width: 1.6rem;
  }
  .icon_1 {
    font-size: 1rem;
    color: #666;
  }
  .icon {
    font-size: 1rem;
    color: #3395ff;
  }
  .icon_2 {
    font-size: 0.3rem;
    color: #666;
  }
  .icon_3 {
    font-size: 0.3rem;
    color: #3395ff;
  }
  .personal-max-box {
    background: #fff;
    padding: 0.2rem;
    margin: 0.3rem 0;
  }
  .img-box {
    margin: 0.3rem 0;
    position: relative;
    width: 6.55rem;
    margin: 0 auto;
  }
  .img {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 8px;
  margin-right: 0.05rem;
  display: inline-block;
}
.mask {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0.2rem;
  right: 0.1rem;
  z-index: 200;
}
.push_1 {
  position: absolute;
  font-size: 0.4rem;
  color: #fff;
  bottom: 1.1rem;
  right: 0.9rem;
}
.isShowPersonalDisplay {
  display: flex;
  position: relative;
}
.van-popup--cente, .van-popup {
  width: 100%;
}
.isShowPersonalDisplay span:first-child {
  position: absolute;
  top: 0;
  color: #fff;
  font-size: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
}
.introduce-max-box {
  background: #fff;
  padding: 0.2rem;
}
.introduce-max-box p {
  color: #666;
  font-size: 0.32rem;
}
.foot {
  display: flex;
  background: #fff;
  margin-top: 0.2rem;
  padding: 0.2rem;
  justify-content: center;
}
.foot div:first-child {
  font-size: 0.32rem;
  color: #000;
  border: 0.01rem solid #000;
  width: 2.8rem;
  border-radius: 1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  margin: 0 0.2rem;
}
.foot div:last-child {
  font-size: 0.32rem;
  color: #fff;
  width: 2.8rem;
  background: #3395FF;
  border-radius: 1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  margin: 0 0.2rem;
}
.specialty-max-box {
  background: #fff;
  padding: 0.2rem;
  margin-top: 0.2rem;
}
.specialty-box {
  line-height: 0.3rem;
}
.specialty-item {
  font-size: 0.2rem;
  color: #3395FF;
  width: 1.5rem;
  margin: 0 0.1rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border: 0.02rem solid #3395FF;
  border-radius: 0.1rem;
  text-align: center;
  display: inline-block;
}
</style>
