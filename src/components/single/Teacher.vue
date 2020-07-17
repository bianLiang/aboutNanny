<template>
  <div class="box">
    <van-form @submit="onSubmit">
      <van-field
        v-model="company"
        name="company"
        label="家政公司"
        placeholder="家政公司"
        :rules="[{ required: true, message: '请填写家政公司' }]"
      />
      <van-field
        v-model="phone"
        name="phone"
        type="tel"
        maxlength=11
        label="老师手机号"
        placeholder="老师手机号"
        :rules="[{ required: true, message: '请正确填写老师手机号',pattern:/^1(3|4|5|6|7|8|9)\d{9}$/ }]"
      />
      <div class="submit-box">
        <van-button round block type="info" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Form,Button, Field  } from "vant";
export default {
  name: "Teacher",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  data() {
    return {
      company: "",
      phone: ""
    };
  },
  created() {
    this.company = this.$route.query.company;
    this.phone = this.$route.query.phone;
  },
   methods: {
    onSubmit(values) {
      sessionStorage.setItem("Teacher",JSON.stringify(values));
      this.$router.push({
        name: "EditResume",
      });
    },
  },
};
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
</style>>
