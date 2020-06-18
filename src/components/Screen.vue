<template>
  <div class="max-box">
    <div class="title-box">
      <van-dropdown-menu>
        <van-dropdown-item :title="title_1" ref="itemPosition">
          <div class="position-box">
            <p class="position-title">
              <span>服务职位</span>&nbsp;<span>(最多选3个)</span>
            </p>
            <div>
              <button
                class="content-btn"
                v-for="(item, index) in positionList"
                :key="item"
                :class="{ active: item.active }"
                @click="clickBtn(index)"
              >
                {{ item.name }}
              </button>
            </div>
          </div>
          <div class="foot-btn">
            <van-button class="reset" type="default" @click="resetPosition">重置</van-button>
            <van-button class="determine" type="info" @click="okPosition">确定({{this.selectPosition.length}})</van-button>
          </div>
        </van-dropdown-item>
        <van-dropdown-item :title="title_2" ref="itemScreen">
          <div class="position-box">
            <p class="screen-title"><span>经验要求</span></p>
            <div>
              <button class="content-btn"
                v-for="(item, index) in screen.experienceList"
                :key="item"
                :class="{ active: item.active }" @click="clickExperienceBtn(index)">{{ item.name }}</button>
            </div>
            <p class="screen-title"><span>年龄要求</span></p>
            <div>
              <button class="content-btn"
                v-for="(item, index) in screen.ageList"
                :key="item"
                :class="{ active: item.active }" @click="clickAgeBtn(index)">{{ item.name }}</button>
            </div>
            <p class="screen-title"><span>学历要求</span></p>
            <div>
              <button class="content-btn"
                v-for="(item, index) in screen.educationList"
                :key="item"
                :class="{ active: item.active }" @click="clickEducationBtn(index)">{{ item.name }}</button>
            </div>
            <p class="screen-title"><span>婚姻状态</span></p>
            <div>
              <button class="content-btn"
                v-for="(item, index) in screen.marriageList"
                :key="item"
                :class="{ active: item.active }" @click="clickMarriageBtn(index)">{{ item.name }}</button>
            </div>
          </div>
           <div class="foot-btn">
            <van-button class="reset" type="default" @click="resetScreen">重置</van-button>
            <van-button class="determine" type="info" @click="okScreen">确定({{this.screenSelectIndex}})</van-button>
          </div>
        </van-dropdown-item>
        <van-dropdown-item :title="title_3" ref="itemNativePlace">
          <div class="position-box">
            <p class="position-title">
              <span>全部城市</span>&nbsp;<span>(最多选3个)</span>
            </p>
            <div>
              <button
                class="content-btn"
                v-for="(item, index) in nativePlaceList"
                :key="item"
                :class="{ active: item.active }"
                @click="clickNativePlaceBtn(index)"
              >
                {{ item.name }}
              </button>
            </div>
          </div>
          <div class="foot-btn">
            <van-button class="reset" type="default" @click="resetNativePlace">重置</van-button>
            <van-button class="determine" type="info" @click="okNativePlace">确定({{this.selectNativePlace.length}})</van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Button } from "vant";
