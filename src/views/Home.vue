<template>
  <div class="main home">
    <h2>api列表</h2>
    <ul>
      <li v-for="item in apiDoc.tags">
        <router-link :to="{ path: '/details/'+item.name}">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
  computed:{
    apiDoc(){
      return this.$store.state.apiDoc
    }
  },
  created() {

  },
}
</script>
<style lang="less">

</style>

