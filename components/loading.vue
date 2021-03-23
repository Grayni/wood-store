<template lang="pug">
  transition(name="hide-load")
    .loading( v-if="false" )
      i.icon.el-icon-loading
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    // name: 'loading',
    // data() {
    //   return {
    //     loading: true
    //   }
    // },
    // computed: {
    //   ...mapGetters(['loadingPage'])
    // },
    // methods: {
    //   ...mapActions(['loadingPageOff']),
    //   finish() {
    //     this.loading = false
    //   }
    // },
    // async mounted() {
    //   await this.loadingPageOff()
    // }
  }
</script>

<style lang="stylus" scoped>
  .loading
    position fixed
    top 0
    left 0
    height 100%
    width 100vw
    display flex
    justify-content center
    align-items center
    z-index 2
    background-color #fff
    .icon
      font-size 50px
      color #0a7efc

  .hide-load-active, .hide-load-leave-active
    transition opacity .4s
  .hide-load-enter, .hide-load-leave-to
    opacity 0
</style>