export default {
  name: "Screen",
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Button.name]: Button
  },
  data() {
    return {
      title_1: "职位",
      title_2: "筛选",
      title_3: "籍贯",
      positionList: [
        { name: "月嫂", active: false },
        { name: "育儿嫂", active: false },
        { name: "催乳师", active: false },
        { name: "产后修复师", active: false },
        { name: "保姆", active: false },
        { name: "老年护理", active: false },
        { name: "钟点工", active: false },
        { name: "护工", active: false },
        { name: "厨师", active: false },
        { name: "保安", active: false },
        { name: "保洁", active: false }
      ],
      selectPosition: [],
      screen: {
        experienceList: [
          {name:"一年以下", active: false},
          {name:"1-3年", active: false},
          {name:"3-5年", active: false},
          {name:"5年以上", active: false}
        ],
        ageList: [
          {name:"20岁以下", active: false},
          {name:"20-29岁", active: false},
          {name:"30-39岁", active: false},
          {name:"40-49岁", active: false},
          {name:"50岁以上", active: false}
        ],
        educationList: [
          {name:"小学", active: false},
          {name:"初中", active: false},
          {name:"高中", active: false},
          {name:"大专", active: false},
          {name:"本科", active: false}
        ],
        marriageList: [
          {name:"已婚", active: false},
          {name:"未婚", active: false},
          {name:"离异", active: false}
        ]
      },
      screenSelectIndex: 0,
      experience: '',
      age: '',
      education: '',
      marriage: '',
      nativePlaceList: [
        { name: "北京", active: false },
        { name: "四川", active: false },
        { name: "湖南", active: false },
        { name: "安徽", active: false },
        { name: "湖北", active: false },
        { name: "江苏", active: false },
        { name: "广东", active: false },
        { name: "河南", active: false },
        { name: "河北", active: false },
        { name: "山东", active: false },
        { name: "辽宁", active: false }
      ],
      selectNativePlace: [],

    };
  },
  methods: {
    clickBtn(index) {
      if (this.positionList[index].active) {
        for (let i = 0; i < this.selectPosition.length; i++) {
          if (this.selectPosition[i] === this.positionList[index].name) {
            this.selectPosition.splice(i, 1);
          }
        }
         this.positionList[index].active = !this.positionList[index].active;
      } else {
        if (this.selectPosition.length < 3) {
          this.positionList[index].active = !this.positionList[index].active;
          if (this.positionList[index].active) {
            this.selectPosition.push(this.positionList[index].name);
          } else {
            for (let i = 0; i < this.selectPosition.length; i++) {
              if (this.selectPosition[i] === this.positionList[index].name) {
                this.selectPosition.splice(i, 1);
              }
            }
          }
        }
      }
      console.log(this.selectPosition);
    },
    clickNativePlaceBtn(index) {
      if (this.nativePlaceList[index].active) {
        for (let i = 0; i < this.selectNativePlace.length; i++) {
          if (this.selectNativePlace[i] === this.nativePlaceList[index].name) {
            this.selectNativePlace.splice(i, 1);
          }
        }
         this.nativePlaceList[index].active = !this.nativePlaceList[index].active;
      } else {
        if (this.selectNativePlace.length < 3) {
          this.nativePlaceList[index].active = !this.nativePlaceList[index].active;
          if (this.nativePlaceList[index].active) {
            this.selectNativePlace.push(this.nativePlaceList[index].name);
          } else {
            for (let i = 0; i < this.selectNativePlace.length; i++) {
              if (this.selectNativePlace[i] === this.nativePlaceList[index].name) {
                this.selectNativePlace.splice(i, 1);
              }
            }
          }
        }
      }
    },
    clearSelection(obj, index) {
      for(let i = 0; i < obj.length; i++) {
        obj[i].active = false;
      }
      obj[index].active = true;
    },
    clickExperienceBtn(index) {
      this.clearSelection(this.screen.experienceList, index);
      if (this.experience === '') {
        this.screenSelectIndex++
      }
      this.experience = this.screen.experienceList[index].name;

    },
    clickAgeBtn(index) {
      this.clearSelection(this.screen.ageList, index);
      if (this.age === '') {
        this.screenSelectIndex++
      }
      this.age = this.screen.ageList[index].name;

    },
    clickEducationBtn(index) {
      this.clearSelection(this.screen.educationList, index);
      if (this.education === '') {
        this.screenSelectIndex++
      }
      this.education = this.screen.educationList[index].name;

    },
    clickMarriageBtn(index) {
      this.clearSelection(this.screen.marriageList, index);
      if (this.marriage === '') {
        this.screenSelectIndex++
      }
      this.marriage = this.screen.marriageList[index].name;

    },

    // 重置和确定
    resetPosition() {
      this.selectPosition = [];
      for (let i = 0; i < this.positionList.length; i++) {
        this.positionList[i].active = false;
      }
      this.title_1 = '职位';
    },
    resetScreen() {
      this.screenSelectIndex = 0;
      this.experience = '';
      this.age = '';
      this.education = '';
      this.marriage = '';
      for (let i = 0; i < this.screen.experienceList.length; i++) {
        this.screen.experienceList[i].active = false;
      };
      for (let i = 0; i < this.screen.ageList.length; i++) {
        this.screen.ageList[i].active = false;
      };
      for (let i = 0; i < this.screen.educationList.length; i++) {
        this.screen.educationList[i].active = false;
      };
      for (let i = 0; i < this.screen.marriageList.length; i++) {
        this.screen.marriageList[i].active = false;
      };
      this.title_2 = '筛选';
    },
    resetNativePlace() {
      this.selectNativePlace = [];
      for (let i = 0; i < this.nativePlaceList.length; i++) {
        this.nativePlaceList[i].active = false;
      }
      this.title_3 = '籍贯';
    },
    okPosition() {
      this.title_1 = '职位' +  this.selectPosition.length;
      this.$refs.itemPosition.toggle();
      this.$emit('getScreen','调用了父组件');
    },
    okScreen() {
       this.title_2 = '筛选' +  this.screenSelectIndex;
       this.$refs.itemScreen.toggle();
    },
    okNativePlace() {
      this.title_3 = '籍贯' +  this.selectNativePlace.length;
      this.$refs.itemNativePlace.toggle();
    }
  }
};
</script>
<style scoped>
.max-box {
  width: 95%;
  border-top: 0.02rem solid #d5d5d5;
  margin: 0 auto;
}
.position-title span:first-child, .screen-title span{
  font-size: 0.28rem;
  color: #333333;
}
.position-title span:last-child {
  font-size: 0.28rem;
  color: #ccc;
}
.title-box {
  margin: 0.3rem 0 0.1rem;
}
.position-box {
  width: 95%;
  margin: 0 auto;
  padding-bottom: 0.8rem;
  border-bottom: 0.02rem #d5d5d5 solid;
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
.foot-btn {
  height: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reset,
.determine {
  border-radius: 0.2rem;
  margin: 0.2rem;
}
.reset {
  width: 2rem;
  border: 0.02rem solid #3395FF;
}
.determine {
  width: 4.5rem;
}
.active {
  color: #3395ff;
}
</style>
