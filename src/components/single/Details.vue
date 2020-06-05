<template>
  <div class="max-box">
    <div class="card-box">
      <div style="display: flex;">
        <div class="seize">
          <img src="../../assets/img/zhanwei.png" alt="" />
        </div>
        <div>
          <div>
            <p class="name">王秀丽</p>
          </div>
          <div class="education-box">
            <p class="education"><span>学历：</span><span>小学</span></p>
            <p class="genitals"><span>属相：</span><span>马</span></p>
          </div>
          <div class="constellation-box">
            <p class="constellation"><span>星座：</span><span>白羊座</span></p>
            <p class="nation"><span>民族：</span><span>维吾尔族</span></p>
          </div>
          <div>
            <p class="current-address">现居住地址：北京海淀</p>
          </div>
          <div class="age-box">
            <p class="age"><span>年龄：</span><span>41岁</span></p>
            <p class="experience"><span>经验：</span><span>2年</span></p>
            <p class="native"><span>籍贯：</span><span>四川</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="introduce-box">
      <div>
        <p class="introduce"><span>图标</span><span>自我介绍</span></p>
      </div>
      <div>
        <p class="introduce-specialty">做饭做家务｜能照顾小孩｜照顾老人</p>
      </div>
      <div>
        <p class="introduce-content">
          我以前丛事家政2到3年，能吃苦耐劳，为人和善，做事麻利，勤劳。愿意照顾老人，做家务，现在还想从事这方面的工作。
          我以前丛事家政2到3年，能吃苦耐劳，为人和善，做事麻利，勤劳。愿意照顾老人，做家务，现在还想从事这方面的工作。
        </p>
      </div>
    </div>
    <!-- <div>
      求职意向
    </div>
    <div>
      从业经历
    </div>
    <div>
      个人展示
    </div>
    <div>
      证件展示
    </div>
    <div>
      分享
    </div> -->
  </div>
</template>
<script>
export default {
  name: "Details",
  data() {
    return {};
  }
};
</script>
<style scoped>
.max-box {
  background: #f5f5f5;
}
.card-box {
  background: #fff;
  width: 80%;
  height: 3.45rem;
  border-radius: 0.16rem;
  position: relative;
  top: 0.4rem;
  left: 50%;
  margin-left: -40%;
  padding: 0.2rem;
  box-shadow:0px 10px 20px 0px rgba(85,85,85,0.1);
}
.seize {
  width: 1.7rem;
  height: 2.27rem;
  display: flex;
}
.name {
  color: #333333;
  font-size: 0.32rem;
}
.education,
.genitals,
.constellation,
.nation,
.current-address,
.age,
.experience,
.native {
  font-size: 0.28rem;
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
.introduce {
  color: #3395ff;
  font-size: 0.32rem;
}
.introduce-specialty,
.introduce-content {
  color: #333333;
  font-size: 0.28rem;
}
</style>
