<template>
  <div class="main setting">
    <input type="text" v-model="url">
    <button @click="setSetting">开始</button>
  </div>
</template>

<script>
export default {
  name: 'setting',
  components: {

  },
  data(){
      return {
          url:""
      }
  },
  methods:{
      setSetting(){
          this.$store.commit('setUrl',this.url);
          this.$router.push('')
      }
  }
}
</script>
<style lang="less">

</style>

