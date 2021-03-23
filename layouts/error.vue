<template lang="pug">
  .famous-wrap
    .error-layout
      .error-content
        el-card.error-card
          .error-card-content
            h1.error-title Ошибка 404
            nuxt-link.error-back(to="/") Гибкая древесина
            p Мастерская
</template>

<script>
  export default {
    name: 'error-template'
  }
</script>

<style lang="stylus">

  .famous-wrap
    width 100%
    display flex
    justify-content center
    align-items center
  .error
    &-layout
      display flex
      justify-content center
      align-items center
      width 100%
      flex 1 1 auto
    &-title
      font-weight normal
      color #fffdec
      margin 0
      padding-bottom 12px
      border-bottom 2px solid #fffdec
      border-radius 0 0 2px 2px
      text-align center
    &-card
      padding 30px 40px 20px 40px
      position relative
      &.el-card
        border none
        box-shadow 0 0 8px 2px rgba(55,55,55,.6)
        background-color #252525
      &-content
        position relative
        z-index 2
        text-align center
        p
          color #fff
          font 12px Circe
          text-transform lowercase
          text-align center
    &-back
      display inline-block
      font 600 12px Circe
      color #429ce3
      text-transform uppercase
      text-decoration none
      padding-top 14px
      &:hover
        color #dcbc96

</style>
