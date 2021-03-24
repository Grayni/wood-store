<template lang="pug">
  .admin-layout
    el-container(style="min-height: 100%")
      el-aside.aside(width="260px")
        aside-menu
        a.admin-layout-link(:href="urlSite" target="_blank") {{urlSite}}
      el-main.main-content
        .wrapper-main
          Nuxt
</template>

<script>
  import {setError} from '@/plugins/mixins/setError'

  export default {
    name: 'admin',
    mixins: [setError],
    data() {
      return {
        urlSite: process.env.site
      }
    }
  }
</script>

<style lang="stylus">

  .admin-layout
    position relative
    .aside
      min-height 100vh
    .el
      &-main
        background-color #fff
        padding 40px
        .wrapper-main
          padding-bottom 120px
    &-link
      color #999
      position absolute
      bottom 0
      display block
      left 60px
      text-align center
      margin-bottom 15px
      font-size 14px
  .el-aside
    background-color #252525
</style>
