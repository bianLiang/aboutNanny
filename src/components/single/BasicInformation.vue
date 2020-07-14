<template>
  <div class="box">
    <div class="head-url-box">
      <span class="title">头像</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'BasicInformation',
  data() {
    return {
      headPortraitUrl: '',
      name: '',
      education:'',
      genitals:'',
      nation:'',
      constellation:'',
      age:'',
      native: '',
      experiences:''
    }
  },
  created() {
    this.headPortraitUrl = this.$route.query.headPortraitUrl;
    this.name = this.$route.query.name;
    this.education = this.$route.query.education;
    this.genitals = this.$route.query.genitals;
    this.nation = this.$route.query.nation;
    this.constellation = this.$route.query.constellation;
    this.age = this.$route.query.age;
    this.native = this.$route.query.native;
    this.experiences = this.$route.query.experiences;
  },
  methods: {}
}
</script>
<style scoped>
  .box {
  position: absolute;
  padding-top: 1.2rem;
  left: 0;
	height:100%;
  width: 100%;
  background: #eee;
}
.title {
  font-size: 0.36rem;
  color: #000;
  font-weight: 600;
}
</style>>
