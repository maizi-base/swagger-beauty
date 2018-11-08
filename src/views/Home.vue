<template>
  <div class="main home">
    <div class="search-box">
      <input type="text" class="form-control url-value" :placeholder="$store.state.setting.url" v-model="url" @keydown="search">
      <input class="btn btn-default"  type="button" value="查询" @click="search"></input>
    </div>
    <h2>api列表</h2>
    <ul>
      <li v-for="item in apiDoc.tags">
        <router-link :to="{ path: '/details/'+item.name}">{{item.name}}</router-link>
      </li>
    </ul>
    <pre class="error-message" v-if="error.isError">
      <h4>错误信息</h4>
      {{error.errMessage}}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
  data(){
    return {
      url:""
    }
  },
  computed:{
    apiDoc(){
      return this.$store.state.apiDoc
    },
    error(){
      return this.$store.state.error
    }
  },
  created() {
    this.url = this.$store.state.setting.url
  },
  methods:{
    search(){
      if(this.url){
        // this.$store.commit('setUrl',this.url)
        this.$store.dispatch('getApiDoc',this.url)
      }else{
        alert('请填写url')
      }
      console.log(this.url)
    }
  }
}
</script>
<style lang="less">
.search-box{
  height: 80px;
  padding-top: 20px;
  .url-value{
    width: 400px;
    float: left;
    margin-right: 20px;
  }
}
</style>

