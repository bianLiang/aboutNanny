<template>
  <div class="max-box">
    <div class="card-box">
      <div style="display: flex;">
        <div class="seize">
          <img v-bind:src="data.headPortraitUrl" alt="" />
        </div>
        <div class="card-content">
          <div>
            <p class="name">{{ data.name }}</p>
          </div>
          <div class="education-box">
            <p class="education">
              <span>学历：</span><span>{{ data.education }}</span>
            </p>
            <p class="genitals">
              <span>属相：</span><span>{{ data.genitals }}</span>
            </p>
          </div>
          <div class="constellation-box">
            <p class="constellation">
              <span>星座：</span><span>{{ data.constellation }}</span>
            </p>
            <p class="nation">
              <span>民族：</span><span>{{ data.nation }}</span>
            </p>
          </div>
          <div class="current-address-box">
            <p class="current-address">
              <span>现居住地址：</span>{{ data.currentAddress }}
            </p>
          </div>
          <div class="age-box">
            <p class="age">
              <span>年龄</span><span>{{ data.age }}</span>
            </p>
            <p class="experiences">
              <span>经验</span><span>{{ data.experiences }}</span>
            </p>
            <p class="native">
              <span>籍贯</span><span>{{ data.native }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="introduce-box">
      <div class="introduce">
        <img
          style="width: 0.44rem;height: 0.44rem;margin-right: 0.05rem;"
          src="../../assets/img/个人 (2).png"
          alt=""
        /><span>自我介绍</span>
      </div>
      <div>
        <p class="introduce-specialty">{{ data.specialty }}</p>
      </div>
      <div>
        <p class="introduce-content">{{ data.introduceContent }}</p>
      </div>
    </div>
    <div class="intention-box">
      <div class="intention">
        <img
          style="width: 0.44rem;height: 0.44rem;margin-right: 0.05rem;"
          src="../../assets/img/定位.png"
          alt=""
        /><span>求职意向</span>
      </div>
      <div class="state-box">
        <p class="state">
          <span>求职状态：</span><span>{{ data.jobStatus }}</span>
        </p>
        <p class="type">
          <span>求职类型：</span><span>{{ data.jobType }}</span>
        </p>
      </div>
      <div class="intended-city-box">
        <p class="intended-city">
          <span>意向城市：</span><span>{{ data.intendedCity }}</span>
        </p>
        <p class="ishome">
          <span>是否住家：</span><span>{{ data.isHome }}</span>
        </p>
      </div>
    </div>
    <div class="experience-box">
      <div class="experience">
        <img
          style="width: 0.44rem;height: 0.44rem;margin-right: 0.05rem;"
          src="../../assets/img/劳动技能.png"
          alt=""
        /><span>从业经历</span>
      </div>
      <div
        v-for="item in data.experience"
        :key="item.experiencetime"
        class="experience_1"
      >
        <p class="experience_1-time">{{ item.experiencetime }}</p>
        <p class="experience_1-content">{{ item.experienceContent }}</p>
      </div>
    </div>
    <div class="personal-display-box">
      <div class="personal-display">
        <img
          style="width: 0.44rem;height: 0.44rem;margin-right: 0.05rem;"
          src="../../assets/img/照片.png"
          alt=""
        /><span>个人展示</span>
      </div>
      <div class="img-box">
        <img
          v-for="(item, key) in data.personalDisplayList_1"
          :key="key"
          class="img"
          :src="item"
          alt=""
          @click="showPersonalDisplay(item, key)"
        />
        <div
          class="mask"
          @click="showPersonalDisplay(data.personalDisplayList_1[8], 8)"
          v-if="data.personalDisplayList.length > 9"
        ></div>
        <span class="push" v-if="data.personalDisplayList.length > 9"
          >+{{ data.personalDisplayList.length }}</span
        >

        <van-popup v-model="isShowPersonalDisplay">
          <v-touch
            v-on:swipeleft="onSwipeLeft"
            v-on:swiperight="onSwipeRight"
            tag="div"
          >
            <div class="isShowPersonalDisplay">
              <span
                >{{ currentPages }}/{{ data.personalDisplayList.length }}</span
              >
              <img style="width:100%;height:100%" :src="showPersonalDisplayUrl" alt="" />
              <!-- <span class="iconfont left">&#xe613;</span>
              <span class="iconfont right">&#xe614;</span> -->
            </div>
          </v-touch>
        </van-popup>
      </div>
    </div>
    <div class="certificate-display-box">
      <div class="certificate-display">
        <img
          style="width: 0.44rem;height: 0.44rem;margin-right: 0.05rem;"
          src="../../assets/img/电子证件.png"
          alt=""
        /><span>证件展示</span>
      </div>
      <div class="img-box">
        <img
          v-for="(item, key) in data.certificateDisplayList_1"
          :key="item"
          class="img"
          :src="item"
          alt=""
          @click="showCertificateDisplay(item, key)"
        />
        <div
          class="mask"
          @click="showCertificateDisplay(data.certificateDisplayList_1[8], 8)"
          v-if="data.certificateDisplayList.length > 9"
        ></div>
        <span class="push" v-if="data.certificateDisplayList.length > 9"
          >+{{ data.certificateDisplayList.length }}</span
        >

        <van-popup v-model="isShowCertificateDisplay">
          <v-touch
            v-on:swipeleft="onSwipeLeft_1"
            v-on:swiperight="onSwipeRight_1"
            tag="div"
          >
            <div class="isShowPersonalDisplay">
              <span
                >{{ currentPages_1 }}/{{
                  data.certificateDisplayList.length
                }}</span
              >
              <img :src="showCertificateDisplayUrl" alt="" />
            </div>
          </v-touch>
        </van-popup>
      </div>
    </div>
    <div class="share" @click="showShare">立即分享</div>
    <van-popup v-model="show" round="true">
      <div class="show-box">
        <img src="../../assets/img/weixin.png" alt="" @click="shareWeChat" />
        <img
          src="../../assets/img/pengyouquan.png"
          alt=""
          @click="shareMoments"
        />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Popup } from "vant";
