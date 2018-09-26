<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  computed:{
    apiDoc(){
      return this.$store.state.apiDoc
    }
  },
  created() {
    let that = this
    this.$store.dispatch('getApiDoc').then(res => {
    })
  },
}
</script>

<style lang="less">
*{
  box-sizing: border-box;
}
.float-l{
  float: left;
}
ul,li{
  list-style: none;
  padding: 0
}
#app{
  .main{
    // padding:0 200px;
    max-width: 900px;
    margin: 0 auto;
  }
}
</style>

