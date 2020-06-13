<template>
  <div>
    <van-action-sheet v-model="show" round=false>
      <div class="content">内容</div>
    </van-action-sheet>
  </div>
</template>
<script>
import { ActionSheet } from "vant";
export default {
  name: "ConsultingService",
  components: {
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    showModel() {
      this.show = true;
    }
  }
};
</script>
<style scoped></style>>