import wxapi from "@/api/wxapi.js";
export default {
  name: "Details",
  components: {
    [Popup.name]: Popup
  },
  created() {
    // 获取id
    console.log(this.$route.query);
    this.ajax(this.$route.query.ID);
  },
  data() {
    return {
      show: false,
      isShowPersonalDisplay: false,
      showPersonalDisplayUrl: "",
      isShowCertificateDisplay: false,
      showCertificateDisplayUrl: "",
      currentPages: 0,
      currentPages_1: 0,
      data: {}
    };
  },
  mounted() {
    // 调用微信api
    // wxapi.wxRegister(this.wxRegCallback);
  },
  methods: {
    ajax(ID) {
      const that = this;
      axios
        .post("https://api.verycleaner.com/hwWorkerNanny/findById", {
          id: ID
        })
        .then(function(response) {
          console.log(response.data.data);
          that.processingData(response.data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 处理初始数据
    processingData(data) {
      this.data = {
        headPortraitUrl: data.imageWork,
        name: data.name,
        education: data.education,
        genitals: data.genitals,
        constellation: data.constellation,
        nation: data.nation,
        currentAddress: data.address,
        age: `${data.age}岁`,
        experiences: `${data.workWorkingYears}年`,
        native: data.nativePlace,
        specialty: "做饭做家务｜能照顾小孩｜照顾老人",
        introduceContent: data.introduceOneselfTo,
        jobStatus: this.processingjobStatus(data.workWorkingState),
        jobType: data.workHopeJob,
        intendedCity: data.cityName,
        isHome: `${data.isHome === 0 ? "不住家" : "住家"}`,
        experience: data.hwExperienceVos,
        personalDisplayList: data.imageIds,
        personalDisplayList_1: this.processingImgList(data.imageIds),
        certificateDisplayList: data.imagePersonals,
        certificateDisplayList_1: this.processingImgList(data.imagePersonals)
      };
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
    // 判断求职状态
    processingjobStatus(data) {
      if (data === 0) {
        return "待岗";
      }
      if (data === 1) {
        return "已上岗";
      }
      if (data === 2) {
        return "已回老家";
      }
    },
    showShare() {
      this.show = true;
    },
    showPersonalDisplay(url, index) {
      this.showPersonalDisplayUrl = url;
      this.currentPages = index + 1;
      this.isShowPersonalDisplay = true;
    },
    showCertificateDisplay(url, index) {
      this.showCertificateDisplayUrl = url;
      this.currentPages_1 = index + 1;
      this.isShowCertificateDisplay = true;
    },
    onSwipeLeft() {
      if (this.currentPages !== this.data.personalDisplayList.length) {
        this.currentPages = this.currentPages + 1;
        this.showPersonalDisplayUrl = this.data.personalDisplayList[
          this.currentPages - 1
        ];

        console(this.currentPages);
      }
    },
    onSwipeRight() {
      if (this.currentPages !== 1) {
        this.currentPages = this.currentPages - 1;
        this.showPersonalDisplayUrl = this.data.personalDisplayList[
          this.currentPages - 1
        ];
        console(this.currentPages);
      }
    },
    onSwipeLeft_1() {
      if (this.currentPages_1 !== this.data.certificateDisplayList.length) {
        this.currentPages_1 = this.currentPages_1 + 1;
        this.showCertificateDisplayUrl = this.data.certificateDisplayList[
          this.currentPages_1 - 1
        ];
      }
    },
    onSwipeRight_1() {
      if (this.currentPages_1 !== 1) {
        this.currentPages_1 = this.currentPages_1 - 1;
        this.showCertificateDisplayUrl = this.data.certificateDisplayList[
          this.currentPages_1 - 1
        ];
      }
    },
    shareWeChat() {},
    shareMoments() {
      console.log("点击了");
      this.wxShareTimeline();
    },
    // 调用微信api
    // wxRegCallback() {
    //   // 用于微信JS-SDK回调
    //   this.wxShareTimeline();
    //   this.wxShareAppMessage();
    // },
    wxShareTimeline() {
      // 微信自定义分享到朋友圈
      let option = {
        title: "限时团购周 挑战最低价", // 分享标题, 请自行替换
        link: window.location.href.split("#")[0], // 分享链接，根据自身项目决定是否需要split
        imgUrl: "logo.png", // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("已取消分享");
        }
      };
      // 将配置注入通用方法
      // wxapi.ShareTimeline(option);
      wxapi.wxRegister(option);
    },
    wxShareAppMessage() {
      // 微信自定义分享给朋友
      let option = {
        title: "限时团购周 挑战最低价", // 分享标题, 请自行替换
        desc: "限时团购周 挑战最低价", // 分享描述, 请自行替换
        link: window.location.href.split("#")[0], // 分享链接，根据自身项目决定是否需要split
        imgUrl: "logo.png", // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("已取消分享");
        }
      };
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option);
    }
  }
};
</script>
<style scoped>
.max-box {
  background: #f5f5f5;
  margin-top: 1rem;
}
.card-box {
  background: #fff;
  width: 90%;
  height: 3.45rem;
  border-radius: 0.16rem;
  position: relative;
  top: 0.4rem;
  left: 50%;
  margin-left: -45%;
  padding: 0.2rem;
  box-shadow: 0px 10px 20px 0px rgba(85, 85, 85, 0.1);
}
.seize {
  width: 1.7rem;
  height: 2.27rem;
  display: flex;
  margin-right: 0.2rem;
}
.name {
  color: #333333;
  font-size: 0.32rem;
  font-weight: 600;
}
.education,
.genitals,
.constellation,
.nation,
.current-address,
.age,
.experiences,
.native {
  font-size: 0.28rem;
}
.education,
.constellation {
  width: 2rem;
}
.age,
.experiences,
.native {
  margin-right: 0.2rem;
}
.education-box,
.constellation-box,
.age-box {
  display: flex;
}
.introduce-box {
  background: #fff;
  padding: 1rem 0.3rem 0.5rem;
}
.intention-box,
.experience-box,
.personal-display-box,
.certificate-display-box {
  background: #fff;
  padding: 0.5rem;
  margin: 0.4rem 0;
}
.introduce,
.intention,
.experience,
.personal-display,
.certificate-display {
  color: #3395ff;
  font-size: 0.32rem;
  display: flex;
  height: 0.44rem;
  line-height: 0.44rem;
}
.introduce-specialty,
.introduce-content {
  color: #333333;
  font-size: 0.28rem;
}
.introduce-specialty {
  margin: 0.25rem 0;
}
.state-box,
.intended-city-box {
  display: flex;
  margin: 0.2rem 0;
}
.state,
.type,
.intended-city,
.ishome {
  font-size: 0.28rem;
}
.state,
.intended-city {
  width: 2.5rem;
}
.experience_1 {
  margin: 0.25rem 0;
}
.experience_1-time,
.experience_1-content {
  font-size: 0.28rem;
}
.share {
  width: 6.9rem;
  height: 0.78rem;
  line-height: 0.78rem;
  background: rgba(51, 149, 255, 1);
  border-radius: 0.08rem;
  font-size: 0.32rem;
  text-align: center;
  margin: 0 auto 0.2rem;
  color: #fff;
  font-weight: 600;
}
.education span:first-child,
.genitals span:first-child,
.constellation span:first-child,
.nation span:first-child,
.current-address span:first-child,
.age span:first-child,
.experiences span:first-child,
.native span:first-child,
.state span:first-child,
.type span:first-child,
.intended-city span:first-child,
.ishome span:first-child {
  color: #555555;
}
.education span:last-child,
.genitals span:last-child,
.constellation span:last-child,
.nation span:last-child,
.current-address span:last-child,
.age span:last-child,
.experiences span:last-child,
.native span:last-child,
.state span:last-child,
.type span:last-child,
.intended-city span:last-child,
.ishome span:last-child {
  color: #333333;
}
.education-box,
.constellation-box,
.current-address-box,
.age-box {
  margin: 0.2rem 0;
}
.img-box {
  margin: 0.3rem 0;
  position: relative;
}
.img {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 8px;
  margin-right: 0.05rem;
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
.push {
  position: absolute;
  font-size: 0.4rem;
  color: #fff;
  bottom: 1.1rem;
  right: 0.9rem;
}
.show-box {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
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
.left {
  position: absolute;
  top: 50%;
  margin-top: -0.5rem;
  left: 0;
  height: 1rem;
  width: 1rem;
  display: inline-block;
  color: #fff;
}
.right {
  position: absolute;
  top: 50%;
  margin-top: -0.5rem;
  right: 0;
  height: 1rem;
  width: 1rem;
  display: inline-block;
  color: #fff;
}
</style>
