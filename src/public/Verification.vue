<template>
</template>
<script>
import { Notify } from 'vant';
export default {
  name:"Verification",
  components: {
    [Notify.Component.name]: Notify.Component
  },
  methods: {
    notify (type, text) {
      Notify({ type: type, message: text });
    },
    // 验证手机号
    validateMobilePhone (value) {
      if (value === '') {
        this.notify('warning', '手机号不可为空');
        return false;
      } else {
        if (value !== '') {
          var reg=/^1[3456789]\d{9}$/;
          if(!reg.test(value)){
            this.notify('warning', '请输入有效的手机号码');
            return false;
          } else {
            return true;
          }
        }
      }
    },
    // 验证字段不能为空
    nonempty(value,text) {
      if (value === '') {
        this.notify('warning', text);
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>
