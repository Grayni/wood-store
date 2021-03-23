<template lang="pug">
  el-tooltip(:content="title" placement="top")
    .add-service(v-if="urls")
      nuxt-link(:to="urls")
        i.el-icon-plus
    .add-service(v-else)
      i.el-icon-plus
</template>

<script>
  export default {
    name: 'add',
    props: {
      urls: {
        type: String
      },
      title: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="stylus">
  .add-service
    padding-top 20px
    cursor pointer
    display flex
    justify-content center
    width 100%
    i
      font-size 25px
      color #68afe5
      animation sign-rotate 5s ease-in-out infinite
      &:hover
        color #dcbc96

</style>
