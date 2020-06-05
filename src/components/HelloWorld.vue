<template>
  <div class="hello">
    <i class="iconfont">&#xe6d1;</i>
    <van-rate v-model="val"></van-rate>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
import { Rate, Button } from 'vant'
export default {
  components: {
    [Rate.name]: Rate,
    [Button.name]: Button
  },
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
