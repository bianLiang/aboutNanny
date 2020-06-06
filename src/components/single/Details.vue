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
          style="width: 0.44rem;margin-right: 0.05rem;"
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
          style="width: 0.44rem;margin-right: 0.05rem;"
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
          style="width: 0.44rem;margin-right: 0.05rem;"
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
          style="width: 0.44rem;margin-right: 0.05rem;"
          src="../../assets/img/照片.png"
          alt=""
        /><span>个人展示</span>
      </div>
      <div class="img-box">
        <img
          v-for="(item, key) in data.personalDisplayList"
          :key="key"
          class="img"
          :src="item"
          alt=""
          @click="showPersonalDisplay(item, key)"
        />
        <div
          v-if="data.personalDisplayList.length > 9"
          class="img push"
          :style="{
            backgroundImage: 'url(' + data.personalDisplayList[9] + ')'
          }"
        >
          <span>+{{ data.personalDisplayList.length }}</span>
        </div>
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
              <img :src="showPersonalDisplayUrl" alt="" />
            </div>
          </v-touch>
        </van-popup>
      </div>
    </div>
    <div class="certificate-display-box">
      <div class="certificate-display">
        <img
          style="width: 0.44rem;margin-right: 0.05rem;"
          src="../../assets/img/电子证件.png"
          alt=""
        /><span>证件展示</span>
      </div>
      <div class="img-box">
        <img
          v-for="item in data.certificateDisplayList"
          :key="item"
          class="img"
          :src="item"
          alt=""
        />
        <div
          v-if="data.certificateDisplayList.length > 9"
          class="img push"
          :style="{
            backgroundImage: 'url(' + data.certificateDisplayList[9] + ')'
          }"
        >
          <span>+{{ data.certificateDisplayList.length }}</span>
        </div>
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
export default {
  name: "Details",
  components: {
    [Popup.name]: Popup
  },
  data() {
    return {
      show: false,
      isShowPersonalDisplay: false,
      showPersonalDisplayUrl: "",
      currentPages: 0,
      data: {
        headPortraitUrl: require("../../assets/img/zhanwei.png"),
        name: "张琴",
        education: "小学",
        genitals: "马",
        constellation: "白羊座",
        nation: "维吾尔族",
        currentAddress: "北京海淀",
        age: "41岁",
        experiences: "2年",
        native: "四川",
        specialty: "做饭做家务｜能照顾小孩｜照顾老人",
        introduceContent:
          " 我以前丛事家政2到3年，能吃苦耐劳，为人和善，做事麻利，勤劳。愿意照顾老人，做家务",
        jobStatus: "待岗",
        jobType: "保姆/做饭阿姨",
        intendedCity: "北京",
        isHome: "住家/不住家",
        experience: [
          {
            experiencetime: "其他 2018.08-2019.07",
            experienceContent:
              "在饭店做面点，专业饺子工；在饭店做面点，专业饺子工在饭店做面点，专业饺子工在饭店做面点，专业饺子工"
          }
        ],
        personalDisplayList: [
          require("../../assets/img/tupian.jpg"),
          require("../../assets/img/tupian1.jpg"),
          require("../../assets/img/tupian.jpg"),
          require("../../assets/img/tupian.jpg"),
          require("../../assets/img/tupian.jpg"),
          require("../../assets/img/tupian.jpg"),
          require("../../assets/img/tupian.jpg"),
          require("../../assets/img/tupian.jpg"),
          require("../../assets/img/tupian.jpg"),
          require("../../assets/img/tupian.jpg")
        ],
        certificateDisplayList: [
          require("../../assets/img/tupian.jpg"),
          require("../../assets/img/tupian.jpg"),
          require("../../assets/img/tupian.jpg"),
          require("../../assets/img/tupian.jpg"),
          require("../../assets/img/tupian.jpg")
        ]
      }
    };
  },
  methods: {
    showShare() {
      this.show = true;
    },
    showPersonalDisplay(url, index) {
      this.showPersonalDisplayUrl = url;
      this.currentPages = index + 1;
      this.isShowPersonalDisplay = true;
    },
    onSwipeLeft() {
      console.log("向左滑动");
      if (this.currentPages !== this.data.personalDisplayList.length) {
        this.currentPages = this.currentPages+1;
        this.showPersonalDisplayUrl = this.data.personalDisplayList[this.currentPages - 1];

        console(this.currentPages);
      }
    },
    onSwipeRight() {
      console.log("向右滑动");
       if (this.currentPages !== 1) {
         this.currentPages = this.currentPages-1;
        this.showPersonalDisplayUrl = this.data.personalDisplayList[this.currentPages - 1];
        console(this.currentPages);
      }
    },
    shareWeChat() {},
    shareMoments() {}
  }
};
</script>
<style scoped>
.max-box {
  background: #f5f5f5;
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
  margin: 0 auto;
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
}
.img {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 8px;
  margin-right: 0.05rem;
}
.push {
  display: inline-block;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
  font-size: 0.4rem;
  color: #fff;
  line-height: 2.1rem;
  position: relative;
}
.push span {
  position: absolute;
  left: 30%;
}
.show-box {
  width: 5rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
}
.isShowPersonalDisplay {
  width: 6rem;
  position: relative;
}
.isShowPersonalDisplay span {
  position: absolute;
  top: 0;
  color: #fff;
  font-size: 0.5rem;
}
</style>
